exports.bodyPreview = (string) => {
    const array = string.split(' ').slice(0, 40)
    return array.join(' ').concat('...');
}