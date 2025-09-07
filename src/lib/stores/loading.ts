import { writable } from 'svelte/store';

export const isContentLoaded = writable(false);
export const isImagesLoaded = writable(false);
export const isComponentMounted = writable(false);

// Derived store to determine if animations should start
export const shouldStartAnimations = writable(false);

// Function to check if all conditions are met
export function checkAnimationReadiness() {
	let contentLoaded = false;
	let imagesLoaded = false;
	let componentMounted = false;

	function updateAnimationState() {
		const allReady = contentLoaded && imagesLoaded && componentMounted;
		console.log('Update animation state:', {
			contentLoaded,
			imagesLoaded,
			componentMounted,
			allReady
		});
		shouldStartAnimations.set(allReady);
	}

	// Subscribe to all loading states and get initial values
	const unsubscribeContent = isContentLoaded.subscribe((value) => {
		contentLoaded = value;
		updateAnimationState();
	});

	const unsubscribeImages = isImagesLoaded.subscribe((value) => {
		imagesLoaded = value;
		updateAnimationState();
	});

	const unsubscribeComponent = isComponentMounted.subscribe((value) => {
		componentMounted = value;
		updateAnimationState();
	});

	// Return cleanup function
	return () => {
		unsubscribeContent();
		unsubscribeImages();
		unsubscribeComponent();
	};
}

// Reset loading state for page navigation
export function resetLoadingState() {
	isContentLoaded.set(false);
	isImagesLoaded.set(false);
	isComponentMounted.set(false);
	shouldStartAnimations.set(false);
}
