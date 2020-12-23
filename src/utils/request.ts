import { IOContext, RequestTracingConfig } from '@vtex/api'

import { AuthMethod } from '../typings'
import { getAuthToken } from './authToken'
import { createTracing } from './tracing'

export const getRequestConfig = (
  context: IOContext,
  authMethod: AuthMethod,
  metric: string,
  tracingConfig?: RequestTracingConfig
  // eslint-disable-next-line max-params
) => {
  const token = getAuthToken(context, authMethod)

  return {
    headers: token
      ? {
          VtexIdclientAutCookie: token,
        }
      : {},
    metric,
    tracing: createTracing(metric, tracingConfig),
  }
}
