import { MetadataItem } from './catalog'
import {
  CheckoutAssemblyItem,
  CheckoutAddress,
  CheckoutAttachmentOffering,
  AssemblyOptionInput,
} from './checkout'
import { PaymentData, LogisticsInfo } from './oms'

export interface OrderFormConfiguration {
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

export interface PaymentConfiguration {
  requiresAuthenticationForPreAuthorizedPaymentOption: boolean
  allowInstallmentsMerge: boolean
  blockPaymentSession: boolean
  paymentSystemToCheckFirstInstallment: boolean
}

export interface TaxConfiguration {
  allowExecutionAfterErrors: boolean
  authorizationHeader: string
  integratedAuthentication: boolean
  url: string | null
}

export interface App {
  fields: string[]
  id: string
  major: number
}

export interface OrderFormItem {
  id: string
  name: string
  detailUrl: string
  imageUrl: string
  productRefId: string
  skuName: string
  quantity: number
  uniqueId: string
  productId: string
  refId: string
  ean: string
  priceValidUntil: string
  price: number
  tax: number
  listPrice: number
  sellingPrice: number
  rewardValue: number
  isGift: boolean
  parentItemIndex: number | null
  parentAssemblyBinding: string | null
  productCategoryIds: string
  priceTags: string[]
  measurementUnit: string
  additionalInfo: {
    brandName: string
    brandId: string
    offeringInfo: any | null
    offeringType: any | null
    offeringTypeId: any | null
  }
  productCategories: Record<string, string>
  seller: string
  sellerChain: string[]
  availability: string
  unitMultiplier: number
  assemblies: CheckoutAssemblyItem[]
  attachmentOfferings: CheckoutAttachmentOffering[]
}

export interface OrderForm {
  orderFormId: string
  salesChannel: string
  loggedIn: boolean
  isCheckedIn: boolean
  storeId: string | null
  checkedInPickupPointId: string | null
  allowManualPrice: boolean
  canEditData: boolean
  userProfileId: string | null
  userType: string | null
  ignoreProfileData: boolean
  value: number
  messages: any[]
  items: OrderFormItem[]
  selectableGifts: any[]
  totalizers: Array<{ id: string; name: string; value: number }>
  shippingData: {
    address: CheckoutAddress
    logisticsInfo: LogisticsInfo[]
    selectedAddresses: CheckoutAddress[]
    availableAddresses: CheckoutAddress[]
    pickupPoints: Array<{
      friendlyName: string
      address: CheckoutAddress
      additionalInfo: string
      id: string
      businessHours: Array<{
        DayOfWeek: number
        OpeningTime: string
        ClosingTime: string
      }>
    }>
  }
  clientProfileData: any | null
  paymentData: PaymentData
  marketingData: OrderFormMarketingData | null
  sellers: Array<{
    id: string
    name: string
    logo: string
  }>
  clientPreferencesData: OrderFormClientPreferencesData
  commercialConditionData: any | null
  storePreferencesData: {
    countryCode: string
    saveUserData: boolean
    timeZone: string
    currencyCode: string
    currencyLocale: number
    currencySymbol: string
    currencyFormatInfo: {
      currencyDecimalDigits: number
      currencyDecimalSeparator: string
      currencyGroupSeparator: string
      currencyGroupSize: number
      startsWithCurrencySymbol: boolean
    }
  }
  giftRegistryData: any | null
  openTextField: any | null
  invoiceData: any | null
  customData: any | null
  itemMetadata: {
    items: MetadataItem[]
  }
  hooksData: any | null
  ratesAndBenefitsData: {
    rateAndBenefitsIdentifiers: any[]
    teaser: any[]
  }
  subscriptionData: any | null
  itemsOrdination: any | null
}

export interface SimulationOrderForm extends OrderForm {
  logisticsInfo?: LogisticsInfo[]
}

export interface OrderFormClientPreferencesData {
  locale: string
  optinNewsLetter: boolean | null
}

export interface OrderFormItemInput {
  id?: number
  index?: number
  quantity?: number
  seller?: string
  inputValues: Record<string, string>
  options?: AssemblyOptionInput[]
}

export interface OrderFormMarketingData {
  utmCampaign?: string
  utmMedium?: string
  utmSource?: string
  utmiCampaign?: string
  utmiPart?: string
  utmipage?: string
  marketingTags?: string | string[]
}
