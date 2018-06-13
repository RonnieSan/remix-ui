<template>
	<div class="select-wrapper">
		<select
			ref="input"
			:class="{'default' : model === ''}"
			:name="name"
			v-model.lazy="selected"
			v-on="listeners"
		>
			<option disabled :value="{value : ''}">{{placeholder}}</option>
			<option
				v-for="option in options"
				:value="{value : option.value || option}"
			>{{option.label || option}}</option>
		</select>
	</div>
</template>

<script>
import formField from '../mixins/formField';

export default {
	data() {
		return {
			focused : false,
			selected : {
				value : this.value
			}
		};
	},
	props : {
		model : {
			type : [String, Number, Boolean, Object]
		},
		name : String,
		options : Array,
		placeholder : {
			type : String,
			default : 'Select One'
		}
	},
	computed : {
		listeners() {
			return Object.assign(
				{},
				this.$listeners,
				{
					change(event) {
						// Do nothing
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
	watch : {
		selected(new_value) {
			this.dirty = true;
			this.$emit('change', new_value.value);
			this.validate();
		},
		model : {
			handler(new_value) {
				if (new_value !== this.selected.value) {
					this.selected = {
						value : new_value
					};
				}
			},
			immediate : true,
			deep : true
		}
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
// Default variables
@control-bkg-color: #FFF;
@control-border-color: #CCC;
@control-border-stroke: 1px;
@control-height: 2.5em;
@control-padding: 0.625em;
@control-radius: 3px;
@font-size: 16px;

// Import themes
@import (optional, reference) '~theme';

.select-wrapper {
	align-items: center;
	border: @control-border-stroke solid @control-border-color;
	border-radius: @control-radius;
	display: inline-flex;
	overflow: hidden;
	vertical-align: middle;
	width: 100%;

	select {
		appearance: none;
		background-color: @control-bkg-color;
		border: 0;
		flex: 1 0 0;
		font-size: @font-size;
		height: calc(@control-height - (@control-border-stroke * 2));
		margin: 0 @control-padding;
	}

	&::after {
		border-left: 1px solid fade(@control-border-color, 50%);
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 11 12 15 16 11" /></svg>');
		flex: 0 0 calc(@control-height - (@control-border-stroke * 2));
		height: calc(@control-height - (@control-border-stroke * 2));
		line-height: calc(@control-height - (@control-border-stroke * 2));
		text-align: center;
		width: calc(@control-height - (@control-border-stroke * 2));
	}
}

select:focus {
	box-shadow: 0;
	outline: 0;
}
</style>