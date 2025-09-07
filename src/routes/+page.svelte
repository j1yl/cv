<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { animate, stagger, inView } from 'motion';
	import Education from '$lib/components/education.svelte';
	import Social from '$lib/components/social.svelte';
	import Award from '$lib/components/award.svelte';
	import WorkLink from '$lib/components/work-link.svelte';
	import Modal from '$lib/components/project-modal.svelte';
	import ProjectOverview from '$lib/components/project-overview.svelte';
	import PageSkeleton from '$lib/components/page-skeleton.svelte';
	import LoadingDebug from '$lib/components/loading-debug.svelte';
	import type { PageData } from './$types';
	import type { WorkExperienceJob } from './+page.server.ts';

	export let data: PageData;
	const { portfolio } = data;

	// Loading states
	let isLoading = true;
	let animationsStarted = false;

	// Modal state
	let isModalOpen = false;
	let modalTitle = '';
	let modalComponent: typeof ProjectOverview | null = null;
	let modalProps: Record<string, unknown> = {};

	function openModal(job: WorkExperienceJob) {
		if (job.project && job.project.show_modal) {
			modalTitle = `${job.company} - ${job.position}`;
			modalComponent = ProjectOverview;
			modalProps = { project: job.project };
			isModalOpen = true;
		}
	}

	function closeModal() {
		isModalOpen = false;
	}

	// Count total images to track loading (for reference only)
	function countImages() {
		const images = [];

		// Add profile avatar
		if (portfolio.profile.avatar) {
			images.push(portfolio.profile.avatar);
		}

		// Add award thumbnails
		portfolio.awards.forEach((award) => {
			if (award.thumbnail) {
				images.push(award.thumbnail);
			}
		});

		// Note: Project images are handled separately in the template
		// since they use dynamic image sources and lazy loading

		return images.length;
	}

	// Handle individual image load
	function handleImageLoad() {
		// Images load in background, no need to track for skeleton
	}

	// Handle image load error
	function handleImageError() {
		// Images load in background, no need to track for skeleton
	}

	// Setup animations when ready
	function setupAnimations() {
		if (animationsStarted) return;
		animationsStarted = true;

		// Initial page load stagger animation
		const animateElements = document.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;

		// Set initial state for all elements
		animateElements.forEach((element) => {
			element.style.opacity = '0';
			element.style.transform = 'translateY(20px)';
		});

		// Animate elements on page load with stagger
		animate(
			animateElements,
			{ opacity: 1, y: 0 },
			{
				delay: stagger(0.1),
				duration: 0.6,
				ease: [0.22, 1, 0.36, 1]
			}
		);

		// Scroll-triggered animations for sections
		const sections = document.querySelectorAll('[data-section]') as NodeListOf<HTMLElement>;
		sections.forEach((section) => {
			const children = section.querySelectorAll('[data-scroll-animate]') as NodeListOf<HTMLElement>;

			// Set initial state for scroll-triggered elements
			children.forEach((child) => {
				child.style.opacity = '0';
				child.style.transform = 'translateY(30px)';
			});

			// Use inView to trigger animations when section comes into view
			inView(
				section,
				() => {
					animate(
						children,
						{ opacity: 1, y: 0 },
						{
							delay: stagger(0.15),
							duration: 0.8,
							ease: [0.22, 1, 0.36, 1]
						}
					);
				},
				{ margin: '-100px' }
			);
		});
	}

	onMount(() => {
		// Simple approach: wait for DOM to be ready then start
		const startApp = () => {
			// Count images for reference (not blocking)
			countImages();

			// Wait a bit for DOM to settle, then hide skeleton and start animations
			setTimeout(() => {
				isLoading = false;
				// Small delay to let the transition start
				setTimeout(() => {
					setupAnimations();
				}, 50);
			}, 300); // Short delay to ensure smooth transition
		};

		// Start after tick to ensure DOM is ready
		tick().then(startApp);
	});
</script>

{#if isLoading}
	<div class="loading-transition">
		<PageSkeleton />
	</div>
{:else}
	<div class="loading-transition flex flex-col gap-16">
		<!-- Header -->
		<div class="flex w-full items-center gap-4" data-animate>
			<div
				class="relative h-24 w-24 rounded-full bg-neutral-100 transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 hover:scale-105 hover:rotate-12"
				data-animate
			>
				<img
					src={portfolio.profile.avatar}
					alt={portfolio.profile.name}
					class="rounded-full"
					on:load={handleImageLoad}
					on:error={handleImageError}
				/>
			</div>
			<div class="flex flex-col gap-1" data-animate>
				<h1 class="text-xl" data-animate>{portfolio.profile.name}</h1>
				<p class="text-sm text-neutral-700" data-animate>{portfolio.profile.title}</p>
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					href={portfolio.profile.website.url}
					target="_blank"
					rel="noopener noreferrer"
					class="w-max cursor-pointer rounded-md bg-neutral-100 px-2 py-1 text-sm transition-all duration-300 hover:scale-105 hover:bg-neutral-200"
					data-animate
				>
					{portfolio.profile.website.title}
				</a>
			</div>
		</div>

		<!-- About -->
		<div class="flex flex-col gap-2" data-section>
			<h2 data-scroll-animate>About</h2>
			<p class="max-w-md text-sm text-neutral-700" data-scroll-animate>
				{portfolio.about.description}
			</p>
		</div>

		<!-- Work experience -->
		<div class="flex flex-col gap-6" data-section>
			<h2 class="leading-none" data-scroll-animate>Work experience</h2>
			{#each portfolio.work_experience as item (item.id)}
				{#if item.type === 'job'}
					<div class="grid grid-cols-3 place-items-start gap-2" data-scroll-animate>
						<p class="text-sm text-neutral-700">{item.period}</p>
						<div class="col-span-2 flex flex-col gap-6">
							<WorkLink
								href={item.url}
								title={item.company}
								location={item.location}
								position={item.position}
								hasModal={!!item.project?.show_modal}
								isDesktop={true}
								on:openModal={() => openModal(item)}
							/>
						</div>
					</div>
				{:else if item.type === 'projects'}
					<div class="grid grid-cols-3 place-items-start gap-2" data-scroll-animate>
						<div class="col-span-2 col-start-2 grid w-full gap-4 md:grid-cols-2">
							{#each item.projects as project, index (project.title)}
								{@const relatedJob = portfolio.work_experience.find(
									(exp) => exp.type === 'job' && exp.id === item.id.replace('-projects', '')
								)}
								{@const projectImage =
									(relatedJob?.type === 'job' ? relatedJob.project?.images?.[index] : null) ||
									'/images/projects/placeholder.jpg'}
								<div
									class="relative aspect-[3024/1629] h-auto w-full overflow-hidden rounded-md bg-neutral-100"
									style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;"
								>
									<img
										src={projectImage}
										alt={project.title}
										class="h-full w-full object-cover transition-all duration-300 hover:scale-105"
										loading="lazy"
										on:load={handleImageLoad}
										on:error={(e) => {
											handleImageError();
											const target = e.currentTarget as HTMLImageElement;
											target.src =
												'https://via.placeholder.com/800x430/f5f5f5/a3a3a3?text=' +
												encodeURIComponent(project.title);
										}}
									/>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<!-- Education -->
		<div class="flex flex-col gap-6" data-section>
			<h2 class="leading-none" data-scroll-animate>Education</h2>
			{#each portfolio.education as education (education.id)}
				<div class="grid grid-cols-3 place-items-start gap-2" data-scroll-animate>
					<p class="text-sm text-neutral-700">{education.period}</p>
					<div class="col-span-2 flex flex-col gap-6">
						<Education
							href={education.url}
							title={education.degree}
							location={education.institution}
							isDesktop={true}
						/>
					</div>
				</div>
			{/each}
		</div>

		<!-- Awards -->
		<div class="flex flex-col gap-6" data-section>
			<h2 class="leading-none" data-scroll-animate>Awards</h2>
			{#each portfolio.awards as award (award.id)}
				<div class="grid grid-cols-3 place-items-start gap-2" data-scroll-animate>
					<p class="text-sm text-neutral-700">{award.period}</p>
					<div class="col-span-2 flex flex-col gap-6">
						<Award
							href={award.url}
							title={award.award}
							thumbnail={award.thumbnail}
							isDesktop={true}
							on:imageLoad={handleImageLoad}
							on:imageError={handleImageError}
						/>
					</div>
				</div>
			{/each}
		</div>

		<!-- Contact -->
		<div class="flex flex-col gap-6" data-section>
			<h2 class="leading-none" data-scroll-animate>Contact</h2>
			{#each portfolio.contact as contact (contact.id)}
				<div class="grid grid-cols-3 place-items-start gap-2" data-scroll-animate>
					<p class="text-sm text-neutral-700">{contact.platform}</p>
					<div class="col-span-2 flex flex-col gap-6">
						<Social href={contact.url} title={contact.username} />
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<!-- Modal -->
<Modal
	isOpen={isModalOpen}
	title={modalTitle}
	component={modalComponent}
	componentProps={modalProps}
	on:close={closeModal}
/>

<!-- Debug component (disable in production) -->
<LoadingDebug showDebug={false} />
