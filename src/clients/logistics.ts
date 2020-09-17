import { RequestTracingConfig, JanusClient, IOContext, InstanceOptions } from '@vtex/api'

import { LogisticOutput, LogisticPickupPoint } from '../typings/Logistics'
import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'

export class Logistics extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getDockById(dockId: string, authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'logistics-getDockById'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get(this.routes.docks(dockId), {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  public pickupById(id: string, authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'logistics-pickupById'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<LogisticPickupPoint>(this.routes.pickUpById(id), {
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
  public nearPickupPoints(
    lat: string,
    long: string,
    maxDistance = 50,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-nearPickupPoints'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<LogisticOutput>(this.routes.nearPickupPoints(lat, long, maxDistance), {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  public shipping(authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'logistics-shipping'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<LogisticPickupPoint>(this.routes.shipping, {
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
    const baseURL = '/api/logistics'

    return {
      docks: (dockId: string) => `${baseURL}/pvt/configuration/docks/${dockId}`,
      shipping: `${baseURL}/pub/shipping/configuration`,
      nearPickupPoints: (lat: string, long: string, maxDistance: number) =>
        `${baseURL}/pvt/configuration/pickuppoints/_search?&page=1&pageSize=100&lat=${lat}&lon=${long}&maxDistance=${maxDistance}`,
      pickUpById: (id: string) => `${baseURL}/pvt/configuration/pickuppoints/${id}`,
    }
  }
}
