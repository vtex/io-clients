import {
  JanusClient,
  IOContext,
  InstanceOptions,
  RequestTracingConfig,
} from '@vtex/api'

import { AuthMethod } from '..'
import {
  CalculatorConfiguration,
  GetAllBenefitsResponse,
  MultipleSkuPromotionCreateRequest,
  MultipleSkuPromotionUpdateRequest,
} from '../typings/ratesAndBenefits'
import { getRequestConfig, Headers } from '../utils/request'

const baseURL = '/api/rnb/pvt'
const csvContentType = 'text/csv'
const contentTypeHeader = 'Content-Type'
const calculatorNameHeader = 'X-VTEX-calculator-name'
const cumulativeHeader = 'X-VTEX-cumulative'
const clusterExpressionHeader = 'X-VTEX-cluster-expression'
const clusterOperatorHeader = 'X-VTEX-cluster-operator'
const startDateHeader = 'X-VTEX-start-date'
const endDateHeader = 'X-VTEX-end-date'
const defaultAuthMethod = 'ADMIN_TOKEN'

const routes = {
  getAllBenefits: `${baseURL}/benefits/calculatorconfiguration`,
  getPromotionById: (calculatorConfigurationId: string) =>
    `${baseURL}/calculatorconfiguration/${calculatorConfigurationId}`,
  createOrUpdatePromotion: `${baseURL}/calculatorconfiguration`,
  createMultipleSkuPromotion: `${baseURL}/import/calculatorConfiguration`,
  updateMultipleSkuPromotion: (calculatorConfigurationId: string) =>
    `${baseURL}/import/calculatorConfiguration/${calculatorConfigurationId}`,
}

export class RatesAndBenefits extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getAllBenefits(
    authMethod: AuthMethod = defaultAuthMethod,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'ratesAndBenefits-getAllBenefitsMetric'

    return this.http.get<GetAllBenefitsResponse>(
      routes.getAllBenefits,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public getPromotionById(
    calculatorConfigurationId: string,
    authMethod: AuthMethod = defaultAuthMethod,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'ratesAndBenefits-getPromotionByIdMetric'

    return this.http.get<CalculatorConfiguration>(
      routes.getPromotionById(calculatorConfigurationId),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public createOrUpdatePromotion(
    calculatorConfiguration: CalculatorConfiguration,
    authMethod: AuthMethod = defaultAuthMethod,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'ratesAndBenefits-createOrUpdatePromotionMetric'

    return this.http.post<CalculatorConfiguration>(
      routes.createOrUpdatePromotion,
      calculatorConfiguration,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public createMultipleSkuPromotion(
    request: MultipleSkuPromotionCreateRequest,
    authMethod: AuthMethod = defaultAuthMethod,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'ratesAndBenefits-createMultipleSkuPromotionMetric'
    const requestConfig = getRequestConfig(
      this.context,
      authMethod,
      metric,
      tracingConfig
    )

    const csv = this.mapCsvFromMultipleSkuPromotionRequest(request)

    this.setMultipleSkuPromotionHeaders(requestConfig.headers, request)

    return this.http.post(routes.createMultipleSkuPromotion, csv, requestConfig)
  }

  public updateMultipleSkuPromotion(
    request: MultipleSkuPromotionUpdateRequest,
    authMethod: AuthMethod = defaultAuthMethod,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'ratesAndBenefits-updateMultipleSkuPromotionMetric'
    const requestConfig = getRequestConfig(
      this.context,
      authMethod,
      metric,
      tracingConfig
    )

    const csv = this.mapCsvFromMultipleSkuPromotionRequest(request)

    this.setMultipleSkuPromotionHeaders(requestConfig.headers, request)

    return this.http.put(
      routes.updateMultipleSkuPromotion(request.idCalculatorConfiguration),
      csv,
      requestConfig
    )
  }

  private mapCsvFromMultipleSkuPromotionRequest(
    request: MultipleSkuPromotionCreateRequest
  ) {
    return ['sku,effect']
      .concat(request.effects.map((v) => `${v.sku},${v.effect}`))
      .join('\n')
  }

  private setMultipleSkuPromotionHeaders(
    headers: Headers,
    request: MultipleSkuPromotionCreateRequest
  ) {
    headers[calculatorNameHeader] = request.calculatorName
    headers[cumulativeHeader] = `${request.cumulative}`
    headers[clusterExpressionHeader] = request.clusterExpression.join(', ')
    headers[clusterOperatorHeader] = request.clusterOperator
    headers[startDateHeader] = request.startDate
    headers[endDateHeader] = request.endDate
    headers[contentTypeHeader] = csvContentType
  }
}
