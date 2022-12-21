// Imports
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// Define the features
const features = [
	{
		title: 'Modern design',
		imageUrl: 'img/undraw_appreciation.svg',
		description: <>Written entirely in TypeScript, with zero dependencies, and a promise-based design.</>,
	},
	{
		title: 'Node.js + browser',
		imageUrl: 'img/undraw_powerful.svg',
		description: <>Switches intelligently between native libraries to work in both Node.js and browser environments.</>,
	},
	{
		title: 'Thoroughly tested',
		imageUrl: 'img/undraw_online_test.svg',
		description: <>An extensive suite of automated tests verifies every change to the codebase.</>,
	},
];

// The individual feature component
interface FeatureProps {
	imageUrl: string;
	title: string;
	description: React.ReactElement;
}

function Feature({ imageUrl, title, description }: FeatureProps) {
	const imgUrl = useBaseUrl(imageUrl);
	return (
		<div className={clsx('col col--4', styles.feature)}>
			{imgUrl && (
				<div className='text--center'>
					<img className={styles.featureImage} src={imgUrl} alt={title} />
				</div>
			)}
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	);
}

// Function component
const Home: React.FC = () => {
	// Get the site config
	const context = useDocusaurusContext();
	const { siteConfig } = context;

	// Return JSX
	return (
		<Layout title={`Modern CSS Validation`} description='Easily validate CSS using W3C’s public CSS validator service'>
			<header className={clsx('hero hero--primary', styles.heroBanner)}>
				<div className='container'>
					<h1 className='hero__title'>{siteConfig.title}</h1>
					<p className='hero__subtitle'>{siteConfig.tagline}</p>
					<div className={styles.buttons}>
						<Link className={clsx('button button--lg', styles.getStarted)} to={useBaseUrl('docs/')}>
							Get started
						</Link>
					</div>
				</div>
			</header>

			<main>
				{features && features.length > 0 && (
					<section className={styles.features}>
						<div className='container'>
							<div className='row'>
								{features.map((props, idx) => (
									<Feature key={idx} {...props} />
								))}
							</div>
						</div>
					</section>
				)}
			</main>
		</Layout>
	);
};

export default Home;
