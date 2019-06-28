<template>
  <div>
    index page
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
