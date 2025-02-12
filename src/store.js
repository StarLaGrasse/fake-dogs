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
        loggedin: false,
        breeds: [],
        rawDog: [],
        resultsOpen: false,
        filters: {},
        map:
        {
            "AL": {"cities":[], "zips":[]},
            "AK": {"cities":[], "zips":[]},
            "AZ": {"cities":[], "zips":[]},
            "AR": {"cities":[], "zips":[]},
            "AS": {"cities":[], "zips":[]},
            "CA": {"cities":[], "zips":[]},
            "CO": {"cities":[], "zips":[]},
            "CT": {"cities":[], "zips":[]},
            "DE": {"cities":[], "zips":[]},
            "DC": {"cities":[], "zips":[]},
            "FL": {"cities":[], "zips":[]},
            "GA": {"cities":[], "zips":[]},
            "GU": {"cities":[], "zips":[]},
            "HI": {"cities":[], "zips":[]},
            "ID": {"cities":[], "zips":[]},
            "IL": {"cities":[], "zips":[]},
            "IN": {"cities":[], "zips":[]},
            "IA": {"cities":[], "zips":[]},
            "KS": {"cities":[], "zips":[]},
            "KY": {"cities":[], "zips":[]},
            "LA": {"cities":[], "zips":[]},
            "ME": {"cities":[], "zips":[]},
            "MD": {"cities":[], "zips":[]},
            "MA": {"cities":[], "zips":[]},
            "MI": {"cities":[], "zips":[]},
            "MN": {"cities":[], "zips":[]},
            "MS": {"cities":[], "zips":[]},
            "MO": {"cities":[], "zips":[]},
            "MT": {"cities":[], "zips":[]},
            "NE": {"cities":[], "zips":[]},
            "NV": {"cities":[], "zips":[]},
            "NJ": {"cities":[], "zips":[]},
            "NM": {"cities":[], "zips":[]},
            "NY": {"cities":[], "zips":[]},
            "NC": {"cities":[], "zips":[]},
            "ND": {"cities":[], "zips":[]},
            "MP": {"cities":[], "zips":[]},
            "OH": {"cities":[], "zips":[]},
            "OK": {"cities":[], "zips":[]},
            "OR": {"cities":[], "zips":[]},
            "PA": {"cities":[], "zips":[]},
            "PR": {"cities":[], "zips":[]},
            "RI": {"cities":[], "zips":[]},
            "SC": {"cities":[], "zips":[]},
            "SD": {"cities":[], "zips":[]},
            "TN": {"cities":[], "zips":[]},
            "TX": {"cities":[], "zips":[]},
            "TT": {"cities":[], "zips":[]},
            "UT": {"cities":[], "zips":[]},
            "VT": {"cities":[], "zips":[]},
            "VA": {"cities":[], "zips":[]},
            "VI": {"cities":[], "zips":[]},
            "WA": {"cities":[], "zips":[]},
            "WV": {"cities":[], "zips":[]},
            "WI": {"cities":[], "zips":[]},
            "WY": {"cities":[], "zips":[]},
        }
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
        setLoggedin(state, log)
        {
            state.loggedin = log;
        },
        setBreeds(state, breeds)
        {
            state.breeds = breeds;
        },
        setRawDog(state, dogs)
        {
            state.rawDog = dogs;
        },
        setResultsOpen(state, open)
        {
            state.resultsOpen = open;
        },
        setFilters(state, filters)
        {
            state.filters = filters;
        },
        setMap(state, map)
        {
            state.map = map;
        }
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
        getLoggedin(state) {return state.loggedin;},
        getBreeds(state) {return state.breeds;},
        getRawDog(state) {return state.rawDog;},
        getResultsOpen(state) {return state.resultsOpen;},
        getFilters(state) {return state.filters;},
        getMap(state) {return state.map;}
    }
})

export default store;