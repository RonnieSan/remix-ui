<template>
	<div :class="['gutter', $attrs.class]" :style="style"/>
</template>

<script>
import ResizeSensor from '../lib/ResizeSensor';

export default {
	props : {
		size : {
			type : String,
			required : true
		},
		static : {
			type : Boolean,
			default : false
		}
	},
	data() {
		return {
			height : this.size,
			width : this.size,
			parent_el : null,
			display : true,
			resize_sensor : null
		};
	},
	computed : {
		style() {
			return {
				'background-color' : 'transparent',
				'height' : this.height,
				'min-height' : 0,
				'min-width' : 0,
				'width' : this.width,
				'flex' : '0 0 auto'
			};
		}
	},
	methods : {
		resizeHandler() {
			// Get sibingElements
			let prev_el = this.$el.previousElementSibling;
			let next_el = this.$el.nextElementSibling;

			this.height = this.size;
			this.width = this.size;

			this.$nextTick(() => {
				if (prev_el && next_el) {
					// Get the bounding 
					let prev_box = prev_el.getBoundingClientRect();
					let next_box = next_el.getBoundingClientRect();

					// Check if the top of the next sibling is above the bottom of the previous sibling
					if (next_box.top >= prev_box.bottom) {
						this.width = '0';
					}
					else {
						this.height = '100%';
						this.width = this.size;
					}
					
					// Check if the left of the next sibling is to the left of the right of the previous sibling
					if (next_box.left >= prev_box.right) {
						this.height = '0';
					}
					else {
						this.height = this.size;
						this.width = '100%';
					}
				}
			});
		}
	},
	mounted() {
		if (!this.static) {
			this.parent_el = this.$el.parentElement;
			this.resize_sensor = new ResizeSensor(this.parent_el, this.resizeHandler);
			this.resizeHandler();
		}
	}
};
</script>