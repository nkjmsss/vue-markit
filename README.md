# vue-markit

Awesome WYSIWIG markdown editor for vue !!! (WIP)

## Usage

### with SSR

#### as a plugin

```javascript
// vue-markit.client.js

import Vue from 'vue'
import VueMarkit from 'vue-markit'

Vue.use(VueMarkit)
```

```javascript
// nuxt.config.js

plugins: [
  '~/plugins/vue-markit.client.js',

  // or
  {
    src: '~/plugins/vue-markit.client.js',
    mode: 'client',
  },

  // if you are using Nuxt 2.3 or older
  // but this will be deprecated soon
  {
    src: '~/plugins/vue-markit.client.js',
    ssr: false,
  },
],
```

```html
<!-- in each component -->

<template>
  <div>
    <no-ssr placeholder="Loading...">
      <vue-markit v-model="src" />
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
class Example extends Vue {
  src: string = 'foobar'
}

export default Example
</script>
```

#### load locally

```html
<template>
  <div>
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
```

**help wanted**

 If you load the component this way, typeof `VueMarkitLocal` is `any`. Also, if you do like below, `Variable 'VueMarkitLocal' is used before being assigned.` error occurs.

```typescript
import { Component, Vue } from 'vue-property-decorator'
import { VueMarkitType } from 'vue-markit'
let VueMarkitLocal: VueMarkitType 
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
```

### without SSR

It makes things much more simple. You don't need `<no-ssr>` component or like that.

#### as a plugin

You don't need `mode: client` option.

#### load locally

```html
<template>
  <div>
    <vue-markit-local />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VueMarkit as VueMarkitLocal } from 'vue-markit'

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
```

## Build Setup

``` bash
# install dependencies
$ make init

# serve with hot reload at localhost:3000
$ make dev
```
