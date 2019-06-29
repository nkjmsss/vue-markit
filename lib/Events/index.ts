const codemirrorEvents = [
  'beforeChange',
  'beforeSelectionChange',
  'blur',
  'change',
  'changes',
  'contextmenu',
  'copy',
  'cursorActivity',
  'cut',
  'dblclick',
  'dragenter',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'focus',
  'gutterClick',
  'keydown',
  'keypress',
  'keyup',
  'mousedown',
  'overwriteToggle',
  'paste',
  'renderLine',
  'scroll',
  'touchstart',
  'update',
  'viewportChange',
] as const

const customEvents = [] as const

const Events = [...codemirrorEvents, ...customEvents] as const

type EventName = (typeof Events)[any]

export default Events

export {
  codemirrorEvents, //
  customEvents,
  EventName,
}
