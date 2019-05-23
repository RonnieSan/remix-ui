# Currency
An input field for currency-type values.

## Value
A number or string value.

## Slots
* **left** - Content to display in the left-hand helper of the field. If no left slot content is specified, but a `symbol` prop is provided, the left slot will contain the `symbol`.
* **right** - Content to display in the right-hand helper of the field.

## Props
* **disabled** : BOOLEAN - Set to `true` to disable the field.
* **settings** : OBJECT - An object containing setting properties to apply to the field.
* **settings.decimal** : STRING - The string to display as the decimal character in the number (default: `.`).
* **settings.thousands** : STRING - The string to display as the thousands character in the number (default: `,`).
* **settings.precision** : NUMBER - The decimal place precision to keep the number on output.
* **settings.masked** : BOOLEAN - Set to `true` to keep the masked value in the output.
* **symbol** : STRING - A symbol or value to place inside left-hand helper (default: `$`).

## Usage
In the template...
```html
template
<r-currency v-model="currency_value" :settings="currency_settings"/>
```

In the script...
```js
{
  data() {
    return {
      currency_value : 35.50,
      currency_settings : {
        masked : true
      }
    };
  }
}
```