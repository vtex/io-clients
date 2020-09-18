import { InstanceOptions, IOContext, JanusClient, RequestTracingConfig } from '@vtex/api'

import { OrderFormConfiguration } from '../typings/orderForm'
import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'

const catalogRouteEndpoint = (skuId: string) => `/api/catalog/pvt/stockkeepingunit/${skuId}`

export class Catalog extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getSkuById(skuId: string, authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'catalog-getSkuMetric'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<OrderFormConfiguration>(catalogRouteEndpoint(skuId), {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }
}
