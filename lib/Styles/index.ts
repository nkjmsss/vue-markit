import { css } from 'emotion'
import paragraph from './paragraph'

export default css({
  border: '1px solid #bbb', // FIXME
  outline: 'none',
  position: 'relative',

  '&[data-placeholder-active=true]::before': {
    content: 'attr(data-placeholder)',
    color: '#aaa',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  p: paragraph,
})
