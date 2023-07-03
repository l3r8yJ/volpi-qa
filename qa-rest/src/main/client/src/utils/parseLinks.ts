import DOMPurify from "dompurify";

export const parseLinks = (text: string) => {
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?([^\s]+(\.ru|\.com|\.ai|\.рф|\.app|\.net|\.org|\.io|\.gov|\.edu|\.mil|\.int)[^\s]*)/g;

    const sanitizedText = DOMPurify.sanitize(text, {
        FORBID_TAGS: ["a"],
        ADD_ATTR: ['class'],
    });

    const textWithEncodedHtml = sanitizedText.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const textWithLinks = textWithEncodedHtml.replace(urlRegex, (url, domainAndPath) => {
        const fullUrl = url.startsWith("http") ? url : `https://${url}`;
        if (domainAndPath.length > 40) domainAndPath = domainAndPath.slice(0, 40) + "...";
        return `<a href="${fullUrl}" class="text-blue-600 break-words hover:text-blue-500 font-medium text-base bg-blue-50 p-0.5 rounded">${domainAndPath}</a>`;
    });


    return textWithLinks;
};