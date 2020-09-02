# rNumber
The `rNumber` component is a number input form control with added functionality.

## Value
* **NUMBER** - The `v-model` accepts a number. The `.number` modifier must be present on the `v-model`.

## Props
* **disabled** : BOOLEAN - Set to `true` to disable the input

## Slots
If using Remix UI styles, the class `.control-helper` will style content in the slots appropriately.
* **left** - The left slot will insert data before the text input, but inside the control border
* **left** - The left slot will insert data after the text input, but inside the control border

## Usage
```vue
<template>
  <div>
    <!-- BASIC USAGE -->
    <r-number
      name="age"
      v-model.number="age"
    />

    <!-- USING SLOTS -->
    <r-number
      name="weight"
      v-model.number="weight"
    >
      <div class="control-helper" slot="right">lbs.</div>
    </r-number>
  </div>
</template>

<script>
export default {
  data() {
    return {
      age : 40,
      weight: 170
    };
  }
}
</script>
```