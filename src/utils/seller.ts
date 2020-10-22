import { Seller } from '../typings/catalog'

export const checkSellerInformation = (sellerInformation: Seller) => {
  const seller = {
    Description: '',
    ExchangeReturnPolicy: '',
    DeliveryPolicy: '',
    UserName: '',
    Password: '',
    SecutityPrivacyPolicy: '',
    CNPJ: '',
    ArchiveId: '',
    UrlLogo: '',
    IsActive: true,
    FulfillmentSellerId: '',
    SellerType: 1,
    IsBetterScope: false,
    MerchantName: '',
  }

  return {
    ...seller,
    ...sellerInformation,
  }
}
