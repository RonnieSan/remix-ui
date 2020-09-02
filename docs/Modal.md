# Modal
The `modal` component is a convenient way to content in a modal window in your app.

## Props
* **closeOnClick** : BOOLEAN - Set to `false` so the modal does not close when clicking outside of it
* **closeOnEsc** : BOOLEAN - Set to `false` so pressing the `esc` key does not close the modal
* **maxWidth** : STRING - The maximum width (as a CSS value) the modal window should expand to

## Slots
* **default** - The default slot is the contents of the modal window.

## Methods
* **open()** - The open method opens the modal window and returns a promise when the modal has opened
* **close(value)** - The close method closes the modal window and returns a promise when the modal has closed

## Events
* **beforeOpen** - Triggers immediately when the `open` method is fired and is passed a reference to the modal component that triggered it
* **open** - Triggers when the `open` method completes and is passed a reference to the modal component that triggered it
* **beforeClose** - Triggers immediately when the `close` method is fired and is passed whatever value is passed to the `close` method
* **close** - Triggers when the `close` method completes and is passed whatever value is passed to the `close` method

## Usage
```vue
<template>
	<modal ref="my_modal" max-width="600px">
		<p>This is my modal!</p>
		<r-button @click="$refs.my_modal.close()">Close Me</r-button>
	</modal>
</template>

<script>
export default {
	methods : {
		open() {
			this.$refs.my_modal.open();
		}
	}
}
</script>
```