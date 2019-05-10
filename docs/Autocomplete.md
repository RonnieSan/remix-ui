# Auto-Complete
The auto-complete component should be used in tandem with another form element like a text input. The auto-complete element should wrap the element where the values will be input.

## Props
* **type** : STRING - The the data type of the value ['string' or 'object']
* **options** : ARRAY - An array of values to use as auto-complete settings
* **settings** : OBJECT - Custom settings for the auto-complete component
* **settings.min_length** : NUMBER - The minimum number of characters input before getting possible values

## Usage
In the template...
```html
<r-autocomplete
  v-model="autocomplete_value"
  :options="autocomplete_options"
>
  <r-text
    name="autocomplete_text"
    v-model="autocomplete_value"
  />
</r-autocomplete>
```

In the script...
```js
{
  data() {
    return {
      autocomplete_options : [
        'Red',
        'Purple',
        'Blue',
        'Green',
        'Yellow'
      ]
    };
  }
}
```

Async options using promises...
```js
{
  data() {
    return {
      autocomplete_options : (value) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(['Foo', 'Bar']);
          }, 2000);
        });
      }
    };
  }
}
```