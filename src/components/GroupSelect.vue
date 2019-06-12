<template>
	<div class="group-select-wrapper" tabindex="-1">
		<div class="active group-column">
			<div class="group-column-header">{{activeHeader}}</div>
			<ul
				v-sortable="sortableOptions"
				id="active"
				class="list-group active"
				:style="{maxHeight : maxHeight}"
			>
				<li
					v-for="(item, index) in active"
					:class="['list-group-item']"
					:key="item.value"
					:data-value="item.value"
				>
					{{item.label}}
				</li>
			</ul>
		</div>
		<div class="input-controls">
			<div class="control-buttons">
				<r-button class="icon" icon="chevron-double-left" @click="moveSelected('active', true)"/>
				<r-button class="icon" icon="chevron-left" @click="moveSelected('active')"/>
				<r-button class="icon" icon="chevron-right" @click="moveSelected('inactive')"/>
				<r-button class="icon" icon="chevron-double-right" @click="moveSelected('inactive', true)"/>
			</div>
		</div>
		<div class="inactive group-column">
			<div class="group-column-header">{{inactiveHeader}}</div>
			<ul
				v-sortable="sortableOptions"
				id="inactive"
				class="list-group inactive"
				:style="{maxHeight : maxHeight}"
			>
				<li
					v-for="(item, index) in inactive"
					:class="['list-group-item']"
					:key="item.value"
					:data-value="item.value"
				>
					{{item.label}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { differenceBy, includes, merge, sortBy, uniq, without } from 'lodash';
import rButton from './Button';
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
		}
	},
	data() {
		return {
			selected_active : [],
			selected_inactive : []
		};
	},
	computed : {
		active() {
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
			return sortBy(value, 'label');
		},
		inactive() {
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
			return sortBy(value, 'label');
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
					this.$emit('input', []);
				}
				else {
					let new_value = this.active.filter((item) => {
						return !includes(this.selected_active, item.value);
					});
					this.$emit('input', new_value.map(item => item.value));
				}
			}
			else {
				if (all) {
					let values = this.options.map((option) => {
						if (typeof option === 'string') {
							return option;
						}
						return option.value;
					});
					this.$emit('input', values);
				}
				else {
					let new_value = this.active.map(item => item.value).concat(this.selected_inactive);
					this.$emit('input', new_value);
				}
			}
			this.resetSelection();
		}
	},
	directives : {
		sortable : {
			bind(el, binding, vnode) {
				let options = merge({}, binding.value, {
					group : 'items',
					multiDrag : true,
					selectedClass : 'selected',
					animation : 150,
					onSelect(event) {
						// Add the selected class
						let class_list = event.item.className.split(' ');
						if (!includes(class_list, name)) {
							event.item.className += ' selected';
						}

						// Add the values to the selected list
						let values = [];
						event.items.forEach((item) => {
							values.push(item.dataset.value);
						});
						vnode.context['selected_' + event.to.id] = uniq(values);
					},
					onDeselect(event) {
						setTimeout(() => {
							// Remove the selected class
							event.item.className = event.item.className.replace(/\bselected\b/g, '');
							
							// Remove values from the selected list
							let values = [];
							event.items.forEach((item) => {
								values.push(item.dataset.value);
							});
							vnode.context['selected_' + event.to.id] = uniq(values);
						}, 0);
					},
					onAdd(event) {
						if (event.to.id === 'active') {
							let added_values = [];
							if (event.items.length > 0) {
								event.items.forEach((item) => {
									added_values.push(item.dataset.value);
								});
							}
							else {
								added_values.push(event.item.dataset.value);
							}
							let new_value = vnode.context.active.map(item => item.value).concat(added_values);
							vnode.context.$emit('input', new_value);
						}
					},
					onRemove(event) {
						if (event.from.id === 'active') {
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
							vnode.context.$emit('input', new_value);
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