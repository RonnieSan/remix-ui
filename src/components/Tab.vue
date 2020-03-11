<template>
	<div
		v-if="tab_group.active_tab_id === tabId"
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
		disabled : {
			type : Boolean,
			default : false
		}
	},
	computed : {
		self() {
			return this;
		},
		listeners() {
			let vm = this;
			return Object.assign(
				{},
				{
					click(event) {
						vm.tab_group.selectTab(vm);
					}
				},
				vm.$listeners
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