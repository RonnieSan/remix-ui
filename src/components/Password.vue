<template>
	<div :class="['r-password', 'control-border', 'focusable', {disabled}]">
		<slot name="left"></slot>
		<input
			:type="preview_type"
			ref="input"
			v-bind="$props"
			v-on="listeners"
		>
		<div v-if="preview" class="preview" @click="togglePreview()">
			<icon :type="previewIcon"/>
		</div>
		<slot name="right"></slot>
	</div>
</template>

<script>
import Icon from './Icon';
import formField from '../mixins/formField';

export default {
	components : {
		Icon
	},
	props : {
		autocomplete : String,
		disabled : Boolean,
		placeholder : String,
		preview : Boolean,
		value : String
	},
	data() {
		return {
			preview_type : 'password'
		};
	},
	computed : {
		previewIcon() {
			if (this.preview_type === 'password') {
				return 'eye-off';
			}
			return 'eye';
		},
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
	methods : {
		togglePreview() {
			if (this.preview_type === 'password') {
				this.preview_type = 'text';
			}
			else {
				this.preview_type = 'password';
			}
		},
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