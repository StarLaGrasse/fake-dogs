import { createApp } from 'vue';
import App from './App.vue';
import store from './store.js';

import { initTranslation } from "./js/translate.js";
import { mixins } from "./js/mixins.js";
import { checkCompatibility, readCookieAtStart } from "./js/compatibility.js";

let init = async function () {
    await initTranslation();
    checkCompatibility();
    let cookie = readCookieAtStart("optionsData");

    let query = new URLSearchParams(window.location.search);
    if (query.get("page")) {
        switch (query.get("page")) {
            default: case 0: case 1: case "home":
                store.commit("setCurrentPage", 1);
                break;
            case 10: case "options": case "config": case "configuration": case "menu": case "font":
                store.commit("setCurrentPage", 10);
                break;
        }
    }
    else
    {
        store.commit("setCurrentPage", 1);
    }

    createApp({ extends: App })
        .mixin(mixins)
        .use(store).mount('#app');

    let root = document.querySelector(":root");
    if (cookie && root) {
        let jsonCookie = JSON.parse(cookie);
        if (jsonCookie.colorScale) {
            store.commit("setColorScale", jsonCookie.colorScale);
            root.style.setProperty("--header-bg", jsonCookie.colorScale === 2 ? 'grey' : jsonCookie.colorScale === 1 ? '#306230' : '#b660cd');
            root.style.setProperty("--content-bg", jsonCookie.colorScale === 2 ? 'white' : jsonCookie.colorScale === 1 ? '#9bbc0f' : '#d7bfdc');
            root.style.setProperty("--accent-color", jsonCookie.colorScale === 2 ? 'lightgrey' : jsonCookie.colorScale === 1 ? '#8bac0f' : '#ffc055');
            root.style.setProperty("--font-color", jsonCookie.colorScale === 1 ? '#0f380f' : 'black');
        }
        if (jsonCookie.fontFamily) {
            store.commit("setFont", jsonCookie.fontFamily);
            root.style.setProperty("--header-font", jsonCookie.fontFamily === 2 ? "'Roboto Mono', monospace" : jsonCookie.fontFamily === 1 ? "'Roboto Mono', monospace" : "'Roboto Mono', monospace");
            root.style.setProperty("--body-font", jsonCookie.fontFamily === 2 ? "'Roboto Mono', monospace" : jsonCookie.fontFamily === 1 ? "'Roboto Mono', monospace" : "'Roboto Mono', monospace");
        }
        store.commit("setScanlines", jsonCookie.scanlines !== null && jsonCookie.scanlines !== undefined ? jsonCookie.scanlines : true);
        root.style.setProperty("--font-scale", (jsonCookie.fontScale ? jsonCookie.fontScale : 1) + 'px');
    }
    else {
        if (!store.getters.getDesktop) {
            store.commit("setFont", 1);
            root.style.setProperty("--header-font", "'Roboto Mono', monospace");
            root.style.setProperty("--body-font", "'Roboto Mono', monospace");
        }
    }
};
init();
