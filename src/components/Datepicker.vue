<template>
	<div :class="['r-datepicker', 'control-border', 'focusable', {disabled}]">
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
		<div class="control-helper"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" /></svg></div>
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
							<li v-for="(preset, index) in mergedSettings.presets" @click="setRange(index)">{{preset.label}}</li>
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
						<div v-if="mergedSettings.timepicker" class="time-inputs">
							<timepicker
								name="timepicker_start"
								v-model="time_value[0]"
								:options="mergedSettings.timepicker_settings"
							/>
							<div class="timepicker-presets">
								<div class="button" @click="setTime(0, 'start')">
									<icon type="arrow-collapse-left"/>
								</div>
								<div class="button" @click="setTime(0, 'now')">
									<icon type="clock-outline"/>
								</div>
								<div class="button" @click="setTime(0, 'end')">
									<icon type="arrow-collapse-right"/>
								</div>
							</div>
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
						<div v-if="mergedSettings.timepicker" class="time-inputs">
							<timepicker
								name="timepicker_start"
								v-model="time_value[1]"
								:options="mergedSettings.timepicker_settings"
							/>
							<div class="timepicker-presets">
								<div class="button" @click="setTime(1, 'start')">
									<icon type="arrow-collapse-left"/>
								</div>
								<div class="button" @click="setTime(1, 'now')">
									<icon type="clock-outline"/>
								</div>
								<div class="button" @click="setTime(1, 'end')">
									<icon type="arrow-collapse-right"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="errorMessages.length > 0" class="errors">
					<ul>
						<li v-for="(msg, index) in errorMessages" key="index">{{msg}}</li>
					</ul>
				</div>
				<div v-if="!isRange" class="button-wrapper single-date-apply">
					<button type="button" @click.stop="applyHandler()"><span class="label">Apply</span></button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import formField from '../mixins/formField';
import moment from 'moment-timezone';
import { mixin as clickaway } from 'vue-clickaway';
import timepicker from './Timepicker';
import { merge, uniq, without } from 'lodash';

export default {
	components : {
		timepicker
	},
	props : {
		value : {
			type : [String, Array],
			required : true
		},
		settings : {
			type : Object,
			default() {
				return {
					format : 'ddd, MMM D, YYYY',
					timepicker : false,
					timepicker_settings : {},
					presets : [
						{
							label : 'Today',
							value : [moment().startOf('day').format(), moment().endOf('day').format()]
						},
						{
							label : 'Yesterday',
							value : [moment().subtract(1, 'day').startOf('day').format(), moment().subtract(1, 'day').endOf('day').format()]
						},
						{
							label : '7 Days Ago',
							value : [moment().subtract(1, 'week').startOf('day').format(), moment().subtract(1, 'week').endOf('day').format()]
						},
						{
							label : 'Last 7 Days',
							value : [moment().subtract(6, 'days').startOf('day').format(), moment().endOf('day').format()]
						},
						{
							label : 'This Month',
							value : [moment().startOf('month').format(), moment().endOf('month').format()]
						},
						{
							label : 'Last Month',
							value : [moment().subtract(1, 'month').startOf('month').format(), moment().subtract(1, 'month').endOf('month').format()]
						}
					]
				};
			}
		},
		disabled : Boolean
	},
	data() {
		return {
			cursor_value : [],
			selection_value : [],
			time_value : [],
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
					return moment(this.value[0]).format(this.mergedSettings.format);
				}

				return moment(this.value[0]).format(this.mergedSettings.format) + ' - ' + moment(this.value[1]).format(this.mergedSettings.format);
			}

			else {
				return moment(this.value).format(this.mergedSettings.format);
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
			return moment(this.mergedSettings.min_date);
		},
		maxDate() {
			return moment(this.mergedSettings.max_date);
		},
		maxDateRange() {
			return this.mergedSettings.max_range;
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
						let use_default;
						if (vm.$listeners.click) {
							use_default = vm.$listeners.click(event);
						}
						if (use_default !== false) {
							vm.openCalendar(event);
						}
					},
					keydown(event) {
						let use_default;
						if (vm.$listeners.keydown) {
							use_default = vm.$listeners.keydown(event);
						}
						if (use_default !== false) {
							vm.keydownHandler(event);
						}
					},
					input(event) {
						vm.dirty = true;
						vm.validate();
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
		},
		mergedSettings() {
			let options = merge({}, {
				format : 'ddd, MMM D, YYYY',
				timepicker : false,
				timepicker_settings : {},
				reset_time : true,
				presets : [
					{
						label : 'Today',
						value : [moment().startOf('day').format(), moment().endOf('day').format()]
					},
					{
						label : 'Yesterday',
						value : [moment().subtract(1, 'day').startOf('day').format(), moment().subtract(1, 'day').endOf('day').format()]
					},
					{
						label : '7 Days Ago',
						value : [moment().subtract(1, 'week').startOf('day').format(), moment().subtract(1, 'week').endOf('day').format()]
					},
					{
						label : 'Last 7 Days',
						value : [moment().subtract(6, 'days').startOf('day').format(), moment().endOf('day').format()]
					},
					{
						label : 'This Month',
						value : [moment().startOf('month').format(), moment().endOf('month').format()]
					},
					{
						label : 'Last Month',
						value : [moment().subtract(1, 'month').startOf('month').format(), moment().subtract(1, 'month').endOf('month').format()]
					}
				]
			}, this.settings);
			
			if (this.settings.presets && this.settings.presets.length > 0) {
				options.presets = this.settings.presets;
			}

			return options;
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
			if (this.mergedSettings.min_date && date.isBefore(this.mergedSettings.min_date)) {
				return false;
			}
			if (this.mergedSettings.max_date && date.isAfter(this.mergedSettings.max_date)) {
				return false;
			}
			return true;
		},

		// The date is the start of end of a range selection
		isSelected(date, index) {
			return date.format('YYYY-MM-DD') === moment(this.selection_value[index]).format('YYYY-MM-DD');
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
			return true;
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
				if (this.mergedSettings.timepicker) {
					this.resetTime(this.value);
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

		// Set the time on one of the pickers
		setTime(index, preset) {
			let presets = {
				start : '00:00:00',
				now : moment().format('HH:mm:ss'),
				end : '23:59:59'
			};
			this.$set(this.time_value, index, presets[preset]);
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
			this.setSelectionValue(this.mergedSettings.presets[selection].value[0], this.mergedSettings.presets[selection].value[1]);
			this.resetTime(this.mergedSettings.presets[selection].value);
			this.resetCursors();
		},

		resetTime(value) {
			if (this.isRange) {
				// Get the start time from the value
				if (value.length > 0 && value[0].length > 10) {
					this.$set(this.time_value, 0, moment(value[0]).format('HH:mm:ss'));
				}
				else {
					this.$set(this.time_value, 0, '00:00:00');
				}

				// Get the end time from the value
				if (value.length > 0 && value[1].length > 10) {
					this.$set(this.time_value, 1, moment(value[1]).format('HH:mm:ss'));
				}
				else {
					this.$set(this.time_value, 1, '23:59:59');
				}
			}
			else {
				// Get the time from the value
				if (value.length > 10) {
					this.$set(this.time_value, 0, moment(value).format('HH:mm:ss'));
				}
				else {
					this.$set(this.time_value, 0, '00:00:00');
				}
			}
		},

		// Reset the cursors
		resetCursors() {
			if (this.isRange) {
				this.cursor_value = this.selection_value.slice();
			}
			else {
				this.$set(this.selection_value, 0, moment(this.value));
				this.$set(this.cursor_value, 0, moment(this.value));
			}
		},

		// Set the selection value
		setSelectionValue(start, end, event) {
			if (start) {
				let start_date = moment(start);
				let start_error_msg = 'The start date you are trying to select is not allowed. Selecting the earliest possible start date.';
				if (this.mergedSettings.min_date && start_date < this.minDate) {
					this.error_messages.push(start_error_msg);
					this.inputHandler(this.minDate, 0);
					start = this.mergedSettings.min_date;
				}
				else {
					this.error_messages = without(this.error_messages, start_error_msg);
					this.inputHandler(moment(start), 0);
				}

				if (this.mergedSettings.timepicker && this.mergedSettings.reset_time) {
					this.$set(this.time_value, 0, '00:00:00');
				}
			}

			if (end) {
				let end_date = moment(end);
				let end_error_msg = 'The end date you are trying to select is not allowed. Selecting the latest possible start date.';
				if (this.mergedSettings.max_date && end_date > this.maxDate) {
					this.error_messages.push(end_error_msg);
					this.inputHandler(this.maxDate, 1);
					end = this.mergedSettings.max_date;
				}
				else {
					this.error_messages = without(this.error_messages, end_error_msg);
					this.inputHandler(moment(end), 1);
				}

				if (this.mergedSettings.timepicker && this.mergedSettings.reset_time) {
					this.$set(this.time_value, 1, '23:59:59');
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

					if (this.settings.timepicker && this.settings.reset_time) {
						this.resetTime();
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
					date = date.startOf('day');
					this.$set(this.selection_value, index, date.format());
					if (date.isAfter(this.selection_value[1])) {
						this.setSelectionValue(null, date.endOf('day').format());
					}
				}
				else {
					date = date.endOf('day');
					this.$set(this.selection_value, index, date.format());
					if (date.isBefore(this.selection_value[0])) {
						this.setSelectionValue(date.startOf('day').format(), null);
					}
				}
				this.cursor_value = this.selection_value.slice();
			}
			else {
				this.$set(this.selection_value, index, date.format());
				this.$set(this.cursor_value, index, date.format());
			}
		},

		// Apply the selected dates
		applyHandler() {
			let output_value;
			if (this.isRange) {
				output_value = [
					moment(this.selection_value[0]).format('YYYY-MM-DD'),
					moment(this.selection_value[1]).format('YYYY-MM-DD')
				];
				if (this.mergedSettings.timepicker) {
					output_value = [
						moment(output_value[0] + ' ' + this.time_value[0]).format(),
						moment(output_value[1] + ' ' + this.time_value[1]).format()
					];
				}

				// Check if end date is before start date
				if (moment(output_value[1]).isBefore(output_value[0])) {
					output_value[1] = output_value[0];
				}
			}
			else {
				output_value = moment(this.selection_value[0]).format('YYYY-MM-DD');
				if (this.mergedSettings.timepicker) {
					output_value = moment(output_value + ' ' + this.time_value[0]).format();
				}
			}
			this.$emit('input', output_value);
			this.closeCalendar();
		}
	},
	mounted() {
		// Set the default value if it's empty
		let initial_value = this.value;
		if (this.isRange) {
			if (initial_value.length === 0) {
				initial_value = [
					moment().startOf('day').format(),
					moment().endOf('day').format()
				];
			}
		}
		else {
			if (!this.value) {
				initial_value = moment().startOf('day').format();
			}
		}

		// Set the cursor and selection value
		if (this.isRange) {
			this.cursor_value = this.selection_value = initial_value;
		}

		// Set the time value
		if (this.mergedSettings.timepicker) {
			this.resetTime(initial_value);
		}
	},
	mixins : [
		clickaway,
		formField
	]
};
</script>