# Autocomplete
The `autoomplete` component makes a list of pre-determined values available on text inputs.

## Props
* **type** : STRING - The the data type of the value ['string' or 'object']
* **options** : ARRAY, FUNCTION - An array of values to use as auto-complete settings. A function may be used to return options asynchronously.
* **settings** : OBJECT - Custom settings for the auto-complete component
* **settings.min_length** : NUMBER - The minimum number of characters input before getting possible values

## Slots
* **default** - The default slot contains the input the autocomplete will apply to.

## Usage
```vue
<template>
  <div>
    <autocomplete
      v-model="autocomplete_value"
      :options="autocomplete_options"
    >
      <r-text
        name="autocomplete_text"
        v-model="autocomplete_value"
      />
    </r-autocomplete>
  </div>
</template>

<script>
export default {
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
</script>
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