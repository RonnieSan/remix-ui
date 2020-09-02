<template>
	<div
		:class="['r-multi-select', 'control-border', 'focusable', {disabled}]"
		v-on-clickaway="closeList"
		tabindex="0"
		@keydown="keypressHandler"
	>
		<transition name="dropfade">
			<div
				v-show="is_open"
				ref="list"
				class="list"
				:style="{'min-width' : this.minWidth, 'max-height' : this.maxListHeight, 'top' : this.list_top, 'bottom' : this.list_bottom}"
				@mouseleave="closeListOnMouseLeave()">
				<div class="selection-options">
					<strong>Select:</strong> <a @click="selectAll()" href="javascript:void(0)">All</a> | <a @click="selectNone()" href="javascript:void(0)">None</a>
				</div>
				<template v-for="(options_group, index) in wrappedOptions">
					<r-checklist
						class="stacked"
						v-if="Array.isArray(options_group)"
						v-model="local_value"
						:key="index"
						:options="options_group"
					/>
					<div v-else class="subtitle">{{options_group}}</div>
				</template>
			</div>
		</transition>
		<div class="display" @click="toggleList">
			<span v-if="value.length === 0" class="none-selected">{{placeholder}}</span>
			<span v-else-if="typeof template === 'function'" class="selected-items" v-html="template(value)"/>
			<span v-else="" class="selected-items">{{value.length}} Selected</span>
		</div>
	</div>
</template>

<script>
import { flatten, some } from 'lodash';
import Checklist from './Checklist';
import formField from '../mixins/formField';
import { mixin as clickaway } from 'vue-clickaway';

export default {
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
		},
		template : {
			type : Function
		},
		disabled : Boolean,
		closeOnMouseOut : false
	},
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
	computed : {
		wrappedOptions() {
			if (!some(this.options, (option) => {
				return Array.isArray(option);
			})) {
				return [this.options];
			}
			return this.options;
		},
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
						let use_default;
						if (vm.$listeners.change) {
							use_default = vm.$listeners.change(event);
						}
						if (use_default !== false) {
							vm.dirty = true;
							vm.changeHandler(event);
							vm.validate();
						}
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
	watch : {
		local_value(new_value) {
			this.dirty = true;
			this.$emit('input', new_value);
		},
		options : {
			handler(new_value, old_value) {
				let options = new_value.filter((group) => {
					return Array.isArray(group);
				});
				if (options.length > 0) {
					options = flatten(options);
				}
				else {
					options = new_value;
				}
				options = options.map((option) => {
					if (option instanceof Object) {
						return option.value;
					}
					return option;
				});

				this.local_value = this.local_value.filter((value) => {
					return options.indexOf(value) > -1;
				});
			},
			deep : true
		}
	},
	methods : {
		changeHandler(value) {
			this.local_value = value;
			this.$emit('input', this.local_value);
		},
		toggleList() {
			if (!this.disabled) {
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
			}
		},
		closeList() {
			if (this.is_open) {
				this.is_open = false;
			}
		},
		closeListOnMouseLeave() {
			if (this.closeOnMouseOut) {
				this.closeList();
			}
		},
		selectAll() {
			this.local_value = [];
			this.wrappedOptions.forEach((option_group) => {
				if (Array.isArray(option_group)) {
					option_group.forEach((option) => {
						this.local_value.push(option.value || option);
					});
				}
			});
			this.$emit('input', this.local_value);
		},
		selectNone() {
			this.local_value = [];
			this.$emit('input', this.local_value);
		},
		keypressHandler(event) {
			let key = event.keyCode || event.which;
			if (!this.is_open && key === 32) {
				event.preventDefault();
				this.is_open = true;

				this.$nextTick(() => {
					this.$refs.list.querySelector('input').focus();
				});
			}
			if (this.is_open && key === 27) {
				event.preventDefault();
				this.is_open = false;

				this.$el.focus();
			}
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