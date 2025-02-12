import { translateKey, translateKeyRaw } from "./translate.js"
const loginEvent = new CustomEvent("login-successful");
const date = new Date();
export const mixins = {
    props: {},
    computed: {},
    methods:
    {
        translate: function(key) { return translateKey(key); },
        translateRaw: function(key) { return translateKeyRaw(key); },
        openURL: function(url) {
            window.open(url, "_blank");
        },
        clamp: function (number, min, max)
        {
            return Math.min(Math.max(number, min), max);
        },
        compareByKeysAscending: function(item1, item2, keys)
        {
            if (item1[keys[0]] < item2[keys[0]]) return -1; //left is smaller
            if (item1[keys[0]] > item2[keys[0]]) return 1; //right is smaller
            if (keys.length > 1) return this.compareByKeysAscending(item1, item2, keys.slice(1)); //compare the next key down the line
            return 0;
        },
        mergeSort: function (array, ascending = true, keys = []) {
            if (array.length <= 1) return [...array];
            let input = [...array];
            let output = [];
            if (input.length === 2) {
                if (ascending) {
                    if (keys !== []) {
                        let comparisson = this.compareByKeysAscending(input[0], input[1], [...keys]);
                        if (comparisson === -1) {
                            output.push(input[0]);
                            output.push(input[1]);
                        }
                        else {
                            output.push(input[1]);
                            output.push(input[0]);
                        }
                    }
                    else {
                        if (input[0] < input[1]) {
                            output.push(input[0]);
                            output.push(input[1]);
                        }
                        else {
                            output.push(input[1]);
                            output.push(input[0]);
                        }
                    }
                }
                else {
                    if (keys !== []) {
                        let comparisson = this.compareByKeysAscending(input[0], input[1], [...keys]);
                        if (comparisson === 1) {
                            output.push(input[0]);
                            output.push(input[1]);
                        }
                        else {
                            output.push(input[1]);
                            output.push(input[0]);
                        }
                    }
                    else {
                        if (input[0] > input[1]) {
                            output.push(input[0]);
                            output.push(input[1]);
                        }
                        else {
                            output.push(input[1]);
                            output.push(input[0]);
                        }
                    }
                }
                return [...output];
            }
            let half = Math.floor(input.length / 2);
            let left = input.slice(0, half);
            let right = input.slice(half);
            if (left.length > 1) left = this.mergeSort(left, ascending, keys);
            if (right.length > 1) right = this.mergeSort(right, ascending, keys);
            let li = 0;
            let ri = 0;
            while (li < left.length || ri < right.length)
            {
                if (li === left.length) {
                    output.push(right[ri])
                    ri++;
                    continue;
                }
                if (ri === right.length)
                {
                    output.push(left[li])
                    li++;
                    continue;
                }
                if (ascending)
                {
                    if (keys !== [])
                    {
                        let comparisson = this.compareByKeysAscending(left[li], right[ri], [...keys]);
                        if (comparisson === -1) {
                            output.push(left[li]);
                            li++;
                            continue;
                        }
                        else
                        {
                            output.push(right[ri]);
                            ri++;
                            continue;
                        }
                    }
                    else
                    {
                        if (left[li] < right[ri])
                        {
                            output.push(left[li]);
                            li++;
                            continue;
                        }
                        else
                        {
                            output.push(right[ri]);
                            ri++;
                            continue;
                        }
                    }
                }
                if (keys !== [])
                {
                    let comparisson = this.compareByKeysAscending(left[li], right[ri], [...keys]);
                    if (comparisson === 1)
                    {
                        output.push(left[li]);
                        li++;
                        continue;
                    }
                    else
                    {
                        output.push(right[ri]);
                        ri++;
                        continue;
                    }
                }
                else
                {
                    if (left[li] > right[ri])
                    {
                        output.push(left[li]);
                        li++;
                        continue;
                    }
                    else
                    {
                        output.push(right[ri]);
                        ri++;
                    }
                }
            }
            return [...output];
        },
        writeCookie: function (cookieName, cookieData, expirehours = 0)
        {
            document.cookie = cookieName + "=" + cookieData + ";" + (expirehours > 0 ? ("Expires=" + date.setTime(date.getTime() + (expirehours * 60 * 60 * 1000))) : "")+"Path=/;SameSite=Strict";
        },
        readCookie: function (cookieName)
        {
            let output = null;
            let name = cookieName + "=";
            let cookieDecode = decodeURIComponent(document.cookie);
            let cookieArray = cookieDecode.split(";");
            for (let i = 0; i < cookieArray.length; i++)
            {
                let c = cookieArray[i].trim();
                if (c.indexOf(name) === 0)
                {
                    return c.substring(name.length);
                }
            }
            return output;
        },
        dispatchLogin: function(){document.dispatchEvent(loginEvent);}
    }
};