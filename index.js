(function() {
    renderBookmarks();
    chrome.bookmarks.onCreated.addListener(renderBookmarks);
    chrome.bookmarks.onRemoved.addListener(renderBookmarks);
    chrome.bookmarks.onChanged.addListener(renderBookmarks);
    chrome.bookmarks.onMoved.addListener(renderBookmarks);
    chrome.bookmarks.onChildrenReordered.addListener(renderBookmarks);
})();

function renderBookmarks() {
    const bookmarks$ = document.getElementById('bookmarks');
    bookmarks$.innerHTML = '';

    chrome.bookmarks.search('homepage', (results) => {
        if (!results.length) {
            return;
        }

        chrome.bookmarks.getSubTree(results[0].id, (subtree) => {
            const homepageDir = subtree[0];
            homepageDir.children.forEach(column => {
                const col$ = document.createElement('div');
                col$.className = 'column';
                bookmarks$.appendChild(col$);

                column.children.forEach(category => {
                    const section$ = document.createElement('div');
                    section$.className = 'section';
                    col$.appendChild(section$);

                    const title$ = document.createElement('div');
                    title$.className = 'title';
                    title$.innerText = category.title;
                    section$.appendChild(title$);

                    const list$ = document.createElement('div');
                    list$.className = 'list';
                    section$.appendChild(list$);

                    category.children.forEach(bookmark => {
                        const bookmark$ = document.createElement('div');
                        bookmark$.className = 'bookmark';

                        const delete$ = document.createElement('a');
                        delete$.className = 'delete';
                        delete$.innerText = 'x';
                        delete$.addEventListener('click', () => {
                            chrome.bookmarks.remove(bookmark.id);
                            renderBookmarks();
                        });

                        const link$ = document.createElement('a');
                        link$.className = 'link';
                        link$.href = bookmark.url;
                        link$.innerText = bookmark.title;
                        link$.target = '_blank';

                        bookmark$.appendChild(delete$);
                        bookmark$.appendChild(link$);
                        
                        list$.appendChild(bookmark$);
                    });
                });
            });
        });
    });
}