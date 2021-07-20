<h1 align="center">
  VTEX IO Clients
</h1>
<h5 align="center">Collection of <i>ready-to-use</i> VTEX IO Clients to access VTEX APIs</h5>

This exports **Clients**, **Client Factories** and Typescript **typings** to help you connecting a VTEX IO application with VTEX Core Commerce modules on Node.js services.

## Installing

```
yarn add @vtex/clients
```

## Available Clients

| **Client Name**    | **Implemented Methods**                                                                                                     | Observations                                                                                                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Affiliate          | `registerAffiliate`, `changeNotification`, `createSeller`, `getSellerList`                                                  | -                                                                                                                                                                                                   |
| Catalog            | `getProductsAndSkus`, `getSkuById`, `changeNotification`, `createSeller`, `getSellerList`, `getSellerById`, `getSkuContext`, `getCategoryById`, `getBrandById`                  | -                                                                                                                                                                                                   |
| Checkout           | `getOrderFormConfiguration`, `setOrderFormConfiguration`, `setSingleCustomData`                                             | -                                                                                                                                                                                                   |
| Logistics          | `getDockById`, `pickupById`, `listPickupPoints`, `nearPickupPoints`, `shipping`, `listInventoryBySku`                                             | -                                                                                                                                                                                                   |
| OMS                | `listOrders`, `userLastOrder`, `order`, `orderNotification`, `cancelOrder`                                                  | -                                                                                                                                                                                                   |
| OMS Proxy          | `orders`, `orderFormId`, `customData`, `register`                                                                           | You will have to declare a dependency and a policy on your app. You can check out [this document](https://www.notion.so/How-to-use-the-OMS-API-Proxy-application-e82f11ff896247c58a7e2e658d631516). |
| Rates and Benefits | `getAllBenefits`, `getPromotionById`, `createOrUpdatePromotion`, `createMultipleSkuPromotion`, `updateMultipleSkuPromotion` | Uses ADMIN_TOKEN as authMethod by default.                                                                                                                                                          |
| Suggestions        | `getAllSuggestions`, `getSuggestionById`, `sendSkuSuggestion`, `deleteSkuSuggestion`, `getAllVersions`, `getVersionById`    | -                                                                                                                                                                                                   |

## Available Factories

| **Factory** | **Implemented Methods**                                                  | Observations                             |
| ----------- | ------------------------------------------------------------------------ | ---------------------------------------- |
| Master Data | `get`, `save`, `update`, `saveOrUpdate`, `saveOrUpdatePartial`, `delete`, `search`, `searchRaw`, `scroll` | Use the `masterDataFor` helper function. |
| VBase       | `get`, `getRaw`, `getWithMetadata`, `save`, `trySaveIfhashMatches`       | Use the `vbaseFor` helper function.      |

---

> Note: Some of the methods might need some policies to be inserted on your application's `manifest.json` file.

## How to use

1. Install this package on the `node/` folder of your VTEX IO app:
   ```
   yarn add @vtex/clients
   ```

### Clients

1. Import the individual Client on your app's Clients configuration (`node/clients/index.ts`):
   ```typescript
   import { Catalog } from '@vtex/clients'
   ```
2. Add a new getter on the `Clients` class with the imported Client:
   ```typescript
     public get catalog() {
       return this.getOrSet('catalog', Catalog)
     }
   ```
3. Now, you can use the available client's on the app's _resolver functions_!
   ```typescript
   ctx.clients.catalog.getSkuById(...)
   ```

### Factories

1. Import the helper method for the Factory you want to use:

```typescript
  import { masterDataFor, vbaseFor } from '@vtex/clients
```

2. Following the instructions for each factory, use its method to create a Client class.

```typescript
const BooksClient = masterDataFor<MyBookType>('books')
const ContractsClient = vbaseFor<string, MyContractType>('contracts')

// Optional - Export the type to be able to use it as a type parameter
export type ContractsClient = InstanceType<typeof Contracts>
```

3. Add new getters on the `Clients` class with the created Client:

```typescript
  public get books() {
    return this.getOrSet('books', BooksClient)
  }

  public get contracts() {
    return this.getOrSet('contracts', ContractsClient)
  }
```

4. Now, you can use the client with the provided methods by the Factory on your app's resolvers.

```typescript
ctx.clients.books.save({ name: 'Example Book' })
ctx.clients.contracts.save('example-key', { id: 'example-id' })
```

For more information, read [How to use and create Clients on VTEX IO](https://www.notion.so/How-to-use-and-create-Clients-on-VTEX-IO-1dbd20c928c642d0ba059d5efbe7874b).

## Authorization

Every Client method should accept an option `authMethod` parameter that declares which token will be used on that HTTP call. By default, **the request will use the `authToken` of the app**.

Here are the available options for that parameter:
| **Option** | **Description** |
|-------------|--------------------------------------------------|
| AUTH_TOKEN | Use the current app's token _(default)_ |
| STORE_TOKEN | Use the current authenticated store user's token |
| ADMIN_TOKEN | Use the current authenticated admin user's token |

## API Reference

To discover and learn more about VTEX Core Commerce APIs, read [VTEX Developer Portal](https://developers.vtex.com/reference).

## Contributing

Feel free to **submit new Clients** to this package, as long as they help to connect with VTEX Core Commerce APIs.

## Releasing

We have a Github Action configured to **release the package on NPM for every Release tag** pushed into the repository. So, in order to have this project published:

1. Merge the Pull Request on the main branch, after having your changes approved.
2. Run `git checkout master && git pull` on your local repository.
3. Use the [releasy](https://www.npmjs.com/package/releasy) tool to push a new release (_e.g_: `releasy minor --stable`).
4. Check the result of the process on Github checking the status on the latest commit.
