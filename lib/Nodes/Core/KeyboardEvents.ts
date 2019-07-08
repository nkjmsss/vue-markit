import { FunctionalNode } from '../Node'
import Store from '../../Store'
import {
  EventBus, //
} from '../../Utils'

export default class KeyboardEvents extends FunctionalNode {
  readonly functional = true

  constructor(target: HTMLElement, state: Store, eventbus: EventBus) {
    super(target, state, eventbus)

    this.emitEvents()
    this.registerEvents()
  }

  emitEvents(): void {
    this.target.addEventListener('keydown', e => {
      this.eventbus.emit('keydown', e)
    })

    this.target.addEventListener('keypress', e => {
      this.eventbus.emit('keypress', e)
    })

    this.target.addEventListener('keyup', e => {
      this.eventbus.emit('keyup', e)
    })
  }

  registerEvents(): void {
    this.eventbus.on('keyup', e => {
      this.state.commit('setChildNodes', Array.from(this.target.childNodes))
    })
  }
}
