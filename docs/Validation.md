# rValidation
The `rValidation` component is used to apply validation rules to a value. Usually, this component wraps a form control and will return a visible error when validation is triggered and the value does not pass the validation test.

## Value
* **ANY** - The `v-model` should contain the value that you are applying validations against.

## Props
* **disabled** : BOOLEAN - Set to `true` to disable validation
* **group** : STRING - The name of a group this validation belongs to. You can use group names to validate subsets of fields.
* **rules** : ARRAY - An array of validation functions that will applied in the order which they appear.
* **validator** : VALIDATOR - An instance of the Remix UI validator object. This will automatically be inherited if the components is within an `rForm` or `rValidator` component.
* **watch** : BOOLEAN - Set to `true` to evaluate the validation upon input instead of blur

## Slots
* **default** - Anything in the default slot will be wrapped by the validation wrapper. This is useful because is applies an `.invalid` class when validation fails so you can use it for styling elements within it.
* **errors** - The errors slot appears at the bottom of the element and will display the first error if validatio fails

## Usage
```vue
<template>
  </div>
    <!-- BASIC USAGE -->
    <r-validation
      v-model="text_value"
      :validator="my_validator"
      :rules="[rules.required()]"
      watch
    >
      <r-text v-model="text_value"/>
    </r-validation>
  </div>
</template>

<script>
import { Validator, ValidationRules } from 'remix-ui';

export default {
  data() {
    return {
      my_validator : new Validator(),
      rules : ValidationRules,
      text_value : ''
    };
  }
}
</script>
```