import { Seller } from '../typings/catalog'

export const checkSellerInformation = (sellerInformation: Seller) => {
  const seller = {
    Description: '',
    ExchangeReturnPolicy: '',
    DeliveryPolicy: '',
    UserName: '',
    Password: '',
    SecurityPrivacyPolicy: '',
    CNPJ: '',
    ArchiveId: '',
    UrlLogo: '',
    IsActive: true,
    FulfillmentSellerId: '',
    SellerType: 1,
    IsBetterScope: false,
  }

  return {
    ...seller,
    ...sellerInformation,
  }
}
