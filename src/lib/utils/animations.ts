import { get } from 'svelte/store';
import { shouldStartAnimations } from '$lib/stores/loading';

/**
 * Utility function to safely start animations only when the page is ready
 * @param animationCallback - Function containing animation logic
 * @param fallbackDelay - Fallback delay in ms if store is not ready (default: 0)
 */
export function safeAnimate(animationCallback: () => void, fallbackDelay = 0) {
	const canAnimate = get(shouldStartAnimations);

	if (canAnimate) {
		// Page is ready, start animations immediately
		animationCallback();
	} else {
		// Page not ready yet, wait for the store to update or use fallback
		const unsubscribe = shouldStartAnimations.subscribe((ready) => {
			if (ready) {
				animationCallback();
				unsubscribe();
			}
		});

		// Fallback timeout to prevent animations from never starting
		if (fallbackDelay > 0) {
			setTimeout(() => {
				const stillNotReady = !get(shouldStartAnimations);
				if (stillNotReady) {
					animationCallback();
					unsubscribe();
				}
			}, fallbackDelay);
		}
	}
}

/**
 * Utility to set initial hidden state for elements before animations
 * @param element - HTML element to prepare
 * @param transform - Initial transform (default: 'translateY(20px)')
 */
export function prepareForAnimation(element: HTMLElement, transform = 'translateY(20px)') {
	element.style.opacity = '0';
	element.style.transform = transform;
}

/**
 * Utility to reset element styles to visible state
 * @param element - HTML element to reset
 */
export function resetElementStyles(element: HTMLElement) {
	element.style.opacity = '1';
	element.style.transform = 'none';
}
