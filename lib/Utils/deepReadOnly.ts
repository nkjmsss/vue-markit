type Primitive = undefined | null | boolean | string | number | Function

export type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends Map<infer K, infer V>
  ? DeepReadonlyMap<K, V>
  : T extends object
  ? DeepReadonlyObject<T>
  : unknown

interface DeepReadonlyMap<K, V>
  extends ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> {}

type DeepReadonlyObject<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}

export default DeepReadonly
