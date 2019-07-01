const CodeMirrorEvents = [
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

const Events = [...CodeMirrorEvents, ...CustomEvents] as const

type EventName = (typeof Events)[any]
type CodeMirrorEventName = (typeof CodeMirrorEvents)[any]
type CustomEventName = (typeof CustomEvents)[any]

export default Events

export {
  CodeMirrorEvents, //
  CustomEvents,
  Events,
  CodeMirrorEventName,
  CustomEventName,
  EventName,
}
