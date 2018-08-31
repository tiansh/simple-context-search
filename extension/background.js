const rootMenu = 'search';
const menuPrefix = rootMenu + '-';

// https://transvision.mozfr.org/api/v1/entity/gecko_strings/?id=browser/browser/preferences/preferences.ftl:pane-search-title
const searchText = { ach: 'Yeny', af: 'Soek', an: 'Mirar', ar: '\u0627\u0644\u0628\u062d\u062b', as: '\u09b8\u09a8\u09cd\u09a7\u09be\u09a8 \u0995\u09f0\u0995', ast: 'Guetar', az: 'Axtar\u0131\u015f', be: '\u041f\u043e\u0448\u0443\u043a', bg: '\u0422\u044a\u0440\u0441\u0435\u043d\u0435', 'bn-BD': '\u0985\u09a8\u09c1\u09b8\u09a8\u09cd\u09a7\u09be\u09a8', 'bn-IN': '\u0985\u09a8\u09c1\u09b8\u09a8\u09cd\u09a7\u09be\u09a8', br: 'Klask', bs: 'Tra\u017ei', ca: 'Cerca', cak: 'Tikan\u00f6x', crh: 'Q\u0131d\u0131rma', cs: 'Vyhled\u00e1v\u00e1n\u00ed', cy: 'Chwilio', da: 'S\u00f8gning', de: 'Suche', dsb: 'Pyta\u015b', el: '\u0391\u03bd\u03b1\u03b6\u03ae\u03c4\u03b7\u03c3\u03b7', 'en-CA': 'Search', 'en-GB': 'Search', 'en-US': 'Search', 'en-ZA': 'Search', eo: 'Ser\u0109i', 'es-AR': 'B\u00fasquedas', 'es-CL': 'Buscar', 'es-ES': 'Buscar', 'es-MX': 'Buscar', et: 'Otsing', eu: 'Bilaketa', fa: '\u062c\u0633\u062a\u200c\u0648\u062c\u0648', ff: 'Yiylo', fi: 'Haku', fr: 'Recherche', 'fy-NL': 'Sykje', 'ga-IE': 'Cuardaigh', gd: 'Lorg', gl: 'Buscar', gn: 'Heka', 'gu-IN': '\u0ab6\u0acb\u0aa7\u0acb', he: '\u05d7\u05d9\u05e4\u05d5\u05e9', 'hi-IN': '\u0916\u094b\u091c\u0947\u0902', hr: 'Tra\u017ei', hsb: 'Pyta\u0107', hu: 'Keres\u00e9s', 'hy-AM': '\u0548\u0580\u0578\u0576\u0578\u0582\u0574', ia: 'Recerca', id: 'Cari', is: 'Leita', it: 'Ricerca', ja: '\u691c\u7d22', 'ja-JP-mac': '\u691c\u7d22', ka: '\u10eb\u10d8\u10d4\u10d1\u10d0', kab: 'Nadi', kk: '\u0406\u0437\u0434\u0435\u0443', km: '\u179f\u17d2\u179c\u17c2\u1784\u179a\u1780', kn: '\u0cb9\u0cc1\u0ca1\u0cc1\u0c95\u0cc1', ko: '\uac80\uc0c9', lij: '\u00c7erca', lo: '\u0e8a\u0ead\u0e81\u0eab\u0eb2', lt: 'Paie\u0161ka', ltg: 'Mekleit', lv: 'Mekl\u0113t', mai: '\u0916\u094b\u091c\u0942', meh: 'N\u00e1nuku', mix: 'Nda tuku', mk: '\u041f\u0440\u0435\u0431\u0430\u0440\u0443\u0432\u0430\u045a\u0435', ml: '\u0d24\u0d46\u0d30\u0d2f\u0d41\u0d15', mr: '\u0936\u094b\u0927\u093e', ms: 'Cari', my: '\u101b\u103e\u102c\u1015\u102b', 'nb-NO': 'S\u00f8k', 'ne-NP': '\u0916\u094b\u091c', nl: 'Zoeken', 'nn-NO': 'S\u00f8k', oc: 'Recercar', 'pa-IN': '\u0a16\u0a4b\u0a1c', pl: 'Wyszukiwanie', 'pt-BR': 'Pesquisa', 'pt-PT': 'Pesquisa', rm: 'Tschertgar', ro: 'C\u0103utare', ru: '\u041f\u043e\u0438\u0441\u043a', si: '\u0dc3\u0dd9\u0dc0\u0dd4\u0db8', sk: 'Vyh\u013ead\u00e1vanie', sl: 'Iskanje', son: 'Ceeci', sq: 'K\u00ebrkim', sr: '\u041f\u0440\u0435\u0442\u0440\u0430\u0433\u0430', 'sv-SE': 'S\u00f6k', ta: '\u0ba4\u0bc7\u0b9f\u0bc1', te: '\u0c35\u0c46\u0c24\u0c15\u0c21\u0c02', th: '\u0e04\u0e49\u0e19\u0e2b\u0e32', tl: 'Maghanap', tr: 'Arama', trs: 'Nana\u2019ui', uk: '\u041f\u043e\u0448\u0443\u043a', ur: '\u062a\u0644\u0627\u0634 \u06a9\u0631\u06cc\u06ba', uz: 'Izlash', vi: 'T\u00ecm ki\u1ebfm', xh: 'Khangela', zam: 'Kw\u00e0\u0241n', 'zh-CN': '\u641c\u7d22', 'zh-TW': '\u641c\u5c0b' };

const defaultFavIconUrl = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9ImNvbnRleHQtZmlsbCIgZmlsbC1vcGFjaXR5PSJjb250ZXh0LWZpbGwtb3BhY2l0eSI+CjxwYXRoIGQ9Im02IDFhNSA1IDAgMCAwIDAgMTBhNSA1IDAgMCAwIDAgLTEwdjJhMyAzIDAgMCAxIDAgNmEyIDIgMCAwIDEgMCAtNk05LjgyOCA4LjQxNGwtMS40MTQgMS40MTRMMTIuNTg1OCAxNEExIDEgMCAwIDAgMTQgMTIuNTg1OHoiLz4KPC9zdmc+';

browser.contextMenus.create({
  id: rootMenu,
  title: searchText[browser.i18n.getUILanguage()] || 'Search',
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
      title: search.name,
      icons: {
        '16': search.favIconUrl || defaultFavIconUrl,
      },
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
  const secondaryActive = info.modifiers.includes('Ctrl');
  const listener = newTab => {
    browser.tabs.onCreated.removeListener(listener);
    if (secondaryActive) {
      const activeTab = newTab.active ? tab : newTab;
      browser.tabs.update(activeTab.id, { active: true });
    }
    browser.tabs.move(newTab.id, { index: tab.index + 1 });
  };
  browser.tabs.onCreated.addListener(listener);
  browser.search.search({ engine: searchProvider, query: searchTerms });
});

