<template>
	<div class="tabs">
		<div class="tab-bar">
			<div class="tab-row">
				<div
					v-for="tab in tabs"
					:class="['tab', {'active' : active_tab_id === tab.tabId, 'disabled' : tab.disabled}]"
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
			tabs : [],
			active_tab_id : this.activeTabId
		};
	},
	watch : {
		activeTabId(new_value) {
			this.active_tab_id = new_value;
		}
	},
	methods : {
		addTab(tab) {
			this.tabs.push(tab);
		},
		selectTab(tab) {
			if (!tab.disabled) {
				this.active_tab_id = tab.tabId;
				this.$emit('change', this.active_tab_id);
				this.$nextTick(() => {
					tab.$emit('open');
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
	},
	mounted() {
		let default_tab = this.tabs.find((tab) => {
			return tab.tabId === this.activeTabId;
		});
		if (default_tab) {
			this.selectTab(default_tab);
		}
	}
};
</script>

<style lang="less" scoped>
@import (optional) '~remix-ui-styles/Tabs.less';
</style>