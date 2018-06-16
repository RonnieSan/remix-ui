<template>
	<div class="input-wrapper">
		<slot name="left"></slot>
		<input type="password"
			ref="input"
			:name="name"
			:value="value"
			:placeholder="placeholder"
			v-on="listeners"
		>
		<slot name="right"></slot>
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

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Password.less';
</style>