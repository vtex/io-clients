export interface SuggestionsResponse {
  Data: Suggestion[]
  Next: any
}

export interface Suggestion {
  SellerId: string
  SellerName: string
  LatestVersionId: string
  AccountName: string
  AccountId: string
  ItemId: string
  Status: string
  Type: string
  Observation: any
  CreatedDate: Date
  LastModifiedDate: Date
  Content: Content
  Matches: any
  Mapping: Mapping
  AvailableQuantity: number
  Pricing: DatumPricing
}

export interface Content {
  ProductId: string
  ProductName: string
  NameComplete: string
  ProductDescription: string
  BrandName: string
  SkuName: string
  SellerId: string
  Height: number
  Width: number
  Length: number
  WeightKg: number
  Updated: boolean
  AvailableQuantity: number
  RefId: string
  SellerStockKeepingUnitId: string
  CategoryFullPath: string
  Images: Image[]
  ProductSpecifications: any[]
  SkuSpecifications: any[]
  RealHeight: number
  RealWidth: number
  RealLength: number
  RealWeight: number
  Pricing: ContentPricing
  Videos: any[]
  hookEndpoint: string
}

export interface Image {
  ImageUrl: string
  ImageName: string
}

export interface ContentPricing {
  Currency: string
  CurrencySymbol: string
  SalePrice: number
}

export interface Mapping {
  CategoryId?: string
  BrandId?: string
  CategoryName?: string
  DepartamentName?: string
  DepartmentId?: string
  BrandName?: string
}

export interface DatumPricing {
  currency: string
  salePrice: number
  currencySymbol: string
}

export interface SuggestionRequest {
  ProductName: string
  ProductDescription: string
  BrandName: string
  SkuName: string
  SellerId: string
  ListPrice: number
  Price: number
  Height: number
  Width: number
  Length: number
  WeightKg: number
  RefId: null
  EAN: string[]
  SellerStockKeepingUnitId: string
  Images: Image[]
  SkuSpecifications: Specification[]
  ProductSpecifications: Specification[]
  CategoryFullPath: string
}

export interface Specification {
  FieldName: string
  FieldValues: string[]
}
