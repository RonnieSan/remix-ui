# DatePicker
A date-picker field for single dates or ranges.

## Value
The value should be an ISO8601-formatted date (YYYY-MM-DD) for a single date or an array containing 2 ISO8601-formatted dates for a range.

## Props
* **min-value** : STRING - An ISO8601 date that the user cannot select a date below.
* **max-value** : STRING - An ISO8601 date that the user cannot select a date above.
* **disabled** : BOOLEAN - Set to `true` to disable interactions with the field.
* **format** : STRING - The format to display the date as in the field (see momentjs.com for possible values).

## Usage
In the template...
```html
<r-datepicker
  v-model="datepicker_value"
  min-value="1980-01-01"
  max-value="2020-12-31"
  format="ddd, MMM D, YYYY"
/>

<r-datepicker
  v-model="datepicker_range_value"
  min-value="1980-01-01"
  max-value="2020-12-31"
  format="MM/DD/YYYY"
/>
```

In the script...
```js
{
  data() {
    return {
      datepicker_value : '2019-05-13',
      datepicker_range_value : ['2019-05-11', '2019-05-13']
    };
  }
}
```