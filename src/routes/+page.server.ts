import type { PageServerLoad } from './$types';
import portfolioData from '$lib/data/me.json';

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
	return {
		portfolio: portfolioData as PortfolioData
	};
};
