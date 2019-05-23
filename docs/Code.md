# Code
A code input based off of Ace Editor.

## Props
* **v-model** : STRING
* **id** : STRING (Required) - A unique ID for the field that Ace Editor binds to.
* **options** : OBJECT - An object containing option settings for the Ace Editor instance. Any [options from Ace Editor](https://ace.c9.io/#nav=api) can be passed in.
* **options.mode** : STRING - The name of the mode/language you want to use in the editor. You will need to import the code from the `brace/mode` folder (see below).
* **options.theme** : STRING - The name of the theme you want to use to color the code. You will need to import the code from the `brace/theme` folder (see below).
* **max-height** : STRING - The maximum height as a string to allow the editor to grow to.

## Usage
In the template...
```html
<r-code id="my_code_editor" v-model="code_editor_value" :options="code_editor_options" max-height="600px"/>
```

In the script...
```js
import 'brace/mode/python';
import 'brace/theme/cobalt';

{
  data() {
    return {
      code_editor_value : '{"hello" : "world"}',
      code_editor_options : {
        fontFamily : 'Consolas',
        mode : 'python',
        theme : 'cobalt'
      }
    };
  }
}
```