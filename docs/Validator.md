# rValidator
The `rValidator` component is used in place of an `rForm` to wrap `rValidation` components and pass down the properties of a validator.

## Props
* **showErrors** : BOOLEAN - Set to `true` to print an unordered list of errors on validation
* **validator** : VALIDATOR - An instance of the Remix UI validator object

## Slots
* **default** - This component does not have its own elements and is an invisible wrapper for content in the defaut slot
* **errors** - The errors slot appears at the top of the element and will display a list of errors on validation if the `showErrors` prop is set to true

## Usage
```vue
<template>
  </div>
    <r-validator :validator="my_validator" show-errors>
      <r-validation
        v-model="text_value"
        :rules="[rules.required()]"
      >
        <r-text v-model="text_value"/>
        <r-button @click="validateField()">Validate</r-button>
      </r-validation>
    </r-validator>
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
  },
  methods : {
    validateField() {
      this.my_validator.validate()
        .then((valid) => {
          console.log('The field is valid!');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
}
</script>
```