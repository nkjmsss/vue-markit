import { Interpolation } from 'emotion'
import paragraph from './paragraph'

const base: Interpolation = {
  border: '1px solid #bbb', // FIXME
  outline: 'none',
  position: 'relative',
}

export default base

export {
  base, //
  paragraph,
}
