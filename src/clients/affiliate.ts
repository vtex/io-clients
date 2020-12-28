import {
  InstanceOptions,
  IOContext,
  JanusClient,
  RequestTracingConfig,
} from '@vtex/api'

import { AuthMethod } from '../typings/tokens'
import { AffiliateInput } from '../typings/affiliate'
import { getRequestConfig } from '../utils/request'

const baseURL = 'api/fulfillment/pvt/affiliates'
const routes = {
  affiliate: (id: string) => `${baseURL}/${id}`,
}

export class Affiliate extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public registerAffiliate(
    { name, id, salesChannelId, searchEndpoint, followUpEmail }: AffiliateInput,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'affiliate-registerAffiliate'

    return this.http.put(
      routes.affiliate(id),
      {
        followUpEmail,
        id,
        name,
        salesChannel: salesChannelId,
        searchURIEndPoint: searchEndpoint,
        searchURIEndPointAvailableVersions: ['1.x.x'],
        searchURIEndPointVersion: '1.x.x',
        useSellerPaymentMethod: false,
      },
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }
}
