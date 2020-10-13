interface SuggestionsResponse {
  Data: Suggestion[]
  Next: any
}

interface Suggestion {
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

interface Content {
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

interface Image {
  ImageUrl: string
  ImageName: string
}

interface ContentPricing {
  Currency: string
  CurrencySymbol: string
  SalePrice: number
}

interface Mapping {
  CategoryId?: string
  BrandId?: string
  CategoryName?: string
  DepartamentName?: string
  DepartmentId?: string
  BrandName?: string
}

interface DatumPricing {
  currency: string
  salePrice: number
  currencySymbol: string
}
