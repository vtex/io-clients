export interface DateRange {
  from: string
  to: string
}

export interface ComponentRepresentation {
  operator: string
  statements: string
}

export interface ConditionMetadata {
  template: string
  statements: Record<string, string>
  createdAt: string
  modifiedAt: string
  expressionHash: string
  expressionVersion: string
  operator: string
  componentRepresentation: ComponentRepresentation
}

export interface Condition {
  conditionId: string
  description: string
  expression: string
  isEnabled: boolean
  isFeatured: boolean
  visualRepresentation: string
  dateRange: DateRange
  conditionMetadata: ConditionMetadata
}
export interface EvaluationsResponse {
  validConditions: unknown[]
}

export interface ListConditionsResponse {
  conditionsLimit: number
  conditions: Condition[]
  eligible: string[]
}
