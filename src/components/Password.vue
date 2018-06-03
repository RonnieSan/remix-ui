<template>
	<div class="input-wrapper">
		<input type="password"
			ref="input"
			:name="name"
			:value="value"
			:placeholder="placeholder"
			v-on="listeners"
		>
	</div>
</template>

<script>
import formField from '../mixins/formField';

export default {
	props : {
		placeholder : String,
		value : String
	},
	computed : {
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					input(event) {
						vm.dirty = true;
						vm.$emit('input', event.target.value);
						vm.validate();
					},
					blur(event) {
						vm.touched = true;
						vm.validate();
					}
				}
			);
		}
	},
	methods : {
		inputHandler(value) {
			this.dirty = true;
			this.$emit('input', value);
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less">
// Default variables
@black: #000;
@white: #FFF;
@control-bkg-color: @white;
@control-border-stroke: 1px;
@control-border-color: #CCC;
@control-color: #1F73D6;
@control-height: 2.5em;
@control-radius: 3px;
@font-size: 16px;

// Import custom variables
@import (optional, reference) '~theme';

.input-wrapper {
	border-radius: @control-radius;
	border: @control-border-stroke solid @control-border-color;
	display: inline-block;
	display: inline-flex;
	overflow: hidden;
	vertical-align: middle;
	width: 100%;

	.helper {
		background-color: fade(@black, 10%);
		flex: 0 0 auto;
		height: calc(@control-height - (@control-border-stroke * 2));
		line-height: calc(@control-height - (@control-border-stroke * 2));
		min-width: calc(@control-height - (@control-border-stroke * 2));
		text-align: center;
	}
}

input[type='password'] {
	background-color: @control-bkg-color;
	border: 0;
	flex: 1 0 0;
	font-size: @font-size;
	height: calc(@control-height - (@control-border-stroke * 2));
	padding: 0 @control-padding;
	width: 100%;
}
</style>