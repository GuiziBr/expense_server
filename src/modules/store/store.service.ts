import { Store } from '@/domains/store.domain'
import { DatabaseService } from '@/infra/database/database.service'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import AppError from '../utils/appError'
import { constants } from '../utils/constants'

@Injectable()
export class StoreService {
  private readonly logger = new Logger(StoreService.name)

  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async getAll(offset?: number, limit?: number): Promise<Store[]> {
    try {
      const stores = await this.databaseService.store.findMany({
        where: { deletedAt: null },
        skip: offset,
        take: limit,
        orderBy: { name: 'asc' }
      })
      return stores
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - getting all stores`)
      throw new AppError('Internal server error', 500)
    }
  }

  async getById(id: string): Promise<Store | null> {
    try {
      const store = await this.databaseService.store.findUnique(
        { where: { id, deletedAt: null }}
      )
      return store
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - getting store by id ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async create(name: string): Promise<Store> {
    try {
      const store = await this.databaseService.store.upsert({
        where: { name },
        update: { name, deletedAt: null },
        create: { name }
      })
      return store
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - creating store ${name}`)
      throw new AppError('Internal server error', 500)
    }
  }

  async update(
    id: string,
    name: string,
  ): Promise<Store> {
    try {
      const [store, sameNameStore] = await Promise.all([
        this.databaseService.store.findUnique({ where: { id }}),
        this.databaseService.store.findUnique({ where: { name }})
      ])

      if(!store) {
        this.logger.error(`Store ${id} not found`)
        throw new AppError('Store not found', 404)
      }

      if((store && !sameNameStore) || (sameNameStore?.id === id)) {
        const updatedStore = await this.databaseService.store.update({
          where: { id },
          data: { name, deletedAt: null }
        })
        return updatedStore
      }

      if(sameNameStore) {
        if(!sameNameStore?.deletedAt) {
          this.logger.error(`Store with name "${name}" already exists`)
          throw new AppError('There is already a store with same name', 400)
        }
      }

      const reactivatedStore = await this.reactivateStore(id, sameNameStore.id)

      return reactivatedStore
    } catch (error) {
      if(error instanceof AppError) {
        throw error
      }
      this.logger.error(`Error - ${error.message || error} - updating store ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }


  async delete(id: string): Promise<void> {
    try {
      await this.databaseService.store.update({
        where: { id },
        data: { deletedAt: new Date() }
      })
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError
          && error.code === constants.RECORD_NOT_FOUND
      ) {
        return
      }
      this.logger.error(`Error - ${error.message || error} - deleting store ${id}`)
      throw new AppError('Internal server error', 500)
    }
  }

  private async reactivateStore(
    storeIdToDelete: string,
    storeIdToRestore: string
  ): Promise<Store> {
    try {
      const [,reactivatedStore] = await Promise.all([
        this.delete(storeIdToDelete),
        this.databaseService.store.update({
          where: { id: storeIdToRestore },
          data: { deletedAt: null }
        })
      ])
      return reactivatedStore
    } catch (error) {
      this.logger.error(`Error - ${error.message || error} - reactivating store ${storeIdToDelete}`)
      throw new AppError('Internal server error', 500)
    }
  }
}
