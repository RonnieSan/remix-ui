<template>
	<div
		class="multi-select-wrapper"
		v-on-clickaway="closeList"
	>
		<div class="display" @click="toggleList">
			<span v-if="value.length === 0" class="none-selected">{{placeholder}}</span>
			<span v-else class="selected-items">{{value.length}} Selected</span>
		</div>
		<transition name="dropfade">
			<div ref="list" class="list" :style="{'min-width' : this.minWidth, 'max-height' : this.maxListHeight, 'top' : this.list_top, 'bottom' : this.list_bottom}" v-show="is_open">
				<div class="selection-options">
					<strong>Select:</strong> <a @click="selectAll()" href="javascript:void(0)">All</a> | <a @click="selectNone()" href="javascript:void(0)">None</a>
				</div>
				<r-checklist
					v-model="local_value"
					:options="options"
				/>
			</div>
		</transition>
	</div>
</template>

<script>
import Checklist from './Checklist';
import formField from '../mixins/formField';
import { mixin as clickaway } from 'vue-clickaway';

export default {
	data() {
		return {
			local_value     : this.value,
			is_open         : false,
			focused         : false,
			list_bottom     : null,
			list_top        : null,
			max_list_height : null,
			input_box       : {}
		};
	},
	props : {
		minWidth : {
			type : String,
			default : '200px'
		},
		name : String,
		options : {
			type : Array,
			default() {
				return [];
			}
		},
		placeholder : {
			type : String,
			default : 'Select Options'
		},
		value : {
			type : Array,
			required : true
		}
	},
	computed : {
		maxListHeight() {
			return this.max_list_height + 'px';
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					change(event) {
						vm.dirty = true;
						vm.changeHandler(event);
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
	watch : {
		local_value(new_value) {
			this.dirty = true;
			this.$emit('input', new_value);
		}
	},
	methods : {
		changeHandler(value) {
			this.local_value = value;
			this.$emit('input', this.local_value);
		},
		toggleList() {
			this.is_open = !this.is_open;

			// Set the dropdown size
			this.$nextTick(() => {
				if (this.is_open) {
					let list_box = this.$refs.list.getBoundingClientRect();
					let window_height = window.innerHeight;

					// Display below
					this.list_bottom = null;
					this.list_top = (this.input_box.height - 5 + 'px');
					this.max_list_height = ((window_height - this.input_box.bottom - 20));

					// Display above
					if (this.max_list_height < list_box.height
						&& (this.max_list_height < 200)
						&& ((window_height - (window_height - this.input_box.top) - 20) > this.max_list_height))
					{
						this.list_bottom = (this.input_box.height - 5 + 'px');
						this.list_top = null;
						this.max_list_height = (window_height - (window_height - this.input_box.top) - 20);
					}
				}
			});
		},
		closeList() {
			if (this.is_open) {
				this.is_open = false;
			}
		},
		selectAll() {
			this.local_value = [];
			this.options.forEach((option) => {
				this.local_value.push(option.value || option);
			});
			this.$emit('input', this.local_value);
		},
		selectNone() {
			this.local_value = [];
			this.$emit('input', this.local_value);
		}
	},
	components : {
		rChecklist : Checklist
	},
	mixins : [
		clickaway,
		formField
	],
	mounted() {
		this.input_box = this.$el.getBoundingClientRect();
	}
};
</script>

<style lang="less" scoped>
// Default variables
@control-bkg-color: #FFF;
@control-border-color: #CCC;
@control-border-stroke: 1px;
@control-color: #4285F9;
@control-height: 2.5em;
@control-padding: 0.625em;
@control-radius: 3px;
@font-size: 16px;
@layer-control: 300;

// Import theme
@import (optional, reference) '~theme';

.multi-select-wrapper {
	align-items: center;
	background-color: @control-bkg-color;
	border-radius: @control-radius;
	border: @control-border-stroke solid @control-border-color;
	display: inline-flex;
	position: relative;
	vertical-align: middle;
	width: 100%;

	.display {
		flex: 1 0 0;
		font-size: @font-size;
		height: calc(@control-height - (@control-border-stroke * 2));
		line-height: calc(@control-height - (@control-border-stroke * 2));
		padding: 0 @control-padding;
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

	.list {
		background-color: @control-bkg-color;
		border-radius: 3px;
		box-shadow: 0 2px 10px fade(black, 25%);
		left: 2px;
		overflow-y: auto;
		padding: @control-padding;
		position: absolute;
		z-index: @layer-control;

		.selection-options {
			font-size: 0.875em;
			height: calc(@control-height - (@control-border-stroke * 2));
			line-height: calc(@control-height - (@control-border-stroke * 2));
			padding: 0 @control-padding;
		}

		/deep/ .option {
			padding: 0 @control-padding;

			&:hover {
				background-color: tint(@control-color, 90%);
			}
		}

		.checkbox-wrapper {
			width: 100%;
		}
	}
}
</style>