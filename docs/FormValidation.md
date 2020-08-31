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
Coming soon...