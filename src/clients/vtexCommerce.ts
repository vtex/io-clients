import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class VtexCommerce extends ExternalClient {
  constructor(ctx: IOContext, baseRoute: string, options?: InstanceOptions) {
    super(`http://api.vtex.com/api/${baseRoute}`, ctx, {
      ...options,
      headers: {
        VtexIdclientAutCookie: ctx.authToken,
        ...options?.headers,
      },
      params: {
        an: ctx.account,
        ...options?.params,
      },
    })
  }
}
