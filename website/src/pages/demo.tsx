// Imports
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import cssValidator from 'w3c-css-validator';
import Highlight, { defaultProps } from 'prism-react-renderer';

// Function component
const Demo: React.FC = () => {
	// Initialize states/refs
	const [result, setResult] = useState(undefined);
	const textarea = useRef<HTMLTextAreaElement>();

	// Set the default CSS
	const defaultCSS = '.foo {\n    text-align: center;\n}';

	// Handle form submissions
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		// Block the actual submission
		event.preventDefault();

		// Reset result
		setResult(undefined);

		// Deconstruct and validate
		const { current } = textarea;

		if (current) {
			cssValidator.validateText(String(current.value)).then((newResult) => setResult(newResult));
		}
	};

	// If this is the first render, validate the initial text
	if (!textarea.current) {
		cssValidator.validateText(defaultCSS).then((newResult) => setResult(newResult));
	}

	// Return JSX
	return (
		<Layout title={`Demo`} description='Easily validate CSS using W3C’s public CSS validator service'>
			<header className={clsx('hero hero--primary', styles.heroBanner)}>
				<div className='container'>
					<h1 className='hero__title'>Demo</h1>
				</div>
			</header>
			<main>
				<section className={styles.features}>
					<div className='container'>
						<div className='row'>
							<div className='col col--12'>
								<h2>Write CSS</h2>
							</div>

							<form style={{ width: '100%' }} onSubmit={handleSubmit}>
								<div className='col col--12'>
									<textarea
										style={{ width: '100%', marginBottom: '0.5em', padding: '0.5em' }}
										ref={textarea}
										rows={10}
										defaultValue={defaultCSS}
									/>
								</div>

								<div className='col col--12'>
									<button className='button button--primary button--lg' style={{ marginBottom: '2em' }}>
										Validate
									</button>
								</div>
							</form>
						</div>

						<div className='row'>
							<div className='col col--12'>
								<h2>Result</h2>
							</div>

							<div className='col col--12'>
								<Highlight {...defaultProps} code={JSON.stringify(result, null, 4) ?? 'Loading…'} language='json'>
									{({ className, style, tokens, getLineProps, getTokenProps }) => (
										<pre className={className} style={style}>
											{tokens.map((line, i) => (
												// eslint-disable-next-line react/jsx-key
												<div {...getLineProps({ line, key: i })}>
													{line.map((token, key) => (
														// eslint-disable-next-line react/jsx-key
														<span {...getTokenProps({ token, key })} />
													))}
												</div>
											))}
										</pre>
									)}
								</Highlight>
							</div>
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default Demo;
