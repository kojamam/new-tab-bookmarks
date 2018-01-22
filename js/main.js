function appendNodeHeader(node) {
    $("#bookmarks").append(`
        <div class="pure-u-1  pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-6  list-item-wrapper" id="category-${node.title}-wrapper">
            <div class="pure-menu pure-menu-scrollable bookmark-folder">
                <span class="pure-menu-heading category-header">${node.title}</span>
                <ul class="pure-menu-list" id="category-${node.title}"></ul>
            </div>
        </div>
        `);
}

function deleteNodeHeader(node) {
    $(`#category-${node.title}-wrapper`).remove();
}

function appendNodeItem(node, item) {
    $(`#category-${node.title}`).append(`<li class="pure-menu-item" title="${item.title}"><a href="${item.url}" class="pure-menu-link bookmark-item">${item.title}</a></li>`);
}

function loadSubTree(node) {
    let itemCount = 0;
    console.log(node);
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

// browser.bookmarks.getTree((node) => {
//     loadSubTree(node[0]);
// });
browser.bookmarks.getSubTree("menu________", (node) => {
    loadSubTree(node[0]);
});
