# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.19.5] - 2022-04-28

### Added

- "where" param to the Master Data scoll function

## [2.19.4] - 2022-02-08

### Fixed

- Condition by id route

## [2.19.3] - 2022-02-02

- Strong typing conditions response

## [2.19.2] - 2022-02-02

### Fixed

- Conditions evaluate route

## [2.19.1] - 2021-12-21

### Added

- Missing conditions export

## [2.19.0] - 2021-12-21

### Added

- conditions client

## [2.18.0] - 2021-12-10

## [2.17.0] - 2021-07-26

### Added

- saveOrUpdatePartial method on Master Data factory

## [2.15.2] - 2021-07-08
### Changed

- Fix `priceDefinition` field typo in the `OrderItemDetailResponse` interface

## [2.15.1] - 2021-07-08
### Changed

- Fix the response type for the `listInventoryBySku` method in the Logistics client

## [2.15.0] - 2021-07-08
### Added
- `getBrandById` method to the Catalog client
- `listInventoryBySku` method to the Logistics client

### Changed
- Added `from` and `to` query params to `getProductsAndSkus` in the Catalog client

## [2.14.0] - 2021-07-07
### Added
- `scroll` method to MD Factory client.
- `getSkuContext` and `getCategoryById` methods to Catalog client.

## [2.12.0] - 2021-05-11

## [2.11.2-beta] - 2021-05-10

## [2.11.1-beta] - 2021-05-10

### Changed

- Export MasterDataEntity abstract class

## [2.11.0] - 2021-05-04

## [2.10.0] - 2021-04-30

## [2.9.0] - 2021-04-30

### Added
- vbase Factory similar to how MD Factory works

### Fixed
- package.json repository.url entry

## [2.8.0] - 2021-03-17
### Added
- Method on MD Factory to search documents and also get pagination info

## [2.7.1] - 2021-03-05

### Fixed

- Catalog client GetSkuResponse `id` -> `Id` typo

## [2.7.0] - 2021-03-01

### Fixed
### Added
- Add method to get seller by id  in catalog client
## [2.6.0] - 2021-02-11
### Added
- Adding RatesAndBenefits Client (https://developers.vtex.com/vtex-developer-docs/reference/benefits)

## [2.5.3-beta] - 2021-02-08
### Fixed
- Removing wrong dependency
### Added
- Sort paramater to search method on MD Factory class
## [2.5.2-beta] - 2020-12-29

## [2.5.1-beta] - 2020-12-29

## [2.5.0-beta] - 2020-12-29

## [2.4.1] - 2020-12-28

## [2.4.0] - 2020-12-28
### Changed
- Using utils function to create the request config object

## [2.3.0] - 2020-12-28

## [2.2.0] - 2020-12-28

## [2.1.2] - 2020-12-22

## [2.1.2-beta] - 2020-12-22

## [2.1.1] - 2020-12-22

## [2.1.1-beta] - 2020-12-22

## [2.1.0] - 2020-12-07
### Fixed
- Response typing of Catalog method
### Added
- New methods to Catalog, OMS and Logistics clients

## [2.0.0] - 2020-12-03
### Fixed
- Removes mocked field on a Affiliate client's method

## [1.1.0] - 2020-12-02

## [1.0.4] - 2020-11-09
### Fixed
- Missing fields on typing used in OMS client 

## [1.0.3] - 2020-10-23
### Fixed
- Problems of typings' conflict with `@vtex/api` version. Added as peer dependency.

## [1.0.2] - 2020-10-23

## [1.0.1] - 2020-10-22

## [1.0.0] - 2020-10-22

## [0.2.2] - 2020-10-01
### Added
- OMS Proxy client

## [0.2.1] - 2020-09-28

## [0.2.0] - 2020-09-28
### Added
- Checkout client with Order Form configuration methods

## [0.1.1] - 2020-09-21

## [0.1.0-beta] - 2020-09-17

## [0.0.6-beta] - 2020-09-17

## [0.0.5-beta] - 2020-09-16
### Added
- Parameter to the clients' methods to choose which authorization token to use

## [0.0.4-beta] - 2020-08-20

## [0.0.3-beta] - 2020-08-20

## [0.0.2-beta] - 2020-08-20
