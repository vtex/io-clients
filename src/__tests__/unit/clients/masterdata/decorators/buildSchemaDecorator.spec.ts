import { buildSchemaDecorator } from '../../../../../clients/masterData/decorators/buildSchemaDecorator'
import * as service from '../../../../../clients/masterData/services/CreateEntityConfigurationService'

class MockMasterdataEntity {
  public schema: string
  constructor() {
    this.schema = `1.1.1`
  }
  public async mockedGetDocument() {
    new Promise((resolve) => resolve)
  }

  public syncFunction() {
    return 1
  }
}

describe('CreateEntityConfigurationService', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should be able to change async methods and change schema', async () => {
    jest
      .spyOn(service.CreateEntityConfigurationService, 'getInstance')
      .mockImplementation(
        jest.fn().mockReturnValue({
          getSchema: jest.fn().mockResolvedValue('0.4.0'),
        })
      )

    const mockMasterdataEntityBeforeDecorator = new MockMasterdataEntity()
    await mockMasterdataEntityBeforeDecorator.mockedGetDocument()
    expect(mockMasterdataEntityBeforeDecorator.schema).toBe('1.1.1')

    buildSchemaDecorator(MockMasterdataEntity as any)
    const mockMasterdataEntity = new MockMasterdataEntity()
    mockMasterdataEntity.syncFunction()
    expect(mockMasterdataEntity.schema).toBe('1.1.1')

    await mockMasterdataEntity.mockedGetDocument()
    expect(mockMasterdataEntity.schema).toBe('0.4.0')
  })
})
