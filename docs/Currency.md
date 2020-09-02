# rCurrency
A special input field for currency-type values.

## Slots
If using Remix UI styles, the class `.control-helper` will style content in the slots appropriately. Using custom content in a slot will replace the symbol 
* **left** - The left slot will insert data before the text input, but inside the control border
* **left** - The left slot will insert data after the text input, but inside the control border

## Props
* **disabled** : BOOLEAN - Set to `true` to disable the field
* **settings** : OBJECT - An object containing setting properties to apply to the field
* **settings.decimal** : STRING - The string to display as the decimal character in the number (default: `.`)
* **settings.thousands** : STRING - The string to display as the thousands character in the number (default: `,`)
* **settings.precision** : NUMBER - The decimal place precision to round the number that is output
* **settings.masked** : BOOLEAN - Set to `true` to keep the masked value in the output (retain commas and decimals)
* **settings.symbol** : STRING - A symbol or value to place in the control (default: `'$'`)
* **settings.symbol_position** : STRING - The position of the symbol (`'left'` or `'right'`, default is `'left'`)

## Usage
```vue
<template>
  <div>
    <!-- WITH MASEKD OUTPUT -->
    <r-currency
      v-model="currency_value"
      :settings="currency_settings"
    />

    <!-- WHOLE DOLLAR AMOUNTS -->
    <r-currency
      v-model="currency_value"
      :settings="whole_dollar_settings"
    >
      <div class="control-helper" slot="right">.00</div>
    </r-currency>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currency_value : 35.50,
      currency_settings : {
        masked : true
      },
      whole_dollar_settings : {
        precision : 0
      }
    };
  }
}
</script>
```