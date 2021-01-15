# rDatePicker
The `rDatePicker` field is a useful component for picking a single date or a date range with the option for time-specificity.

## Value
* **STRING, ARRAY** - The value should be an **ISO8601-formatted date** (YYYY-MM-DD) for a single date or an array containing 2 ISO8601-formatted dates for a range.

## Props
* **allowClear** : BOOLEAN - Set to `true` to allow the value to be cleared
* **disabled** : BOOLEAN - Set to `true` to disable interactions with the field
* **placeholder** : STRING - The placeholder value to show when no date is selected
* **settings** : OBJECT - settings for the datepicker
* **settings.format** : STRING - The format to display the date as in the field (see momentjs.com for possible values)
* **settings.min_date** : STRING - An ISO8601 date that the user cannot select a date below
* **settings.max_date** : STRING - An ISO8601 date that the user cannot select a date above
* **settings.max_range** : NUMBER - The maximum range length in days the user can select
* **settings.reset_time** : BOOLEAN - Set `false` to keep current time when selecting new dates
* **settings.timepicker** : BOOLEAN - Set to `true` to use a timepicker
* **settings.timepicker_settings** : OBJECT - Settings to pass the embedded timepickers ([see rTimepicker documentation](Timepicker.md))

## Usage
```vue
<template>
  <div>
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      datepicker_value : '2019-05-13',
      datepicker_range_value : ['2019-05-11', '2019-05-13']
    };
  }
}
</script>
```