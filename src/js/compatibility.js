import store from "../store.js";

export const checkCompatibility = function () {
    store.commit("setIsDesktop", !(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Opera Mini/i)));
};

export const readCookieAtStart = function (cookieName) {
    let output = null;
    let name = cookieName + "=";
    let cookieDecode = decodeURIComponent(document.cookie);
    let cookieArray = cookieDecode.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length);
        }
    }
    return output;
};