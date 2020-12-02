import { RequestTracingConfig } from '@vtex/api'

export const createTracing = (
  metric: string,
  tracingConfig?: RequestTracingConfig
) => ({
  requestSpanNameSuffix: metric,
  ...tracingConfig?.tracing,
})
