import { buildSchemaService } from '../../../../../clients/masterData/services'

describe('buildSchemasService', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should be able to retrieve the schema for builder version 1', () => {
    const productionContext = { production: true, workspace: 'master' } as any
    const developmentContext = {
      production: false,
      workspace: 'workspacename',
    } as any

    const buildSchemasServiceParams = {
      app: {
        locator: 'vtex.app-name@1.1.1',
        name: 'app-name',
        version: '1.1.1',
      },
      dataEntityName: 'entity-name',
      masterdataClient: jest.fn() as any,
      schemaBuilderVersion: 1,
    }

    const schemaBuiltInProduction = buildSchemaService({
      ...buildSchemasServiceParams,
      context: productionContext,
    })

    const schemaBuiltInDevelopment = buildSchemaService({
      ...buildSchemasServiceParams,
      context: developmentContext,
    })

    expect(schemaBuiltInProduction()).toBe('1.1.1')
    expect(schemaBuiltInDevelopment()).toBe('1.1.1-workspacename')
  })

  it('should be able to retrieve the schema for builder version 2', async () => {
    const productionContext = { production: true, workspace: 'master' } as any
    const developmentContext = {
      production: false,
      workspace: 'workspacename',
    } as any

    const buildSchemasServiceParams = {
      app: {
        locator: 'vtex.app-name@1.1.1',
        name: 'app-name',
        version: '1.1.1',
      },
      dataEntityName: 'entity-name',
      masterdataClient: {
        getDocument: jest.fn().mockResolvedValue({
          associatedSchema: { name: '' },
        }),
      } as any,
      schemaBuilderVersion: 2,
    }

    const schemaBuiltInProduction = buildSchemaService({
      ...buildSchemasServiceParams,
      context: productionContext,
    })

    const schemaBuiltInDevelopment = buildSchemaService({
      ...buildSchemasServiceParams,
      context: developmentContext,
    })

    await schemaBuiltInProduction()
    await schemaBuiltInDevelopment()

    expect(
      buildSchemasServiceParams.masterdataClient.getDocument
    ).toBeCalledWith({
      dataEntity: 'vtex_builder_hub_appId_to_schema',
      fields: ['_all'],
      id: 'vtex_app_name_1_1_1_master_entity_name',
    })
    expect(
      buildSchemasServiceParams.masterdataClient.getDocument
    ).toBeCalledWith({
      dataEntity: 'vtex_builder_hub_appId_to_schema',
      fields: ['_all'],
      id: 'vtex_app_name_1_1_1_workspacename_entity_name',
    })
  })
})
