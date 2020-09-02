# rPillbox
The `rPillbox` component is useful for handling an array of unique strings (e.g. keywords or tags).

## Value
* **ARRAY** - The `v-model` accepts an array of strings

## Props
* **allowed** : STRING - A string of characters that are allowed in the field value
* **commit** : ARRAY - An array of `event.key` values that will trigger a value commit for an entry (default is 'Enter', '', or ',')
* **disabled** : BOOLEAN - Set to `true` to disable the input
* **filter** : FUNCTION(value) - A custom function that is passed the value of the field as an argument. This is used to transform the value when input occurs.
* **mask** : STRING - A custom mask string (ala vue-the-mask)
* **outputMask** : BOOLEAN - Set to `true` to save all characters in the mask to the value
* **placeholder** : STRING - The placeholder text passed to the native input element
* **type** : STRING ( text | number | password | tel | etc ) - The input type to use for this text field. You should generally stick to `text` or `tel`.

## Usage
```vue
<template>
  <div>
    <!-- BASIC USAGE -->
    <r-pillbox
      name="keywords"
      v-model="keywords"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords : []
    };
  }
}
</script>
```