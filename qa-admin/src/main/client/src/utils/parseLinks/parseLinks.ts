export const parseLinks = (text: string) => {
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?([^\s]+(\.ru|\.com|\.ai|\.рф|\.app|\.net|\.org|\.io|\.gov|\.edu|\.mil|\.int)[^\s]*)/g;
    return text.replace(urlRegex, (url: string, domainAndPath: string) => {
        const fullUrl = url.startsWith("http") ? url : `https://${url}`;
        if (domainAndPath.length > 40) domainAndPath = domainAndPath.slice(0, 40) + "..."
        return `<a href='${fullUrl}' class="text-link-foreground hover:text-link-foreground/80">${domainAndPath}</a>`;
    });
}

