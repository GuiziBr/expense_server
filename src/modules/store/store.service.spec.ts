import { DatabaseService } from '@/infra/database/database.service'
import { Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { createStore } from '../test-utils/store.factory'
import { StoreService } from './store.service'

describe('StoreService', () => {
  let storeService: StoreService
  let databaseService: DatabaseService
  let loggerSpy: ReturnType<typeof vi.spyOn>
  const fakeStore = createStore()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StoreService,
        {
          provide: DatabaseService,
          useValue: {
            store: {
              findMany: vi.fn().mockResolvedValue([fakeStore]),
              findUnique: vi.fn().mockResolvedValue(fakeStore),
              update: vi.fn().mockResolvedValue(fakeStore),
              delete: vi.fn(),
              upsert: vi.fn().mockResolvedValue(fakeStore)
            }
          }
        }
      ]
    }).compile()

    storeService = module.get<StoreService>(StoreService)
    databaseService = module.get<DatabaseService>(DatabaseService)
    loggerSpy = vi.spyOn(Logger.prototype, 'error')
  })

  describe('getAll', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.store, 'findMany').mockRejectedValue(new Error())

      await expect(storeService.getAll(0,1))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.store.findMany).toBeCalledWith({
        where: { deletedAt: null },
        skip: 0,
        take: 1,
        orderBy: { name: 'asc' }
      })

      expect(loggerSpy).toBeCalledWith('Error - Error - getting all stores')
    })

    it('should return Store', async () => {
      const result = await storeService.getAll(1,2)

      expect(result).toEqual([fakeStore])

      expect(databaseService.store.findMany).toBeCalledWith({
        where: { deletedAt: null },
        skip: 1,
        take: 2,
        orderBy: { name: 'asc' }
      })
    })
  })

  describe('getById', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.store, 'findUnique').mockRejectedValue(new Error())

      await expect(storeService.getById('store-id'))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.store.findUnique).toBeCalledWith({
        where: { id: 'store-id', deletedAt: null }
      })

      expect(loggerSpy)
        .toBeCalledWith('Error - Error - getting store by id store-id')
    })

    it('should return store', async () => {
      const result = await storeService.getById('store-id')

      expect(result).toEqual(fakeStore)

      expect(databaseService.store.findUnique).toBeCalledWith({
        where: { id: 'store-id', deletedAt: null }
      })
    })
  })

  describe('create', () => {
    it('should throw Internal server error exception', async () => {
      vi.spyOn(databaseService.store, 'upsert').mockRejectedValue(new Error())

      const name = 'store_name'

      await expect(storeService.create(name))
        .rejects
        .toThrow('Internal server error')

      expect(databaseService.store.upsert).toBeCalledWith({
        where: { name },
        update: { name, deletedAt: null },
        create: { name }
      })

      expect(loggerSpy)
        .toBeCalledWith(`Error - Error - creating store ${name}`)
    })

    it('should return created store', async () => {
      const name = 'store_name'
      const result = await storeService.create(name)

      expect(result).toEqual(fakeStore)

      expect(databaseService.store.upsert).toBeCalledWith({
        where: { name },
        update: { name, deletedAt: null },
        create: { name }
      })

      expect(loggerSpy).not.toBeCalled()
    })
  })

  describe('update', () => {
    it('should throw store not found exception', async () => {
      vi.spyOn(databaseService.store, 'findUnique').mockResolvedValue(null)

      await expect(storeService.update('store-id', 'updated-store'))
        .rejects
        .toThrow('Store not found')

      expect(databaseService.store.findUnique).toBeCalledWith({
        where: { id: 'store-id' }
      })

      expect(databaseService.store.findUnique).toBeCalledWith({
        where: { name: 'updated-store' }
      })

      expect(loggerSpy).toBeCalledWith('Store store-id not found')
    })

    it('should return updated store', async () => {
      const result = await storeService.update(
        fakeStore.id,
        'updated-store',
      )

      expect(result).toEqual(fakeStore)

      expect(databaseService.store.findUnique).toBeCalledWith({
        where: { id: fakeStore.id }
      })

      expect(databaseService.store.findUnique).toBeCalledWith({
        where: { name: 'updated-store' }
      })

      expect(databaseService.store.update).toBeCalledWith({
        where: { id: fakeStore.id },
        data: { name: 'updated-store', deletedAt: null }
      })

      expect(loggerSpy).not.toBeCalled()
    })

    it('should throw Store already exists exception', async () => {
      await expect(storeService.update('store-id', 'updated-store'))
        .rejects
        .toThrow('There is already a store with same name')

      expect(databaseService.store.findUnique).toBeCalledWith({
        where: { id: 'store-id' }
      })

      expect(databaseService.store.findUnique).toBeCalledWith({
        where: { name: 'updated-store' }
      })

      expect(loggerSpy)
        .toBeCalledWith('Store with name "updated-store" already exists')
    })

    it('should reactivate deleted store', async () => {
      const deletedStore = createStore({ deletedAt: new Date() })

      vi.spyOn(databaseService.store, 'findUnique')
        .mockResolvedValue(deletedStore)

      const result = await storeService.update(
        fakeStore.id,
        'updated-store'
      )

      expect(result).toEqual(fakeStore)

      expect(databaseService.store.findUnique).toBeCalledWith({
        where: { id: fakeStore.id }
      })

      expect(databaseService.store.findUnique).toBeCalledWith({
        where: { name: 'updated-store' }
      })

      expect(databaseService.store.update).toBeCalledWith({
        where: { id: fakeStore.id },
        data: { deletedAt: expect.any(Date) }
      })

      expect(databaseService.store.update).toBeCalledWith({
        where: { id: deletedStore.id },
        data: { deletedAt: null }
      })
    })

    it('should throw internal server error exception', async () => {
      vi.spyOn(databaseService.store, 'findUnique').mockRejectedValue(new Error())

      await expect(storeService.update('store-id', 'updated-Store'))
        .rejects
        .toThrow('Internal server error')

      expect(loggerSpy).toBeCalledWith('Error - Error - updating store store-id')
    })
  })
})
