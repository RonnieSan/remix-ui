# rTextarea
The `rTextarea` component is an auto-sizing input that is ideal for entering large amounts of text.

## Value
* **STRING** - The `v-model` accepts a string

## Props
* **disabled** : BOOLEAN - Set to `true` to disable the input
* **maxHeight** : STRING - The maximum height the text input box should expand to (default is 20em)

## Usage
```html
<!-- BASIC USAGE -->
<r-texarea
  name="content"
  v-model="content"
  max-height="50em"
/>
```