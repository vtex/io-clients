/* eslint-disable max-params */
import { Condition, ListConditionsResponse } from './../typings/conditions';

import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { getRequestConfig } from '../utils/request'
import type { AuthMethod } from '../typings'

export class ConditionsClient extends JanusClient {
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
    const metric = 'conditions-getById'

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
      this.routes.ConditionsById(this.context.account, type, id),
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

    return this.http.post(
      this.routes.ApplyConditions(this.context.account, type),
      subject,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  private get routes() {
    return {
      ApplyConditions: (an: string, type: string) =>
        `${this.routes.Conditions(an)}/evaluate/${type}`,
      ConditionsById: (an: string, type: string, id: string) =>
        `${this.routes.ConditionsByType(an, type)}/condition/${id}`,
      ConditionsByType: (an: string, type: string) =>
        `${this.routes.Conditions(an)}/${type}/condition`,
      Conditions: (an: string) => `/${an}/conditions`,
    }
  }
}
