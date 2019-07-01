import CodeMirror from 'codemirror'
import { EventName, CodeMirrorEventName, CustomEventName } from '../Events'

type CodeMirrorCallbackFn = (
  cmInstance: CodeMirror.EditorFromTextArea,
  ...args: any
) => any

type CustomCallbackFn = (...args: any) => any

export default class Emitter {
  callbacks: {
    [key in EventName]?: (CodeMirrorCallbackFn | CustomCallbackFn)[]
  } = {}

  // Add an event listener for given event
  on(event: CodeMirrorEventName, fn: CodeMirrorCallbackFn): this
  on(event: CustomEventName, fn: CustomCallbackFn): this
  on(
    event: CodeMirrorEventName | CustomEventName,
    fn: CodeMirrorCallbackFn | CustomCallbackFn
  ): this {
    this.callbacks[event] = [...(this.callbacks[event] || []), fn]

    return this
  }

  emit(
    event: CodeMirrorEventName,
    cminstance: CodeMirror.EditorFromTextArea,
    ...args: any
  ): this
  emit(event: CustomEventName, ...args: any): this
  emit(
    event: EventName,
    cminstance?: CodeMirror.EditorFromTextArea,
    ...args: any
  ): this {
    const callbacks = this.callbacks[event]

    if (callbacks) {
      callbacks.forEach(callback =>
        callback.apply(this, cminstance ? [cminstance, ...args] : args)
      )
    }

    return this
  }

  // Remove event listener for given event.
  // If fn is not provided, all event listeners for that event will be removed.
  // If neither is provided, all event listeners will be removed.
  off(): this
  off(event: CodeMirrorEventName, fn?: CodeMirrorCallbackFn): this
  off(event: CustomEventName, fn?: CustomCallbackFn): this
  off(event?: EventName, fn?: CodeMirrorCallbackFn | CustomCallbackFn): this {
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

export {
  CodeMirrorCallbackFn, //
  CustomCallbackFn,
}
