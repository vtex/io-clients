import { IOContext } from '@vtex/api'

import { AuthMethod } from '../typings/tokens'

export const getAuthToken = (ctx: IOContext, method: AuthMethod) => {
  switch (method) {
    case 'STORE_TOKEN':
      return ctx.storeUserAuthToken

    case 'ADMIN_TOKEN':
      return ctx.adminUserAuthToken

    case 'AUTH_TOKEN':
      return ctx.authToken

    default:
      return null
  }
}
