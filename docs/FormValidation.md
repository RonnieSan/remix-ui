# Form Validation

Remix provides form validation functionality using several different methods as explained below...

---
## Assigning a Validator to a rForm Component
The `rForm` component can be assigned an instance of a `validator`. When applying a validator to a form, the following is true...
* When the form is submitted, the validator's `validate` method is triggered
* If validation passes, the form's `v-on:submit` event will trigger
* If there is a validation error, the `v-on:error` event will trigger
* Any `rValidation` component nested within the `rForm` will automatically be assigned the form's validator instance unless a different one is explicitly passed to the `rValidation` component

### Example Validation on the rForm Component
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
---
## Assigning a Validator to Every rValidation Component
It is entirely possible to create validated form inputs that are not within a form. Simply assign a validator directly to the `rValidation` components. You can then validate all rules that are assigned to the validator using the validators `validate` method.

### Example Validation on the rValidation Component
```vue
<template>
    <div>
        <r-validation
            v-model="text_value"
            :validator="my_validator"
            :rules="[rules.required()]"
        >
            <r-text v-model="text_value"/>
            <r-button @click="validateField()">Validate</r-button>
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
---
## Wrapping rValidation Components in a rValidator Component
Instead of assigning the validator to every `rValidation` component, you can wrap fields in an `rValidator` component to automatically pass the validator. This is also useful if you want to show all errors in the same spot.

### Example Validation with a rValidator Component
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
---
## Validation Rules
The Remix UI Validator library comes with a small set of basic validation rules that can be used in your app. An optional custom error message can be passed to each method, otherwise the default message is used.

### Usage
```vue
<template>
    <div>
        <r-validation
            :validator="my_validator"
            v-model="even_number"
            :rules="[rules.required('You must enter a phone number'), CustomRule_EvenNumber]"
        >
            <r-text v-model="even_number"/>
        </r-validation>
    </div>
</template>

<script>
import { Validator, ValidationRules } from 'remix-ui';

export default {
    data() {
        return {
            even_number : null,
            my_validator : new Validator(),
            rules : ValidationRules
        };
    },
    methods : {
        CustomRule_EvenNumber(value) {
            if (value % 2 === 1) {
                return 'You must enter an even number';
            }
            return null;
        }
    }
}
</script>
```

* **required([optional error_message = ''], [optional, options = {}])** \
Checks if a value is not falsy. If you pass the second argument with the `allow_false` property set to true, validation only fails when the value is `null` or `undefined`.

* **notNil([optional error_message = ''])** \
Same as required with the `allow_false` property set to `true`.

* **minLength([length = 0], [optional error_message = ''])** \
Check for a minimum length string or array.

* **maxLength([length = 0], [optional error_message = ''])** \
Check for a maximum length string or array.

* **min([length = 0], [optional error_message = ''])** \
Check for a minimum value number.

* **max([length = 0], [optional error_message = ''])** \
Check for a maximum value number.

* **pattern([pattern = new RegExp('')], [optional error_message = ''])** \
Check if the value matches the regular expression.

* **match([value_to_match], [optional error_message = ''])** \
Check if the value matches another value (good for password confirmations).

* **email([optional error_message = ''])** \
Check if the value matches a standard email address format.

### Custom Validation Rules
Creating custom validation rules is easy. Just create a function that takes the value as the first argument and returns an error message string on failure or `null` if passed.

```js
// Custom validation function
export default {
    methods : {
        CustomRule_EvenNumber(value) {
            if (value % 2 === 1) {
                return 'You must enter an even number';
            }
            return null;
        }
    }
}
```