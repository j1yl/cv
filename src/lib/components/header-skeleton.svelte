<script lang="ts">
	import Skeleton from './skeleton.svelte';
</script>

<div class="flex w-full items-center gap-4">
	<!-- Avatar skeleton -->
	<Skeleton width="6rem" height="6rem" rounded="rounded-full" />

	<!-- Text content skeleton -->
	<div class="flex flex-col gap-1">
		<Skeleton width="8rem" height="1.25rem" />
		<Skeleton width="12rem" height="0.875rem" />
		<Skeleton width="7rem" height="2rem" rounded="rounded-md" />
	</div>
</div>
