export const parseLinks = (text: string) => {
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?([^\s]+(\.ru|\.com)[^\s]*)/g;
    return text.replace(urlRegex, (url, domainAndPath) => {
        const fullUrl = url.startsWith('http') ? url : `http://${url}`;
        if(domainAndPath.length > 30) domainAndPath = domainAndPath.slice(0, 27) + "..."
        return `<a href='${fullUrl}' class="text-indigo-600 break-words hover:text-indigo-500 text-base bg-indigo-100 p-0.5 rounded">${domainAndPath}</a>`;
    });
}
