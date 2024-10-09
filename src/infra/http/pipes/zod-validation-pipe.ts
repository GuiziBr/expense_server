import AppError from '@/modules/utils/appError'
import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'


export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value, {})
    } catch (error) {
      if(error instanceof ZodError) {
        const param = fromZodError(error)?.details[0]?.path[0]
        const message = fromZodError(error)?.details[0]?.message
        throw new AppError(`${param} ${message}`)
      }
      throw new BadRequestException('Validation Failed')
    }
  }
}
