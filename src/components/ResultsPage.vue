<template>
    <div class="results-container" :class="{'mobile': !desktop}">
        <div class="control-panel" v-if="displayDogs.length > 0" :class="{'mobile': !desktop}">
            <div class="directions-container">
                <span class="direction-button" v-html="translate('previous-button')" tabindex="0" @click="fetchDogs(prev)" v-on:keydown.enter="fetchDogs(prev)" v-if="prev !== ''" />
                <span class="direction-button" v-html="translate('next-button')" tabindex="0" @click="fetchDogs(next)" v-on:keydown.enter="fetchDogs(next)" v-if="next !== ''" />
            </div>
            <div class="spacer" />
            <div class="sort-container">
                <span class="sort-title" v-html="translate('sort-control')" />
                <div class="sort-button" tabindex="0" @click="changeSortState(0)" v-on:keydown.enter="changeSortState(0)" :class="{'current': sortState === 0}"> <span v-html="translate('sort-breed')" /> <div class="arrow" v-if="sortState === 0" :class="{'descend': !sortAscend}" /> </div>
                <div class="sort-button" tabindex="0" @click="changeSortState(1)" v-on:keydown.enter="changeSortState(1)" :class="{'current': sortState === 1}"> <span v-html="translate('sort-name')" /> <div class="arrow" v-if="sortState === 1" :class="{'descend': !sortAscend}" /></div>
                <div class="sort-button" tabindex="0" @click="changeSortState(2)" v-on:keydown.enter="changeSortState(2)" :class="{'current': sortState === 2}"> <span v-html="translate('sort-age')" /> <div class="arrow" v-if="sortState === 2" :class="{'descend': !sortAscend}" /></div>
            </div>
        </div>
        <div class="dog-object" v-for="dog in displayDogs" :key="dog.id" :class="{'mobile': !desktop}">
            <img :src="dog.img" />
            <div class="dog-text">
                <div class="dog-type"><span class="dog-name" v-html="dog.name" /><span v-html="dog.breed" /></div>
                <span v-html="translate('dog-age')+dog.age" />
                <div class="spacer" />
                <span v-html="translate('dog-location')+dog.zip_code" />
            </div>
        </div>
        <div class="control-panel" v-if="displayDogs.length > 0" :class="{'mobile': !desktop}">
            <div class="directions-container">
                <span class="direction-button" v-html="translate('previous-button')" tabindex="0" @click="fetchDogs(prev)" v-on:keydown.enter="fetchDogs(prev)" v-if="prev !== ''" />
                <span class="direction-button" v-html="translate('next-button')" tabindex="0" @click="fetchDogs(next)" v-on:keydown.enter="fetchDogs(next)" v-if="next !== ''" />
            </div>
            <div class="spacer" />
            <div class="sort-container">
                <span class="sort-title" v-html="translate('sort-control')" />
                <div class="sort-button" tabindex="0" @click="changeSortState(0)" v-on:keydown.enter="changeSortState(0)" :class="{'current': sortState === 0}"> <span v-html="translate('sort-breed')"/> <div class="arrow" v-if="sortState === 0" :class="{'descend': !sortAscend}" /> </div>
                <div class="sort-button" tabindex="0" @click="changeSortState(1)" v-on:keydown.enter="changeSortState(1)" :class="{'current': sortState === 1}"> <span v-html="translate('sort-name')"/> <div class="arrow" v-if="sortState === 1" :class="{'descend': !sortAscend}" /></div>
                <div class="sort-button" tabindex="0" @click="changeSortState(2)" v-on:keydown.enter="changeSortState(2)" :class="{'current': sortState === 2}"> <span v-html="translate('sort-age')"/> <div class="arrow" v-if="sortState === 2" :class="{'descend': !sortAscend}" /></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
    name: 'ResultsPage',
    props: {
    },
    data: function () {
        return {
            displayDogs: [],
            next: "",
            prev: "",
            queryString: "",
            sortState: 0,
            sortAscend: true
        };
    },
    mounted: async function()
    {
        this.$store.commit("setResultsOpen", true);

        this.buildQueryString();
        await this.fetchDogs(this.queryString + (this.queryString.includes("?") ? "&" : "?") + "sort=breed:asc");
        document.addEventListener("login-successful", function(){this.fetchDogs(this.queryString  + (this.queryString.includes("?") ? "&" : "?") + "sort=breed:asc")}.bind(this));
    },
    methods:{
        fetchDogs: async function(query = "/dogs/search")
        {
            console.log(query);
            this.displayDogs = [];
            this.next = "";
            this.prev = "";
            await fetch("https://frontend-take-home-service.fetch.com"+query, {"method": "GET", "headers": {"Content-Type": "application/json; charset=utf-8"}, "credentials":"include"})
            .then((response)=>{
                if (response.status === 200)
                {
                    response.json().then((json)=>{
                        if (json.next && json.next !== undefined && json.next !== null) this.next = json.next;
                        if (json.prev && json.prev !== undefined && json.next !== null) this.prev = json.prev;
                        this.populateDisplayDogs(json.resultIds);
                    });
                }
                else this.$store.commit("setLoggedin", false);
            });
        },
        populateDisplayDogs: async function(ids)
        {
            await fetch("https://frontend-take-home-service.fetch.com/dogs", {"method": "POST", "body": JSON.stringify(ids), "headers": {"Content-Type": "application/json; charset=utf-8"}, "credentials":"include"})
            .then((response)=>{
                if (response.status === 200)
                {
                    response.json().then((json)=>{
                        this.displayDogs=[...json];
                        });
                }
                else this.$store.commit("setLoggedin", false);
            });
        },
        buildQueryString: function(){
            this.queryString = "/dogs/search";
            if (Object.keys(this.filters).length > 0)
            {
                let startedQuery = false;
                if (this.filters.breeds && this.filters.breeds !== undefined && this.filters.breeds !== null && this.filters.breeds.length > 0) {
                    this.queryString += (startedQuery ? "&" : "?");
                    if (!startedQuery) startedQuery = true;
                    this.queryString += "breeds=";
                    let badQuery = JSON.stringify(this.filters.breeds);
                    while (badQuery.includes(" ")) badQuery = badQuery.replace(" ", "-");
                    while (badQuery.includes("\"")) badQuery = badQuery.replace("\"", "");
                    while (badQuery.includes("[")) badQuery = badQuery.replace("[", "");
                    while (badQuery.includes("]")) badQuery = badQuery.replace("]", "");
                    while (badQuery.includes(",")) badQuery = badQuery.replace(",", ":");
                    this.queryString += badQuery;
                }
                if (this.filters.zipCodes && this.filters.zipCodes !== undefined && this.filters.zipCodes !== null && this.filters.zipCodes.length > 0) {
                    this.queryString += (startedQuery ? "&" : "?");
                    if (!startedQuery) startedQuery = true;
                    this.queryString += "zipCodes=";
                    this.queryString += encodeURI(JSON.stringify(this.filters.zipCodes));
                }
                if (this.filters.ageMin && this.filters.ageMin !== undefined && this.filters.ageMin !== null) {
                    this.queryString += (startedQuery ? "&" : "?");
                    if (!startedQuery) startedQuery = true;
                    this.queryString += "ageMin=";
                    this.queryString += this.filters.ageMin;
                }
                if (this.filters.ageMax && this.filters.ageMax !== undefined && this.filters.ageMax !== null) {
                    this.queryString += (startedQuery ? "&" : "?");
                    if (!startedQuery) startedQuery = true;
                    this.queryString += "ageMax=";
                    this.queryString += this.filters.ageMax;
                }
            }
            console.log(this.queryString);
            
        },
        changeSortState: async function(state = 0)
        {
            if (this.sortState === state) {
                this.sortAscend = !this.sortAscend;
            }
            else{
                this.sortAscend = true;
                this.sortState = state;
            }
            this.extraQuery = "";
            this.extraQuery += (this.queryString.includes("?") ? "&": "?");
            this.extraQuery += "sort=";
            this.extraQuery += (this.sortState === 2 ? "age" : this.sortState === 1 ? "name" : "breed");
            this.extraQuery += ":";
            this.extraQuery += (this.sortAscend ? "asc" : "desc");
            await this.fetchDogs(this.queryString+this.extraQuery);

        }
    },
    computed: {
        ...mapGetters({
            colorScale: "getColorScale",
            desktop: "getDesktop",
            filters: 'getFilters'
        })
    }
}
</script>
<style scoped lang="scss">
    .results-container {
        position: relative;
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-items: flex-start;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        font-family: var(--body-font);
        font-size: font(16);

        &.mobile {
            font-size: font(12);
        }

        .control-panel {
            margin: 24px 0;
            position: relative;
            width: 100%;
            height: fit-content;
            display: flex;
            flex-direction: row;
            justify-items: center;
            justify-content: center;
            align-items: center;
            align-content: center;
            font-size: font(20);

            &.mobile {
                font-size: font(16);

                .directions-container {
                    margin-left: 8px;
                }

                .sort-container {
                    margin-right: 8px;

                    .sort-button {
                        margin: 0 4px;
                    }
                }
            }

            .directions-container {
                position: relative;
                width: auto;
                height: fit-content;
                display: flex;
                flex-direction: row;
                justify-items: center;
                justify-content: center;
                align-items: center;
                align-content: center;
                margin-left: 16px;

                .direction-button {
                    position: relative;
                    width: auto;
                    height: auto;
                    color: var(--header-bg);
                    margin: 0 8px;
                    pointer-events: visible;
                    text-transform: uppercase;

                    &:hover, &:active {
                        color: var(--accent-color);
                    }
                }
            }

            .spacer {
                position: relative;
                height: 8px;
                width: auto;
                flex-grow: 1;
            }

            .sort-container {
                position: relative;
                width: auto;
                height: fit-content;
                display: flex;
                flex-direction: row;
                justify-items: center;
                justify-content: center;
                align-items: center;
                align-content: center;
                margin-right: 16px;

                .sort-title {
                    position: relative;
                    width: fit-content;
                    height: auto;
                    pointer-events: visible;
                    text-transform: uppercase;
                }

                .sort-button {
                    position: relative;
                    width: auto;
                    height: auto;
                    color: var(--header-bg);
                    margin: 0 8px;
                    pointer-events: visible;
                    text-transform: uppercase;
                    display: flex;
                    flex-direction: row;
                    justify-items: center;
                    justify-content: center;
                    align-items: center;
                    align-content: center;

                    &.current {
                        color: var(--accent-color);
                    }

                    span {
                        position: relative;
                    }

                    .arrow {
                        margin-left: 2px;
                        position: relative;
                        width: font(20);
                        height: font(20);
                        border-left: font(10) solid transparent;
                        border-right: font(10) solid transparent;
                        border-top: 0 solid transparent;
                        border-bottom: font(20) solid var(--accent-color);
                        box-sizing: border-box;

                        &.descend {
                            border-bottom: 0 solid transparent;
                            border-top: font(20) solid var(--accent-color);
                        }
                    }

                    &:hover, &:active {
                        color: var(--accent-color);
                    }
                }
            }
        }

        .dog-object {
            position: relative;
            width: 100%;
            height: fit-content;
            box-sizing: border-box;
            border-bottom: solid var(--header-bg) 2px;
            border-top: solid var(--header-bg) 2px;
            display: flex;
            flex-direction: row;
            justify-items: center;
            justify-content: center;
            align-items: flex-start;
            align-content: flex-start;

            &.mobile {
                img {
                    height: font(64);
                    width: font(64);
                    margin-left: 8px;
                }
            }

            img {
                margin-top: 4px;
                margin-bottom: 4px;
                position: relative;
                height: font(128);
                width: font(128);
                margin-right: 8px;
                margin-left: 16px;
                object-fit: cover;
            }

            .dog-text {
                position: relative;
                flex-grow: 1;
                height: auto;
                width: auto;
                display: flex;
                flex-direction: column;
                justify-items: flex-start;
                justify-content: flex-start;
                align-items: flex-start;
                align-content: flex-start;
                min-height: 100%;

                span {
                    position: relative;
                }

                .dog-type {
                    position: relative;
                    height: fit-content;
                    width: auto;
                    display: flex;
                    flex-direction: row;
                    justify-items: flex-start;
                    justify-content: flex-start;
                    align-items: flex-start;
                    align-content: flex-start;

                    .dog-name {
                        font-family: var(--header-font);
                        font-weight: 700;
                        margin-right: 16px;
                    }
                }

                .spacer {
                    position: relative;
                    flex-grow: 1;
                    height: auto;
                    width: 2px;
                }
            }
        }
    }
</style>