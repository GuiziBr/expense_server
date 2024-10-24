import { DatabaseService } from '@/infra/database/database.service'
import { Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { createStatementPeriod } from '../test-utils/statement-period.factory'
import { StatementPeriodService } from './statement-period.service'

describe('StatementPeriodService', () => {
  let statementPeriodService: StatementPeriodService
  let databaseService: DatabaseService
  let loggerSpy: ReturnType<typeof vi.spyOn>
  const fakeStatementPeriod = createStatementPeriod()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StatementPeriodService,
        {
          provide: DatabaseService,
          useValue: {
            statementPeriod: {
              findFirst: vi.fn().mockResolvedValue(fakeStatementPeriod)
            }
          }
        }
      ]
    }).compile()

    statementPeriodService = module.get<StatementPeriodService>(StatementPeriodService)
    databaseService = module.get<DatabaseService>(DatabaseService)
    loggerSpy = vi.spyOn(Logger.prototype, 'error')
  })

  describe('findByUserAndBank', () => {
    it('should throw internal server error exception', async () => {
      vi.spyOn(databaseService.statementPeriod, 'findFirst')
        .mockRejectedValue(new Error())

      await expect(statementPeriodService.findByUserAndBank(
        'userId',
        'bankId',
        'paymentTypeId'
      )).rejects.toThrowError()

      expect(loggerSpy).toBeCalledWith('Error - Error - getting statement period')
    })

    it('should return statement period', async () => {
      const result = await statementPeriodService.findByUserAndBank(
        'userId',
        'bankId',
        'paymentTypeId'
      )

      expect(result).toEqual(fakeStatementPeriod)

      expect(databaseService.statementPeriod.findFirst).toBeCalledWith({
        where: {
          userId: 'userId',
          bankId: 'bankId',
          paymentTypeId: 'paymentTypeId'
        }
      })

      expect(loggerSpy).not.toBeCalled()
    })
  })
})
