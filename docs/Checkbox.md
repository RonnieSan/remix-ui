# Checkbox
A custom checkbox component with added convenience options and functionality.

## Slots
* **default** : The label to display next to the checkbox

## Props
* **name** : STRING - The name of the field that will be placed on the input
* **true-value** : [STRING, NUMBER, OBJECT] - If the v-model is not an array, the value the model will be set to when the box is checked
* **false-value** : [STRING, NUMBER, OBJECT] - If the v-model is not an array, the value the model will be set to when the box is NOT checked
* **value** : [STRING, NUMBER, OBJECT] - If the v-model is an array, the value that will be added to the array when the box is checked

## Usage
In the template...
```html
<!-- As a boolean value -->
<r-checkbox name="terms" v-model="boolean_value">I agree to the terms and conditions</r-checkbox>

<!-- As a string value -->
<r-checkbox name="terms" v-model="string_value" true-value="Yes" false-value="No">I agree to the terms and conditions</r-checkbox>

<!-- As an array value -->
<r-checkbox name="terms" v-model="array_value" value="Agreed to terms">I agree to the terms and conditions</r-checkbox>
<r-checkbox name="terms" v-model="array_value" value="Did not agree to terms">I DO NOT agree to the terms and conditions</r-checkbox>
```

In the script...
```js
{
  data() {
    return {
      boolean_value : false,
      string_value : 'No',
      array_value : []
    };
  }
}
```