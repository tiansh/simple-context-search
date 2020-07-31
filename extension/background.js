const rootMenu = 'search';
const menuPrefix = rootMenu + '-';

const contextMenuName = function (name, accessKey = null) {
  const escapedName = name.replace(/&/g, '&&');
  if (!accessKey || !/^[a-z0-9]$/i.test(accessKey)) return escapedName;
  const index = escapedName.toUpperCase().indexOf(accessKey.toUpperCase());
  if (index === -1) return escapedName + ` (&${accessKey.toUpperCase()})`;
  return escapedName.slice(0, index) + '&' + escapedName.slice(index);
};

const searchTextLocalized = browser.i18n.getMessage('search');
const searchTextWithAccessKey = contextMenuName(searchTextLocalized, 'R');

const defaultFavIconUrl = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiM0YzRjNGMiIGZpbGwtb3BhY2l0eT0iY29udGV4dC1maWxsLW9wYWNpdHkiPgo8cGF0aCBkPSJtNiAxYTUgNSAwIDAgMCAwIDEwYTUgNSAwIDAgMCAwIC0xMHYyYTMgMyAwIDAgMSAwIDZhMiAyIDAgMCAxIDAgLTZNOS44MjggOC40MTRsLTEuNDE0IDEuNDE0TDEyLjU4NTggMTRBMSAxIDAgMCAwIDE0IDEyLjU4NTh6Ii8+Cjwvc3ZnPg==';

browser.contextMenus.create({
  id: rootMenu,
  title: searchTextWithAccessKey,
  contexts: ['link', 'selection'],
});

let menuShown = false;
const menuItemList = [];

browser.contextMenus.onHidden.addListener(() => {
  menuItemList.splice(0).forEach((name, index) => {
    browser.contextMenus.remove(menuPrefix + index);
  });
  browser.contextMenus.refresh();
  menuShown = false;
});

/**
 * Priority of accigning access keys for menus
 * 1. Search provider with single character alias
 * 2. Search provider with multiple character alias
 * 3. Search provider without alias
 * 4. Search provider without character may used as accessKey
 */
const assignAccessKeys = function (searchList) {
  const keyUsed = new Set();
  [
    search => search.alias && search.alias.length === 1 ? search.alias : null,
    search => search.alias || null,
    search => search.name,
    _ => Array(36).fill(0).map((_, i) => (i < 10 ? (i + 1) % 10 : i).toString(36)).join(''),
  ].forEach(getCandidate => {
    searchList.forEach(search => {
      if (search.accessKey) return;
      const candidate = getCandidate(search);
      if (!candidate) return;
      (candidate.toUpperCase().match(/[a-z0-9]/ig) || []).some(accessKey => {
        if (keyUsed.has(accessKey)) return false;
        search.accessKey = accessKey;
        keyUsed.add(accessKey);
        search.displayName = contextMenuName(search.name, search.accessKey);
        return true;
      });
    });
  });
  return searchList;
};

browser.contextMenus.onShown.addListener(async (info, tab) => {
  menuShown = true;
  const searchList = await browser.search.get();
  if (!menuShown) return;
  assignAccessKeys(searchList);
  searchList.forEach((search, index) => {
    const menuItem = {
      id: menuPrefix + index,
      parentId: rootMenu,
      title: search.displayName || search.name,
      icons: {
        '16': search.favIconUrl || defaultFavIconUrl,
      },
    };
    browser.contextMenus.create(menuItem);
    menuItemList[index] = search.name;
  });
  browser.contextMenus.refresh();
});

const configKey = 'loadInBackground';
let preferBackground = false;
browser.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    if (changes[configKey]) {
      preferBackground = changes[configKey].newValue;
    }
  }
});
browser.storage.sync.get(configKey).then(config => {
  preferBackground = config[configKey];
});
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  const menuItemId = info.menuItemId;
  if (!menuItemId.startsWith(menuPrefix)) return;
  const index = menuItemId.slice(menuPrefix.length);
  const searchProvider = menuItemList[index];
  const searchTerms = (info.selectionText || info.linkText).trim();
  const alternateActive = info.modifiers.includes('Ctrl') ||
    info.modifiers.includes('Command');
  const active = alternateActive === preferBackground;
  const newTab = await browser.tabs.create({
    active,
    index: tab.index + 1,
    url: 'about:blank',
    windowId: tab.windowId,
  });
  browser.search.search({
    engine: searchProvider,
    query: searchTerms,
    tabId: newTab.id,
  });
});

