<template>
	<div class="r-slider" @focusout="touched = true">
		<div v-if="isRange" ref="merged_tooltip" :class="['tooltip', 'merged', {'invisible' : !merged_tooltip}]" :style="{'left' : merged_tooltip_left}">{{tooltipRange}}</div>
		<div
			ref="min"
			class="handle min"
			tabindex="0"
			@mousedown="mousedownHandler($event, $refs.min, 0)"
			@touchstart="mousedownHandler($event, $refs.min, 0)"
			@keydown="keydownHandler($event, $refs.min, 0)"
			@blur.once="touched = true"
		/>
		<div ref="min_tooltip" :class="['tooltip', {'invisible' : merged_tooltip}]" :style="{'left' : min_tooltip_left}">{{tooltipMin}}</div>
		<div
			v-if="isRange"
			ref="max"
			class="handle max"
			tabindex="0"
			@mousedown="mousedownHandler($event, $refs.max, 1)"
			@touchstart="mousedownHandler($event, $refs.max, 1)"
			@keydown="keydownHandler($event, $refs.max, 1)"
			@blur.once="touched = true"
		/>
		<div v-if="isRange" ref="max_tooltip" :class="['tooltip', {'invisible' : merged_tooltip}]" :style="{'left' : max_tooltip_left}">{{tooltipMax}}</div>
		<div class="bar">
			<div ref="selection" class="selection"/>
		</div>
	</div>
</template>

<script>
import { debounce, isEqual } from 'lodash-es';
import formField from '../mixins/formField';
import ResizeSensor from '../lib/ResizeSensor';

export default {
	props : {
		value : [String, Number, Array],
		settings : {
			type : Object,
			default : function() {
				return {};
			}
		},
		allowSame : {
			type : Boolean,
			default : false
		}
	},
	data() {
		return {
			container           : null,
			local_value         : this.value,
			min_tooltip_left    : 0,
			max_tooltip_left    : 0,
			merged_tooltip_left : '50%',
			merged_tooltip      : false,
			selected_handle     : null,
			resize_sensor       : null
		};
	},
	computed : {
		parsedSettings() {
			return Object.assign({
				min       : 0,
				max       : 100,
				increment : 1,
				formatter : false,
				snap      : false
			}, this.settings);
		},
		isRange() {
			return Array.isArray(this.value);
		},
		tooltipMin() {
			let value = this.local_value;
			if (this.isRange) {
				value = this.local_value[0];
			}
			if (this.parsedSettings.formatter) {
				return this.parsedSettings.formatter(value, 0);
			}
			return value;
		},
		tooltipMax() {
			let value = this.local_value;
			if (this.isRange) {
				value = this.local_value[1];
			}
			if (this.parsedSettings.formatter) {
				return this.parsedSettings.formatter(value, 1);
			}
			return value;
		},
		tooltipRange() {
			if (this.tooltipMin === this.tooltipMax) {
				return this.tooltipMin;
			}
			else {
				return this.tooltipMin + ' - ' + this.tooltipMax;
			}
		},
		segmentSize() {
			return ((this.container.width - this.selected_handle.offsetWidth) / ((this.parsedSettings.max - this.parsedSettings.min) / this.parsedSettings.increment));
		}
	},
	watch : {
		value(new_value) {
			if (!isEqual(this.local_value, new_value)) {
				this.local_value = new_value
				this.setHandlePosition();
			}
		}
	},
	methods : {
		mousedownHandler(event, handle, index) {
			this.selected_handle = handle;
			if (this.isRange) {
				this.selected_index = index;
			}
			else {
				this.selected_index = 0;
			}
			window.addEventListener('mousemove', this.mousemoveHandler);
			window.addEventListener('touchmove', this.mousemoveHandler);
		},
		mousemoveHandler(event) {
			event.preventDefault();
			let clientX = event.clientX;
			if (event.type === 'touchmove') {
				clientX = event.touches[0].clientX;
			}
			let position = (clientX - this.container.left - (this.selected_handle.offsetWidth / 2));

			// Don't move past the bounds
			if (position < 0) {
				position = 0;
			}
			if (position > (this.container.width - this.selected_handle.offsetWidth)) {
				position = (this.container.width - this.selected_handle.offsetWidth);
			}

			if (this.isRange) {
				if (this.allowSame) {
					if (this.selected_index === 0 && (position > this.maxPosition())) {
						position = this.maxPosition();
					}
					if (this.selected_index === 1 && (position < this.minPosition())) {
						position = this.minPosition();
					}
				}
				else {
					if (this.selected_index === 0 && (position > (this.maxPosition() - this.segmentSize))) {
						position = this.maxPosition() - this.segmentSize;
					}
					if (this.selected_index === 1 && (position < (this.minPosition() + this.segmentSize))) {
						position = this.minPosition() + this.segmentSize;
					}
				}
			}

			// Get the value
			let value = this.getValue(position);

			if (this.parsedSettings.snap) {
				position = this.getValuePosition(value);
			}

			this.setHandlePosition(this.selected_handle, position);
			if (this.isRange) {
				this.$set(this.local_value, this.selected_index, value);
			}
			else {
				this.local_value = value;
			}

			this.dirty = true;
			this.$emit('input', this.local_value);
			this.emitChange();
		},
		mouseupHandler() {
			window.removeEventListener('mousemove', this.mousemoveHandler);
			window.removeEventListener('touchmove', this.mousemoveHandler);
		},
		focusHandler(handle, index) {
			this.selected_handle = handle;
			if (this.isRange) {
				this.selected_index = index;
			}
		},
		keydownHandler(event, handle, index) {
			let value, updated;
			switch (event.which) {

				// LEFT OR DOWN
				case 37:
				case 40:
					event.preventDefault();
					let min = this.parsedSettings.min;
					if (this.isRange) {
						min = (index === 0 ? this.parsedSettings.min : this.local_value[0]);
						value = this.local_value[index] - this.parsedSettings.increment;
						if (value >= min) {
							this.$set(this.local_value, index, value);
							updated = true;
						}
					}
					else {
						value = this.local_value - this.parsedSettings.increment;
						if (value >= min) {
							this.local_value = value;
							updated = true;
						}
					}
					break;

				// RIGHT OR UP
				case 38:
				case 39:
					event.preventDefault();
					let max = this.parsedSettings.max;
					if (this.isRange) {
						max = (index === 1 ? this.parsedSettings.max : this.local_value[1]);
						value = this.local_value[index] + this.parsedSettings.increment;
						if (value <= max) {
							this.$set(this.local_value, index, value);
							updated = true;
						}
					}
					else {
						value = this.local_value + this.parsedSettings.increment;
						if (value <= max) {
							this.local_value = value;
							updated = true;
						}
					}
					break;
			}

			if (updated) {
				this.setHandlePosition(handle, this.getValuePosition(value));
				this.$emit('input', this.local_value);
			}
		},
		getValuePosition(value) {
			return ((value - this.parsedSettings.min) / this.parsedSettings.increment) * this.segmentSize;
		},
		getValue(position) {
			return this.parsedSettings.min + (Math.round(position / this.segmentSize) * this.parsedSettings.increment);
		},
		setHandlePosition(handle, position) {
			// Set the position of the handles
			if (handle) {
				handle.style.left = position + 'px';
			}
			else {
				if (this.isRange) {
					this.$refs.min.style.left = this.getValuePosition(this.local_value[0]) + 'px';
					this.$refs.max.style.left = this.getValuePosition(this.local_value[1]) + 'px';
				}
				else {
					this.$refs.min.style.left = this.getValuePosition(this.local_value) + 'px';
				}
			}

			this.container         = this.$el.getBoundingClientRect();
			let min_handle_box     = this.$refs.min.getBoundingClientRect();
			let min_tooltip_box    = this.$refs.min_tooltip.getBoundingClientRect();

			// Set the min tooltip position
			let min_tooltip_left = (min_handle_box.left - (min_tooltip_box.width / 2) + (min_handle_box.width / 2) - this.container.left);
			if (min_tooltip_left < 0) {
				min_tooltip_left = 0;
			}
			else if ((min_tooltip_left + min_tooltip_box.width) > this.container.width) {
				min_tooltip_left = (this.container.width - min_tooltip_box.width);
			}
			this.min_tooltip_left = min_tooltip_left + 'px';

			if (this.isRange) {
				let max_handle_box     = this.$refs.max.getBoundingClientRect();
				let max_tooltip_box    = this.$refs.max_tooltip.getBoundingClientRect();
				let merged_tooltip_box = this.$refs.merged_tooltip.getBoundingClientRect();

				// Set the max tooltip position
				let max_tooltip_left = (max_handle_box.left - (max_tooltip_box.width / 2) + (max_handle_box.width / 2) - this.container.left);
				if (max_tooltip_left < 0) {
					max_tooltip_left = 0;
				}
				else if ((max_tooltip_left + max_tooltip_box.width) > this.container.width) {
					max_tooltip_left = (this.container.width - max_tooltip_box.width);
				}
				this.max_tooltip_left = max_tooltip_left + 'px';

				// Set the merged tooltip position
				let merged_tooltip_left = ((min_handle_box.left - ((merged_tooltip_box.width - (max_handle_box.right - min_handle_box.left)) / 2)) - this.container.left);
				if (merged_tooltip_left < 0) {
					merged_tooltip_left = 0;
				}
				else if ((merged_tooltip_left + merged_tooltip_box.width) > this.container.width) {
					merged_tooltip_left = (this.container.width - merged_tooltip_box.width);
				}
				this.merged_tooltip_left = merged_tooltip_left + 'px';

				if (min_tooltip_left + min_tooltip_box.width > max_tooltip_left) {
					this.merged_tooltip = true;
				}
				else {
					this.merged_tooltip = false;
				}
			}

			this.setSelection();
			this.$emit('change', this.local_value);
		},
		setSelection() {
			let selection = this.$refs.selection;
			if (this.isRange) {
				selection.style.left  = this.minPosition() + 'px';
				selection.style.right = (this.container.width - this.maxPosition() - this.$refs.min.offsetWidth) + 'px';
			}
			else {
				selection.style.left  = 0;
				selection.style.right = (this.container.width - this.minPosition() - this.$refs.min.offsetWidth) + 'px';
			}
		},
		resizeHandler() {
			this.container = this.$el.getBoundingClientRect();
			this.setHandlePosition();
		},
		minPosition() {
			return parseFloat(this.$refs.min.style.left);
		},
		maxPosition() {
			if (this.$refs.max) {
				return parseFloat(this.$refs.max.style.left);
			}
		},
		emitChange : debounce(function() {
			this.$emit('change', this.local_value);
		}, 50)
	},
	mixins : [
		formField
	],
	mounted() {
		this.container = this.$el.getBoundingClientRect();
		this.selected_handle = this.$refs.min;
		window.addEventListener('mouseup', this.mouseupHandler);
		window.addEventListener('touchend', this.mouseupHandler);
		this.resize_sensor = new ResizeSensor(this.$el, this.resizeHandler);
		this.$nextTick(() => {
			this.setHandlePosition();
		});
	},
	beforeDestroy() {
		window.removeEventListener('mouseup', this.mouseupHandler);
		window.removeEventListener('touchend', this.mouseupHandler);
		window.removeEventListener('resize', this.resizeHandler);
		this.resize_sensor.detach();
	}
};
</script>