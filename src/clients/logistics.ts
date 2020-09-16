import { RequestTracingConfig, JanusClient, IOContext, InstanceOptions } from '@vtex/api'

import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'

const routes = {
  docks: (dockId: string) => `pvt/configuration/docks/${dockId}`,
}

export class Logistics extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.authToken ? { VtexIdclientAutCookie: ctx.authToken } : null),
      },
    })
  }

  public getDockById(dockId: string, authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'logistics-getDockById'
    const token = getAuthToken(this.context, authMethod)
    return this.http.get(routes.docks(dockId), {
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
