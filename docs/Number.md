# rNumber
The `rNumber` component is a number input form control with added functionality. To output an actual number, don't forget to add the `.number` modifier to the `v-model` attribute.

## Props
* **disabled** : BOOLEAN - Set to `true` to disable the input

## Usage
```html
<!-- BASIC USAGE -->
<r-number
  name="age"
  v-model.number="age"
/>
```