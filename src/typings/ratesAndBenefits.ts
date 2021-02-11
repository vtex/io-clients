export interface MultipleSkuPromotionUpdateRequest
  extends MultipleSkuPromotionCreateRequest {
  idCalculatorConfiguration: string
}

export interface MultipleSkuPromotionCreateRequest {
  calculatorName: string
  cumulative: boolean
  clusterExpression: string[]
  clusterOperator: string
  startDate: string
  endDate: string
  effects: MultipleSkuPromotionEffectConfiguration[]
}

export interface MultipleSkuPromotionEffectConfiguration {
  sku: string
  effect: number
}

export interface ComponentRepresentation {
  allProducts: boolean
  operator: string
  statements: string
}

export interface Scope {
  componentRepresentation: ComponentRepresentation
}

export interface Metadata {
  scope: Scope
}

export interface GiftDefinition {
  quantitySelectable: number
}

export interface Gift {
  id: string
  name: string
  quantity: number
  sellers: GiftSeller[]
}

export interface GiftSeller {
  id: string
  name: string
}

export interface CalculatorConfiguration {
  idCalculatorConfiguration?: string
  name: string
  beginDateUtc: string
  endDateUtc: string
  lastModified: string
  daysAgoOfPurchases: number
  isActive: boolean
  isArchived: boolean
  isFeatured: boolean
  activeDaysOfWeek: string[]
  offset: number
  activateGiftsMultiplier: boolean
  newOffset: number
  cumulative: boolean
  metadata: Metadata
  effectType: string
  discountType: string
  nominalShippingDiscountValue: number
  absoluteShippingDiscountValue: number
  nominalDiscountValue: number
  maximumUnitPriceDiscount: number
  percentualDiscountValue: number
  rebatePercentualDiscountValue: number
  percentualShippingDiscountValue: number
  percentualTax: number
  shippingPercentualTax: number
  percentualDiscountValueList1: number
  percentualDiscountValueList2: number
  skusGift: GiftDefinition
  nominalRewardValue: number
  percentualRewardValue: number
  orderStatusRewardValue: string
  maxNumberOfAffectedItems: number
  maxNumberOfAffectedItemsGroupKey: string
  applyToAllShippings: boolean
  nominalTax: number
  origin: string
  idSellerIsInclusive: boolean
  idsSalesChannel: string[]
  areSalesChannelIdsExclusive: boolean
  marketingTags: string[]
  marketingTagsAreNotInclusive: boolean
  paymentsMethods: string[]
  stores: string[]
  campaigns: string[]
  conditionsIds: string[]
  storesAreInclusive: boolean
  categories: string[]
  categoriesAreInclusive: boolean
  brands: string[]
  brandsAreInclusive: boolean
  products: string[]
  productsAreInclusive: boolean
  skusAreInclusive: boolean
  utmCampaign: string
  collections1BuyTogether: string[]
  minimumQuantityBuyTogether: number
  quantityToAffectBuyTogether: number
  enableBuyTogetherPerSku: boolean
  listSku1BuyTogether: string[]
  listSku2BuyTogether: string[]
  totalValueFloor: number
  totalValueCeling: number
  totalValueIncludeAllItems: boolean
  totalValueMode: string
  collections: string[]
  collectionsIsInclusive: boolean
  restrictionsBins: string[]
  totalValuePurchase: number
  slasIds: string[]
  isSlaSelected: boolean
  isFirstBuy: boolean
  firstBuyIsProfileOptimistic: boolean
  compareListPriceAndPrice: boolean
  isDifferentListPriceAndPrice: boolean
  zipCodeRanges: string[]
  itemMaxPrice: number
  itemMinPrice: number
  installment: number
  isMinMaxInstallments: boolean
  minInstallment: number
  maxInstallment: number
  clusterExpressions: string[]
  giftListTypes: string[]
  affiliates: string[]
  maxUsage: number
  maxUsagePerClient: number
  multipleUsePerClient: boolean
  accumulateWithManualPrice: boolean
  type: string
}

export interface GetAllBenefitsResponseConfigurationLimit {
  activesCount: number
  limit: number
}

export interface GetAllBenefitsResponseScope {
  allCatalog: boolean
  skus: number
  skusAreInclusive: boolean
  products: number
  productsAreInclusive: boolean
  collections: number
  collectionsAreInclusive: boolean
  categories: number
  categoriesAreInclusive: boolean
  brands: number
  brandsAreInclusive: boolean
  sellers: number
  sellersAreInclusive: boolean
}

export interface GetAllBenefitsResponseItem {
  idCalculatorConfiguration: string
  lastModifiedUtc: string
  name: string
  beginDate: string
  isActive: boolean
  description: string
  type: string
  utmSource: string
  utmCampain: string
  utmiCampaign: string
  status: string
  percentualTax: number
  isArchived: boolean
  hasMaxPricePerItem: boolean
  isTax: boolean
  Campaigns: string[]
  conditionsIds: string[]
  activateGiftsMultiplier: boolean
  effectType: string
  scope: GetAllBenefitsResponseScope
  maxUsage: number
  idsSalesChannel: string[]
  areSalesChannelIdsExclusive: boolean
}

export interface GetAllBenefitsResponse {
  limitConfigurationMaxPrice: GetAllBenefitsResponseConfigurationLimit
  limitConfiguration: GetAllBenefitsResponseConfigurationLimit
  items: GetAllBenefitsResponseItem[]
  disabledItems: GetAllBenefitsResponseItem[]
  archivedItems: GetAllBenefitsResponseItem[]
}
