import { GeneratorUUIDImpl } from '@/infra/uuid/generator-uuid-impl'

export const makeGeneratorUUID = () => new GeneratorUUIDImpl()
