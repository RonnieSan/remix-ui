<template>
	<div :class="['datepicker', {'disabled' : disabled}]">
		<div
			class="input-wrapper"
		>
			<input type="text"
				ref="input"
				:name="name"
				:value="value"
				:placeholder="value"
				:disabled="disabled"
				v-on="listeners"
				autocomplete="off"
			/>
			<div class="display">{{displayValue}}</div>
			<div class="helper"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" /></svg></div>
			<transition name="dropfade">
				<div
					class="calendar-wrapper" v-if="is_open"
					v-on-clickaway="closeCalendar"
					:style="{'top' : popup_top, 'bottom' : popup_bottom}"
				>
					<div class="flex-h">
						<div class="presets" v-if="isRange">
							<h2>Presets</h2>
							<ul>
								<li @click="setRange(0)">Today</li>
								<li @click="setRange(1)">Yesterday</li>
								<li @click="setRange(2)">7 Days Ago</li>
								<li @click="setRange(3)">Last 7 Days</li>
								<li @click="setRange(4)">This Month</li>
								<li @click="setRange(5)">Last Month</li>
							</ul>
							<div class="button-wrapper">
								<button type="button" @click.stop="applyHandler()"><span class="label">Apply</span></button>
							</div>
						</div>
						<div class="calendar start">
							<div class="calendar-header">
								<div class="month">
									<div class="btn prev-year" @click="prev('year', 0)">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
									</div>
									<div class="btn prev-month" @click="prev('month', 0)">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 8 12 13 7"></polyline></svg>
									</div>
									<div class="current-month" @click="resetMonth(0)"><strong>{{startMonth}} {{startYear}}</strong></div>
									<div class="btn next-month" @click="next('month', 0)">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 16 12 11 7"></polyline></svg>
									</div>
									<div class="btn next-year" @click="next('year', 0)">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
									</div>
								</div>
								<div class="days-of-week">
									<div>Su</div>
									<div>Mo</div>
									<div>Tu</div>
									<div>We</div>
									<div>Th</div>
									<div>Fr</div>
									<div>Sa</div>
								</div>
							</div>
							<div class="calendar-body">
								<div v-for="week in weeks(0)" class="week">
									<div v-for="date in week" :class="{
											'day' : true,
											'dim' : !isInCurrentMonth(date.month, 0),
											'not-selectable' : !isSelectable(date.moment, 0),
											'selected' : isSelected(date.moment, 0),
											'highlight' : isHighlighted(date.moment, 0),
											'in-range' : isInRange(date.moment),
											'not-in-max-range' : !isInMaxRange(date.moment, 0),
											'range-start' : isRangeStart(date.moment),
											'range-end' : isRangeEnd(date.moment)
										}"
										@click="setSelectionValue(date.moment, null, $event)">{{date.day}}</div>
								</div>
							</div>
							<div v-if="options.timepicker" class="time-inputs">
								<Timepicker
									name="timepicker_start"
									v-model="time_value[0]"
									:options="options.timepicker_options"
								/>
							</div>
						</div>
						<div class="calendar end" v-if="isRange">
							<div class="calendar-header">
								<div class="month">
									<div class="btn prev-year" @click="prev('year', 1)">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
									</div>
									<div class="btn prev-month" @click="prev('month', 1)">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 8 12 13 7"></polyline></svg>
									</div>
									<div class="current-month" @click="resetMonth(1)"><strong>{{endMonth}} {{endYear}}</strong></div>
									<div class="btn next-month" @click="next('month', 1)">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 16 12 11 7"></polyline></svg>
									</div>
									<div class="btn next-year" @click="next('year', 1)">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
									</div>
								</div>
								<div class="days-of-week">
									<div>Su</div>
									<div>Mo</div>
									<div>Tu</div>
									<div>We</div>
									<div>Th</div>
									<div>Fr</div>
									<div>Sa</div>
								</div>
							</div>
							<div class="calendar-body">
								<div v-for="week in weeks(1)" class="week">
									<div v-for="date in week" :class="{
											'day' : true,
											'dim' : !isInCurrentMonth(date.month, 1),
											'not-selectable' : !isSelectable(date.moment, 1),
											'selected' : isSelected(date.moment, 1),
											'highlight' : isHighlighted(date.moment, 1),
											'in-range' : isInRange(date.moment),
											'not-in-max-range' : !isInMaxRange(date.moment, 1),
											'range-start' : isRangeStart(date.moment),
											'range-end' : isRangeEnd(date.moment)
										}"
										@click="setSelectionValue(null, date.moment, $event)">{{date.day}}</div>
								</div>
							</div>
							<div v-if="options.timepicker" class="time-inputs">
								<Timepicker
									name="timepicker_start"
									v-model="time_value[1]"
									:options="options.timepicker_options"
								/>
							</div>
						</div>
					</div>
					<div v-if="errorMessages.length > 0" class="errors">
						<ul>
							<li v-for="(msg, index) in errorMessages" key="index">{{msg}}</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import formField from '../mixins/formField';
import moment from 'moment-timezone';
import { mixin as clickaway } from 'vue-clickaway';
import Timepicker from './Timepicker';
import { uniq, without } from 'lodash';

export default {
	components : {
		Timepicker
	},
	props : {
		value : {
			type : [String, Array],
			required : true
		},
		minValue : String,
		maxValue : String,
		maxRange : Number,
		format : {
			type : String,
			default : 'ddd, MMM D, YYYY'
		},
		options : {
			type : Object,
			default() {
				return {
					format : 'ddd, MMM D, YYYY',
					timepicker : false,
					timepicker_options : {}
				};
			}
		},
		disabled : Boolean
	},
	data() {
		return {
			cursor_value : [
				Array.isArray(this.value) ? moment(this.value[0]).startOf('day').format() : moment(this.value).startOf('day').format(),
				Array.isArray(this.value) ? moment(this.value[1]).endOf('day').format() : moment(this.value).endOf('day').format()
			],
			selection_value : [
				Array.isArray(this.value) ? moment(this.value[0]).startOf('day').format() : moment(this.value).startOf('day').format(),
				Array.isArray(this.value) ? moment(this.value[1]).endOf('day').format() : moment(this.value).endOf('day').format()
			],
			time_value : [
				'00:00:00',
				'23:59:59'
			],
			current_cursor_index : 0,
			current_selection_index : 0,
			error_messages : [],
			is_open : false,
			popup_top : null,
			popup_bottom : null
		};
	},
	computed : {
		displayValue() {
			if (this.isRange) {
				if (moment(this.value[0]).format('YYYY-MM-DD') === moment(this.value[1]).format('YYYY-MM-DD')) {
					return moment(this.value[0]).format(this.options.format || this.format);
				}

				return moment(this.value[0]).format(this.options.format || this.format) + ' - ' + moment(this.value[1]).format(this.options.format || this.format);
			}

			else {
				return moment(this.value).format(this.options.format || this.format);
			}
		},
		isRange() {
			return Array.isArray(this.value);
		},
		startMonth() {
			return moment(this.cursor_value[0]).format('MMM');
		},
		startYear() {
			return moment(this.cursor_value[0]).format('YYYY');
		},
		endMonth() {
			return moment(this.cursor_value[1]).format('MMM');
		},
		endYear() {
			return moment(this.cursor_value[1]).format('YYYY');
		},
		minDate() {
			return moment(this.minValue || this.options.min_date);
		},
		maxDate() {
			return moment(this.maxValue || this.options.max_date);
		},
		maxDateRange() {
			return this.maxRange || this.options.max_range;
		},
		errorMessages() {
			return uniq(this.error_messages);
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				this.$listeners,
				{
					click(event) {
						vm.openCalendar(event);
					},
					keydown(event) {
						vm.keydownHandler(event);
					},
					input(event) {
						vm.dirty = true;
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
	methods : {

		// Return the weeks of the month
		weeks(index) {
			let weeks     = [];
			let first_day = moment(this.cursor_value[index]).startOf('month').startOf('week');
			let last_day  = first_day.clone().add(5, 'weeks').endOf('week');

			let cursor = first_day.clone();

			while (cursor.isSameOrBefore(last_day)) {
				let week = [];
				let end_of_week = cursor.clone().endOf('week');

				while (cursor.isSameOrBefore(end_of_week)) {
					week.push({
						moment  : cursor.clone(),
						weekday : cursor.day(),
						month   : cursor.month(),
						day     : cursor.date(),
						muted   : (cursor.month() !== moment(this.cursor_value[index]).month())
					});
					cursor.add(1, 'day');
				}

				weeks.push(week);
			}

			return weeks;
		},

		// Reset the calendar to today
		resetMonth(index) {
			this.$set(this.cursor_value, index, moment().format());
		},

		// Go to the previous period
		prev(period, index) {
			let target_date = moment(this.cursor_value[index]).subtract(1, period);
			this.$set(this.cursor_value, index, target_date.format());
		},

		// Go the the next period
		next(period, index) {
			let target_date = moment(this.cursor_value[index]).add(1, period);
			this.$set(this.cursor_value, index, target_date.format());
		},

		// The date is in the active month
		isInCurrentMonth(month, index) {
			return month === moment(this.cursor_value[index]).month();
		},

		// The cursor is currently on this date
		isHighlighted(date, index) {
			return (this.current_cursor_index === index) && (date.format('YYYY-MM-DD') === moment(this.cursor_value[index]).format('YYYY-MM-DD'));
		},

		// Check if the date is selectable
		isSelectable(date, index) {
			if (this.minValue && date.isBefore(this.minValue)) {
				return false;
			}
			if (this.maxValue && date.isAfter(this.maxValue)) {
				return false;
			}
			return true;
		},

		// The date is the start of end of a range selection
		isSelected(date, index) {
			if (this.isRange) {
				return date.format('YYYY-MM-DD') === moment(this.selection_value[index]).format('YYYY-MM-DD');
			}
			return date.format() === moment(this.value).format();
		},

		// The date is in the selected range
		isInRange(date) {
			if (this.isRange) {
				return date.isBetween(this.selection_value[0], this.selection_value[1], 'day', '[]');
			}
		},

		isInMaxRange(date, index) {
			if (this.maxDateRange) {
				if (index === 0) {
					return moment(this.selection_value[1]).diff(date, 'days') < (this.maxDateRange);
				}
				else {
					return date.diff(this.selection_value[0], 'days') < (this.maxDateRange);
				}
			}
			return false;
		},

		// The date is the start of the selected range
		isRangeStart(date) {
			return this.isRange && (date.format('YYYY-MM-DD') === moment(this.selection_value[0]).format('YYYY-MM-DD'));
		},

		// The date is the end of the selected range
		isRangeEnd(date) {
			return this.isRange && (date.format('YYYY-MM-DD') === moment(this.selection_value[1]).format('YYYY-MM-DD'));
		},

		// Open the calendar interface
		openCalendar(event) {
			this.error_messages = [];
			if (!this.is_open) {
				if (this.isRange) {
					this.current_cursor_index = 0;
					this.current_selection_index = 0;
				}
				if (this.options.timepicker) {
					this.time_value = [
						moment(this.selection_value[0]).format('HH:mm:ss'),
						moment(this.selection_value[1]).format('HH:mm:ss')
					];
				}
				this.resetCursors();
				this.is_open = true;
			}

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
						this.popup_bottom = (input_box.height - 5 + 'px');
						this.popup_top = null;
					}
					else {
						this.popup_bottom = null;
						this.popup_top = (input_box.height - 5 + 'px');
					}
				}
			});
		},

		// Close the calendar interface
		closeCalendar() {
			if (this.is_open) {
				this.is_open = false;
			}
		},

		// Do stuff when keys get pressed
		keydownHandler(event) {
			let period;
			switch (event.which) {

				// TAB
				case 9:
					if (this.is_open) {
						if (this.isRange) {
							event.preventDefault();
							if (event.shiftKey) {
								if ((this.current_selection_index - 1) < 0) {
									this.current_selection_index = 2;
								}
								else {
									this.current_selection_index--;
								}
								if ((this.current_cursor_index - 1) < 0) {
									this.current_cursor_index = 2;
								}
								else {
									this.current_cursor_index--;
								}
							}
							else {
								if ((this.current_selection_index + 1) > 2) {
									this.current_selection_index = 0;
								}
								else {
									this.current_selection_index++;
								}
								if ((this.current_cursor_index + 1) > 2) {
									this.current_cursor_index = 0;
								}
								else {
									this.current_cursor_index++;
								}
							}
						}
						else {
							this.closeCalendar();
						}
					}
					break;

				// SPACEBAR
				case 32:
					if (this.is_open) {
						this.inputHandler(moment(this.cursor_value[this.current_cursor_index]), this.current_cursor_index);
					}
					else {
						this.openCalendar();
					}
					break;

				// LEFT
				case 37:
					this.openCalendar();
					period = 'day';
					if (event.shiftKey) {
						event.preventDefault();
						period = 'month';
						if (event.ctrlKey) period = 'year';
					}
					this.prev(period, this.current_selection_index);
					break;

				// UP
				case 38:
					this.openCalendar();
					this.prev('week', this.current_selection_index);
					break;

				// RIGHT
				case 39:
					this.openCalendar();
					period = 'day';
					if (event.shiftKey) {
						event.preventDefault();
						period = 'month';
						if (event.ctrlKey) period = 'year';
					}
					this.next(period, this.current_selection_index);
					break;

				// DOWN
				case 40:
					this.openCalendar();
					this.next('week', this.current_selection_index);
					break;

				// ENTER
				case 13:
					event.preventDefault();
					if (this.isRange) {
						this.applyHandler();
					}
					else {
						this.inputHandler(moment(this.cursor_value[0]), 0);
					}
					break;

				// ESCAPE
				case 27:
					this.closeCalendar();
					break;

			}
		},

		// Set the current range
		setRange(selection) {
			switch (selection) {
				// Today
				case 0:
					this.setSelectionValue(moment().startOf('day').format(), moment().endOf('day').format());
					this.resetCursors();
					break;

				// Yesterday
				case 1:
					this.setSelectionValue(moment().subtract(1, 'day').startOf('day').format(), moment().subtract(1, 'day').endOf('day').format());
					this.resetCursors();
					break;

				// 7 Days Ago
				case 2:
					this.setSelectionValue(moment().subtract(1, 'week').startOf('day').format(), moment().subtract(1, 'week').endOf('day').format());
					this.resetCursors();
					break;

				// Last 7 Days
				case 3:
					this.setSelectionValue(moment().subtract(6, 'days').startOf('day').format(), moment().endOf('day').format());
					this.resetCursors();
					break;

				// This Month
				case 4:
					this.setSelectionValue(moment().startOf('month').format(), moment().endOf('month').format());
					this.resetCursors();
					break;

				// Last Month
				case 5:
					this.setSelectionValue(moment().subtract(1, 'month').startOf('month').format(), moment().subtract(1, 'month').endOf('month').format());
					this.resetCursors();
					break;

			}
		},

		// Reset the cursors
		resetCursors() {
			this.cursor_value = this.selection_value.slice();
		},

		// Set the selection value
		setSelectionValue(start, end, event) {
			if (start) {
				let start_date = moment(start);
				let start_error_msg = 'The start date you are trying to select is not allowed. Selecting the earliest possible start date.';
				if (this.minValue && start_date < this.minDate) {
					this.error_messages.push(start_error_msg);
					this.inputHandler(this.minDate, 0);
					start = this.minValue;
				}
				else {
					this.error_messages = without(this.error_messages, start_error_msg);
					this.inputHandler(moment(start), 0);
				}
			}

			if (end) {
				let end_date = moment(end);
				let end_error_msg = 'The end date you are trying to select is not allowed. Selecting the latest possible start date.';
				if (this.maxValue && end_date > this.maxDate) {
					this.error_messages.push(end_error_msg);
					this.inputHandler(this.maxDate, 1);
					end = this.maxValue;
				}
				else {
					this.error_messages = without(this.error_messages, end_error_msg);
					this.inputHandler(moment(end), 1);
				}
			}

			if (this.isRange) {
				this.$nextTick(() => {
					let range_length = moment(this.selection_value[1]).diff(start, 'days') + 1;
					if (end) {
						range_length = moment(end).diff(this.selection_value[0], 'days') + 1;
					}
					let range_error_msg = 'The range is too long. Adjusting to a maximum of ' + this.maxDateRange + ' days.';
					if (range_length > this.maxDateRange) {
						this.error_messages.push(range_error_msg);
						if (start) {
							this.$set(this.selection_value, 1, moment(start).add(this.maxDateRange - 1, 'days').format());
						}
						else {
							this.$set(this.selection_value, 0, moment(end).subtract(this.maxDateRange - 1, 'days').format());
						}
					}
					else {
						this.error_messages = without(this.error_messages, range_error_msg);
					}
				});
			}

			this.error_messages = uniq(this.error_messages);
		},

		// Handle when a date is selected
		inputHandler(date, index) {
			this.dirty = true;
			this.current_cursor_index = index;
			this.current_selection_index = index;
			if (this.isRange) {
				if (index === 0) {
					if (this.options.timepicker) {
						date = moment(date.format('YYYY-MM-DD') + ' ' + this.time_value[0]);
					}
					else {
						date = date.startOf('day');
					}
					this.$set(this.selection_value, index, date.format());
					if (date.isAfter(this.selection_value[1])) {
						this.setSelectionValue(null, date.endOf('day').format());
						// this.$set(this.selection_value, 1, date.endOf('day').format());
					}
				}
				else {
					if (this.options.timepicker) {
						date = moment(date.format('YYYY-MM-DD') + ' ' + this.time_value[1]);
					}
					else {
						date = date.endOf('day');
					}
					this.$set(this.selection_value, index, date.format());
					if (date.isBefore(this.selection_value[0])) {
						this.setSelectionValue(date.startOf('day').format(), null);
						// this.$set(this.selection_value, 0, date.startOf('day').format());
					}
				}
				this.cursor_value = this.selection_value.slice();
			}
			else {
				if (this.options.timepicker) {
					date = moment(date.format('YYYY-MM-DD') + ' ' + this.time_value[0]);
				}
				this.selection_value[index] = date.format();
				this.cursor_value[index] = date.format();
				this.$emit('input', date.format());
				this.closeCalendar();
			}
		},

		// Apply the selected dates
		applyHandler() {
			let output_value = this.selection_value;
			if (this.options.timepicker) {
				output_value = [
					moment(moment(this.selection_value[0]).format('YYYY-MM-DD') + ' ' + this.time_value[0]).format(),
					moment(moment(this.selection_value[1]).format('YYYY-MM-DD') + ' ' + this.time_value[1]).format()
				];
			}
			this.$emit('input', output_value);
			this.closeCalendar();
		}
	},
	mixins : [
		clickaway,
		formField
	]
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Datepicker.less';
</style>

<docs>
# DatePicker
A date-picker field for single dates or ranges.

## Value
The value should be an ISO8601-formatted date (YYYY-MM-DD) for a single date or an array containing 2 ISO8601-formatted dates for a range.

## Props
* **min-value** : STRING - An ISO8601 date that the user cannot select a date below.
* **max-value** : STRING - An ISO8601 date that the user cannot select a date above.
* **max-range** : NUMBER - The maximum range length in days the user can select.
* **disabled** : BOOLEAN - Set to `true` to disable interactions with the field.
* **format** : STRING - The format to display the date as in the field (see momentjs.com for possible values) (deprecated).
* **options** : OBJECT - Options for the datepicker.
* **options.timepicker** : BOOLEAN - Set to true to use a timepicker.
* **options.min_date** : STRING - An ISO8601 date that the user cannot select a date below.
* **options.max_date** : STRING - An ISO8601 date that the user cannot select a date above.
* **options.max_range** : NUMBER - The maximum range length in days the user can select.
* **options.format** : STRING - The format to display the date as in the field (see momentjs.com for possible values).

## Usage
In the template...
```html
<r-datepicker
	v-model="datepicker_value"
	min-value="1980-01-01"
	max-value="2020-12-31"
	format="ddd, MMM D, YYYY"
/>

<r-datepicker
	v-model="datepicker_range_value"
	min-value="1980-01-01"
	max-value="2020-12-31"
	format="MM/DD/YYYY"
/>
```

In the script...
```js
{
	data() {
		return {
			datepicker_value : '2019-05-13',
			datepicker_range_value : ['2019-05-11', '2019-05-13']
		};
	}
}
```
</docs>