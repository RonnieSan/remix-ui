<template>
	<div class="pillbox-wrapper">
		<div class="inner">
			<div v-for="(item_value, index) in propValue" :class="['item', {'selected' : index === selected_item}]">
				<span class="value">{{item_value.label || item_value}}</span>
				<span class="remove-btn" @click="removeItem(index)">
					<svg viewBox="0 0 24 24">
					    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
					</svg>
				</span>
			</div>
			<div :class="['input', error_class]">
				<text-input
					ref="input"
					v-model="input_value"
					:name="name"
					:type="type"
					:allowed="allowed"
					:filter="filter"
					:mask="mask"
					:number="number"
					:outputMask="outputMask"
					v-on="listeners"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import formField from '../mixins/formField';
import { includes } from 'lodash';
import TextInput from './TextInput';

export default {
	data() {
		return {
			input_value   : this.inputValue,
			focused       : false,
			full_value    : this.propValue,
			masked        : this.outputMask || false,
			selected_item : null,
			error_class   : []
		};
	},
	props : {
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
		options : Array,
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
		inputValue : [String, Object],
		commit : {
			type : [Array, String],
			default : function() {
				return [
					'Enter',
					' ',
					','
				];
			}
		}
	},
	computed : {
		propValue() {
			return this.value;
		},
		listeners() {
			const vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					input(event) {
						vm.$emit('update:inputValue', vm.input_value);
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
	watch : {
		inputValue(new_value) {
			if (new_value.label) {
				this.input_value = new_value.label;
			}
			else {
				this.input_value = new_value;
			}
		}
	},
	methods : {
		commitValue(value) {
			let obj_value;
			if (this.options) {
				obj_value = this.options.find((option) => {
					if (option.label) {
						return (option.label === value);
					}
					return (option === value);
				});

				if (obj_value && obj_value.value) {
					value = obj_value.value;
				}
			}
			if (value && !includes(this.propValue, value)) {
				if (value.length > 0) {
					if (this.number === 'true') {
						value = Number(value);
					}

					let matched = true;
					if (this.pattern) {
						let pattern = new RegExp(this.pattern);
						matched = pattern.test(value);
					}

					if (matched) {
						this.dirty = true;
						let new_array = this.propValue.slice();
						new_array.push(obj_value || value);
						this.$emit('input', new_array);
						this.validate();
						this.input_value = '';
					}
					else {
						this.error_class = 'errored';
						this.$nextTick(() => {
							this.error_class = null;
						});
					}
				}
			}
		},
		keydownHandler(event) {
			let value = this.input_value;

			// Backspace erases the last entry
			if (event.key === 'Backspace' && value.length === 0) {
				if (this.selected_item !== null) {
					this.removeItem(this.propValue.length - 1);
					this.selected_item = null;
				}
				else {
					this.selected_item = (this.propValue.length - 1);
				}
			}

			// Commit the change based on specific keys
			else if (includes(this.commit, event.key)) {
				event.preventDefault();
				this.commitValue(value);
			}

			else {
				this.selected_item = null;
			}
		},
		removeItem(index) {
			let new_array = this.propValue.slice();
			new_array.splice(index, 1);
			this.$emit('input', new_array);
			this.validate();
		}
	},
	mixins : [
		formField
	],
	components : {
		TextInput
	},
	mounted() {
		if (this.mask) {
			this.$refs.input.$el.addEventListener('keydown', this.keydownHandler);
		}
	},
	beforeDestroy() {
		if (this.mask) {
			this.$refs.input.$el.removeEventListener('keydown', this.keydownHandler);
		}
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Pillbox.less';
</style>