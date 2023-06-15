export const parseLinks = (text: string) => {
    const urlRegex = /https?:\/\/[^\s]+/g;
    return text.replace(urlRegex, (url) => `<a href='${url}'>${url}</a>`);
}