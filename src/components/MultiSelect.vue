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
			<div
				v-show="is_open"
				ref="list"
				class="list"
				:style="{'min-width' : this.minWidth, 'max-height' : this.maxListHeight, 'top' : this.list_top, 'bottom' : this.list_bottom}">
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
			max_list_height : null
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
					let input_box     = this.$el.getBoundingClientRect();
					let window_height = window.innerHeight;

					// Calculate max list heights
					let max_list_height_below = (window_height - input_box.bottom - 20);
					let max_list_height_above = (window_height - (window_height - input_box.top) - 20);
					
					// Choose where to display
					let display_above = false;
					if ((max_list_height_below < 200) && (max_list_height_above > max_list_height_below)) {
						display_above = true;
					}

					if (display_above) {
						this.max_list_height = max_list_height_above;
						this.list_bottom = (input_box.height - 5 + 'px');
						this.list_top = null;
					}
					else {
						this.max_list_height = max_list_height_below;
						this.list_bottom = null;
						this.list_top = (input_box.height - 5 + 'px');
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
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/MultiSelect.less';
</style>