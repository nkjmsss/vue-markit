<template>
  <div>
    <h1>Basic example</h1>

    <no-ssr placeholder="Loading...">
      <vue-markit v-model="src" :options="options" />
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Codemirror from 'codemirror'

@Component
class Index extends Vue {
  src: string = 'foobar *text*'
  options: Codemirror.EditorConfiguration = {
    lineNumbers: false,
  }
}

export default Index
</script>
