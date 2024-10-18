import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { StorePresenter } from '@/infra/http/presenters/store.presenter'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import {
  CreateStoreDTO,
  createStoreSchema,
  ListStoreDTO,
  listStoresSchema,
  StoreByIdDTO,
  storeByIdSchema,
  StoreDTO
} from './store.dto'
import { StoreService } from './store.service'

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async listStores(
    @Query(new ZodValidationPipe(listStoresSchema)) query?: ListStoreDTO
  ) {
    const { offset, limit } = query
    const stores = await this.storeService.getAll(offset,limit)
    return stores.map(StorePresenter.toHttp)
  }

  @Get(':id')
  async getStoreById(
    @Param(new ZodValidationPipe(storeByIdSchema)) params: StoreByIdDTO
  ): Promise<StoreByIdDTO>  {
    const { id } = params
    const store = await this.storeService.getById(id)
    if(!store) {
      throw new NotFoundException()
    }
    return StorePresenter.toHttp(store) || null
  }

  @Post()
  async createStore(
    @Body(new ZodValidationPipe(createStoreSchema)) body: CreateStoreDTO
  ): Promise<StoreDTO> {
    const { name } = body
    const store = await this.storeService.create(name)
    return StorePresenter.toHttp(store)
  }

  @Patch(':id')
  async updateStore(
    @Param(new ZodValidationPipe(storeByIdSchema)) params: StoreByIdDTO,
    @Body(new ZodValidationPipe(createStoreSchema)) body: CreateStoreDTO
  ): Promise<StoreDTO> {
    const { id } = params
    const { name } = body
    const store = await this.storeService.update(id, name)
    return StorePresenter.toHttp(store)
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteStore(
    @Param(new ZodValidationPipe(storeByIdSchema)) params: StoreByIdDTO
  ): Promise<void> {
    const { id } = params
    return this.storeService.delete(id)
  }
}
