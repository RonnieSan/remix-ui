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
	model : {
		prop  : 'activeTabId',
		event : 'change'
	},
	data() {
		return {
			tabs : []
		};
	},
	watch : {
		activeTabId : {
			handler(new_value, old_value) {
				let new_tab = this.tabs.find(tab => (tab.tabId === new_value));
				let old_tab = this.tabs.find(tab => (tab.tabId === old_value));
				if (new_value !== old_value) {
					this.selectTab(new_tab);
				}
			},
			immediate : true
		}
	},
	methods : {
		addTab(tab) {
			this.tabs.push(tab);
		},
		selectTab(tab) {
			if (tab && !tab.disabled && !tab.noContent) {
				this.$emit('change', tab.tabId);
				this.$nextTick(() => {
					if (tab.$emit) {
						tab.$emit('open');
					}
				});
			}
			else {
				this.$emit('error');
			}
		},
		removeTab(tab_id) {
			this.tabs = this.tabs.filter((tab) => {
				return (tab.tabId !== tab_id);
			});
		}
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Tabs.less';
</style>