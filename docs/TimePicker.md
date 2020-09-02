# rTimePicker
The `rTimePicker` component is a useful control for picking time.

## Value
* **STRING** - The `v-model` accepts a string in formatted as `hh:mm:ss`. The value returns using a 24-hour clock.

## Props
* **disabled** : BOOLEAN - Set to `true` to disable interactions with the field
* **settings** : OBJECT - settings for the timepicker
* **settings.hour_interval** : NUMBER - The interval of hours that is allowed for selection
* **settings.minute_interval** : NUMBER - The interval of minutes that is allowed for selection
* **settings.second_interval** : NUMBER - The interval of seconds that is allowed for selection
* **settings.military** : BOOLEAN - Set to `true`to use a 24-hour clock
* **settings.seconds** : BOOLEAN - Set to `true` to include seconds in the selection


## Usage
```vue
<template>
  <div>
    <!-- BASIC USAGE -->
    <r-timepicker
      v-model="dinner_time"
    />

    <!-- WITH INCREMENTS -->
    <r-datepicker
      v-model="appointment"
      :settings="appointment_settings"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dinner_time : '18:00:00',
      appointment : '10:00:00',
      appointment_settings : {
        hour_increment : 2
      }
    };
  }
}
</script>
```