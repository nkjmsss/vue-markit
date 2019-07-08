import Emitter from './Emitter'

export type EventBusEvents = {
  keydown: [KeyboardEvent]
  keypress: [KeyboardEvent]
  keyup: [KeyboardEvent]
}

export default class EventBus extends Emitter<EventBusEvents> {
  constructor() {
    super()
  }
}
