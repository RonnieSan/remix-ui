<template>
	<div class="radio-group" tabindex="-1">
		<div class="option" v-for="(option, index) in options">
			<r-radio
				ref="input"
				:name="name"
				:value="option.value || option"
				:model="value"
				@change="changeHandler"
			><span v-html="option.label || option"/></r-radio>
		</div>
	</div>
</template>

<script>
import rRadio from './Radio';
import formField from '../mixins/formField';

export default {
	data() {
		return {
			local_value : this.value
		};
	},
	props : {
		name : String,
		value : {
			type : [String, Number, Boolean]
		},
		options : {
			type : Array,
			default() {
				return [];
			}
		}
	},
	watch : {
		'value' : {
			handler(new_value, old_value) {
				if (new_value !== old_value) {
					this.local_value = this.value;
				}
			}
		}
	},
	methods : {
		changeHandler(value) {
			this.$emit('input', value);
			this.validate();
		}
	},
	components : {
		rRadio
	},
	mixins : [
		formField
	]
};
</script>

<style lang="less" scoped>
// Default variables
@mobile-window-max: 767px;

// Import theme
@import (optional, reference) '~theme';

.radio-group {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;

	&:focus {
		outline: 0;
	}

	> .option {
		flex: 0 0 auto;
		margin-right: 2em;

		&:last-child {
			margin-right: 0;
		}
	}

	@media screen and (max-width: @mobile-window-max) {
		flex-direction: column;
		margin-right: 0;
	}
}
</style>