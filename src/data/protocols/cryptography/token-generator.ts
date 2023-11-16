export interface TokenGenerator {
  verify: (chiphertext: string, secretKey: string) => Promise<boolean>
  encrypt: (
    secretKey: string,
    durationInSeconds: number,
    claims: Record<string, any>,
  ) => Promise<string>
  decrypt: (chiphertext: string) => Promise<Record<string, any> | null>
}
