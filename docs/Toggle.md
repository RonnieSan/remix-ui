# rToggle
The `rToggle` component is an alternate style checkbox that resembles an on/off switch. Label content can be changed based on the current value.

## Value
* **BOOLEAN, STRING, NUMBER** - The `v-model` accepts a boolean, string, or number value.

## Props
* **falseLabel** : STRING - The label to display is the value is false (or equivalent to the `falseValue` property)
* **falseValue** : BOOLEAN, STRING, NUMBER, OBJECT - If the toggle is in the "off" position, the value to set 
* **trueLabel** : STRING - The label to display is the value is true (or equivalent to the `trueValue` property)
* **trueValue** : BOOLEAN, STRING, NUMBER, OBJECT - If the toggle is in the "on" position, the value to set

## Slots
* **default** : The label next to the toggle--leave empty if using the `falseLabel` and `trueLabel` properties.

## Usage
```vue
<template>
  <div>
    <!-- BASIC USAGE -->
    <r-toggle v-model="active">Activate</r-toggle>

    <!-- USING TRUE AND FALSE VALUES -->
    <r-toggle
      v-model="status"
      true-value="enabled"
      true-label="The application is enabled"
      false-value="disabled"
      false-label="The application is disabled"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active : false,
      status : 'disabled'
    };
  }
}
</script>
```