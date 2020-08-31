# rPassword
The `rPassword` component is a password input form control with added functionality.

## Props
* **autocomplete** : STRING ( on | off ) - The native attribute passed down to the input
* **disabled** : BOOLEAN - Set to `true` to disable the input
* **placeholder** : STRING - The placeholder text passed to the native input element
* **preview** : BOOLEAN - Set to `true` to include the preview option to remove character masking

## Usage
```html
<!-- BASIC USAGE -->
<r-password
  name="password"
  v-model="password"
  preview
/>
```