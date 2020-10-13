import { InstanceOptions, IOContext, JanusClient, RequestTracingConfig } from '@vtex/api'

import { getAuthToken } from '../utils/authToken'
import { AuthMethod } from '../typings/tokens'
import { createTracing } from '../utils/tracing'
import { OrderFormConfiguration } from '../typings/orderForm'

const baseURL = '/api/checkout'
const routes = {
  orderFormConfiguration: `${baseURL}/pvt/configuration/orderForm`,
  singleCustomData: (orderFormId: string, appId: string, appFieldName: string) =>
    `${baseURL}/pub/orderForm/${orderFormId}/customData/${appId}/${appFieldName}`,
}

export class Checkout extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getOrderFormConfiguration(authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'checkout-getOrderFormConfiguration'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<OrderFormConfiguration>(routes.orderFormConfiguration, {
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
    const metric = 'checkout-setOrderFormConfiguration'
    const token = getAuthToken(this.context, authMethod)

    return this.http.post(routes.orderFormConfiguration, body, {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  // eslint-disable-next-line max-params
  public setSingleCustomData(
    orderFormId: string,
    customData: SingleCustomData,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-setSingleCustomData'
    const token = getAuthToken(this.context, authMethod)

    const { appId, appFieldName, value } = customData

    return this.http.put(
      routes.singleCustomData(orderFormId, appId, appFieldName),
      { value },
      {
        headers: token
          ? {
              VtexIdclientAutCookie: token,
            }
          : {},
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }
}
