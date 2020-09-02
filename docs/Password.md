# rPassword
The `rPassword` component is a password input form control with added functionality.

## Value
* **STRING** - The `v-model` accepts a string

## Props
* **autocomplete** : STRING ( on | off ) - The native attribute passed down to the input
* **disabled** : BOOLEAN - Set to `true` to disable the input
* **placeholder** : STRING - The placeholder text passed to the native input element
* **preview** : BOOLEAN - Set to `true` to include the preview option to remove character masking

## Slots
If using Remix UI styles, the class `.control-helper` will style content in the slots appropriately.
* **left** - The left slot will insert data before the text input, but inside the control border
* **left** - The left slot will insert data after the text input, but inside the control border

## Usage
```html
<!-- BASIC USAGE -->
<r-password
  name="password"
  v-model="password"
  preview
/>
```