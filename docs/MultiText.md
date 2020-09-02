# rMultiText
The `rMultiText` component allows for an array of custom text inputs.

## Value
ARRAY - The value should be an ARRAY of STRINGs.

## Props
* **allowed** : STRING - A string of characters that are allowed in the field value
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
    <r-multi-text
      name="members"
      v-model="members"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      members : []
    };
  }
}
</script>
```

*See the [rText documentation](Text.md) for information on using filters and masks*