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
  private state = {
    childNodes: [] as Node[],
  }

  constructor() {
    super()
  }

  public commit<T extends keyof Store['state']>(
    key: T,
    payload: Store['state'][T]
  ): void {
    this.state[key] = payload
    this.emit('change', this)
  }

  get childNodes(): Store['state']['childNodes'] {
    return this.state.childNodes
  }
}
