# rMultiSelect
The `rMultiSelect` component is like a checklist, but confined to a select-like dropdown. When the dropdown is closed, the value will show as the number of selected items. You can pass a custom template function to display custom output when the dropdown is closed.

## Value
ARRAY - The value should be an ARRAY of values.

## Props
* **closeOnMouseOut** : BOOLEAN - Set to `true` to close the dropdown immediately when the mouse leaves it
* **disabled** : BOOLEAN - Set to `true` to disable the input
* **minWidth** : STRING - A css width value for the minimum width the dropdown should be
* **options** : ARRAY - An array of values to use as select options (see below for more details)
* **placeholder** : STRING - The placeholder text passed to the native input element
* **template** : FUNCTION - A custom function that is passed the value that returns the string to display when the dropdown is closed

## Options
The available options can be expressed in different formats. If you use a simple array fo values, both the label (text shown in the dropdown) and the value that is output will be whatever the value in the array is. You can also use an object with a `label` and `value` property if you want them to be different. You can nest arrays if you want to create headers in the options (see usage below).

## Usage
```vue
<template>
  <div>
    <!-- BASIC OPTIONS -->
    <r-multi-select
      v-model="colors"
      :options="color_options"
    />

    <!-- OPTIONS WITH HEADINGS -->
    <r-multi-select
      v-model="colors"
      :options="segmented_color_options"
    />

    <!-- CUSTOM DISPLAY TEMPLATE -->
    <r-multi-select
      v-model="colors"
      :options="color_options"
      :template="displayColors"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors : [],
      color_options : [
        { label : 'Red', value : 'red' },
        { label : 'Orange', value : 'orange' },
        { label : 'Yellow', value : 'yellow' },
        { label : 'Green', value : 'green' },
        { label : 'Blue', value : 'blue' },
        { label : 'Purple', value : 'purple' }
      ],
      segmented_color_options : [
        'Primary Colors',
        [
          { label : 'Red', value : 'red' },
          { label : 'Yellow', value : 'yellow' },
          { label : 'Blue', value : 'blue' }
        ],
        'Secondary Colors',
        [
          { label : 'Orange', value : 'orange' },
          { label : 'Green', value : 'green' },
          { label : 'Purple', value : 'purple' }
        ]
      ]
    };
  },
  methods : {
    displayColors(value) {
      let output = '';
      value.forEach((color) => {
        output += '<div style="display: inline-block; height: 10px; width: 10px; background-color: ' + color + '; vertical-align: middle;"></span>';
      });
      return output;
    }
  }
}
</script>
```