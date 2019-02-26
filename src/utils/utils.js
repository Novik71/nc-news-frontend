exports.bodyPreview = (string) => {
    const array = string.split(' ').slice(0, 55)
    return array.join(' ').concat('...');
}