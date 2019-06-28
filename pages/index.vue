<template>
  <div>
    <h1>Basic example</h1>

    <no-ssr placeholder="Loading...">
      <vue-markit />
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
class Index extends Vue {
  value: string = 'foobar *text* aaa'
}

export default Index
</script>
