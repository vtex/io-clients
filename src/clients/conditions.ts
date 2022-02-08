/* eslint-disable max-params */
import { JanusClient } from '@vtex/api'
import type {
  RequestTracingConfig,
  InstanceOptions,
  IOContext,
} from '@vtex/api'

import type {
  Condition,
  EvaluationsResponse,
  ListConditionsResponse,
} from '../typings/conditions'
import { getRequestConfig } from '../utils/request'
import type { AuthMethod } from '../typings'

export class Conditions extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getAllConditionsPerType(
    type: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'conditions-getPerType'

    return this.http.get<ListConditionsResponse>(
      this.routes.ConditionsByType(this.context.account, type),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public getConditionById(
    type: string,
    id: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'conditions-getById'

    return this.http.get<Condition>(
      this.routes.ConditionsById(this.context.account, type, id),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public deleteConditionById(
    type: string,
    id: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'conditions-deleteById'

    return this.http.delete(
      this.routes.ConditionsById(this.context.account, type, id),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public saveCondition(
    type: string,
    condition: Record<string, any>,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'conditions-saveCondition'

    const requestMethod =
      'conditionId' in condition ? this.http.put : this.http.post

    return requestMethod<Condition>(
      this.routes.ConditionsByType(this.context.account, type),
      condition,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public doEvaluation(
    type: string,
    subject: Record<string, any>,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'conditions-doEvaluation'

    return this.http.post<EvaluationsResponse>(
      this.routes.ApplyConditions(this.context.account, type),
      subject,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  private get routes() {
    return {
      ApplyConditions: (an: string, type: string) =>
        `${this.routes.Conditions(an)}/${type}/evaluate`,
      ConditionsById: (an: string, type: string, id: string) =>
        `${this.routes.ConditionsByType(an, type)}/${id}`,
      ConditionsByType: (an: string, type: string) =>
        `${this.routes.Conditions(an)}/${type}/condition`,
      Conditions: (an: string) => `/${an}/conditions`,
    }
  }
}
