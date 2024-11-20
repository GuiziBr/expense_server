import { z } from 'zod'
import { GetExpensesRequest } from '../expense/expense.dto'
import { ConsolidatedReport, ReportCategory, ReportPayment } from '@/domains/balance.domain'

export const queryBalanceSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  filterBy: z.enum(['category', 'paymentType', 'bank', 'store']).optional(),
  filterValue: z.string().optional().optional()
})

export type QueryBalanceDTO = z.infer<typeof queryBalanceSchema>

export interface GetBalanceRequest extends GetExpensesRequest {}

export interface GetBalanceResponse {
  personalBalance: number
  sharedBalance: {
    paying: number
    payed: number
    total: number
  }
}

export const queryConsolidatedBalanceSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(1900)
})

export type QueryConsolidatedBalanceDTO = z.infer<typeof queryConsolidatedBalanceSchema>

export interface GetConsolidateBalanceRequest {
  userId: string
  month: number
  year: number
}

export interface GetConsolidatedBalanceResponse {
  userId: string
  requesterBalance: number
  partnerBalance: number
  requester: ConsolidatedReport
  partner: ConsolidatedReport
}

interface BalanceOwner {
  id?: string
  name?: string
  payments?: Array<ReportPayment>
  categories?: Array<ReportCategory>
  total: number

}

export interface ConsolidatedBalanceDTO {
  requester: BalanceOwner
  partner?: BalanceOwner
  balance: number
}
