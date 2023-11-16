export interface TokenGenerator {
  verify: () => Promise<boolean>
  generate: (subject: string, claims: Record<string, any>) => Promise<string>
}
