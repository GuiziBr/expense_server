import { Bank } from '@/domains/bank.domain'
import { DatabaseService } from '@/infra/database/database.service'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import AppError from '../utils/appError'
import { constants } from '../utils/constants'

@Injectable()
export class BankService {
  private readonly logger = new Logger(BankService.name)

  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async getAll(offset?: number, limit?: number): Promise<Bank[]> {
    try {
      const banks = await this.databaseService.bank.findMany({
        where: { deletedAt: null },
        skip: offset,
        take: limit,
        orderBy: { name: 'asc' }
      })
      return banks
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - getting all banks`)
      throw new AppError('Internal server error', 500)
    }
  }

  async getById(id: string): Promise<Bank | null> {
    try {
      const bank = await this.databaseService.bank.findUnique(
        { where: { id, deletedAt: null }}
      )
      return bank
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - getting bank by id ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async create(name: string): Promise<Bank> {
    try {
      const bank = await this.databaseService.bank.upsert({
        where: { name },
        update: { name, deletedAt: null },
        create: { name }
      })
      return bank
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - creating bank ${name}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async update(
    id: string,
    name: string,
  ): Promise<Bank> {
    try {
      const [bank, sameNameBank] = await Promise.all([
        this.databaseService.bank.findUnique({ where: { id }}),
        this.databaseService.bank.findUnique({ where: { name }})
      ])

      if(!bank) {
        this.logger.error(`Bank ${id} not found`)
        throw new AppError('Bank not found', 404)
      }

      if((bank && !sameNameBank) || (sameNameBank?.id === id)) {
        const updatedBank = await this.databaseService.bank.update({
          where: { id },
          data: { name, deletedAt: null }
        })
        return updatedBank
      }

      if(sameNameBank) {
        if(!sameNameBank?.deletedAt) {
          this.logger.error(`Bank with name "${name}" already exists`)
          throw new AppError('There is already a bank with same name', 400)
        }
      }

      const reactivatedBank = await this.reactivateBank(id, sameNameBank.id)

      return reactivatedBank
    } catch (error) {
      if(error instanceof AppError) {
        throw error
      }
      this.logger.error(`Error - ${error.message || error} - updating bank ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }


  async delete(id: string): Promise<void> {
    try {
      await this.databaseService.bank.update({
        where: { id },
        data: { deletedAt: new Date() }
      })
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError
          && error.code === constants.RECORD_NOT_FOUND
      ) {
        return
      }
      this.logger.error(`Error - ${error.message || error} - deleting bank ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }

  private async reactivateBank(
    bankIdToDelete: string,
    bankIdToRestore: string
  ): Promise<Bank> {
    try {
      const [,reactivatedBank] = await Promise.all([
        this.delete(bankIdToDelete),
        this.databaseService.bank.update({
          where: { id: bankIdToRestore },
          data: { deletedAt: null }
        })
      ])
      return reactivatedBank
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - reactivating bank ${bankIdToDelete}`)
      throw new AppError('Internal server error', 500)
    }
  }
}
