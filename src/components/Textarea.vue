<template>
	<div
		:style="{maxHeight}"
		class="textarea-wrapper"
	>
		<div class="mirror">
			<pre>{{value}}
			</pre>
		</div>
		<textarea
			ref="input"
			:name="name"
			:value="value"
			v-on="listeners"
		></textarea>
	</div>
</template>

<script>
import formField from '../mixins/formField';

export default {
	data() {
		return {
			focused : false
		};
	},
	props : {
		maxHeight : {
			type : String,
			default : '500px'
		},
		value : String
	},
	computed : {
		listeners() {
			const vm = this;
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
						let use_default;
						if (vm.$listeners.blur) {
							use_default = vm.$listeners.blur(event);
						}
						if (use_default !== false) {
							vm.touched = true;
							vm.validate();
						}
					}
				}
			);
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Textarea.less';
</style>