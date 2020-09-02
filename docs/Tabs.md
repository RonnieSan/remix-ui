# Tabs Overview
Remix UI provides a couple of components that can be used to quickly create tabs in your app.

---

## Tabs Component
The `tabs` component wraps individual `tab` components to create a tab group.

### Value
* **STRING** - The `v-model` of the `tabs` component accepts a string that equates to the currently selected tab-id.

### Slots
* **default** - The default slot if where all the child `tab` components will go

---

## Tab Component
The `tab` component wraps content for an individual tab within a group.

### Props
* **disabled** : BOOLEAN - Set to `true` to disable the individual tab so it cannot be selected by clicking
* **label** : STRING - The text to display in the tab (HTML is allowed)
* **tabId** : STRING - The ID of the tab. When the tab is active, the wrapping `tabs` component's `v-model` will equal the tabId.

### Slots
* **default** - The default slot contains the tab content that will show when the tab is selected

---

## Usage
```vue
<template>
	<div>
		<!-- BASIC USAGE -->
		<tabs v-model="active_tab">
			<tab label="First Tab" tab-id="first">
				<p>This is the first tab</p>
			</tab>
			<tab label="Second Tab" tab-id="second">
				<p>This is the second tab</p>
			</tab>
			<tab label="Third Tab" tab-id="third">
				<p>This is the third tab</p>
			</tab>
		</tabs>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active_tab : 'first'
		};
	}
}
</script>
```