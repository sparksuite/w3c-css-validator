// Expected length of a boundary
export const boundaryLength = 34;

// Helper function that produces a boundary for form data
const getBoundary = (): string => {
	const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	let randomBoundaryPiece = '';

	for (let i = 0; i < 10; i += 1) {
		randomBoundaryPiece += allowedChars[Math.floor(Math.random() * allowedChars.length)];
	}

	return `----CSSValidatorBoundary${randomBoundaryPiece}`;
};

export default getBoundary;
