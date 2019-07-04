import Emitter from '../../Utils/Emitter'

const StoreEvents = [
  'keydown', //
] as const

type StoreEventsName = (typeof StoreEvents)[any]

export default class Store extends Emitter<StoreEventsName> {
  initialized = false

  constructor() {
    super()
  }
}
