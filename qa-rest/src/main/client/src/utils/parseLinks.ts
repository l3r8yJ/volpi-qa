export const parseLinks = (text: string) => {
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?([^\s]+(\.ru|\.com|\.ai|\.рф|\.app|\.net|\.org|\.io|\.gov|\.edu|\.mil|\.int)[^\s]*)/g;
    return text.replace(urlRegex, (url, domainAndPath) => {
        const fullUrl = url.startsWith('http') ? url : `http://${url}`;
        if(domainAndPath.length > 30) domainAndPath = domainAndPath.slice(0, 27) + "..."
        return `<a href='${fullUrl}' class="text-blue-600 break-words hover:text-blue-500 font-medium text-base bg-blue-50 p-0.5 rounded">${domainAndPath}</a>`;
    });
}
