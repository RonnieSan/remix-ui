<template>
	<div
		:class="['r-multi-text', 'control-border', 'focusable', {disabled}]"
		@focusout="touched = true; validate();"
	>
		<div class="sortable" v-sortable="options">
			<div
				v-for="(item, index) in local_value"
				class="input-row"
				:key="item.key"
			>
				<div class="handle icon">
					<svg viewBox="0 0 24 24">
					    <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
					</svg>
				</div>
				<text-input
					:ref="item.key"
					:name="name"
					:type="type"
					:value="item.value"
					:allowed="allowed"
					:filter="filter"
					:mask="mask"
					:number="number"
					:outputMask="outputMask"
					:placeholder="placeholder"
					:disabled="disabled"
					v-on="listeners"
					@input="updateItem($event, index)"
				/>
				<div class="button icon" @click="deleteItem(index)">
					<svg viewBox="0 0 24 24">
					    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
					</svg>
				</div>
			</div>
		</div>
		<div
			class="input-row add"
			tabindex="0"
			@click="addItem"
			@keypress="keypressHandler"
		>
			<div class="text-input">{{addText}}</div>
			<div class="button icon add">
				<svg viewBox="0 0 24 24">
				    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
import { uuid } from 'uuidv4';
import formField from '../mixins/formField';
import { isEqual, map, merge } from 'lodash-es';
import Sortable from 'sortablejs';
import TextInput from './TextInput';

export default {
	props : {
		addText : {
			type : String,
			default : 'Add Item'
		},
		allowed : {
			type : [String, Boolean],
			default : false
		},
		filter : {
			type: Function,
			default : (value) => {
				return value;
			}
		},
		mask : {
			type : [String, Boolean],
			default : false
		},
		number : {
			type : Boolean,
			default: false
		},
		outputMask : {
			type : Boolean,
			default : false
		},
		placeholder : {
			type : String,
			default : ''
		},
		type : {
			type : String,
			default : 'text'
		},
		value : Array,
		disabled : Boolean
	},
	data() {
		return {
			local_value : this.addKeys(this.value),
			focused : false,
			options : {
				draggable : '.input-row',
				handle    : '.handle'
			}
		};
	},
	computed : {
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					input(event) {
						vm.dirty = true;
						vm.validate();
					}
				}
			);
		}
	},
	watch : {
		value(new_value) {
			if (!isEqual(new_value, map(this.local_value, 'value'))) {
				this.local_value = new_value.map((item, index) => {
					return {
						key   : uuid(),
						value : item
					};
				});
			}
		}
	},
	methods : {
		focus() {
			this.$refs.items[0].focus();
		},
		addKeys(value) {
			let new_value = value.map((item, index) => {
				return {
					key   : uuid(),
					value : item
				};
			});
			return new_value;
		},
		addItem() {
			if (!this.disabled) {
				let key = uuid();
				this.local_value.push({
					key   : key,
					value : ''
				});
				this.$nextTick(() => {
					this.$refs[key][0].focus();
				});
			}
		},
		updateItem(value, index) {
			this.$set(this.local_value[index], 'value', value);
			this.$emit('input', map(this.local_value, 'value'));
		},
		deleteItem(index) {
			this.local_value.splice(index, 1);
			this.$nextTick(() => {
				this.$emit('input', map(this.local_value, 'value'));
			});
		},
		sortItems(values) {
			this.$emit('input', values);
		},
		keypressHandler(event) {
			let key = event.keyCode || event.which;
			if (key === 32) {
				event.preventDefault();
				this.addItem();
			}
		}
	},
	directives : {
		sortable : {
			bind(el, binding, vnode) {
				let options = merge({}, binding.value, {
					onEnd : (event) => {
						let values = map(vnode.context.local_value, 'value');
						values.splice(event.newIndex, 0, values.splice(event.oldIndex, 1)[0]);
						vnode.context.sortItems(values);
					}
				});

				vnode.sortable = Sortable.create(el, options);
			}
		}
	},
	mixins : [
		formField
	],
	components : {
		TextInput
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/MultiText.less';
</style>