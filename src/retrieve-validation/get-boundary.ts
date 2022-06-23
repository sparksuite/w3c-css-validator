// Helper function that produces a boundary for form data
let boundary: null | string = null;

const getBoundary = (): string => {
	if (!boundary) {
		boundary = `----CSSValidatorBoundary${String(Math.random()).slice(2)}`;
	}

	return boundary;
};

export default getBoundary;
