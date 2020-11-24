declare global {
  type Maybe<T> = T | undefined | null

  namespace NodeJS {
    interface ProcessEnv {
      VTEX_APP_ID: string
      NODE_ENV: 'development' | 'production'
      [key: string]: Maybe<string>
    }
  }
}

export {}
