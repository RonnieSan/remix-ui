<template>
	<div :class="['group-select-wrapper', {'disabled' : disabled}]" tabindex="-1">
		<div class="active group-column">
			<div class="group-column-header">{{activeHeader}}</div>
			<ul
				v-sortable="mergedSortableOptions"
				class="list-group active"
				:style="{maxHeight : maxHeight}"
			>
				<li
					v-for="(item, index) in active"
					:class="['list-group-item']"
					:key="item.value"
					:data-label="item.label || item.value"
					:data-value="item.value"
				>
					{{item.label}}
				</li>
			</ul>
		</div>
		<div class="input-controls">
			<div class="control-spacer"/>
			<div class="control-buttons">
				<r-button :disabled="disabled" class="icon" icon="chevron-double-left" @click="moveSelected('active', true)"/>
				<r-button :disabled="disabled" class="icon" icon="chevron-left" @click="moveSelected('active')"/>
				<r-button :disabled="disabled" class="icon" icon="chevron-right" @click="moveSelected('inactive')"/>
				<r-button :disabled="disabled" class="icon" icon="chevron-double-right" @click="moveSelected('inactive', true)"/>
			</div>
		</div>
		<div class="inactive group-column">
			<div class="group-column-header">{{inactiveHeader}}</div>
			<ul
				v-sortable="mergedSortableOptions"
				class="list-group inactive"
				:style="{maxHeight : maxHeight}"
			>
				<li
					v-for="(item, index) in inactive"
					:class="['list-group-item']"
					:key="item.value"
					:data-label="item.label || item.value"
					:data-value="item.value"
				>
					{{item.label}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import rButton from './Button';
import { clone, differenceWith, find, includes, isEqual, merge, pick, remove, some, sortBy, uniqWith } from 'lodash';
import Sortable, { MultiDrag } from 'sortablejs';

Sortable.mount(new MultiDrag());

export default {
	props : {
		activeHeader : {
			type : String,
			default : 'Selected Options'
		},
		inactiveHeader : {
			type : String,
			default : 'Available Options'
		},
		maxHeight : {
			type : String,
			default : '250px'
		},
		options : {
			type : Array,
			required : true
		},
		sortableOptions : {
			type : Object,
			default() {
				return {};
			}
		},
		value : {
			type : Array,
			required : true
		},
		sort : {
			type : [Boolean, Function],
			default : false
		},
		disabled : Boolean
	},
	data() {
		return {
			selected_active : [],
			selected_inactive : [],
			mapped_options : [],
			active : [],
			inactive : []
		};
	},
	computed : {
		mergedSortableOptions() {
			if (this.disabled) {
				return merge({}, this.sortableOptions, {
					disabled : true
				});
			}
			return this.sortableOptions;
		}
	},
	watch : {
		value : {
			handler(new_value, old_value) {
				if (!isEqual(new_value, old_value)) {
					this.setListValues(new_value);
				}
			},
			deep : true
		},
		options : {
			handler(new_value, old_value) {
				if (!isEqual(new_value, old_value)) {
					this.initComponent();
				}
			},
			deep : true
		}
	},
	methods : {
		isSelected(item) {
			if (this.selected_active.indexOf(item) > -1 || this.selected_inactive.indexOf(item) > -1) {
				return true;
			}
			return false;
		},
		resetSelection() {
			this.selected_active   = [];
			this.selected_inactive = [];
		},
		setListValues(value) {
			// Map the value into a collection
			let mapped_value = value.map((item) => {
				let item_value = item;
				try {
					if (typeof item !== 'object') {
						item_value = JSON.stringify(item);
					}
					else {
						item_value = JSON.stringify(item.value);
					}
				}
				catch (err) {
					// Do nothing
				}

				// Get the option version of the value
				return clone(find(this.mapped_options, {value : item_value}));
			});

			// Set the active options
			this.active = [];
			mapped_value.forEach((item, index) => {
				let option_item = find(this.mapped_options, {value : item.value});
				if (option_item) {
					this.active.push(option_item);
				}
			});

			// Remove active values from the inactive collection
			remove(this.inactive, (item, index) => {
				return find(this.active, {value : item.value});
			});

			// Add missing options to the inactive collection
			let missing_options = differenceWith(this.mapped_options, this.inactive.concat(this.active), isEqual);
			this.inactive = uniqWith(this.inactive.concat(missing_options), isEqual);

			// Sort the values
			if (this.sort) {
				if (typeof this.sort === 'function') {
					this.active = this.sort(this.active);
					this.inactive = this.sort(this.inactive);
				}
				else {
					this.active = sortBy(this.active, 'label');
					this.inactive = sortBy(this.inactive, 'label');
				}
			}
		},
		moveSelected(to, all) {
			if (to === 'inactive') {
				if (all) {
					this.inactive = this.mapped_options.slice();
					this.emitNewValue([]);
				}
				else {
					let new_value = this.active.filter((item) => {
						return !some(this.selected_active, (selected_item) => {
							return selected_item.value === item.value;
						});
					});
					this.emitNewValue(new_value);
				}
			}
			else {
				if (all) {
					this.emitNewValue(this.mapped_options);
				}
				else {
					let new_value = this.active.concat(this.selected_inactive);
					this.emitNewValue(new_value);
				}
			}
			this.resetSelection();
		},
		emitNewValue(value) {
			this.$nextTick(() => {
				if (this.sort) {
					if (typeof this.sort === 'function') {
						value = this.sort(value);
					}
					else {
						value = sortBy(value, 'label');
					}
				}

				// Extract the parsed value
				value = value.map((item) => {
					try {
						let parsed_value = item.value;
						parsed_value = JSON.parse(item.value);
						return parsed_value;
					}
					catch (err) {
						return item;
					}
				});
				this.$emit('input', value);
			});
		},
		initComponent() {
			// Map the options and set the default inactive values
			this.mapped_options = this.options.map((option) => {
				let stringified_option = clone(option);
				try {
					if (typeof option !== 'object') {
						stringified_option = {
							label : option.toString(),
							value : JSON.stringify(option)
						};
					}
					else {
						stringified_option.value = JSON.stringify(option.value);
					}
				}
				catch (err) {
					// Do nothing
				}
				return stringified_option;
			});

			// Remove values that are not in the options
			let sanitized_value = this.value.slice();
			remove(sanitized_value, (item) => {
				return !some(this.mapped_options, (mapped_option) => {
					let parsed_value = mapped_option.value;
					try {
						parsed_value = JSON.parse(mapped_option.value);
					}
					catch (err) {
						// Do nothing
					}
					return item === parsed_value;
				});
			});
			// Sort the options
			if (this.sort) {
				if (typeof this.sort === 'function') {
					this.mapped_options = this.sort(this.mapped_options);
				}
				else {
					this.mapped_options = sortBy(this.mapped_options, 'label');
				}
			}
			this.inactive = this.mapped_options.slice();

			if (!isEqual(sanitized_value, this.value)) {
				// Set the default active options
				this.emitNewValue(sanitized_value);
			}
			else {
				this.setListValues(this.value);
			}
		}
	},
	mounted()  {
		this.initComponent();
	},
	directives : {
		sortable : {
			bind(el, binding, vnode) {
				let options = merge({}, binding.value, {
					group : 'items',
					multiDrag : true,
					selectedClass : 'selected',
					onSelect(event) {
						let id = 'active';
						if (includes(event.target.classList, 'inactive')) {
							id = 'inactive';
						}

						// Add the selected class
						let class_list = event.item.className.split(' ');
						if (!includes(class_list, name)) {
							event.item.className += ' selected';
						}

						// Add the values to the selected list
						let values = [];
						event.items.forEach((item) => {
							values.push(pick(item.dataset, ['label', 'value']));
						});
						vnode.context['selected_' + id] = uniqWith(values, isEqual);
					},
					onDeselect(event) {
						let id = 'active';
						if (includes(event.target.classList, 'inactive')) {
							id = 'inactive';
						}

						setTimeout(() => {
							// Remove the selected class
							event.item.classList.remove('selected');
							
							// Remove values from the selected list
							let values = [];
							event.items.forEach((item) => {
								values.push(pick(item.dataset, ['label', 'value']));
							});
							vnode.context['selected_' + id] = uniqWith(values, isEqual);
						}, 0);
					},
					onSort(event) {
						let list = 'inactive';
						let new_value = false;
						if (includes(event.to.classList, 'active') && includes(event.from.classList, 'active')) {
							new_value = vnode.context.active.slice();
							list = 'active';
						}
						if (includes(event.to.classList, 'inactive') && includes(event.from.classList, 'inactive')) {
							new_value = vnode.context.inactive.slice();
							list = 'inactive';
						}
						if (new_value) {
							if (event.items.length > 0) {
								event.items.forEach((item, index) => {
									new_value.splice(event.newIndicies[index].index, 0, new_value.splice(event.oldIndicies[index].index, 1)[0]);
								});
							}
							else {
								new_value.splice(event.newIndex, 0, new_value.splice(event.oldIndex, 1)[0]);
							}

							if (list === 'active') {
								vnode.context.emitNewValue(new_value);
							}

							else {
								vnode.context.inactive = new_value;
							}
						}
					},
					onAdd(event) {
						if (includes(event.to.classList, 'active')) {
							let new_value = vnode.context.active.slice();
							if (event.items.length > 0) {
								event.items.forEach((item, index) => {
									new_value.splice(event.newIndicies[index].index, 0, pick(item.dataset, ['label', 'value']));
								});
							}
							else {
								new_value.splice(event.newIndex, 0, pick(event.item.dataset, ['label', 'value']));
							}
							vnode.context.emitNewValue(new_value);
						}
					},
					onRemove(event) {
						if (includes(event.from.classList, 'active')) {
							let removed_values = [];


							// Add values to the inactive list
							if (event.items.length > 0) {
								event.items.forEach((item, index) => {
									removed_values.push(item.dataset.value);
									vnode.context.inactive.splice(event.newIndicies[index].index, 0, pick(item.dataset, ['label', 'value']));
								});
							}
							else {
								removed_values.push(event.item.dataset.value);
								vnode.context.inactive.splice(event.newIndex, 0, pick(event.item.dataset, ['label', 'value']));
							}

							// Remove values from active list
							let new_value = vnode.context.active.filter((item) => {
								return !includes(removed_values, item.value);
							});
							vnode.context.emitNewValue(new_value);
						}
					},
					onEnd(event) {
						if (event.to !== event.from) {
							event.items.forEach((item) => {
								Sortable.utils.deselect(item);
							});
						}
					}
				});

				vnode.sortable = Sortable.create(el, options);
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/GroupSelect.less';
</style>