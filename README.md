# Remix UI
A set of UI components for VueJS.

Full documentation can be found at: https://ronniesan.github.io/remix-ui/#/

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
            'remix-ui-styles' : path.resolve(__dirname, 'node_modules/remix-ui/src/styles')
        }
    }
}
```
