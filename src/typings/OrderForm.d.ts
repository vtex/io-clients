interface OrderFormConfiguration {
  paymentConfiguration: PaymentConfiguration
  taxConfiguration: TaxConfiguration | null
  minimumQuantityAccumulatedForItems: number
  decimalDigitsPrecision: number
  minimumValueAccumulated: number
  apps: App[]
  allowMultipleDeliveries: boolean
  allowManualPrice: boolean
  maxNumberOfWhiteLabelSellers: number
  maskFirstPurchaseData: boolean
  recaptchaValidation: boolean
}

interface PaymentConfiguration {
  requiresAuthenticationForPreAuthorizedPaymentOption: boolean
  allowInstallmentsMerge: boolean
  blockPaymentSession: boolean
  paymentSystemToCheckFirstInstallment: boolean
}

interface TaxConfiguration {
  allowExecutionAfterErrors: boolean
  authorizationHeader: string
  integratedAuthentication: boolean
  url: string | null
}

interface App {
  fields: string[]
  id: string
  major: number
}
