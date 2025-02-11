import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state: {
        locale: "en-US",
        count: 0,
        scanlines: false,
        fontScale: 1,
        colorScale: 0,
        font: 0,
        desktop: true,
        currentPage: 1,
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setFontScale(state, scale) {
            state.fontScale = scale;
        },
        setScanlines(state, scanlinesOn) {
            state.scanlines = scanlinesOn;
        },
        setColorScale(state, color)
        {
            state.colorScale = color;
        },
        setFont(state, selection) {
            state.font = selection;
        },
        setIsDesktop(state, isDesktop)
        {
            state.desktop = isDesktop;
        },
        setCurrentPage(state, page)
        {
            state.currentPage = page;
        },
    },
    getters:
    {
        getCount(state) { return state.count; },
        getScanlines(state) { return state.scanlines; },
        getColorScale(state) { return state.colorScale; },
        getFontScale(state) { return state.fontScale; },
        getFont(state) { return state.font; },
        getLocale(state) { return state.locale; },
        getDesktop(state) { return state.desktop; },
        getCurrentPage(state) { return state.currentPage; },
    }
})

export default store;