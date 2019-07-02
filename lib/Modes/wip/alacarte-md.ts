import CodeMirror from 'codemirror'
import { ModeConfigurarion, State } from './types'

const modeName = 'alacarte-md'

CodeMirror.defineMode(modeName, function(
  cmCfg: CodeMirror.EditorConfiguration,
  modeCfg: ModeConfigurarion
): CodeMirror.Mode<State> {
  const mode: CodeMirror.Mode<State> = {
    token: function(stream, state) {
      // state.formatting = false
      if (stream.match(/#\w+/)) {
        return 'keyword'
      }
      stream.next()
      return null
    },
  }

  return mode
})

CodeMirror.defineMIME(`text/${modeName}`, modeName)
CodeMirror.defineMIME(`text-x/${modeName}`, modeName)
