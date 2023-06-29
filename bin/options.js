

const linksUnique = (array) => {

    const unique = array.reduce((acc, item) => {
        if (!acc.includes(item.href)) {
            acc.push(item.href)
        }
        return acc
    }, [])

    return unique.length
}

const linksBroken = (array) => {

    const broken = array.filter((link) => link.ok !== "OK")
    return broken.length
}


const showResults = array => {

    const brokenLinks = linksBroken(array);
    const uniqueLinks = linksUnique(array);
    const totalLinks = array.length;
    const statistics = {
        total: totalLinks,
        unique: uniqueLinks,
        broken: brokenLinks
    }
    return statistics
}

module.exports = showResults