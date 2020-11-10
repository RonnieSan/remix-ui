<template>
	<div class="tabs">
		<div class="tab-bar">
			<div class="tab-row">
				<div
					v-for="tab in tabs"
					:key="tab.tabId"
					:class="['tab', {'active' : activeTabId === tab.tabId, 'disabled' : tab.disabled}, tab.tabClass]"
					v-on="tab.listeners"
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
	provide() {
		return {
			tab_group : this
		};
	},
	props : {
		activeTabId : String
	},
	data() {
		return {
			active_tab : this.activeTabId,
			tabs : []
		};
	},
	watch : {
		activeTabId : {
			handler(new_value, old_value) {
				let new_tab = this.tabs.find(tab => (tab.tabId === new_value));
				let old_tab = this.tabs.find(tab => (tab.tabId === old_value));
				if (new_value !== old_value) {
					this.active_tab = new_value;
					new_tab.emitOpen();
				}
			}
		}
	},
	methods : {
		addTab(tab) {
			this.tabs.push(tab);
		},
		removeTab(tab_id) {
			this.tabs = this.tabs.filter((tab) => {
				return (tab.tabId !== tab_id);
			});
		},
		updateActiveTab(tab) {
			if (tab.tabId !== this.active_tab) {
				this.$emit('update:activeTabId', tab.tabId);
			}
		}
	},
	mounted() {
		let selected_tab = this.tabs.find(tab => (tab.tabId === this.activeTabId));
		selected_tab.selectTab()
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Tabs.less';
</style>