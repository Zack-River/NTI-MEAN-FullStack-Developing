const capitalizeWords = (text) => {
    if (typeof text !== 'string') return '';

    const words = text.split(" ");

    const capitalized = words.map((word) => {
        if (!word) return "";
        const firstLetter = word[0].toUpperCase();
        const rest = word.slice(1).toLowerCase();
        return firstLetter + rest;
    });

    return capitalized.join(" ");
};

module.exports = capitalizeWords;