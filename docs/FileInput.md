# rFile
A component for creating a more user-friendly file select input.

## Value
* **STRING** - The `v-model` accepts a string that represents the path to the file

## Props
* **accept** : STRING - The mime-type string for acceptable file types. Default is '*/*'.
* **name** : (REQUIRED) STRING - The input name to use in the form_data object. Default is 'files'.
* **placeholder** : STRING - The placeholder text to use in the input field.
* **value** : STING - A string of the filename that is currently selected.
* **disabled** : BOOLEAN - Set to true to disable interactions with the field.

## Events
* **select** : FUNCTION - An event handling function with a single argument `params`. The `params` argument has 2 properties:
  * `data` is a FormData object with the selected file(s)
  * `name` is the filename

  You can retrieve the file using `params.data.get(<name_value>)` -- *see the example below*

## Usage
In the template...
```vue
<template>
  <div>
    <r-file
      name="my_file"
      v-model="file_value"
      accept="image/*"
      placeholder="Select an image file..."
      @select="getFile"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      file_value : ''
    }
  },
  methods : {
    getFile(params) {
      const file = params.data.get('my_file');
      const file_name = params.name;
    }
  }
}
</script>
```