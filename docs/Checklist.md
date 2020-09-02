# rChecklist
A list of checkbox values that modify an array passed into the v-model attribute.

## Value
* **ARRAY** - The `v-model` accept and ARRAY of values. The values can be any data type.

## Props
* **disabled** : BOOLEAN - Set to `true` to disable all checkboxes in the list
* **name** : STRING - The name of the form input
* **options** : ARRAY - An array of values for each list item

## Usage
```vue
<template>
  <div>
    <!-- SIMPLE OPTIONS -->
    <r-checklist v-model="favorite_colors" :options="primary_colors"/>

    <!-- DIFFERENT LABEL AND VALUE -->
    <r-checklist v-model="favorite_colors" :options="secondary_colors"/>
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