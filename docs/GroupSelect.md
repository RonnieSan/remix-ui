# rGroupSelect
The `rGroupSelect` component allows for the selection and ordering of items from a fixed set of values.

## Value
* **ARRAY** - The `v-model` accepts an array of values.

## Props
* **activeHeader** : STRING - A string to display above the active items
* **disabled** : BOOLEAN - Set to `true` to disable the component
* **inactiveHeader** : STRING - A string to disaplay above the inactive items
* **maxHeight** : STRING - A CSS value for the maximum height the component should stretch to
* **options** : ARRAY - The available options to select from (uses the same formats as [rSelect](Select.md))
* **sort** : BOOLEAN - Set to `true` to automatically sort the lists of items
* **sortableOptions** : OBJECT - Options to pass the SortableJS instance (see the [SortableJS repo](https://sortablejs.github.io/Sortable/) for details)

## Usage
```vue
<template>
  <div>
    <!-- BASIC USAGE -->
    <r-group-select
      v-model="pizza_toppings"
      :options="pizza_toppings_options"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pizza_toppings : [],
      pizza_toppings_options : [
        'Anchovies',
        'Beef',
        'Bell Peppers',
        'Ham',
        'Mushrooms',
        'Olives',
        'Onions',
        'Pepperoni',
        'Pineapple'
      ]
    };
  }
}
</script>
```