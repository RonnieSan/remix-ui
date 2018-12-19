<template>
	<div
		class="autocomplete-wrapper"
		@keydown="keydownHandler"
		@keypress="update_filters = true;"
		@input="androidInputHandler"
		@focusin="focusinHandler"
	    v-on-clickaway="closeOptions">
		<slot></slot>
		<div v-if="filtered_options.length > 0 && !loading_data" class="autocomplete-options">
			<div
				v-for="(option, index) in filtered_options" :key="index"
				:class="['option', {'selected' : (selected_index === index)}]"
				@click="clickHandler($event, option)"
				@mouseover="selected_index = index"
				@mouseout="selected_index = -1"
			>{{option.label || option}}</div>
		</div>
		<div class="autocomplete-loading autocomplete-options" v-else-if="loading_data">
			<div class="option">Loading...</div>
		</div>
	</div>
</template>

<script>
import fuzzy from 'fuzzy';
import { mixin as clickaway } from 'vue-clickaway';

export default {
	data() {
		return {
			filtered_options : [],
			original_value   : '',
			selected_index   : -1,
			selected_value   : '',
			update_filters   : false,
			loading_data     : false,
			is_android       : /(android)/i.test(window.navigator.userAgent)
		};
	},
	props : {
		value : {
			type : [String, Object]
		},
		settings : {
			type : Object,
			default() {
				return {
					min_length : 2
				};
			}
		},
		options : {
			type : [Array, Function],
			default() {
				return [];
			}
		}
	},
	watch : {
		value(new_value, old_value) {
			if (this.update_filters) {
				this.original_value = this.value;
				this.getNewOptions(new_value);
				this.update_filters = false;
			}
		}
	},
	methods : {
		focusinHandler() {
			// Save focus of the wrapped element
			this.focus_element = document.activeElement;
			this.getNewOptions(this.value);
		},
		closeOptions() {
			this.$nextTick(() => {
				this.filtered_options = [];
				this.original_value   = '';
				this.selected_index   = -1;
				this.selected_value   = '';
			});
		},
		clickHandler(event, value) {
			event.preventDefault();
            event.stopPropagation();

			this.$emit('input', value);
			this.$nextTick(() => {
				this.focus_element.focus();
				this.closeOptions();
			});
		},
		getNewOptions(value) {
			if (value.length >= this.settings.min_length) {
				this.selected_index = -1;
                this.selected_value = '';

                if (typeof this.options === 'function') {
                    const option = this.options(value)
                    if (option && typeof option.then === 'function') {
                        this.loading_data = true

                        option.then((choices) => {
                            this.filtered_options = choices
                            this.loading_data = false
                        }).catch((err) => {
                            // Silent fail
                        })
                    }
                }
                else {
					let choices = fuzzy.filter(value, this.options);
					this.filtered_options = choices.map((choice) => choice.string);
				}
			}
			else {
				this.filtered_options = [];
			}
		},
		keydownHandler(event) {
			let code = event.which || event.keyCode;

			switch (code) {

				// Up arrow
				case 38:
					event.preventDefault();
					event.stopPropagation();
					if (this.selected_index > -1) {
						this.selected_index--;
						if (this.selected_index < 0) {
							this.selected_value = this.value;
						}
						else {
							this.selected_value = this.filtered_options[this.selected_index];
						}
						this.$emit('selected', this.selected_value);
					}
					break;

				// Down arrow
				case 40:
					event.preventDefault();
					event.stopPropagation();
					if (this.selected_index < (this.filtered_options.length - 1)) {
						this.selected_index++;
						this.selected_value = this.filtered_options[this.selected_index];
						this.$emit('selected', this.selected_value);
					}
					break;

				// Enter
				case 13:
					event.preventDefault();
                    event.stopPropagation();

					if (this.selected_value !== '') {
                        this.$emit('input', this.selected_value);
						this.closeOptions();
					}
					break;

				// Escape
				case 27:
					event.preventDefault();
					event.stopPropagation();
					this.$emit('input', this.original_value);
					this.closeOptions();
					break;

				// Backspace or Delete
				case 8:
				case 46:
					this.update_filters = true;
					break;

				default:
					this.selected_index = -1;
					break;
			}
		},
		androidInputHandler() {
			if (this.is_android) {
				this.update_filters = true;
			}
		}
	},
	mixins : [
		clickaway
	],
	mounted() {
		// Turn off native auto complete on child element
		this.$el.querySelector('input').setAttribute('autocomplete', 'off');
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Autocomplete.less';
</style>
