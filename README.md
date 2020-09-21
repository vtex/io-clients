<h1 align="center">
  VTEX Commerce Clients
</h1>
<h5 align="center">Collection of <i>ready-to-use</i> VTEX IO Clients to access Commerce APIs </h5>

This exports **Clients** and Typescript **typings** to help you connecting a VTEX IO application with VTEX Core Commerce modules.

## Available Clients

| **Client Name** | **Implemented Methods**                                     |
|-----------------|-------------------------------------------------------------|
| Affiliate       | `registerAffiliate`                                         |
| Catalog         | `getSkuById`                                                |
| Logistics       | `getDockById`, `pickupById`, `nearPickupPoints`, `shipping` |
| OMS             | `userLastOrder`, `order`                                    |



## How to use

1. Install this package on the `node/` folder of your VTEX IO app:
```
yarn add @vtex/clients
```
2. Import the individual Client on your app's Clients configuration (`node/clients/index.ts`):
```typescript
import { Catalog } from '@vtex/clients'
```
3. Add a new getter on the `Clients` class with the imported Client:
```typescript
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
```
4. Now, you can use the available client's on the app's _resolver functions_!
```typescript
ctx.clients.catalog.getSkuById(...)
```

For more information, read [How to use and create Clients on VTEX IO](https://www.notion.so/How-to-use-and-create-Clients-on-VTEX-IO-1dbd20c928c642d0ba059d5efbe7874b).


## Authorization

Every Client method should accept an option `authMethod` parameter that declares which token will be used on that HTTP call. By default, **the request will use the `authToken` of the app**.

Here are the available options for that parameter:
| **Option**  | **Description**                                  |
|-------------|--------------------------------------------------|
| AUTH_TOKEN  | Use the current app's token _(default)_          |
| STORE_TOKEN | Use the current authenticated store user's token |
| Logistics   | Use the current authenticated admin user's token |

## API Reference

To discover and learn more about VTEX Core Commerce APIs, read [VTEX Developer Portal](https://developers.vtex.com/reference).

## Contributing

Feel free to **submit new Clients** to this package, as long as they help to connect with VTEX Core Commerce APIs.