const rootMenu = 'search';
const menuPrefix = rootMenu + '-';

browser.contextMenus.create({
  id: rootMenu,
  title: browser.i18n.getMessage('menuItem'),
  contexts: ['link', 'selection'],
});

const hex = {
  encode: str => [...new TextEncoder().encode(str)].map(x => x.toString(16).padStart(2, 0)).join(''),
  decode: str => new TextDecoder().decode(new Uint8Array(str.match(/../g).map(x => parseInt(x, 16)))),
};

const menuItemList = [];

browser.contextMenus.onHidden.addListener(() => {
  menuItemList.forEach(id => browser.contextMenus.remove(id));
  browser.contextMenus.refresh();
});

browser.contextMenus.onShown.addListener(async (info, tab) => {
  const searchList = await browser.search.get();
  searchList.forEach(search => {
    const menuItem = {
      id: menuPrefix + hex.encode(search.name),
      parentId: rootMenu,
      icons: { '16': search.favIconUrl },
      title: search.name,
    };
    menuItemList.push(menuItem.id);
    browser.contextMenus.create(menuItem);
  });
  browser.contextMenus.refresh();
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  const menuItemId = info.menuItemId;
  if (!menuItemId.startsWith(menuPrefix)) return;
  const searchProvider = hex.decode(menuItemId.slice(menuPrefix.length));
  const searchTerms = (info.selectionText || info.linkText).trim();
  browser.search.search(searchProvider, searchTerms);
});

