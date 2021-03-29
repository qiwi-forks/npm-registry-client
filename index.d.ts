declare module '@qiwi/npm-registry-client' {
  import { ReadStream } from 'fs'
  type TAuth = { alwaysAuth?: boolean } & (
    {
      username: string
      password: string
      email?: string
    } | { token: string })

  type TPackage = {
    version: string
    message: string
  }

  type TCallback<T = any> = (error: any, data: T, raw: any, res: any) => void

  type TPackageMetadata = {
    name: string
    version: string
  }

  type TAccess = 'public' | 'restricted'

  class RegClient {
    deprecate(
      uri: string,
      params: TPackage & { auth: TAuth },
      cb: TCallback
    ): void

    get(
      uri: string,
      params: any,
      cb: TCallback
    ): void

    publish(
      uri: string,
      params: {
        metadata: TPackageMetadata
        access: TAccess
        auth: TAuth
        body: ReadStream
      },
      cb: TCallback
    ): void

    distTags: {
      fetch(
        uri: string,
        params: {
          package: string
          auth: TAuth
        },
        cb: TCallback<Record<string, string>>
      ): void

      add(
        uri: string,
        params: {
          package: string
          distTag: string
          version: string
          auth: TAuth
        },
        cb: TCallback<void>
      ): void

      set(
        uri: string,
        params: {
          package: string
          distTags: Record<string, string>
          auth: TAuth
        },
        cb: TCallback<void>
      ): void

      update(
        uri: string,
        params: {
          package: string
          distTags: Record<string, string>
          auth: TAuth
        },
        cb: TCallback<void>
      ): void

      rm(
        uri: string,
        params: {
          package: string
          distTag: string
          auth: TAuth
        },
        cb: TCallback<void>
      ): void
    }
  }
  export = RegClient
}
