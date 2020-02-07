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
import { differenceBy, includes, merge, some, sortBy, uniq, without } from 'lodash';
import { Sortable, MultiDrag } from 'sortablejs';

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
			changed : false
		};
	},
	computed : {
		active() {
			if (this.changed) {
				// WATCH FOR DEEP CHANGES
			}
			let value = this.value.map((item) => {
				if (typeof item === 'string') {
					return {
						label : item,
						value : item
					}
				}
				else {
					return item;
				}
			});
			if (this.sort) {
				if (typeof this.sort === 'function') {
					value = this.sort(value);
				}
				else {
					value = sortBy(value, 'label');
				}
			}
			return value;
		},
		inactive() {
			if (this.changed) {
				// WATCH FOR DEEP CHANGES
			}
			let options = this.options.map((option) => {
				if (typeof option === 'string') {
					return {
						label : option,
						value : option
					}
				}
				else {
					return option;
				}
			});
			let value = differenceBy(options, this.active, 'value');
			if (this.sort) {
				if (typeof this.sort === 'function') {
					value = this.sort(value);
				}
				else {
					value = sortBy(value, 'label');
				}
			}
			return value;
		},
		mergedSortableOptions() {
			if (this.disabled) {
				return merge({}, this.sortableOptions, {
					disabled : true
				});
			}
			return this.sortableOptions;
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
		moveSelected(to, all) {
			if (to === 'inactive') {
				if (all) {
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
					let values = this.options.map((option) => {
						if (typeof option === 'string') {
							return {
								label : option,
								value : option
							};
						}
						return option;
					});
					this.emitNewValue(values);
				}
				else {
					let new_value = this.active.concat(this.selected_inactive);
					this.emitNewValue(new_value);
				}
			}
			this.resetSelection();
		},
		emitNewValue(value) {
			if (this.sort) {
				if (typeof this.sort === 'function') {
					value = this.sort(value);
				}
				else {
					value = sortBy(value, 'label');
				}
			}
			value = value.map(item => item.value);
			this.$emit('input', value);
		}
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
							values.push(item.dataset);
						});
						vnode.context['selected_' + id] = uniq(values);
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
								values.push(item.dataset);
							});
							vnode.context['selected_' + id] = uniq(values);
						}, 0);
					},
					onSort(event) {
						let new_value = false;
						if (includes(event.to.classList, 'active') && includes(event.from.classList, 'active')) {
							new_value = vnode.context.active;
						}
						if (includes(event.to.classList, 'inactive') && includes(event.from.classList, 'inactive')) {
							new_value = vnode.context.inactive;
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
							vnode.context.emitNewValue(new_value);
						}
					},
					onAdd(event) {
						if (includes(event.to.classList, 'active')) {
							let new_value = vnode.context.active;
							if (event.items.length > 0) {
								event.items.forEach((item, index) => {
									new_value.splice(event.newIndicies[index].index, 0, item.dataset);
								});
							}
							else {
								new_value.splice(event.newIndex, 0, event.item.dataset);
							}
							vnode.context.emitNewValue(new_value);
						}
					},
					onRemove(event) {
						if (includes(event.from.classList, 'active')) {
							let removed_values = [];
							if (event.items.length > 0) {
								event.items.forEach((item) => {
									removed_values.push(item.dataset.value);
								});
							}
							else {
								removed_values.push(event.item.dataset.value);
							}
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

<style lang="less">
@import (optional) '~remix-ui-styles/GroupSelect.less';
</style>