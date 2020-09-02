<template>
	<button :class="['r-button', 'focusable', $attrs.class, {disabled, loading}]" :type="type" :disabled="disabled || loading" @click="emitClick">
		<span v-if="icon || loading" class="icon">
			<icon v-if="!loading" :type="icon" :size="iconSize"/>
			<icon v-else type="loading" :size="iconSize"/>
		</span><span class="label"><slot></slot></span>
	</button>
</template>

<script>
import Icon from './Icon';

export default {
	components : {
		Icon
	},
	props : {
		type : {
			type : String,
			default : 'button'
		},
		icon : {
			type : String,
			default : null
		},
		iconSize : {
			type : String,
			default : '24'
		},
		loading : {
			type : Boolean,
			default : false
		},
		disabled : {
			type : Boolean
		}
	},
	methods : {
		emitClick(event) {
			if (this.loading) {
				event.preventDefault();
			}
			else {
				return true;
			}
		}
	}
};
</script>