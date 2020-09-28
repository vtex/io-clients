import { InstanceOptions, IOContext, JanusClient, RequestTracingConfig } from '@vtex/api'

import { getAuthToken } from '../utils/authToken'
import { AuthMethod } from '../typings/tokens'
import { createTracing } from '../utils/tracing'
import { OrderFormConfiguration } from '../typings/orderForm'

export class Checkout extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getOrderFormConfiguration(authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'checkout-getOrderFormConfiguration'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<OrderFormConfiguration>(this.routes.orderFormConfiguration, {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  public setOrderFormConfiguration(
    body: OrderFormConfiguration,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-setOrderForm'
    const token = getAuthToken(this.context, authMethod)

    return this.http.post(this.routes.orderFormConfiguration, body, {
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
    const baseURL = '/api/checkout'

    return {
      orderFormConfiguration: `${baseURL}/pvt/configuration/orderForm`,
    }
  }
}
