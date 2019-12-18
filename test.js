var hostname_oil = /http:\/\/(.+)\//.exec(document.getElementsByTagName("script")[document.getElementsByTagName("script").length - 1].src);
hostname_oil = hostname_oil[1]; //TODO
console.log(hostname_oil)