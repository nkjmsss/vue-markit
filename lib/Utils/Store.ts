import Emitter from './Emitter'

export const StoreEvents = [
  'change', //
] as const

export type StoreEventsName = (typeof StoreEvents)[any]

export default interface Store extends Emitter<StoreEventsName> {
  emit(event: 'change', store: Store)
  emit(event: StoreEventsName, ...args: any)

  on(event: 'change', fn: (store: Store) => void)
  on(event: StoreEventsName, fn: (...args: any) => void)
}

export default class Store extends Emitter<StoreEventsName> {
  private store = {
    childNodes: [] as Node[],
  }

  constructor() {
    super()
  }

  public commit<T extends keyof Store['store']>(
    key: T,
    payload: Store['store'][T]
  ): void {
    this.store[key] = payload
    this.emit('change', this)
  }

  get childNodes(): Store['store']['childNodes'] {
    return this.store.childNodes
  }
}
