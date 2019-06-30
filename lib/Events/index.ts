const CodemirrorEvents = [
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

const CustomEvents = [
  'optionChange', //
] as const

const Events = [...CodemirrorEvents, ...CustomEvents] as const

type EventName = (typeof Events)[any]
type CodemirrorEventName = (typeof CodemirrorEvents)[any]
type CustomEventName = (typeof CustomEvents)[any]

export default Events

export {
  CodemirrorEvents, //
  CustomEvents,
  Events,
  CodemirrorEventName,
  CustomEventName,
  EventName,
}
