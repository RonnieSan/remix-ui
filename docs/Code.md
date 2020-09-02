# rCode
The `rCode` component is a wrapper around the Ace Editor library.

## Value
* **STRING** - The `v-model` accepts a string.

## Props
* **settings** : OBJECT - An object containing option settings for the Ace Editor instance. Any [options from Ace Editor](https://ace.c9.io/#nav=api) can be passed in.
* **settings.mode** : STRING - The name of the mode/language you want to use in the editor. You will need to import the code from the `brace/mode` NPM package folder (see below).
* **settings.theme** : STRING - The name of the theme you want to use to color the code. You will need to import the code from the `brace/theme` NPM package folder (see below).
* **max-height** : STRING - The maximum height as a string to allow the editor to grow to.

## Usage
```vue
<template>
  <div>
    <!-- BASIC USAGE -->
    <r-code
      v-model="code_editor_value"
      :settings="code_editor_options"
      max-height="600px"
    />
  </div>
</template>

<script>
import 'brace/mode/python';
import 'brace/theme/cobalt';

export default {
  data() {
    return {
      code_editor_value : '{"hello" : "world"}',
      code_editor_options : {
        mode : 'python',
        theme : 'cobalt'
      }
    };
  }
}
</script>
```