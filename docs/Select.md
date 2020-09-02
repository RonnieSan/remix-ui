# rSelect
The `rSelect` component works just like the native select element but with added functionality. The value support all data types.

## Value
* **STRING, NUMBER, OBJECT, BOOLEAN, NULL** - The `v-model` accepts a any type of value

## Props
* **alloweEmpty** : BOOLEAN - Set to `true` to allow an empty value to be selected
* **disabled** : BOOLEAN - Set to `true` to disable the input
* **emptyValue** : ANY - The value to use for an empty selection (default is `null`)
* **options** : ARRAY - An array of values to use as select options (see below for more details)

## Options
The available options can be expressed in different formats. If you use a simple array fo values, both the label (text shown in the dropdown) and the value that is output will be whatever the value in the array is. You can also use an object with a `label` and `value` property if you want them to be different.

## Usage with Simple Options
```vue
<template>
	<r-select
	  name="color"
	  v-model="color"
	  :options="color_options"
	/>
</template>

<script>
export default {
	data() {
		return : {
			color : null,
			color_options : [
				'Red',
				'Orange',
				'Yellow',
				'Green',
				'Blue',
				'Purple'
			]
		}
	}
}
</script>
```

## Usage with Complex Options
```vue
<template>
	<r-select
	  name="random"
	  v-model="random"
	  :options="various_options"
	  allow-empty
	  :empty-value="false"
	  placeholder="Select One"
	/>
</template>

<script>
export default {
	data() {
		return : {
			random : null,
			various_options : [
				{ label : 'Null', value : null },
				{ label : 'Boolean True', value : true },
				{ label : 'A Number', value : 23 },
				{ label : 'A String', value : 'Hello, world' },
				{ label : 'An Object', value : { a : 1 } }
			]
		}
	}
}
</script>
```