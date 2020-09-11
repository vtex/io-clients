import { InstanceOptions, IOContext, RequestTracingConfig } from '@vtex/api'

import { createTracing } from '../utils/tracing'
import VtexCommerce from './vtexCommerce'

const catalogRouteEndpoint = (skuId: string) => `/pvt/stockkeepingunit/${skuId}`

export class Catalog extends VtexCommerce {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, 'catalog', {
      ...options,
      headers: {
        ...(ctx.authToken
          ? {
              VtexIdclientAutCookie: ctx.authToken,
            }
          : {}),
      },
    })
  }

  public getSkuById(skuId: string, tracingConfig?: RequestTracingConfig) {
    const metric = 'catalog-getSkuMetric'
    return this.http.get<OrderFormConfiguration>(catalogRouteEndpoint(skuId), {
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }
}
