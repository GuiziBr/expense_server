import { DatabaseService } from '@/infra/database/database.service'
import { Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { createBank } from '../test-utils/bank.factory'
import { BankService } from './bank.service'

describe('BankService', () => {
  let bankService: BankService
  let databaseService: DatabaseService
  let loggerSpy: ReturnType<typeof vi.spyOn>
  const fakeBank = createBank()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BankService,
        {
          provide: DatabaseService,
          useValue: {
            bank: {
              findMany: vi.fn().mockResolvedValue([fakeBank]),
              findUnique: vi.fn().mockResolvedValue(fakeBank),
              update: vi.fn().mockResolvedValue(fakeBank),
              delete: vi.fn(),
              upsert: vi.fn().mockResolvedValue(fakeBank)
            }
          }
        }
      ]
    }).compile()

    bankService = module.get<BankService>(BankService)
    databaseService = module.get<DatabaseService>(DatabaseService)
    loggerSpy = vi.spyOn(Logger.prototype, 'error')
  })

  describe('getAll', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.bank, 'findMany').mockRejectedValue(new Error())

      await expect(bankService.getAll(0,1))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.bank.findMany).toBeCalledWith({
        where: { deletedAt: null },
        skip: 0,
        take: 1,
        orderBy: { name: 'asc' }
      })

      expect(loggerSpy).toBeCalledWith('Error - Error - getting all banks')
    })

    it('should return bank', async () => {
      const result = await bankService.getAll(1,2)

      expect(result).toEqual([fakeBank])

      expect(databaseService.bank.findMany).toBeCalledWith({
        where: { deletedAt: null },
        skip: 1,
        take: 2,
        orderBy: { name: 'asc' }
      })
    })
  })

  describe('getById', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.bank, 'findUnique').mockRejectedValue(new Error())

      await expect(bankService.getById('bank-id'))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.bank.findUnique).toBeCalledWith({
        where: { id: 'bank-id', deletedAt: null }
      })

      expect(loggerSpy)
        .toBeCalledWith('Error - Error - getting bank by id bank-id')
    })

    it('should return bank', async () => {
      const result = await bankService.getById('bank-id')

      expect(result).toEqual(fakeBank)

      expect(databaseService.bank.findUnique).toBeCalledWith({
        where: { id: 'bank-id', deletedAt: null }
      })
    })
  })

  describe('create', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.bank, 'upsert').mockRejectedValue(new Error())

      const name = 'bank_name'

      await expect(bankService.create(name))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.bank.upsert).toBeCalledWith({
        where: { name },
        update: { name, deletedAt: null },
        create: { name }
      })

      expect(loggerSpy)
        .toBeCalledWith(`Error - Error - creating bank ${name}`)
    })

    it('should return created bank', async () => {
      const name = 'bank_name'
      const result = await bankService.create(name)

      expect(result).toEqual(fakeBank)

      expect(databaseService.bank.upsert).toBeCalledWith({
        where: { name },
        update: { name, deletedAt: null },
        create: { name }
      })

      expect(loggerSpy).not.toBeCalled()
    })
  })

  describe('update', () => {
    it('should throw bank not found exception', async () => {
      vi.spyOn(databaseService.bank, 'findUnique').mockResolvedValue(null)

      await expect(bankService.update('bank-id', 'updated-bank'))
        .rejects
        .toThrow('Bank not found')

      expect(databaseService.bank.findUnique).toBeCalledWith({
        where: { id: 'bank-id' }
      })

      expect(databaseService.bank.findUnique).toBeCalledWith({
        where: { name: 'updated-bank' }
      })

      expect(loggerSpy).toBeCalledWith('Bank bank-id not found')
    })

    it('should return updated bank', async () => {
      const result = await bankService.update(
        fakeBank.id,
        'updated-bank',
      )

      expect(result).toEqual(fakeBank)

      expect(databaseService.bank.findUnique).toBeCalledWith({
        where: { id: fakeBank.id }
      })

      expect(databaseService.bank.findUnique).toBeCalledWith({
        where: { name: 'updated-bank' }
      })

      expect(databaseService.bank.update).toBeCalledWith({
        where: { id: fakeBank.id },
        data: { name: 'updated-bank', deletedAt: null }
      })

      expect(loggerSpy).not.toBeCalled()
    })

    it('should throw bank already exists exception', async () => {
      await expect(bankService.update('bank-id', 'updated-bank'))
        .rejects
        .toThrow('There is already a bank with same name')

      expect(databaseService.bank.findUnique).toBeCalledWith({
        where: { id: 'bank-id' }
      })

      expect(databaseService.bank.findUnique).toBeCalledWith({
        where: { name: 'updated-bank' }
      })

      expect(loggerSpy)
        .toBeCalledWith('Bank with name "updated-bank" already exists')
    })

    it('should reactivate deleted bank', async () => {
      const deletedBank = createBank({ deletedAt: new Date(), updatedAt: new Date() })

      vi.spyOn(databaseService.bank, 'findUnique')
        .mockResolvedValue(deletedBank)

      const result = await bankService.update(
        fakeBank.id,
        'updated-bank'
      )

      expect(result).toEqual(fakeBank)

      expect(databaseService.bank.findUnique).toBeCalledWith({
        where: { id: fakeBank.id }
      })

      expect(databaseService.bank.findUnique).toBeCalledWith({
        where: { name: 'updated-bank' }
      })

      expect(databaseService.bank.update).toBeCalledWith({
        where: { id: fakeBank.id },
        data: { deletedAt: expect.any(Date) }
      })

      expect(databaseService.bank.update).toBeCalledWith({
        where: { id: deletedBank.id },
        data: { deletedAt: null }
      })
    })

    it('should throw internal server error exception', async () => {
      vi.spyOn(databaseService.bank, 'findUnique').mockRejectedValue(new Error())

      await expect(bankService.update('bank-id', 'updated-bank'))
        .rejects
        .toThrow('Internal server error')

      expect(loggerSpy).toBeCalledWith('Error - Error - updating bank bank-id')
    })
  })
})
