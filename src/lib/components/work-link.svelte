<script lang="ts">
	import { animate } from 'motion';
	import { onMount, createEventDispatcher } from 'svelte';

	export let href: string;
	export let title: string;
	export let location: string;
	export let position: string;
	export let isDesktop = false;
	export let hasModal = false;

	const dispatch = createEventDispatcher();

	let linkElement: HTMLAnchorElement;
	let arrowElement: SVGSVGElement;

	onMount(() => {
		if (linkElement && arrowElement) {
			// Add hover animation using Motion
			const handleMouseEnter = () => {
				animate(linkElement, { y: -2 }, { type: 'spring', stiffness: 300, damping: 20 });
				animate(arrowElement, { x: 2 }, { type: 'spring', stiffness: 300, damping: 20 });
			};

			const handleMouseLeave = () => {
				animate(linkElement, { y: 0 }, { type: 'spring', stiffness: 300, damping: 20 });
				animate(arrowElement, { x: 0 }, { type: 'spring', stiffness: 300, damping: 20 });
			};

			linkElement.addEventListener('mouseenter', handleMouseEnter);
			linkElement.addEventListener('mouseleave', handleMouseLeave);

			// Handle click for modal
			const handleClick = (e: Event) => {
				if (hasModal) {
					e.preventDefault();
					dispatch('openModal');
				}
			};

			linkElement.addEventListener('click', handleClick);

			return () => {
				linkElement?.removeEventListener('mouseenter', handleMouseEnter);
				linkElement?.removeEventListener('mouseleave', handleMouseLeave);
				linkElement?.removeEventListener('click', handleClick);
			};
		}
	});
</script>

<a
	bind:this={linkElement}
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="group relative box-border flex w-full shrink-0 cursor-pointer flex-col content-stretch items-start justify-start gap-0.5 overflow-visible p-0"
>
	<div
		class="relative flex shrink-0 flex-col justify-center font-sans text-[14px] leading-[0] font-normal text-nowrap text-[#111111] not-italic {isDesktop
			? 'w-auto'
			: 'w-[200px]'}"
	>
		<p class="flex items-center gap-1 leading-[1.8] whitespace-pre transition-colors duration-200">
			<span>{title}</span>
			<svg
				width="16px"
				height="16px"
				bind:this={arrowElement}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M7 17L17 7M17 7H8M17 7V16"
					stroke="#000000"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</p>
	</div>
	<div
		class="relative flex min-w-full shrink-0 flex-col justify-center font-sans text-[14px] leading-[0] font-normal text-[#555555] not-italic {isDesktop
			? 'mt-0'
			: 'mt-1'}"
	>
		<p class="text-xs leading-[1.8] text-neutral-700">{location}</p>
	</div>
	<span class="text-xs text-neutral-700">{position}</span>
</a>
