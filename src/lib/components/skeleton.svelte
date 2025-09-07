<script lang="ts">
	export let width = '100%';
	export let height = '1rem';
	export let className = '';
	export let rounded = 'rounded-md';
</script>

<div
	class="animate-pulse bg-neutral-200 {rounded} {className}"
	style="width: {width}; height: {height};"
></div>

<style>
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.6;
		}
	}

	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
