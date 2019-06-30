<template>
  <div>
    <h1>Basic example</h1>

    <no-ssr placeholder="Loading...">
      <vue-markit v-model="src" />
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
class Index extends Vue {
  src: string = 'foobar *text*'
}

export default Index
</script>
