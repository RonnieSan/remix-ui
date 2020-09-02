# Remix UI
A set of form and UI components for VueJS.

## Installation
Install via NPM.
```bash
npm install remix-ui
```

Import and use Remix UI in your VueJS application in the main entry file.
```js
// Import the library as a dependency
import RemixUI from 'remix-ui';

// Register the component library
Vue.use(RemixUI);

// Then, initialize the VueJS app
const app = new Vue({
    el : '#app',
    template : '<div><!-- REMIX UI COMPONENTS ARE NOW AVAILABLE HERE --></div>'
});
```

All components will be installed if you omit the second argument. Or you can choose which components you want to use in your app. You can either use a single component name, or select a group of components.
```js
Vue.use(RemixUI, ['Form', 'rCurrency', 'rPillBox', 'Layout', 'rMarkdown']);
```

The following component groups can be selected:

**Layout** - Layout components
* Grid
* Row
* Column
* Gutter

**Form** - Basic form components
* rForm
* rText
* rPassword
* rNumber
* rSelect
* rTextarea
* rCheckbox
* rChecklist
* rRadioGroup
* rFile
* rButton

**Extended** - Extended form components
* rCurrency
* rMultiText
* rMultiSelect
* rPillbox
* rGroupSelect
* rSlider
* rToggle
* rSwitch
* rFormBuilder

**Content** - Content editing components
* rCode
* rMarkdown
* rWysiwyg (Not complete)
* rTemplateEditor (Not complete)

**DateTime** - Date and time components
* rDatepicker
* rTimepicker

**Validation** - Validation components
* rValidation
* rValidator

**UI** - UI components
* Autocomplete
* Icon
* Modal
* Tab
* Tabs

## Validation Library
The validation library is used in conjuction with the rForm, rValidator, and rValidation components when adding validation to your form fields. A validator should be instantiated when needed.
```js
// Import the validator
import { Validator } from 'remix-ui';

// Create a new instance in the component data
{
    data() {
        return {
            my_validator : new Validator()
        };
    }
}
```

Use it in the template...
```html
<r-validator :validator="my_validator">...</r-validator>
```


## Msg and Toast Libraries
Installing the Msg and Toast libraries should happen separately so they can be used throughout the application.

```js
// Import the libraries
import { Msg, Toast } from 'remix-ui';

// Add a reference to all vue components
Vue.prototype.$msg = new Msg();
Vue.prototype.$toast = new Toast();

// Use it in the component
{
    methods : {
        alertSomething() {
            this.$msg.alert('This is an alert message');
        }
    }
}
```