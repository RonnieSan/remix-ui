# rForm
A custom form component that adds a little extra functionality. The native form element that is generated will automatically have a `novalidate` attribute assigned to it.

## Props
* **action** : STRING - The form action that is passed to the native form element
* **autocomplete** : STRING ( on | off ) - The autocomplete attribute is passed to the native form element
* **method** : STRING ( GET | POST ) - The form method that is passed to the native form element
* **validator** : VALIDATOR - An instance of the Remix UI validator

## Slots
* **default** - All form content should be contained in the default slot

## Events
* **submit** : FUNCTION(form) - Triggered when the form is submitted and is passed the native form object. If a validator is attached to the `rForm` component, this will only trigger if validation is successful.
* **error** : FUNCTION(errors) - Triggered only if the `rForm` component has a validator assigned and it returns errors on submit. The function is passed the array of errors that were returned.

## Validation
When the `rForm` component is passed an instance of a Remix UI validator, it injects the validator into any `rValidation` components that are nested within it. For more information on validation, please see the [From Validation](FormValidation.md) section.

## Usage
```vue
<template>
    <r-form :validator="my_validator" @submit="formSubmitHandler" @error="formErrorHandler">
        <r-validation
            v-model="text_value"
            :rules="[rules.required()]"
        >
            <r-text v-model="text_value"/>
        </r-validation>
    </r-form>
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
        formSubmitHandler(form) {
            console.log('The form was submitted!');
        },
        formErrorHandler(errors) {
            console.error(errors);
        }
    }
}
</script>
```