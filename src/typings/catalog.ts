export interface Seller {
  SellerId: string
  Name: string
  Email: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification: string
  ArchiveId?: string
  UrlLogo?: string
  ProductCommissionPercentage: number
  FreightCommissionPercentage: number
  FulfillmentEndpoint: string
  CatalogSystemEndpoint: string
  IsActive?: boolean
  FulfillmentSellerId?: string
  SellerType?: number
  IsBetterScope?: boolean
}

export interface Product {
  Id: number
  RefId: string
  Name: string
}

export interface ProductSpecification {
  Value: string[]
  Id: number
  Name: string
}

export interface SKU {
  Id: number
  Name: string
  RefId: string
}

export interface GetSkuResponse {
  id: number
  ProductId: number
  IsActive: boolean
  Name: string
  RefId: number
  PackagedHeight: number
  PackagedLength: number
  PackagedWidth: number
  PackagedWeightKg: number
  Height: number
  Length: number
  WeightKg: number
  Width: number
  CubicWeight: number
  IsKit: boolean
  CreationDate: string
  RewardValue: string
  EstimatedDateArrival: string
  ManufacturerCode: string
  CommercialConditionId: number
  MeasurementUnit: number
  UnitMultiplier: number
  ModalType: string
  KitItensSellApart: string
  Videos: string
}
