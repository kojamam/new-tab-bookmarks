'use strict'

let settings = {};

function space2underscore(str) {
    return str.replace(/\s+/g, "_");
}

function appendNodeHeader(node) {

    const elem = document.createElement("div");
    elem.setAttribute("id", "category-" + space2underscore(node.title) + "-wrapper");
    elem.setAttribute("class", "pure-u-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-6 list-item-wrapper");

    const elem2 = document.createElement("div");
    elem2.setAttribute("class", "bookmark-folder");

    const elem3 = document.createElement("span");
    elem3.setAttribute("class", "pure-menu-heading category-header");
    elem3.innerText = node.title;

    const elem4 = document.createElement("div");
    elem4.setAttribute("class", "pure-menu pure-menu-scrollable bookmark-items");

    const elem5 = document.createElement("ul");
    elem5.setAttribute("class", "pure-menu-list");
    elem5.setAttribute("id", "category-" + space2underscore(node.title));

    elem4.append(elem5);
    elem2.append(elem3, elem4);
    elem.append(elem2);

    document.querySelector("#bookmarks").append(elem);
}

function deleteNodeHeader(node) {
    document.querySelector("#category-" + space2underscore(node.title) + "-wrapper").remove();
}

function appendNodeItem(node, item) {
    const faviconUrl = "https://www.google.com/s2/favicons?domain_url=" + item.url;

    const elem = document.createElement("li");
    elem.setAttribute = ("class", "pure-menu-item");
    elem.setAttribute = ("title", item.title);

    const elem2 = document.createElement("a");
    elem2.setAttribute("href", item.url);
    elem2.setAttribute("class", "pure-menu-link bookmark-item");

    if (settings.faviconDisplay == "favicon-display-off") {
        elem2.append(item.title);
    } else {
        const elem3 = document.createElement("img");
        elem3.setAttribute("src", faviconUrl);
        elem3.setAttribute("class", "bookmark-item-favicon");
        elem2.append(elem3, " " + item.title);
    }
    elem.append(elem2);

    document.querySelector("#category-" + space2underscore(node.title)).appendChild(elem);
}

function loadSubTree(node) {
    let itemCount = 0;
    appendNodeHeader(node);
    node.children.forEach(item => {
    if (item.type == "bookmark" && !item.url.match(/^place:.*$/)) {
            appendNodeItem(node, item);
            itemCount++;
        } else if (item.type == "folder") {
            loadSubTree(item);
        }
    });
    if (itemCount === 0) {
        deleteNodeHeader(node);
    }
}
function init(res) {
    settings = res.settings || {};
    browser.bookmarks.getSubTree("menu________", (node) => {
        loadSubTree(node[0]);
    });
}

var getting = browser.storage.local.get("settings");
getting.then(init);