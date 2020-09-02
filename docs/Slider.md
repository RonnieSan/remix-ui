# rSlider
The `rSlider` component can be used to input a number value or range between set values. If an array is passed as the value, a min and max value will be available with a handle for each. If a single number is passed as the value, a single handle will be available.

## Value
* **ARRAY** - The `v-model` accepts an array of values.
* **NUMBER** - The `v-model` accepts a number.

## Props
* **allowSame** : BOOLEAN - Set to `true` to allow the same value for the min and max of a range
* **settings** : OBJECT - Settings for the slider
* **settings.min** : NUMBER - The minimum value that can be selected
* **settings.max** : NUMBER - The maximum value that can be selected
* **settings.increment** : NUMBER - The size of increment for each unit on the slider
* **settings.snap** : BOOLEAN - Set to `true` so handles snap to exact points on the bar
* **settings.formatter** : FUNCTION - A function that transforms the min or max value for display

## Usage
```vue
<template>
  <div>
    <!-- BASIC USAGE -->
    <r-slider
      v-model="age"
      :settings="age_settings"
    />

    <!-- RANGE WITH FORMATTER -->
    <r-slider
      v-model="salary_range"
      :settings="salary_range_settings"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      age : 0,
      age_settings : {
        min : 18,
        max : 120,
        increment : 1
      },
      salary_range : [],
      salary_range_settings : {
        min : 20000,
        max : 200000,
        increment : 10000,
        formatter(value) {
          if (value === 200000) {
            value = '200000+';
          }
          return '$' + value;
        }
      }
    };
  }
}
</script>
```