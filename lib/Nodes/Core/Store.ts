import Emitter from '../../Utils/Emitter'

const StoreEvents = [] as const

interface NodeStore extends Store {}

export default class Store extends Emitter<(typeof StoreEvents)[any]>
  implements NodeStore {
  initialized = false

  constructor() {
    super()
  }
}
