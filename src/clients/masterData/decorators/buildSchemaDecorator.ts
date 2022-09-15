import { MasterData } from '@vtex/api'

import type { MasterDataEntityV1 } from '../MasterDataEntity/MasterDataEntityV1'
import { CreateEntityConfigurationService } from '../services'

export function buildSchemaDecorator(target: typeof MasterDataEntityV1): void {
  for (const propertyName of Object.keys(
    Object.getOwnPropertyDescriptors(target.prototype)
  )) {
    const classPropertyOrMethod =
      Object.getOwnPropertyDescriptor(target.prototype, propertyName) ?? {}

    const isMethod = classPropertyOrMethod?.value instanceof Function

    if (!isMethod) {
      continue
    }

    if (propertyName === 'constructor') {
      continue
    }

    const classMethod: PropertyDescriptor = classPropertyOrMethod
    const originalMethod = classPropertyOrMethod?.value
    const isMethodPromise =
      'AsyncFunction' ===
      Object.getPrototypeOf(originalMethod).constructor.name.toString()

    if (isMethodPromise) {
      classMethod.value = async function (...args: any[]): Promise<any> {
        const entityConfiguration =
          CreateEntityConfigurationService.getInstance()

        const context = Object.getOwnPropertyDescriptor(this, 'context')

        const schema = await entityConfiguration.getSchema(
          MasterData,
          context?.value
        )

        Object.defineProperty(this, 'schema', {
          value: schema,
          writable: true,
          enumerable: true,
          configurable: true,
        })

        const result = await originalMethod.apply(this, args)

        return result
      }

      Object.defineProperty(target.prototype, propertyName, classMethod)
    }
  }
}
