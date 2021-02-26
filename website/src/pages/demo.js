import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import cssValidator from 'w3c-css-validator';
import Highlight, { defaultProps } from "prism-react-renderer";

function Demo() {
    const [result, setResult] = useState(undefined);
    const textarea = useRef();

    const defaultCSS = '.foo {\n    text-align: center;\n}'

    const handleSubmit = (event) => {
        event.preventDefault();
        setResult(undefined);
        cssValidator.validateText(textarea.current.value).then((newResult) => setResult(newResult));
    };

    if (!textarea.current) {
        cssValidator.validateText(defaultCSS).then((newResult) => setResult(newResult))
    }

    return (
        <Layout
        title={`Demo`}
        description="Easily validate CSS using W3C’s public CSS validator service">
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
            <h1 className="hero__title">Demo</h1>
            </div>
        </header>
        <main>
            <section className={styles.features}>
                <div className="container">
                    <div className="row">
                        <div className='col col--12'>
                            <h2>Write CSS</h2>
                        </div>

                        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                            <div className='col col--12'>
                                <textarea style={{ width: '100%', marginBottom: '0.5em', padding: '0.5em' }} ref={textarea} rows={10} defaultValue={defaultCSS} />
                            </div>

                            <div className='col col--12'>
                                <button className='button button--primary button--lg' style={{ marginBottom: '2em' }}>Validate</button>
                            </div>
                        </form>
                    </div>

                    <div className="row">
                        <div className='col col--12'>
                            <h2>Result</h2>
                        </div>

                        <div className='col col--12'>
                            <Highlight {...defaultProps} code={JSON.stringify(result, null, 4) ?? 'Loading…'} language="json">
                                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                <pre className={className} style={style}>
                                    {tokens.map((line, i) => (
                                    <div {...getLineProps({ line, key: i })}>
                                        {line.map((token, key) => (
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
}

export default Demo;