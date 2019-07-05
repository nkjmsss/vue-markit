import { FunctionalNode } from '../Node'
import {
  Store, //
  EventBus,
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
  }

  registerEvents(): void {
    this.eventbus.on('keydown', this.handleKeyDown.bind(this))
  }

  handleKeyDown(e: KeyboardEvent): void {
    this.state.commit('childNodes', Array.from(this.target.childNodes))
  }
}
