import { CreateEntityConfigurationService } from '../../../../../clients/masterData/services'

describe('CreateEntityConfigurationService', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should throw error when trying to get inexistent instance', async () => {
    expect(() => {
      CreateEntityConfigurationService.getInstance()
    }).toThrowError(
      'No instance of CreateEntityConfigurationService was instantiated'
    )
  })

  it('should be able to set instance', () => {
    const mockedBuildSchemaService = jest.fn()

    CreateEntityConfigurationService.setInstance({
      buildSchemaService: mockedBuildSchemaService as any,
      builderMajor: 1,
      entityName: 'entityName',
      providerAppId: 'vtex.app-name@1.1.1',
    })

    const { getEntityDetails, getSchema } =
      CreateEntityConfigurationService.getInstance()

    expect(getEntityDetails).not.toBeUndefined()
    expect(getSchema).not.toBeUndefined()
  })

  it('should be able to call buildSchemaService and execute schema', async () => {
    const schemaBuilt = jest.fn().mockReturnValue('1.1.2')
    const mockedBuildSchemaService = jest.fn().mockReturnValue(schemaBuilt)

    CreateEntityConfigurationService.setInstance({
      buildSchemaService: mockedBuildSchemaService as any,
      builderMajor: 2,
      entityName: 'entityName',
      providerAppId: 'vtex.app-name@1.1.1',
    })

    const createEntityConfigurationService =
      CreateEntityConfigurationService.getInstance()
    const schema = await createEntityConfigurationService.getSchema(
      jest.fn(),
      {} as any
    )
    expect(schema).toBe('1.1.2')
  })

  it('should be able to return entityName and app', async () => {
    const schemaBuilt = jest.fn().mockReturnValue('1.1.2')
    const mockedBuildSchemaService = jest.fn().mockReturnValue(schemaBuilt)

    CreateEntityConfigurationService.setInstance({
      buildSchemaService: mockedBuildSchemaService as any,
      builderMajor: 2,
      entityName: 'entityName',
      providerAppId: 'vtex.app-name@1.1.1',
    })

    const createEntityConfigurationService =
      CreateEntityConfigurationService.getInstance()
    const { app, entityName } =
      createEntityConfigurationService.getEntityDetails()
    expect(app).toMatchObject({
      build: undefined,
      locator: 'vtex.app-name@1.1.1',
      name: 'vtex.app-name',
      version: '1.1.1',
    })
    expect(entityName).toBe('vtex_app_name_entityName')
  })
})
