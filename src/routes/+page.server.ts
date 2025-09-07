import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { PageServerLoad } from './$types';

export interface ProjectData {
	title: string;
	description: string;
	role: string;
	show_modal: boolean;
	images: string[];
	technologies: string[];
	outcomes: string[];
	highlights: string[];
}

export interface WorkExperienceJob {
	id: string;
	period: string;
	company: string;
	position: string;
	location: string;
	url: string;
	type: 'job';
	description?: string;
	project?: ProjectData;
}

export interface WorkExperienceProjects {
	id: string;
	type: 'projects';
	projects: Array<{
		title: string;
		description: string;
	}>;
}

export type WorkExperience = WorkExperienceJob | WorkExperienceProjects;

export interface EducationItem {
	id: string;
	period: string;
	institution: string;
	degree: string;
	url: string;
}

export interface ContactItem {
	id: string;
	platform: string;
	username: string;
	url: string;
}

export interface AwardItem {
	id: string;
	award: string;
	period: string;
	url: string;
	thumbnail: string;
}

export interface PortfolioData {
	profile: {
		name: string;
		title: string;
		avatar: string;
		website: {
			url: string;
			title: string;
		};
	};
	about: {
		description: string;
	};
	work_experience: WorkExperience[];
	education: EducationItem[];
	awards: AwardItem[];
	contact: ContactItem[];
}

export const load: PageServerLoad = async () => {
	try {
		const dataPath = join(process.cwd(), 'static', 'data', 'me.json');
		const jsonData = readFileSync(dataPath, 'utf-8');
		const data: PortfolioData = JSON.parse(jsonData);

		return {
			portfolio: data
		};
	} catch (error) {
		console.error('Error loading portfolio data:', error);
		// Return default data if JSON fails to load
		return {
			portfolio: {
				profile: {
					name: 'Joe Lee',
					title: 'Software in Los Angeles',
					avatar: '/avatar.jpg',
					website: {
						url: 'https://webverry.com',
						title: 'webverry.com'
					}
				},
				about: {
					description:
						'Joe Lee is a software engineer who builds interactive and performant web applications.'
				},
				work_experience: [],
				education: [],
				awards: [],
				contact: []
			}
		};
	}
};
