import { InstanceOptions, IOContext, JanusClient, RequestTracingConfig } from '@vtex/api'

import { OrderDetailResponse } from '../typings/oms'
import { OrderFormConfiguration } from '../typings/orderForm'
import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'
import { AuthMethod } from '../typings/tokens'

export class OMS extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public userLastOrder(authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'oms-userLastOrder'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<OrderFormConfiguration>(this.routes.lastOrder, {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  public order(id: string, authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'oms-order'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<OrderDetailResponse>(this.routes.order(id), {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  private get routes() {
    const baseURL = '/api/oms'

    return {
      lastOrder: `${baseURL}/user/orders/last`,
      order: (id: string) => `${baseURL}/pvt/orders/${id}`,
    }
  }
}
