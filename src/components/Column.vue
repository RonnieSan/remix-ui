<template>
	<div :class="['column', $attrs.class]" :style="style">
		<slot/>
	</div>
</template>

<script>
export default {
	props : {
		maxWidth : {
			type : String
		},
		minWidth : {
			type : String,
		},
		span : {
			type : Number
		}
	},
	computed : {
		style() {
			let column_size = '1 0 0';
			if (this.minWidth || this.maxWidth || this.span) {
				if (this.span) {
					column_size = this.span + ' 0 0';
				}

				let output = {
					'flex' : [
						'-webkit-box',
						'-moz-box',
						'-webkit',
						'-ms',
						column_size
					]
				};

				if (this.maxWidth) {
					output.maxWidth = this.maxWidth;
				}

				if (this.minWidth) {
					output.minWidth = this.minWidth;
				}

				return output;
			}
			return null;
		}
	}
};
</script>

<style lang="less">
@import (optional) '~remix-ui-styles/Layout.less';
</style>

<docs>
# Column
A convenience component for creating a flex column. This element should be placed as a direct child of a `row` component.

## Slots
* **default** : The content of the column

## Props
* **max-width** : STRING - The maximum width the column should expand to
* **min-width** : STRING - The minimum width the column should condense to
* **span** : INTEGER - The span width of this column if it should span multiple columns

## Usage
In the template...
```html
<row>
	<column>This is the content of the column</column>
	<column :span="2">This column will be twice the width of the first column</column>
</row>
```
</docs>