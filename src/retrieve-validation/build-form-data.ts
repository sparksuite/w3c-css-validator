import { Parameters } from "../types/parameters";

const buildFormData = (parameters: Extract<Parameters, { text: string; }>): string => {
    const CRLF = '\r\n';
    const boundary = `--CSSValidatorBoundary`;

    const pieces: string[] = [
        `Content-Disposition: form-data; name="text"${CRLF}${CRLF}${parameters.text}${CRLF}`,
        `Content-Disposition: form-data; name="profile"${CRLF}${CRLF}css3${CRLF}`,
        `Content-Disposition: form-data; name="output"${CRLF}${CRLF}application/json${CRLF}`,
        `Content-Disposition: form-data; name="usermedium"${CRLF}${CRLF}${parameters.medium ?? 'all'}${CRLF}`,
        `Content-Disposition: form-data; name="warning"${CRLF}${CRLF}${parameters?.warningLevel ? String(parameters.warningLevel - 1) : 'no'}${CRLF}`,
    ];

    return `${boundary}${CRLF}${pieces.join(`${boundary}${CRLF}`)}${boundary}`;
}

export default buildFormData;
