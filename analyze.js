const reg = require('./my-regex');

module.exports = function (url, content, callback) {
    console.log(content);
    match = reg.links.exec(content);
    let links = [];
    while (match != null) {
        links.push(match[1]);
        match = reg.links.exec(content);
    }

    // filtering
    links = filterLinks(links);
    links = removeProtocol(links);
    links = relativeToAbsolute(url, links);
    links = filterExternalLinks(url, links);
    links = removeSubDomain(links);
    links = [...new Set(links)];
    console.log(links);

}

filterLinks = (linksArray) => {
    linksArray = linksArray.filter(l => l.indexOf('javascript') !== 0);
    linksArray = linksArray.filter(l => l.indexOf('#') !== 0);
    return linksArray;
}

filterExternalLinks = (url, linksArray) => {
    linksArray = linksArray.filter(l => l.indexOf(url) !== 0);
    return linksArray
}

removeProtocol = (linksArray) => {
    linksArray = linksArray.map(l => l.replace('https://', ''));
    linksArray = linksArray.map(l => l.replace('http://', ''));
    return linksArray
}

removeSubDomain = (linksArray) => {
    linksArray = linksArray.map(l => l.replace('www.', ''));
    return linksArray
}


relativeToAbsolute = (url, linksArray) => {
    linksArray = linksArray.map(l => {
        if (l.indexOf('/') === 0)
            return url + l;
        return l;
    });
    return linksArray
}


