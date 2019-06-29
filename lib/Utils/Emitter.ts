import Codemirror from 'codemirror'
import { EventName } from '../Events'
type callbackFn = (
  cmInstance: Codemirror.EditorFromTextArea,
  ...args: any
) => any

export default class Emitter {
  callbacks: {
    [key in EventName]?: callbackFn[]
  } = {}

  // Add an event listener for given event
  on(event: EventName, fn: callbackFn) {
    this.callbacks[event] = [...(this.callbacks[event] || []), fn]

    return this
  }

  emit(
    event: EventName,
    cminstance: Codemirror.EditorFromTextArea,
    ...args: any
  ) {
    const callbacks = this.callbacks[event]

    if (callbacks) {
      callbacks.forEach(callback => callback.apply(this, [cminstance, ...args]))
    }

    return this
  }

  // Remove event listener for given event.
  // If fn is not provided, all event listeners for that event will be removed.
  // If neither is provided, all event listeners will be removed.
  off(event?: EventName, fn?: callbackFn) {
    if (!event) {
      this.callbacks = {}
    } else {
      // event listeners for the given event
      const callbacks = this.callbacks ? this.callbacks[event] : null
      if (callbacks) {
        if (fn) {
          this.callbacks[event] = callbacks.filter(cb => cb !== fn) // remove specific handler
        } else {
          delete this.callbacks[event] // remove all handlers
        }
      }
    }

    return this
  }
}
