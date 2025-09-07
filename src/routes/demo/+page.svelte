<script>
	import { goto } from '$app/navigation';
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<button type="button" on:click={() => goto('/demo/paraglide')}>paraglide</button>
