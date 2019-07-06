import { cloneDeep, throttle } from 'lodash'
import { deepReadOnly } from '../Utils'
import Emitter from './Emitter'
import deepFreeze from './deepFreeze'

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
  private mutableState: {
    childNodes: Node[]
  } = {
    childNodes: [],
  }

  private immutableState: deepReadOnly<{}> = {}

  private cache: deepReadOnly<Store['mutableState'] & Store['immutableState']>

  constructor() {
    super()

    this.cache = this.makeCache()
    this.registerEvents()
  }

  public commit<T extends keyof Store['mutableState']>(
    key: T,
    payload: Store['mutableState'][T]
  ): void {
    this.mutableState[key] = payload
    this.emit('change', this)
  }

  get getState(): Store['cache'] {
    return this.cache
  }

  protected makeCache(): Store['cache'] {
    const state = cloneDeep(
      Object.assign(this.mutableState, this.immutableState)
    )
    return deepFreeze(state)
  }

  protected setCache = throttle((newState: Store) => {
    this.cache = newState.makeCache()
  }, 100) // TODO find good refresh rate

  protected registerEvents(): void {
    this.on('change', newState => {
      this.setCache(newState)
    })
  }
}
