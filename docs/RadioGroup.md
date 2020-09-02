# rRadioGroup
A `rRadioGroup` component creates a list of radio buttons.

## Value
* **STRING, NUMBER, OBJECT, BOOLEAN, NULL** - The `v-model` accepts any value

## Props
* **disabled** : BOOLEAN - Set to `true` to disable all checkboxes in the list
* **name** : STRING - The name of the form input (one will be generated if not set)
* **options** : ARRAY - An array of values for each list item

## Usage
```vue
<template>
  <div>
    <!-- SIMPLE OPTIONS -->
    <r-radio-group v-model="favorite_colors" :options="primary_colors"/>

    <!-- DIFFERENT LABEL AND VALUE -->
    <r-radio-group v-model="favorite_colors" :options="secondary_colors"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorite_colors : [],
      simple_color_options : [
        'Red',
        'Yellow',
        'Blue'
      ],
      array_value : [
        { label : 'Green', value : '#00FF00' },
        { label : 'Orange', value : '#FF9900' },
        { label : 'Purple', value : '#9900FF' }
      ]
    }
  }
}
</script>
```