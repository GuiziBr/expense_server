
export interface ReportCategory {
  id: string
  description: string
  total: number
}

export interface ReportBank {
  id: string
  name: string
  total: number
}

export interface ReportPayment {
  id: string
  description: string
  banks: Array<ReportBank>
  total: number
}

export interface ConsolidatedReport {
  ownerId: string
  ownerName: string
  payments: Array<ReportPayment>
  categories: Array<ReportCategory>
  total: number
}
