import { InstanceOptions, IOContext, JanusClient } from '@vtex/api'

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

  public testPackage() {
    return 'It works!'
  }
}
interface AffiliateInput {
  name: string
  id: string
  salesChannelId: string
  searchEndpoint: string
}
