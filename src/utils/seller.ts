export const checkSellerInformation = (sellerInformation: SellerInput) => {
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
