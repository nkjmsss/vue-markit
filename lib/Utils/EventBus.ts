import Emitter from './Emitter'

export const Events = [
  'keydown', //
  'keypress',
  'keyup',
] as const

export type EventsName = (typeof Events)[any]

export default interface EventBus extends Emitter<EventsName> {
  on(event: 'keydown', fn: (e: KeyboardEvent) => void)
  on(event: 'keypress', fn: (e: KeyboardEvent) => void)
  on(event: 'keyup', fn: (e: KeyboardEvent) => void)

  emit(event: 'keydown', e: KeyboardEvent)
  emit(event: 'keypress', e: KeyboardEvent)
  emit(event: 'keyup', e: KeyboardEvent)
}

export default class EventBus extends Emitter<EventsName> {
  constructor() {
    super()
  }
}
