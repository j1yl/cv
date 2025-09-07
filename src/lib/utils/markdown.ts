import { marked } from 'marked';

// Configure marked options
marked.setOptions({
	breaks: true,
	gfm: true
});

export function parseMarkdown(markdown: string): string {
	return marked(markdown) as string;
}
