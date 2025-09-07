<script lang="ts">
	import {
		isContentLoaded,
		isImagesLoaded,
		isComponentMounted,
		shouldStartAnimations
	} from '$lib/stores/loading';

	export let showDebug = false;
</script>

{#if showDebug}
	<div class="fixed right-4 bottom-4 z-50 rounded-lg bg-black/80 p-3 font-mono text-xs text-white">
		<div class="mb-2 font-bold">Loading Debug</div>
		<div class="space-y-1">
			<div class="flex items-center gap-2">
				<div class="h-2 w-2 rounded-full {$isContentLoaded ? 'bg-green-400' : 'bg-red-400'}"></div>
				<span>Content: {$isContentLoaded ? 'Ready' : 'Loading'}</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="h-2 w-2 rounded-full {$isImagesLoaded ? 'bg-green-400' : 'bg-red-400'}"></div>
				<span>Images: {$isImagesLoaded ? 'Ready' : 'Loading'}</span>
			</div>
			<div class="flex items-center gap-2">
				<div
					class="h-2 w-2 rounded-full {$isComponentMounted ? 'bg-green-400' : 'bg-red-400'}"
				></div>
				<span>Mounted: {$isComponentMounted ? 'Ready' : 'Loading'}</span>
			</div>
			<div class="mt-1 flex items-center gap-2 border-t border-white/20 pt-1">
				<div
					class="h-2 w-2 rounded-full {$shouldStartAnimations ? 'bg-green-400' : 'bg-red-400'}"
				></div>
				<span>Animations: {$shouldStartAnimations ? 'Active' : 'Waiting'}</span>
			</div>
		</div>
	</div>
{/if}
