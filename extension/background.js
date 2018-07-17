const rootMenu = 'search';
const menuPrefix = rootMenu + '-';

browser.contextMenus.create({
  id: rootMenu,
  title: browser.i18n.getMessage('menuItem'),
  contexts: ['link', 'selection'],
});

const menuItemList = [];

browser.contextMenus.onHidden.addListener(() => {
  menuItemList.splice(0).forEach((name, index) => {
    browser.contextMenus.remove(menuPrefix + index);
  });
  browser.contextMenus.refresh();
});

browser.contextMenus.onShown.addListener(async (info, tab) => {
  const searchList = await browser.search.get();
  searchList.forEach((search, index) => {
    const menuItem = {
      id: menuPrefix + index,
      parentId: rootMenu,
      icons: { '16': search.favIconUrl },
      title: search.name,
    };
    browser.contextMenus.create(menuItem);
    menuItemList[index] = search.name;
  });
  browser.contextMenus.refresh();
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  const menuItemId = info.menuItemId;
  if (!menuItemId.startsWith(menuPrefix)) return;
  const index = menuItemId.slice(menuPrefix.length);
  const searchProvider = menuItemList[index];
  const searchTerms = (info.selectionText || info.linkText).trim();
  browser.search.search(searchProvider, searchTerms);
});

