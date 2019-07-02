const Events = [
  'optionChange', //
] as const

type EventName = (typeof Events)[any]

export default Events

export {
  Events, //
  EventName,
}
