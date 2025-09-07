<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Joe Lee - Software in Los Angeles</title>
	<meta name="description" content="Joe Lee's personal website" />
</svelte:head>

<main class="mx-auto px-6 py-16 md:max-w-4xl md:px-32 md:py-32">
	{@render children?.()}
</main>
