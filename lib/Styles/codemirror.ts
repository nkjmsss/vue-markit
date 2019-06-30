import { injectGlobal } from 'emotion'

injectGlobal({
  '.CodeMirror': {
    fontSize: 16,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", YuGothic, "Yu Gothic Medium", "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
    // TODO remove wrapper & change height to auto
    height: '100%',
  },

  // gutters
  '.CodeMirror-gutters': {
    border: 'none',
    background: 'none',
  },
  '.CodeMirror-gutter-wrapper': {
    height: '100%',
  },
  '.CodeMirror-linenumber': {
    padding: '0 16px',
    textAlign: 'center',
    fontSize: '0.8em',
    color: '#bbb',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  // active line settings
  '.CodeMirror-activeline-background': {
    backgroundColor: '#eee',
  },
  '.CodeMirror-activeline-gutter': {
    backgroundColor: '#eee',
  },
})
