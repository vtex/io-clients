import { InstanceOptions, IOContext, JanusClient, RequestTracingConfig } from '@vtex/api'

import { createTracing } from '../utils/tracing'

const routes = {
  affiliate: (id: string) => `${routes.base()}/${id}`,
  base: () => `api/fulfillment/pvt/affiliates`,
}
export class Affiliate extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        VtexIdclientAutCookie: ctx.authToken,
        ...options?.headers,
      },
    })
  }

  public registerAffiliate(
    { name, id, salesChannelId, searchEndpoint }: AffiliateInput,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'affiliate-registerAffiliate'
    return this.http.put(
      routes.affiliate(id),
      {
        followUpEmail: 'mock@mock.com',
        id,
        name,
        salesChannel: salesChannelId,
        searchURIEndPoint: searchEndpoint,
        searchURIEndPointAvailableVersions: ['1.x.x'],
        searchURIEndPointVersion: '1.x.x',
        useSellerPaymentMethod: false,
      },
      {
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }
}
interface AffiliateInput {
  name: string
  id: string
  salesChannelId: string
  searchEndpoint: string
}
