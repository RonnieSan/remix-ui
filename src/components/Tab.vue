<template>
	<div
		v-show="tab_group.activeTabId === tabId && !noContent"
		class="tab-content"
	>
		<slot v-bind="self"></slot>
	</div>
</template>

<script>
export default {
	inject : [
		'tab_group'
	],
	props : {
		label : {
			type : String,
			required : true
		},
		tabId : {
			type : String,
			required : true
		},
		tabClass : String,
		disabled : {
			type : Boolean,
			default : false
		},
		noContent : {
			type : Boolean,
			default : false
		}
	},
	data() {
		return {
			class_name : null
		};
	},
	computed : {
		self() {
			return this;
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
							vm.tab_group.selectTab(vm);
						}
					}
				}
			);
		}
	},
	created() {
		this.tab_group.addTab(this);
	},
	beforeDestroy() {
		this.tab_group.removeTab(this.tabId);
	}
};
</script>