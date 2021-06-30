const toInnerHTML = (text: string) => ({ __html: text });

const getHighlightedHTML = (wholeText: string, searchingText: string) => {

    if (!searchingText) {
        return toInnerHTML(wholeText);
    }

    const regex = new RegExp(searchingText, "i");
    const hightlighted = wholeText.replace(regex, e => `<b>${e}</b>`);

    return toInnerHTML(hightlighted);
};

export default getHighlightedHTML