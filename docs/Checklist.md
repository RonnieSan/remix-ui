# Checklist
A list of checkbox values that modify an array passed into the v-model attribute.

## Props
* **name** : STRING - The name of the form input
* **options** : ARRAY - An array of objects with a `label` and `value` property that will act as the label and value of each item in the list

## Usage
In the template...
```html
<r-checklist name="my_checklist" v-model="checklist_value" :options="checklist_options"/>
```

In the script...
```js
{
  data() {
    return {
      checklist_value : [],
      checklist_options : [
        {label : 'Red', value : '#FF0000'},
        {label : 'Green', value : '#00FF00'},
        {label : 'Blue', value : '#0000FF'}
      ]
    };
  }
}
```