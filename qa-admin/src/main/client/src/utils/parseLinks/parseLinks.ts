export const parseLinks = (text: string) => {
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?([^\s]+(\.ru|\.com)[^\s]*)/g;
    return text.replace(urlRegex, (url, domainAndPath) => {
        const fullUrl = url.startsWith('http') ? url : `http://${url}`;
        return `<a href='${fullUrl}' class="text-link hover:text-linkHov text-base bg-secondary p-0.5 border border-border/40 rounded">${domainAndPath}</a>`;
    });
}
