import { Interpolation } from 'emotion'
import Emitter from '../Utils/Emitter'
import Store from './Core/Store'
import EventBus from './Core/EventBus'

const storeInstance = new Store()
const eventbusInstance = new EventBus()

const NodeEvents = [] as const

export default interface Node extends Emitter<(typeof NodeEvents)[any]> {}

export default class Node extends Emitter<(typeof NodeEvents)[any]> {
  readonly target: HTMLElement
  readonly type: 'block' | 'inline'
  readonly name: string
  readonly state = storeInstance
  readonly eventbus = eventbusInstance
  styles: Interpolation = {}

  constructor(target: HTMLElement, type: 'block' | 'inline', name: string) {
    super()

    this.target = target
    this.type = type
    this.name = name

    this.initEventBus()
    this.initStore()
  }

  protected initEventBus(): void {
    if (!this.eventbus.initialized) {
      this.eventbus.initialized = true

      this.target.addEventListener('keydown', e => {
        this.eventbus.emit('keydown', e)
      })
    }
  }

  protected initStore(): void {
    if (!this.state.initialized) {
      this.state.initialized = true

      // do some staff
      // ex) register some events
    }
  }
}
