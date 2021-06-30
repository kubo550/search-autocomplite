const containsNotAllowedChars = (text: string) => {
    const letters = [...text];
    const invalidChars = ["\\", "[", "]", "*"];
    return letters.some(letter => invalidChars.includes(letter));
};

export default containsNotAllowedChars