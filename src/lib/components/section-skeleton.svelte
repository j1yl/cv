<script lang="ts">
	import Skeleton from './skeleton.svelte';

	export let itemCount = 3;
</script>

<div class="flex flex-col gap-6">
	<!-- Section title skeleton -->
	<Skeleton width="8rem" height="1.5rem" />

	<!-- Section items -->
	{#each Array.from({ length: itemCount }, (_, i) => i) as i (i)}
		<div class="grid grid-cols-3 place-items-start gap-2">
			<!-- Period skeleton -->
			<Skeleton width="4rem" height="0.875rem" />

			<!-- Content skeleton -->
			<div class="col-span-2 flex flex-col gap-2">
				<Skeleton width="10rem" height="0.875rem" />
				<Skeleton width="8rem" height="0.75rem" />
				<Skeleton width="6rem" height="0.75rem" />
			</div>
		</div>
	{/each}
</div>
