<script lang="ts">
	import { animate } from 'motion';
	import { onMount, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	export let isOpen = false;
	export let title = '';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let component: any = null;
	export let componentProps: Record<string, unknown> = {};

	const dispatch = createEventDispatcher();

	let modalElement: HTMLDivElement;
	let backdropElement: HTMLDivElement;
	let contentElement: HTMLDivElement;
	let headerElement: HTMLDivElement;
	let bodyElement: HTMLDivElement;

	function closeModal() {
		if (modalElement && backdropElement && contentElement && headerElement && bodyElement) {
			// Clean exit animation
			animate(headerElement, { y: -10, opacity: 0 }, { duration: 0.2 });
			animate(bodyElement, { y: 10, opacity: 0 }, { duration: 0.2, delay: 0.05 });
			animate(contentElement, { scale: 0.98, opacity: 0 }, { duration: 0.25, delay: 0.1 });
			animate(backdropElement, { opacity: 0 }, { duration: 0.3, delay: 0.15 }).finished.then(() => {
				// Restore document scroll before closing (only in browser)
				if (browser) {
					document.body.style.overflow = '';
				}
				dispatch('close');
			});
		} else {
			// Restore document scroll before closing (only in browser)
			if (browser) {
				document.body.style.overflow = '';
			}
			dispatch('close');
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === backdropElement) {
			closeModal();
		}
	}

	onMount(() => {
		if (
			isOpen &&
			modalElement &&
			backdropElement &&
			contentElement &&
			headerElement &&
			bodyElement
		) {
			// Lock document scroll (only in browser)
			if (browser) {
				document.body.style.overflow = 'hidden';
			}

			// Set initial states
			backdropElement.style.opacity = '0';
			contentElement.style.opacity = '0';
			contentElement.style.transform = 'scale(0.98)';
			headerElement.style.opacity = '0';
			headerElement.style.transform = 'translateY(-10px)';
			bodyElement.style.opacity = '0';
			bodyElement.style.transform = 'translateY(10px)';

			// Clean entrance animation
			animate(backdropElement, { opacity: 1 }, { duration: 0.25 });
			animate(contentElement, { opacity: 1, scale: 1 }, { duration: 0.3, delay: 0.1 });
			animate(headerElement, { opacity: 1, y: 0 }, { duration: 0.25, delay: 0.2 });
			animate(bodyElement, { opacity: 1, y: 0 }, { duration: 0.25, delay: 0.25 });
		}

		// Cleanup function to restore scroll when component unmounts
		return () => {
			if (browser) {
				document.body.style.overflow = '';
			}
		};
	});

	$: if (
		isOpen &&
		modalElement &&
		backdropElement &&
		contentElement &&
		headerElement &&
		bodyElement
	) {
		// Lock document scroll
		document.body.style.overflow = 'hidden';

		// Set initial states
		backdropElement.style.opacity = '0';
		contentElement.style.opacity = '0';
		contentElement.style.transform = 'scale(0.98)';
		headerElement.style.opacity = '0';
		headerElement.style.transform = 'translateY(-10px)';
		bodyElement.style.opacity = '0';
		bodyElement.style.transform = 'translateY(10px)';

		// Clean entrance animation
		animate(backdropElement, { opacity: 1 }, { duration: 0.25 });
		animate(contentElement, { opacity: 1, scale: 1 }, { duration: 0.3, delay: 0.1 });
		animate(headerElement, { opacity: 1, y: 0 }, { duration: 0.25, delay: 0.2 });
		animate(bodyElement, { opacity: 1, y: 0 }, { duration: 0.25, delay: 0.25 });
	}

	// Reactive statement to handle scroll lock/unlock (only in browser)
	$: if (browser) {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<div
		bind:this={modalElement}
		class="fixed inset-0 z-50"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<!-- Clean Backdrop -->
		<div
			bind:this={backdropElement}
			class="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm"
			on:click={handleBackdropClick}
			on:keydown={handleKeydown}
			role="button"
			tabindex="-1"
		></div>

		<!-- Modal Content -->
		<div
			bind:this={contentElement}
			class="relative flex h-full w-full flex-col
			items-center justify-start bg-white pt-8 md:pt-16"
		>
			<!-- Header -->
			<div bind:this={headerElement} class="w-full max-w-2xl px-6">
				<div class="mb-8 flex items-start justify-between">
					<div class="flex-1">
						<h2 id="modal-title" class="mb-1 text-xl font-medium text-neutral-900">
							{title}
						</h2>
					</div>
					<button
						on:click={closeModal}
						class="ml-4 flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 transition-all duration-200 hover:scale-105 hover:bg-neutral-200"
						aria-label="Close modal"
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="text-neutral-600"
						>
							<path
								d="M18 6L6 18M6 6L18 18"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Content -->
			<div bind:this={bodyElement} class="w-full flex-1 overflow-hidden">
				<div class="h-full overflow-y-auto">
					<div class="mx-auto max-w-2xl px-6 pb-16">
						{#if component}
							<svelte:component this={component} {...componentProps} />
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
