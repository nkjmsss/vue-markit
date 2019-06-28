<template>
  <div>
    <h1>Local import example</h1>

    <no-ssr placeholder="Loading...">
      <vue-markit-local />
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
let VueMarkitLocal
if (process.browser) {
  VueMarkitLocal = require('vue-markit').VueMarkit
}

@Component({
  components: {
    VueMarkitLocal,
  },
})
class LocalImport extends Vue {
  value: string = 'foobar *text* aaa'
}

export default LocalImport
</script>
