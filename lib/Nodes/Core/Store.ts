import Emitter from '../../Utils/Emitter'

const StoreEvents = [] as const

export default interface Store extends Emitter<(typeof StoreEvents)[any]> {}

export default class Store extends Emitter<(typeof StoreEvents)[any]> {
  initialized = false

  constructor() {
    super()
  }
}
