export const parseLinks = (text: string) => {
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?([^\s]+(\.ru|\.com|\.ai|\.рф|\.app|\.net|\.org|\.io|\.gov|\.edu|\.mil|\.int)[^\s]*)/g;
    return text.replace(urlRegex, (url:string, domainAndPath:string) => {
        const fullUrl = url.startsWith("http") ? url : `https://${url}`;
        if(domainAndPath.length > 40) domainAndPath = domainAndPath.slice(0, 40) + "..."
        return `<a href='${fullUrl}' class="text-link hover:text-linkHov text-base bg-secondary p-0.5 border border-border/40 rounded">${domainAndPath}</a>`;
    });
}

