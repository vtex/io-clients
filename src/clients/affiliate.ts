import { InstanceOptions, IOContext, JanusClient, RequestTracingConfig } from '@vtex/api'

import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'

const routes = {
  affiliate: (id: string) => `${routes.base()}/${id}`,
  base: () => `api/fulfillment/pvt/affiliates`,
}
export class Affiliate extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public registerAffiliate(
    { name, id, salesChannelId, searchEndpoint }: AffiliateInput,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'affiliate-registerAffiliate'
    const token = getAuthToken(this.context, authMethod)
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
interface AffiliateInput {
  name: string
  id: string
  salesChannelId: string
  searchEndpoint: string
}
