<h1 align="center">
  VTEX Commerce Clients
</h1>
<h5 align="center">Collection of <i>ready-to-use</i> VTEX IO Clients to access Commerce APIs </h5>

This exports **Clients** and Typescript **typings** to help you connecting a VTEX IO application with VTEX Core Commerce modules.

## Available Clients

| **Client Name** | **Implemented Methods**                                                         | Observations      |
|-----------------|---------------------------------------------------------------------------------| -                 |
| Affiliate       | `registerAffiliate`, `changeNotification`, `createSeller`, `getSellerList`      |                   |
| Catalog         | `getSkuById`                                                                    | -                 |
| Checkout        | `getOrderFormConfiguration`, `setOrderFormConfiguration`, `setSingleCustomData` | -                 |
| Logistics       | `getDockById`, `pickupById`, `nearPickupPoints`, `shipping`                     | -                 |
| OMS             | `userLastOrder`, `order`, `orderNotification`, `cancelOrder`                    | -                 |
| OMS Proxy       | `orders`, `orderFormId`, `customData`, `register`                               | You will have to declare a dependency and a policy on your app. You can check out [this document](https://www.notion.so/How-to-use-the-OMS-API-Proxy-application-e82f11ff896247c58a7e2e658d631516).
| Suggestions     | `getAllSuggestions`, `getSuggestionById`, `sendSkuSuggestion`, `deleteSkuSuggestion`, `getAllVersions`, `getVersionById`| -                 |

## Available Factories

| **Factory** | **Implemented Methods**                                                         | Observations      |
|-----------------|---------------------------------------------------------------------------------| -                 |
| Master Data       | `get`, `save`, `update`, `saveOrUpdate`, `delete`, `search`      | Use the `masterDataFor` helper function. |
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
    import { masterDataFor } from '@vtex/clients 
  ```
2. Following the instructions for each factory, use its method to create a Client class.
  ```typescript
    const BooksClient = masterDataFor<MyBookType>('books') 
  ```
3. Add a new getter on the `Clients` class with the created Client: 
  ```typescript
    public get books() {
      return this.getOrSet('books', BooksClient)
    }
  ```
4. Now, you can use the client with the provided methods by the Factory on your app's resolvers.
  ```typescript
    ctx.clients.books.save({ name: 'Example Book' })
  ```

For more information, read [How to use and create Clients on VTEX IO](https://www.notion.so/How-to-use-and-create-Clients-on-VTEX-IO-1dbd20c928c642d0ba059d5efbe7874b).


## Authorization

Every Client method should accept an option `authMethod` parameter that declares which token will be used on that HTTP call. By default, **the request will use the `authToken` of the app**.

Here are the available options for that parameter:
| **Option**  | **Description**                                  |
|-------------|--------------------------------------------------|
| AUTH_TOKEN  | Use the current app's token _(default)_          |
| STORE_TOKEN | Use the current authenticated store user's token |
| ADMIN_TOKEN   | Use the current authenticated admin user's token |

## API Reference

To discover and learn more about VTEX Core Commerce APIs, read [VTEX Developer Portal](https://developers.vtex.com/reference).

## Contributing

Feel free to **submit new Clients** to this package, as long as they help to connect with VTEX Core Commerce APIs.
