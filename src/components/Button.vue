<template>
	<button :class="['r-button', 'focusable', $attrs.class, {disabled, loading}]" :type="type" :disabled="disabled || loading" @click="emitClick">
		<span v-if="icon || loading" class="icon">
			<icon v-if="!loading" :type="icon" :size="iconSize"/>
			<icon v-else type="loading" :size="iconSize"/>
		</span><span class="label"><slot></slot></span>
	</button>
</template>

<script>
import Icon from './Icon';

export default {
	components : {
		Icon
	},
	props : {
		type : {
			type : String,
			default : 'button'
		},
		icon : {
			type : String,
			default : null
		},
		iconSize : {
			type : String,
			default : '24'
		},
		loading : {
			type : Boolean,
			default : false
		},
		disabled : {
			type : Boolean
		}
	},
	methods : {
		emitClick(event) {
			event.preventDefault();
			if (!this.loading) {
				this.$emit('click');
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Button.less';
</style>

<docs>
# Button
A form button with options for styling and interaction states.

## Slots
* **default** - The button label

## Props
* **type** : STRING - The button type to use for this button ['button', 'submit', or 'reset'] (Defaults to 'button')
* **icon** : STRING - If using MDI, the name of the icon to show on this button
* **iconSize** : STRING - The size of the icon in px (Defaults to 24)
* **loading** : BOOLEAN - The loading state of the button to show a loading icon
* **disabled** BOOLEAN - Whether the button is disabled or not

## Usage
In the template...
```html
<r-button type="submit" icon="check" :loading="loading" :disabled="loading">Submit Form</r-button>
```

Change loading status in the script...
```js
{
	methods : {
		submitForm() {
			this.loading = true;
			this.asyncMethod();
		},
		asyncMethod() {
			setTimeout(() => {
				this.loading = false;
			}, 3000);
		}
	}
}
```
</docs>