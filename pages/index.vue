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
import { EditorConfiguration } from 'vue-markit'
import sample from '~/assets/sample'

@Component
class Index extends Vue {
  src: string = sample
  options: EditorConfiguration = {
    // lineNumberFormatter: line => String(line),
    lineNumbers: true,
  }
}

export default Index
</script>
