<script lang="ts">
	import { animate, stagger } from 'motion';
	import { onMount } from 'svelte';
	import type { ProjectData } from '../../routes/+page.server';

	export let project: ProjectData;

	let containerElement: HTMLDivElement;
	let imageElements: HTMLDivElement[] = [];
	let activeImageIndex = 0;

	onMount(() => {
		// Stagger animate all sections
		const sections = containerElement.querySelectorAll(
			'[data-animate-section]'
		) as NodeListOf<HTMLElement>;
		sections.forEach((section) => {
			section.style.opacity = '0';
			section.style.transform = 'translateY(16px)';
		});

		animate(
			sections,
			{ opacity: 1, y: 0 },
			{
				delay: stagger(0.08),
				duration: 0.4,
				ease: [0.22, 1, 0.36, 1]
			}
		);

		// Animate tech tags
		const techTags = containerElement.querySelectorAll(
			'[data-animate-tech]'
		) as NodeListOf<HTMLElement>;
		techTags.forEach((tag) => {
			tag.style.opacity = '0';
			tag.style.transform = 'translateY(8px)';
		});

		setTimeout(() => {
			animate(
				techTags,
				{ opacity: 1, y: 0 },
				{
					delay: stagger(0.05),
					duration: 0.3
				}
			);
		}, 200);

		// Animate outcomes with extra delay
		const outcomes = containerElement.querySelectorAll(
			'[data-animate-outcome]'
		) as NodeListOf<HTMLElement>;
		outcomes.forEach((outcome) => {
			outcome.style.opacity = '0';
			outcome.style.transform = 'translateY(8px)';
		});

		setTimeout(() => {
			animate(
				outcomes,
				{ opacity: 1, y: 0 },
				{
					delay: stagger(0.06),
					duration: 0.4
				}
			);
		}, 400);

		// Animate highlights with extra delay
		const highlights = containerElement.querySelectorAll(
			'[data-animate-highlight]'
		) as NodeListOf<HTMLElement>;
		highlights.forEach((highlight) => {
			highlight.style.opacity = '0';
			highlight.style.transform = 'translateY(8px)';
		});

		setTimeout(() => {
			animate(
				highlights,
				{ opacity: 1, y: 0 },
				{
					delay: stagger(0.06),
					duration: 0.4
				}
			);
		}, 500);
	});

	function switchImage(index: number) {
		if (index === activeImageIndex) return;

		const currentImage = imageElements[activeImageIndex];
		const nextImage = imageElements[index];

		if (currentImage && nextImage) {
			animate(currentImage, { opacity: 0 }, { duration: 0.15 });
			activeImageIndex = index;
			setTimeout(() => {
				animate(nextImage, { opacity: 1 }, { duration: 0.25 });
			}, 150);
		}
	}

	function animateOnHover(element: HTMLElement) {
		const handleMouseEnter = () => {
			animate(
				element,
				{ y: -2, rotate: Math.random() * 2 - 1 },
				{
					duration: 0.3,
					type: 'spring',
					stiffness: 400,
					damping: 15
				}
			);
		};

		const handleMouseLeave = () => {
			animate(
				element,
				{ y: 0, rotate: 0 },
				{
					duration: 0.4,
					type: 'spring',
					stiffness: 300,
					damping: 20
				}
			);
		};

		element.addEventListener('mouseenter', handleMouseEnter);
		element.addEventListener('mouseleave', handleMouseLeave);

		return {
			destroy() {
				element.removeEventListener('mouseenter', handleMouseEnter);
				element.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	}
</script>

<div bind:this={containerElement} class="space-y-8">
	<!-- Role & Title -->
	<div data-animate-section class="space-y-3">
		<div
			class="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 transition-all duration-300 hover:scale-105 hover:bg-neutral-200"
		>
			<span class="text-xs font-medium text-neutral-700">{project.role}</span>
		</div>
		<h1
			class="text-xl font-medium text-neutral-900 transition-all duration-300 hover:text-neutral-600"
		>
			{project.title}
		</h1>
		<p class="max-w-lg text-sm leading-relaxed text-neutral-600">
			{project.description}
		</p>
	</div>

	<!-- Image Gallery -->
	{#if project.images && project.images.length > 0}
		<div data-animate-section class="space-y-4">
			<h2 class="text-sm font-medium text-neutral-900">Gallery</h2>

			<!-- Main Image -->
			<div
				class="relative aspect-[3024/1629] overflow-hidden rounded-lg bg-neutral-100 transition-all duration-300 hover:scale-[1.01]"
				style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;"
			>
				{#each project.images as image, index (image)}
					<div
						bind:this={imageElements[index]}
						class="absolute inset-0 opacity-0"
						class:opacity-100={index === activeImageIndex}
					>
						<img
							src={image}
							alt="Project screenshot {index + 1}"
							class="h-full w-full object-cover transition-all duration-500 hover:scale-105"
							loading="lazy"
							on:error={(e) => {
								const target = e.currentTarget as HTMLImageElement;
								target.src = `https://via.placeholder.com/800x450/f5f5f5/a3a3a3?text=Project+Image+${index + 1}`;
							}}
						/>
					</div>
				{/each}
			</div>

			<!-- Image Navigation -->
			{#if project.images.length > 1}
				<div class="flex gap-2">
					{#each project.images as image, index (image)}
						<button
							on:click={() => switchImage(index)}
							class="group relative aspect-[3024/1629] w-16 overflow-hidden rounded-lg transition-all duration-300 {index ===
							activeImageIndex
								? 'scale-105 ring-2 ring-neutral-900'
								: 'hover:scale-110 hover:-rotate-2'}"
							style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;"
							use:animateOnHover
						>
							<img
								src={image}
								alt="Thumbnail {index + 1}"
								class="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
								loading="lazy"
								on:error={(e) => {
									const target = e.currentTarget as HTMLImageElement;
									target.src = `https://via.placeholder.com/128x72/f5f5f5/a3a3a3?text=${index + 1}`;
								}}
							/>
							{#if index === activeImageIndex}
								<div class="absolute inset-0 flex items-center justify-center bg-neutral-900/30">
									<div class="h-2 w-2 animate-pulse rounded-full bg-white"></div>
								</div>
							{/if}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	<!-- Technologies -->
	{#if project.technologies && project.technologies.length > 0}
		<div data-animate-section class="space-y-3">
			<h2 class="text-sm font-medium text-neutral-900">Technologies</h2>
			<div class="flex flex-wrap gap-2">
				{#each project.technologies as tech (tech)}
					<span
						data-animate-tech
						class="inline-flex cursor-pointer items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition-all duration-300 hover:scale-110 hover:-rotate-1 hover:bg-neutral-900 hover:text-white"
						use:animateOnHover
					>
						{tech}
					</span>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Key Outcomes -->
	{#if project.outcomes && project.outcomes.length > 0}
		<div data-animate-section class="space-y-3">
			<h2 class="text-sm font-medium text-neutral-900">Key Outcomes</h2>
			<div class="space-y-1">
				{#each project.outcomes as outcome, index (outcome)}
					<div
						class="group hover:-rotate-0.5 cursor-pointer rounded-lg bg-neutral-50 p-3 transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-900 hover:text-white"
						use:animateOnHover
						data-animate-outcome
					>
						<div class="flex items-start gap-3">
							<div
								class="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-700 transition-all duration-300 group-hover:bg-white group-hover:text-neutral-900"
							>
								{index + 1}
							</div>
							<span
								class="text-sm leading-relaxed text-neutral-700 transition-colors duration-300 group-hover:text-white"
								>{outcome}</span
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Project Highlights -->
	{#if project.highlights && project.highlights.length > 0}
		<div data-animate-section class="space-y-3">
			<h2 class="text-sm font-medium text-neutral-900">Highlights</h2>
			<div class="space-y-1">
				{#each project.highlights as highlight (highlight)}
					<div
						class="group hover:rotate-0.5 cursor-pointer rounded-lg bg-neutral-50 p-3 transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-900 hover:text-white"
						use:animateOnHover
						data-animate-highlight
					>
						<div class="flex items-start gap-3">
							<div
								class="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs text-white transition-all duration-300 group-hover:rotate-12 group-hover:bg-yellow-400 group-hover:text-neutral-900"
							>
								★
							</div>
							<span
								class="text-sm leading-relaxed font-medium text-neutral-700 transition-colors duration-300 group-hover:text-white"
								>{highlight}</span
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
