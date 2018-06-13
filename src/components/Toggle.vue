<template>
	<label class="toggle-wrapper">
		<span class="toggle">
			<input type="checkbox"
				ref="input"
				:name="name"
				:checked="is_checked"
				:value="value"
				:true-value="trueValue"
				:false-value="falseValue"
				v-on="listeners"
			>
			<span class="handle"></span>
		</span>
		<span class="toggle-label"><slot><span v-if="model">{{trueLabel}}</span><span v-else>{{falseLabel}}</span></slot></span>
	</label>
</template>

<script>
import _ from 'lodash';
import formField from '../mixins/formField';

export default {
	props : {
		falseLabel : String,
		falseValue : {},
		label : String,
		model : {},
		name : String,
		trueLabel : String,
		trueValue : {},
		value : {}
	},
	computed : {
		is_checked() {
			if (Array.isArray(this.model)) {
				return (_.includes(this.model, this.value));
			}
			else {
				if ((typeof this.falseValue !== 'undefined') && this.model === this.falseValue) {
					return false;
				}

				return this.model;
			}
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					change(event) {
						vm.dirty = true;
						vm.changeHandler(event.target.checked);
					},
					keydown(event) {
						vm.keydownHandler(event);
					},
					blur(event) {
						vm.touched = true;
						vm.validate();
					}
				}
			);
		}
	},
	model : {
		prop  : 'model',
		event : 'change'
	},
	methods : {
		keydownHandler(event) {
			switch (event.which) {

				// LEFT ARROW
				case 37:
					if (this.is_checked) {
						this.changeHandler(false);
					}
					break;

				// RIGHT ARROW
				case 39:
					if (!this.is_checked) {
						this.changeHandler(true);
					}
					break;

			}
		},
		changeHandler(checked) {
			let new_value;
			if (Array.isArray(this.model)) {
				if (checked) {
					new_value = this.model.slice();
					new_value.push(this.value);
				}
				else {
					new_value = this.model.filter((value) => {
						return value !== this.value;
					});
				}
			}
			else {
				let trueValue  = this.trueValue || true;
				let falseValue = this.falseValue || false;

				new_value = (checked ? trueValue : falseValue);
			}

			this.$emit('change', new_value);
			this.validate();
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
// Default variables
@control-color: #2196F3;
@control-height: 2.5em;
@control-padding: 0.625em;
@toggle-size: 1.5em;

// Import themes
@import (optional, reference) '~theme';

.toggle-wrapper {
	cursor: pointer;
	display: inline-flex;
	font-size: @font-size;
	justify-content: flex-start;
	line-height: @control-height;
	min-height: @control-height;
	vertical-align: middle;
}

.toggle {
	display: inline-block;
	flex: 0 0 @toggle-size * 2;
	height: @toggle-size;
	margin: ((@control-height - @toggle-size) / 2) 0;
	position: relative;
	vertical-align: middle;
	width: @toggle-size * 2;

	&::before {
		background-color: #D8D8D8;
		border-radius: @toggle-size / 4;
		content: '';
		height: @toggle-size / 3;
		left: @toggle-size / 2;
		overflow: hidden;
		position: absolute;
		top: @toggle-size / 3;
		width: @toggle-size;
		z-index: 10;
	}

	input {
		cursor:  pointer;
		height: @toggle-size;
		left: 0;
		margin: 0 !important;
		opacity: 0;
		padding: 0 !important;
		position: absolute;
		top: 0;
		width: @toggle-size * 2;
		z-index: 30;

		&:focus {
			outline: none;
		}
	}

	input:checked + .handle {
		transition: all 100ms ease-out;
		background-color: @control-color;
		left: @toggle-size;
	}
}

.handle {
	background-color: #A6A6A6;
	border-radius: @toggle-size / 2;
	display: block;
	height: @toggle-size;
	left: 0;
	position: absolute;
	top: 0;
	transition: all 100ms ease-out;
	width: @toggle-size;
	z-index: 20;
}

.toggle-label {
	display: inline-block;
	flex: 1 0 0;
	height: @control-height;
	line-height: @control-height;
	margin-left: @control-padding;
}
</style>