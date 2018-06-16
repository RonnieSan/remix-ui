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
	data() {
		return {
			tab_group : null
		};
	},
	props : {
		label : {
			type : String,
			required : true
		},
		tabId : {
			type : String,
			required : true
		}
	},
	computed : {
		self() {
			return this;
		}
	},
	methods : {
		getParentByTagName(self, tagname) {
			let _parent = null;

			let parent = self.$parent;
			while (parent) {
				// Check if the parent is the tabs
				if (parent.$options._componentTag === tagname) {
					_parent = parent;
					parent = false;
				}

				// Check if a sibling is the tabs
				else {
					parent.$children.forEach((child) => {
						if (child.$options._componentTag === tagname) {
							_parent = child;
							parent = false;
							return false;
						}
					});
					if (parent) {
						parent = parent.$parent;
					}
				}
			}
			return _parent;
		}
	},
	created() {
		this.tab_group = this.getParentByTagName(this, 'tabs');
		this.tab_group.addTab(this);
	}
};
</script>