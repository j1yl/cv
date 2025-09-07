<script lang="ts">
	import HeaderSkeleton from './header-skeleton.svelte';
	import SectionSkeleton from './section-skeleton.svelte';
	import Skeleton from './skeleton.svelte';
</script>

<div class="flex flex-col gap-16">
	<!-- Header skeleton -->
	<HeaderSkeleton />

	<!-- About section skeleton -->
	<div class="flex flex-col gap-2">
		<Skeleton width="4rem" height="1.5rem" />
		<Skeleton width="20rem" height="0.875rem" />
		<Skeleton width="16rem" height="0.875rem" />
	</div>

	<!-- Work experience section skeleton -->
	<SectionSkeleton itemCount={4} />

	<!-- Education section skeleton -->
	<SectionSkeleton itemCount={1} />

	<!-- Awards section skeleton -->
	<SectionSkeleton itemCount={2} />

	<!-- Contact section skeleton -->
	<SectionSkeleton itemCount={4} />
</div>
