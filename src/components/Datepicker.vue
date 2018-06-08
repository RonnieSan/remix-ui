<template>
	<div class="datepicker">
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
			/>
			<div class="display">{{displayValue}}</div>
			<div class="helper"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" /></svg></div>
			<transition name="dropfade">
				<div class="calendar-wrapper" v-if="is_open" v-on-clickaway="closeCalendar">
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
						<button @click="applyHandler()"><span class="label">Apply</span></button>
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
								<div class="current-month"><strong>{{startMonth}} {{startYear}}</strong></div>
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
										'range-start' : isRangeStart(date.moment),
										'range-end' : isRangeEnd(date.moment)
									}"
									@click="inputHandler(date.moment, 0)">{{date.day}}</div>
							</div>
						</div>
					</div>
					<div class="calendar end" v-if="isRange">
						<div class="calendar-header">
							<div class="month">
								<div class="btn prev-year" @click="prev('year', 0)">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
								</div>
								<div class="btn prev-month" @click="prev('month', 0)">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 8 12 13 7"></polyline></svg>
								</div>
								<div class="current-month"><strong>{{startMonth}} {{startYear}}</strong></div>
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
							<div v-for="week in weeks(1)" class="week">
								<div v-for="date in week" :class="{
										'day' : true,
										'dim' : !isInCurrentMonth(date.month, 1),
										'not-selectable' : !isSelectable(date.moment, 1),
										'selected' : isSelected(date.moment, 1),
										'highlight' : isHighlighted(date.moment, 1),
										'in-range' : isInRange(date.moment),
										'range-start' : isRangeStart(date.moment),
										'range-end' : isRangeEnd(date.moment)
									}" 
									@click="inputHandler(date.moment, 1)">{{date.day}}</div>
							</div>
						</div>
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

export default {
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
			current_cursor_index : 0,
			current_selection_index : 0,
			is_open : false
		};
	},
	props : {
		value : {
			type : [String, Array],
			required : true
		},
		minValue : String,
		maxValue : String,
		disabled : {
			type : Boolean,
			default : false
		},
		format : {
			type : String,
			default : 'ddd, MMM D, YYYY'
		}
	},
	computed : {
		displayValue() {
			if (this.isRange) {
				if (moment(this.value[0]).format('YYYY-MM-DD') === moment(this.value[1]).format('YYYY-MM-DD')) {
					return moment(this.value[0]).format(this.format);
				}

				return moment(this.value[0]).format(this.format) + ' - ' + moment(this.value[1]).format(this.format);
			}

			else {
				return moment(this.value).format(this.format);
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
			return moment(this.minValue);
		},
		maxDate() {
			return moment(this.maxValue);
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

		// Go to the previous period
		prev(period, index) {
			let target_date = moment(this.cursor_value[index]).subtract(1, period);
			if (!this.prevAvailable(period, index)) {
				target_date = this.minDate.date(target_date.date());
			}
			this.$set(this.cursor_value, index, target_date.format());
		},

		// Check if you can go to the previous period
		prevAvailable(period, index) {
			if (this.minValue) {
				let target_date = moment(this.cursor_value[index]).subtract(1, period);
				return (this.minDate.startOf('month').isSameOrBefore(target_date));
			}
			return true;
		},

		// Go the the next period
		next(period, index) {
			let target_date = moment(this.cursor_value[index]).add(1, period);
			if (!this.nextAvailable(period, index)) {
				target_date = this.maxDate.date(target_date.date());
			}
			this.$set(this.cursor_value, index, target_date.format());
		},

		// Check if you can go to the next period
		nextAvailable(period, index) {
			if (this.maxValue) {
				let target_date = moment(this.cursor_value[index]).add(1, period);
				return (this.maxDate.endOf('month').isSameOrAfter(target_date));
			}
			return true;
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
			if (!this.is_open) {
				if (this.isRange) {
					this.current_cursor_index = 0;
					this.current_selection_index = 0;
					this.selection_value = [
						moment(this.value[0]).startOf('day').format(),
						moment(this.value[1]).endOf('day').format()
					];
				}
				else {
					this.selection_value = [
						moment(this.value).startOf('day').format(),
						moment(this.value).endOf('day').format()
					];
				}
				this.resetCursors();
				this.is_open = true;
			}
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
					this.selection_value = [
						moment().startOf('day').format(),
						moment().endOf('day').format()
					];
					this.resetCursors();
					break;

				// Yesterday
				case 1:
					this.selection_value = [
						moment().subtract(1, 'day').startOf('day').format(),
						moment().subtract(1, 'day').endOf('day').format()
					];
					this.resetCursors();
					break;

				// 7 Days Ago
				case 2:
					this.selection_value = [
						moment().subtract(1, 'week').startOf('day').format(),
						moment().subtract(1, 'week').endOf('day').format()
					];
					this.resetCursors();
					break;

				// Last 7 Days
				case 3:
					this.selection_value = [
						moment().subtract(6, 'days').startOf('day').format(),
						moment().endOf('day').format()
					];
					this.resetCursors();
					break;

				// This Month
				case 4:
					this.selection_value = [
						moment().startOf('month').format(),
						moment().endOf('month').format()
					];
					this.resetCursors();
					break;

				// Last Month
				case 5:
					this.selection_value = [
						moment().subtract(1, 'month').startOf('month').format(),
						moment().subtract(1, 'month').endOf('month').format()
					];
					this.resetCursors();
					break;

			}
		},

		// Reset the cursors
		resetCursors() {
			this.cursor_value = this.selection_value;
		},

		// Handle when a date is selected
		inputHandler(date, index) {
			if (this.isSelectable(date, index)) {
				this.dirty = true;
				this.current_cursor_index = index;
				this.current_selection_index = index;
				if (this.isRange) {
					if (index === 0) {
						this.$set(this.selection_value, index, date.startOf('day').format());
						if (date.isAfter(this.selection_value[1])) {
							this.$set(this.selection_value, 1, date.endOf('day').format());
						}
					}
					else {
						this.$set(this.selection_value, index, date.endOf('day').format());
						if (date.isBefore(this.selection_value[0])) {
							this.$set(this.selection_value, 0, date.startOf('day').format());
						}
					}
					this.cursor_value = this.selection_value.slice();
				}
				else {
					this.selection_value[index] = date.format();
					this.cursor_value[index] = date.format();
					this.$emit('input', date.format());
					this.closeCalendar();
				}
			}
		},

		// Apply the selected dates
		applyHandler() {
			this.$emit('input', this.selection_value);
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
// Default variables
@control-bkg-color: #FFF;
@calendar-unit: 2.5em;
@control-border-color: #CCC;
@control-border-stroke: 1px;
@control-color: #2196F3;
@control-height: 2.5em;
@control-helper-bkg-color: #E5E5E5;
@control-helper-color: #000;
@control-padding: 0.625em;
@control-radius: 3px;
@font-size: 16px;
@layer-control: 300;
@mobile-window-max: 767px;

// Import theme
@import (optional, reference) '~theme';

.input-wrapper {
	border-radius: @control-radius;
	background-color: #FFF;
	border: @control-border-stroke solid @control-border-color;
	display: inline-flex;
	overflow: hidden;
	vertical-align: middle;
	width: 100%;

	.helper {
		background-color: @control-helper-bkg-color;
		color: @control-helper-color;
		flex: 0 0 auto;
		height: calc(@control-height - (@control-border-stroke * 2));
		text-align: center;
		width: calc(@control-height - (@control-border-stroke * 2));

		svg {
			height: 60%;
			margin: 20%;
			width: 60%;
		}
	}
}

input[type='text'] {
	background-color: @control-bkg-color;
	border: 0;
	flex: 1 0 0;
	font-size: @font-size;
	height: calc(@control-height - (@control-border-stroke * 2));
	padding: 0 @control-padding;
	width: 100%;
}

input[disabled='disabled'] {
	background-color: #E5E5E5;
	color: #A6A6A6;
}

.datepicker {
	cursor: pointer;
	font-size: @font-size;
	position: relative;

	input {
		cursor: pointer;
		opacity: 0;
		padding: 0;
		position: absolute;
		width: calc(100% - (@control-border-stroke * 2));
	}

	.display {
		flex: 1 0 0;
		height: calc(@control-height - (@control-border-stroke * 2));
		line-height: calc(@control-height - (@control-border-stroke * 2));
		padding: 0 10px;
	}

	.calendar-wrapper {
		border-radius: 3px;
		box-shadow: 0 2px 10px fade(black, 25%);
		background-color: white;
		left: 3px;
		overflow: hidden;
		padding: 0.5em;
		position: absolute;
		top: calc(@control-height - (@control-border-stroke * 2));
		white-space: nowrap;
		z-index: @layer-control;

		@media screen and (max-width: @mobile-window-max) {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
		}
	}

	.presets {
		display: inline-block;
		font-size: @font-size;
		height: 100%;
		padding-right: 0.125em;
		vertical-align: top;
		width: 160px;

		@media screen and (max-width: @mobile-window-max) {
			flex: 0 0 10em;
			order: 3;
			width: auto;
		}

		h2 {
			color: #000;
			font-size: 1em;
			font-weight: bold;
			height: 2.125em;
			line-height: 2.125em;
			margin: 0;
			padding: 0 10px;
			text-transform: uppercase;
		}

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;

			li {
				border-top: 1px solid #F2F2F2;
				font-size: 0.875em;
				height: 2.1375em;
				line-height: 2.1375em;
				padding: 0 10px;

				&:hover {
					color: @control-color;
				}
			}
		}

		button {
			background-color: @control-color;
			border: 0;
			border-radius: @control-radius;
			color: #FFF;
			font-size: @font-size;
			height: 2.5em;
			margin-top: 10px;
			text-align: center;
			text-transform: uppercase;
			width: 100%;

			.label {
				width: 100%;
			}

			&:hover {
				background-color: lighten(@control-color, 15%);
			}

			&:active {
				background-color: darken(@control-color, 5%);
			}

			&:focus {
				box-shadow: 0 0 0 3px fade(#000, 10%);
			}
		}
	}

	.calendar {
		border: 1px solid #E5E5E5;
		display: inline-block;
		font-size: 0.75em;
		vertical-align: top;
		width: calc((@calendar-unit * 7) + 10px);

		@media screen and (max-width: @mobile-window-max) {
			flex: 0 0 calc((@calendar-unit * 7) + 10px);
			margin-bottom: 0.5em;
		}

		.calendar-header {
			background-color: @control-color;
			color: #FFF;
			padding: 5px 5px 0;
			
			.month {
				display: flex;
				flex-direction: row;
				height: @calendar-unit;
				line-height: @calendar-unit;

				.btn {
					border-radius: 15px;
					cursor: pointer;
					flex: 0 0 @calendar-unit;
					text-align: center;

					svg {
						height: 60%;
						margin: 20%;
						width: 60%;
					}

					&:hover {
						background-color: darken(@control-color, 15%);
					}
				}

				.current-month {
					flex: 1 0 auto;
					text-align: center;
				}
			}

			.days-of-week {
				display: flex;
				flex-direction: row;
				height: @calendar-unit;
				line-height: @calendar-unit;
				width: @calendar-unit * 7;

				> div {
					flex: 0 0 @calendar-unit;
					text-align: center;
				}
			}
		}

		.calendar-body {
			background-color: #FFF;
			padding: 5px;
			
			.week {
				display: flex;
				flex-direction: row;
				height: @calendar-unit;
				line-height: @calendar-unit;
				margin: 1px 0;
			}

			.day {
				border-radius: @control-radius;
				cursor: pointer;
				flex: 1 0 0;
				text-align: center;

				&:hover {
					background-color: #F2F2F2;
				}

				&.in-range {
					border-radius: 0;
					background-color: fade(@control-color, 35%);
					color: #FFF;

					&:hover {
						background-color: fade(@control-color, 45%);
					}
				}

				&.dim {
					color: #D8D8D8;

					&.in-range {
						color: fade(@control-color, 40%);
					}
				}

				&.selected {
					background-color: @control-color;
					color: #FFF;
				}

				&.range-start {
					border-radius: @control-radius 0 0 @control-radius;
				}

				&.range-end {
					border-radius: 0 @control-radius @control-radius 0;

					&.range-start {
						border-radius: @control-radius;
					}
				}

				&.highlight {
					font-weight: bold;
					text-decoration: underline;
				}
			}
		}
	}
}
</style>