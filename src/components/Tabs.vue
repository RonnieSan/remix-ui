<template>
	<div class="tabs">
		<div class="tab-bar">
			<div class="tab-row">
				<div
					v-for="tab in tabs"
					:class="['tab', {'active' : active_tab_id === tab.tabId}]"
					@click="selectTab(tab)"
				>
					<div class="label" v-html="tab.label"></div>
				</div>
			</div>
		</div>
		<div class="tab-contents">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tabs : [],
			active_tab_id : this.activeTabId
		};
	},
	props : {
		activeTabId : String
	},
	methods : {
		addTab(tab) {
			this.tabs.push(tab);
		},
		selectTab(tab) {
			this.active_tab_id = tab.tabId;
			tab.$emit('open');
			this.$emit('change', this.active_tab);
		},
		removeTab(tab_id) {
			this.tabs = this.tabs.filter((tab) => {
				return (tab.tabId !== tab_id);
			});
		}
	},
	mounted() {
		let default_tab = this.tabs.find((tab) => {
			return tab.tabId === this.activeTabId;
		});
		if (default_tab) {
			default_tab.$emit('open');
		}
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Tabs.less';
</style>