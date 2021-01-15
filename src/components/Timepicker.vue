<template>
	<div :class="['r-timepicker', 'control-border', 'focusable', {disabled}]" tabindex="-1">
		<slot name="left"></slot>
		<div class="inputs">
			<input
				ref="hour_input"
				type="text"
				name="hour"
				maxlength="2"
				placeholder="--"
				autocomplete="off"
				:disabled="disabled"
				v-model="hour"
				@focus="$refs.hour_input.select()"
				@keypress="setHour($event, $event.key)"
				@keydown="keydownHandler($event, 'hour')"
				@blur="setHour($event)"
			>
			<span class="separator fit"></span>
			<input
				ref="minute_input"
				type="text"
				name="minute"
				maxlength="2"
				placeholder="--"
				autocomplete="off"
				:disabled="disabled"
				v-model="minute"
				@focus="$refs.minute_input.select()"
				@keypress="setMinute($event, $event.key)"
				@keydown="keydownHandler($event, 'minute')"
				@blur="setMinute($event)"
			>
			<template v-if="mergedSettings.seconds">
				<span class="separator fit"></span>
				<input
					class="fit"
					ref="second_input"
					type="text"
					name="seconds"
					maxlength="2"
					placeholder="--"
					autocomplete="off"
					:disabled="disabled"
					v-model="second"
					@focus="$refs.second_input.select()"
					@keypress="setSecond($event, $event.key)"
					@keydown="keydownHandler($event, 'second')"
					@blur="setSecond($event)"
				>
			</template>
			<input
				v-if="!mergedSettings.military"
				ref="period_input"
				type="text"
				name="period"
				maxlength="2"
				placeholder="--"
				autocomplete="off"
				:disabled="disabled"
				v-model="period"
				@focus="$refs.period_input.select()"
				@keypress.prevent="setPeriod"
				@keydown="keydownHandler($event, 'period')"
			>
		</div>
		<slot name="right"></slot>
	</div>
</template>

<script>
import { debounce, defaultsDeep, padStart } from 'lodash';

export default {
	props : {
		value : {
			type : String
		},
		settings : {
			type : Object,
			default() {
				return {};
			}
		},
		disabled : {
			type : Boolean,
			default : false
		}
	},
	data() {
		return {
			hour : '',
			minute : '',
			second : '',
			period : 'AM'
		};
	},
	computed : {
		mergedSettings() {
			return defaultsDeep({}, this.settings, {
				hour_interval : 1,		// The interval of hours you are allowed to set
				minute_interval : 1,	// The interval of minutes you are allowed to set
				second_interval : 1,	// The interval of seconds you are allowed to set
				military : false,		// Use 24-hour clock
				seconds : false			// Show seconds
			});
		}
	},
	watch : {
		value(new_value, old_value) {
			if (new_value !== old_value) {
				this.setTimeValue(new_value);
			}
		}
	},
	methods : {
		keydownHandler(event, field) {
			let ref = this.$refs[field + '_input'];
			
			switch(event.key) {
				case 'ArrowUp':
					if (field === 'period') {
						this.period = (this.period === 'AM' ? 'PM' : 'AM');
					}
					else {
						this[field] = +this[field] + this.mergedSettings[field + '_interval'];
					}
					break;
				case 'ArrowDown':
					if (field === 'period') {
						this.period = (this.period === 'AM' ? 'PM' : 'AM');
					}
					else {
						this[field] = +this[field] - this.mergedSettings[field + '_interval'];
					}
					break;
			}

			if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
				// Readjust the time

				// HOURS
				if (this.mergedSettings.military) {
					if (this.hour >= 24) {
						this.hour = '01';
					}
					if (this.hour <= 0) {
						this.hour = '23'
					}
				}
				else {
					if (this.hour > 12) {
						this.hour = '01';
					}
					if (this.hour === 0) {
						this.hour = '12';
					}
				}
				this.hour = padStart(this.hour, 2, '0');

				// MINUTES
				if (this.minute >= 60) {
					this.minute = '00';
				}
				if (this.minute < 0) {
					this.minute = '59'
				}
				this.minute = padStart(this.minute, 2, '0');

				// SECONDS
				if (this.second >= 60) {
					this.second = '00';
				}
				if (this.second < 0) {
					this.second = '59'
				}
				this.second = padStart(this.second, 2, '0');

				this.$nextTick(() => {
					this.setValue();
					
					// Select the whole field
					this.$refs[field + '_input'].select();
				});
			}			
		},
		setHour(event, key) {
			// Add the zero on blur
			if (typeof key === 'string') {
				// Do not allow non-number values
				if (isNaN(parseInt(key, 10))) {
					event.preventDefault();
					event.stopPropagation();
					return false;
				}

				// Get the string and integer values
				let new_string_value = key;
				if (this.hour.length === 1) {
					new_string_value = this.hour.toString() + key;
				}
				let new_int_value = parseInt(new_string_value, 10);
				
				// Check for time format
				if (!this.mergedSettings.military) {
					// Check if the first number if greater than 1
					if (this.hour.length !== 1
						&& parseInt(key, 10) > 1) {
						new_string_value = padStart(key, 2, '0');
					}

					// Check if the hour is greater than 12
					else if (new_int_value > 12) {
						new_string_value = padStart(key, 2, '0');
					}

					if (new_string_value.length === 1
						&& new_int_value > 1) {
						new_string_value = padStart(new_string_value, 2, '0');
					}
				}
				else {
					if ((this.hour.length !== 1)
						&& parseInt(key, 10) > 2) {
						new_string_value = padStart(key, 2, '0');
					}

					else if (new_int_value > 23) {
						new_string_value = padStart(key, 2, '0');
					}
				}

				this.hour = new_string_value.toString();
				event.preventDefault();
				
				if (new_string_value.length === 2) {
					// Set the hour according to the interval
					let int_val = parseInt(new_string_value, 10);
					this.hour = padStart((Math.round(int_val / this.mergedSettings.hour_interval) * this.mergedSettings.hour_interval).toString(), 2, '0');

					this.$nextTick(() => {
						this.setValue();
						this.$refs.minute_input.focus();
					});
				}
			}
			else {
				// Add leading 0 on blur
				if (this.hour.length === 1) {
					this.hour = padStart(this.hour, 2, '0');
				}

				// Set the hour according to the interval
				let int_val = parseInt(this.hour, 10);
				this.hour = padStart((Math.round(int_val / this.mergedSettings.hour_interval) * this.mergedSettings.hour_interval).toString(), 2, '0');

				this.$nextTick(() => {
					this.setValue();
				});
			}
		},
		setMinute(event, key) {
			// Add the zero on blur
			if (typeof key === 'string') {
				// Do not allow non-number values
				if (isNaN(parseInt(key, 10))) {
					event.preventDefault();
					event.stopPropagation();
					return false;
				}

				// Get the string and integer values
				let new_string_value = key;
				if (this.minute.length === 1) {
					new_string_value = this.minute.toString() + key;
				}
				let new_int_value = parseInt(new_string_value, 10);
				
				// If the number starts with anything over 5, it's probably a single digit
				if (this.minute.length !== 1
					&& parseInt(key, 10) > 5) {
					new_string_value = padStart(key, 2, '0');
				}

				else if (new_int_value > 59) {
					new_string_value = key;
				}

				this.minute = new_string_value.toString();
				event.preventDefault();
				
				if (new_string_value.length === 2) {
					// Set the minute according to the interval
					let int_val = parseInt(new_string_value, 10);
					this.minute = padStart((Math.round(int_val / this.mergedSettings.minute_interval) * this.mergedSettings.minute_interval).toString(), 2, '0');

					this.$nextTick(() => {
						this.setValue();
						if (this.mergedSettings.seconds) {
							this.$refs.second_input.focus();
						}
						else {
							this.$refs.period_input.focus();
						}
					});
				}
			}
			else {
				// Add leading 0 on blur
				if (this.minute.length === 1) {
					this.minute = padStart(this.minute, 2, '0');
				}

				// Set the minute according to the interval
				let int_val = parseInt(this.minute, 10);
				this.minute = padStart((Math.round(int_val / this.mergedSettings.minute_interval) * this.mergedSettings.minute_interval).toString(), 2, '0');

				this.$nextTick(() => {
					this.setValue();
				});
			}
		},
		setSecond(event, key) {
			if (typeof key === 'string') {
				// Do not allow non-number values
				if (isNaN(parseInt(key, 10))) {
					event.preventDefault();
					event.stopPropagation();
					return false;
				}

				// Get the string and integer values
				let new_string_value = key;
				if (this.second.length === 1) {
					new_string_value = this.second + key;
				}
				let new_int_value = parseInt(new_string_value, 10);
				
				// If the number starts with anything over 5, it's probably a single digit
				if (this.second.length !== 1
					&& parseInt(key, 10) > 5) {
					new_string_value = padStart(key, 2, '0');
				}

				else if (new_int_value > 59) {
					new_string_value = key;
				}

				this.second = new_string_value;
				event.preventDefault();
				
				if (new_string_value.length === 2) {
					// Set the second according to the interval
					let int_val = parseInt(new_string_value, 10);
					this.second = padStart((Math.round(int_val / this.mergedSettings.second_interval) * this.mergedSettings.second_interval).toString(), 2, '0');

					this.$nextTick(() => {
						this.setValue();
						if (!this.mergedSettings.military) {
							this.$refs.period_input.focus();
						}
					});
				}
			}
			else {
				// Add leading 0 on blur
				if (this.second.length === 1) {
					this.second = padStart(this.second, 2, '0');
				}

				// Set the second according to the interval
				let int_val = parseInt(this.second, 10);
				this.second = padStart((Math.round(int_val / this.mergedSettings.second_interval) * this.mergedSettings.second_interval).toString(), 2, '0');

				this.$nextTick(() => {
					this.setValue();
				});
			}
		},
		setPeriod(event) {
			if (event.key === 'a' || event.key === 'A') {
				this.period = 'AM';
			}
			else if (event.key === 'p' || event.key === 'P') {
				this.period = 'PM';
			}
			this.$nextTick(() => {
				this.$refs.period_input.select();
				this.setValue();
			});
			return false;
		},
		setValue : debounce(function() {
			if (this.hour.length === 2 && this.minute.length === 2 && this.second.length === 2) {
				let hour = this.hour;
				if (!this.mergedSettings.military) {
					if (this.period === 'PM') {
						if (this.hour !== '12') {
							hour = padStart((parseInt(hour, 10) + 12).toString(), 2, '0');
						}
					}
					else {
						if (this.hour === '12') {
							hour = '00';
						}
					}
				}
				let minute = this.minute;
				let second = this.second || '00';
				if (!this.mergedSettings.seconds) {
					second = '00';
				}
				let value = [hour, minute, second].join(':');

				this.$emit('input', value);
			}
		}, 100, {
			trailing : true
		}),
		setTimeValue(value) {
			if (!value) {
				value = '00:00:00';
			}
			let time_parts = value.split(':');
			let hour   = parseInt(time_parts[0], 10);
			let minute = parseInt(time_parts[1], 10);
			let second = parseInt(time_parts[2], 10);
			let period = this.period;

			// Go up from seconds
			if (second > 59) {
				minute += Math.floor(second / 60);
				second = second % 60;
			}

			if (minute > 59) {
				hour += Math.floor(minute / 60);
				minute = minute % 60;
			}

			if (this.mergedSettings.military) {
				if (hour > 23) {
					hour = hour % 24;
				}
			}
			else {
				if (hour > 12) {
					hour = hour % 12;
					period = 'PM';
				}
				else if (hour === 0) {
					hour = '12';
					period = 'AM';
				}
			}

			// Set the values
			this.hour = padStart(hour, 2, '0');
			this.minute = padStart(minute, 2, '0');
			this.second = padStart(second, 2, '0');
			this.period = period;
		}
	},
	created() {
		this.setTimeValue(this.value);
	}
};
</script>