import { ExternalClient, InstanceOptions, IOContext, RequestTracingConfig } from '@vtex/api'

import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'
import { AuthMethod } from '../typings/tokens'

export class Suggestions extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`https://api.vtex.com/${ctx.account}/suggestions/`, ctx, {
      ...options,
    })
  }

  public getAllSuggestions(authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'suggestions-getAllSuggestions'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<SuggestionsResponse>('', {
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
  public getSuggestionById(
    sellerId: string,
    sellerSkuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-getSuggestionById'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<Suggestion>(this.routes.sellerSkuId(sellerId, sellerSkuId), {
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
  public sendSkuSuggestion(
    sellerId: string,
    sellerSkuId: string,
    body: Suggestion,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-sendSkuSuggestion'
    const token = getAuthToken(this.context, authMethod)

    return this.http.put(this.routes.sellerSkuId(sellerId, sellerSkuId), body, {
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
  public deleteSkuSuggestion(
    sellerId: string,
    sellerSkuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-deleteSkuSuggestion'
    const token = getAuthToken(this.context, authMethod)

    return this.http.delete(this.routes.sellerSkuId(sellerId, sellerSkuId), {
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
  public getAllVersions(
    sellerId: string,
    sellerSkuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-deleteSkuSuggestion'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get(this.routes.versions(sellerId, sellerSkuId), {
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
  public getVersionById(
    sellerId: string,
    sellerSkuId: string,
    version: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-deleteSkuSuggestion'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get(this.routes.versionById(sellerId, sellerSkuId, version), {
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
    return {
      sellerSkuId: (sellerId: string, sellerSkuId: string) => `/${sellerId}/${sellerSkuId}`,
      versions: (sellerId: string, sellerSkuId: string) => `/${sellerId}/${sellerSkuId}/versions`,
      versionById: (sellerId: string, sellerSkuId: string, version: string) =>
        `/${sellerId}/${sellerSkuId}/versions/${version}`,
    }
  }
}
