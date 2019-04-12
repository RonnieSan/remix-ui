# Remix UI
A set of UI components for VueJS.

## Installation
1. Install via NPM.
```bash
npm install remix-ui
```

2. Import and use Remix UI in your VueJS application in the main `app.js` file.
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

### Using Remix UI Styles with Webpack
In order to use the styling included with Remix UI, you'll need to create an alias to the styles in your webpack config.
```js
{
    resolve : {
        alias : {
            'remix-ui-styles' : resolve('node_modules/remix-ui/src/styles')
        }
    }
}
```

## Components
Remix UI is basically a collection of components you can use when building out a website. The majority of components are form-related, but there are a handful of layout components. Below is a list of each component in alphabetical order.

### Auto-Complete
The auto-complete component should be used in tandem with another form element like a text input. The auto-complete element should wrap the element where the values will be input.

##### Props
* **type** : STRING - The the data type of the value ['string' or 'object']
* **options** : ARRAY - An array of values to use as auto-complete settings
* **settings** : OBJECT - Custom settings for the auto-complete component
* **settings.min_length** : NUMBER - The minimum number of characters input before getting possible values

##### Usage
In the template...
```html
<r-autocomplete
    v-model="autocomplete_value"
    :options="autocomplete_options"
>
    <r-text
        name="autocomplete_text"
        v-model="autocomplete_value"
    />
</r-autocomplete>
```

In the script...
```js
{
    data() {
        return {
            autocomplete_options : [
                'Red',
                'Purple',
                'Blue',
                'Green',
                'Yellow'
            ]
        };
    }
}
```

Async options using promises...
```js
{
    data() {
        return {
            autocomplete_options : (value) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(['Foo', 'Bar']);
                    }, 2000);
                });
            }
        };
    }
}
```

### Button
The button component provides convinent options for styling a button.
