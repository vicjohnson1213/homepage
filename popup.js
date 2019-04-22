document.getElementById('open-ext').addEventListener('click', () => {
    chrome.tabs.create({url: chrome.extension.getURL('index.html') })
});

const categories$ = document.getElementById('categories');

chrome.bookmarks.search('homepage', (results) => {
    if (!results.length) {
        return;
    }

    document.getElementById('open-manager').addEventListener('click', () => {
        chrome.tabs.create({url: `chrome://bookmarks/?id=${results[0].id}`});
    });

    chrome.bookmarks.getSubTree(results[0].id, (subtree) => {
        const homepageDir = subtree[0];
        homepageDir.children.forEach(column => {
            column.children.forEach(category => {
                const title$ = document.createElement('a');
                title$.className = 'category';
                title$.innerText = category.title;
                title$.addEventListener('click', () => {
                    chrome.tabs.getSelected(null, function(tab) {
                        chrome.bookmarks.create({
                            parentId: category.id,
                            title: tab.title
                        });

                        window.close();
                    });
                });

                categories$.appendChild(title$);
            });
        });
    });
});
