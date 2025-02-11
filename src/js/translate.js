import store from "../store.js";

let translationData = {};

export const initTranslation = async function () {
    return fetch('./assets/data/content-' + store.getters.getLocale + '.json').then((response) => { return response.json(); }).then((data) => { translationData = data; });
}

export const translateKey = function (key)
{
    let data = translationData[key];
    if (data === null || data === undefined) return "Missing: " + key;
    data = data.replaceAll('\n', "<br>");
    return data;
}

export const translateKeyRaw = function (key) { return translationData[key]; }