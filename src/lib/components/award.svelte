<script lang="ts">
	import { animate } from 'motion';
	import { onMount, createEventDispatcher } from 'svelte';

	export let href: string;
	export let title: string;
	export let thumbnail: string;
	export let isDesktop = false;

	const dispatch = createEventDispatcher();

	let linkElement: HTMLAnchorElement;
	let imageElement: HTMLImageElement;
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

			return () => {
				linkElement?.removeEventListener('mouseenter', handleMouseEnter);
				linkElement?.removeEventListener('mouseleave', handleMouseLeave);
			};
		}
	});
</script>

<a
	bind:this={linkElement}
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="group relative box-border flex w-full shrink-0 cursor-pointer items-start gap-3 overflow-visible p-0"
>
	<!-- Content -->
	<div class="flex flex-1 flex-col gap-4">
		<div
			class="relative flex shrink-0 flex-col justify-center font-sans text-[14px] leading-[0] font-normal text-nowrap text-[#111111] not-italic {isDesktop
				? 'w-auto'
				: 'w-[200px]'}"
		>
			<p
				class="flex items-center gap-1 leading-[1.8] whitespace-pre transition-colors duration-200"
			>
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
			class="relative aspect-[3024/1629] h-auto min-h-32 w-full overflow-hidden rounded-md bg-neutral-100"
			style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;"
		>
			<img
				bind:this={imageElement}
				src={thumbnail}
				alt={title}
				class="h-full w-full object-cover transition-all duration-300 hover:scale-105"
				loading="lazy"
				on:load={() => dispatch('imageLoad')}
				on:error={(e) => {
					dispatch('imageError');
					const target = e.currentTarget as HTMLImageElement;
					target.src =
						'https://via.placeholder.com/800x430/f5f5f5/a3a3a3?text=' + encodeURIComponent(title);
				}}
			/>
		</div>
	</div>
</a>
