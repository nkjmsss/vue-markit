import Emitter from '../../Utils/Emitter'

const Events = [
  'keydown', //
] as const

export default interface EventBus extends Emitter<(typeof Events)[any]> {
  on(event: 'keydown', fn: (e: KeyboardEvent) => void)
}

export default class EventBus extends Emitter<(typeof Events)[any]> {
  initialized = false

  constructor() {
    super()
  }
}
