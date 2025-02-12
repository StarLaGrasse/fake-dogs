<template>
    <div class="home-container">
        <div class="search-button" tabindex="0" role="button" id="search-button" @click="changePageFunction(2)" v-on:keydown.enter="changePageFunction(2)">
            <span v-html="translate('search')"/>
        </div>
        <div class="filters-container">
            <span class="filter-header" v-html="translate('filters')"/>
            <div class="filter-box">
                <div class="filter-title-chunk" tabindex="0" @click="openFilter(0)" v-on:keydown.enter="openFilter(0)"> <span v-html="translate('sort-breed')"/> <div class="arrow" :class="{'open':openFilters[0]}"/></div>
                <div class="filter-list" :class="{'open':openFilters[0]}">
                    <div class="filter-list-item" v-for="breed in breeds" :key="breed" :style="{'display': openFilters[0] ? 'flex' : 'none'}" tabindex="0" @click="toggleBreedFilter(breed, myFilters.breeds && myFilters.breeds !== null && myFilters.breeds !== undefined && myFilters.breeds.includes(breed.toLowerCase()))" v-on:keydown.enter="toggleBreedFilter(breed, myFilters.breeds && myFilters.breeds !== null && myFilters.breeds !== undefined && myFilters.breeds.includes(breed.toLowerCase()))">
                        <div class="bubble" :class="{'active': myFilters.breeds && myFilters.breeds !== null && myFilters.breeds !== undefined && myFilters.breeds.includes(breed.toLowerCase())}"/><span v-html="breed"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
		name: 'HomePage',
		props: {
            changePageFunction: {type: Function, default: function(page, skipHistory = false){ console.log(page); console.log(skipHistory);}}
        },
        data: function () {
            return {
                myFilters: {},
                openFilters:[false, false, false]
            };
        },
        mounted: async function()
        {
            this.myFilters = {...this.filters};
        },
        methods:{
            openFilter: function(box){
                this.openFilters[box] = !this.openFilters[box];
            },
            toggleBreedFilter: function(breed, remove = false){
                if (remove){
                    console.log("remove " + breed.toLowerCase());
                    this.myFilters.breeds.splice(this.myFilters.breeds.indexOf(breed.toLowerCase()), 1);
                    return;
                }
                console.log("add " + breed.toLowerCase())
                if (this.myFilters.breeds === null || this.myFilters.breeds === undefined) this.myFilters.breeds = [];
                this.myFilters.breeds.push(breed.toLowerCase());
                this.$store.commit("setFilters", {...this.myFilters});
            }
        },
        computed: {
            ...mapGetters({
                colorScale: "getColorScale",
                desktop: "getDesktop",
                filters: "getFilters",
                map: "getMap",
                breeds: "getBreeds"
            })
        }
    }
</script>

<style scoped lang="scss">
    .home-container {
        color: var(--font-color);
        position: relative;
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-items: flex-start;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        text-align: left;
        font-family: var(--body-font);
        font-size: font(16);

        .search-button {
            position: relative;
            pointer-events: visible;
            background-color: var(--header-bg);
            width: fit-content;
            height: fit-content;
            font-size: font(24);
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
            justify-items: center;
            justify-content: center;
            margin-top: 32px;
            margin-bottom: 24px;
            padding: 16px 8px;
            font-family: var(--header-font);
            font-weight: 700;
            text-transform: uppercase;
            text-align: center;
            filter: drop-shadow(2px 2px 2px var(--font-color));
            border-radius: 8px;
            background-clip: border-box;

            span {
                position: relative;
                color: var(--content-bg);
            }

            &:hover, &:active {
                background-color: var(--accent-color);
            }

            &:active {
                filter: none;
            }
        }

        .filters-container {

            .filter-header {
                position: relative;
                font-family: var(--header-font);
                font-weight: 700;
                font-size: font(20);
                color: var(--header-bg);
                text-transform: uppercase;
            }

            position: relative;
            width: fit-content;
            height: fit-content;
            display: flex;
            flex-direction: column;
            align-content: flex-start;
            align-items: flex-start;
            justify-items: flex-start;
            justify-content: flex-start;

            .filter-box {
                position: relative;
                margin: 8px 16px;
                width: fit-content;
                height: fit-content;
                display: flex;
                flex-direction: column;
                align-content: flex-start;
                align-items: flex-start;
                justify-items: flex-start;
                justify-content: flex-start;

                .filter-title-chunk {
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    align-content: center;
                    align-items: center;
                    justify-items: flex-start;
                    justify-content: flex-start;
                    pointer-events: visible;

                    span {
                        position: relative;
                        margin-right: 8px;

                        &:active, &:hover {
                            color: var(--accent-color);
                        }
                    }

                    .arrow {
                        position: relative;
                        width: font(12);
                        height: font(12);
                        box-sizing: border-box;
                        border-left: solid transparent font(6);
                        border-right: solid transparent font(6);
                        border-top: solid transparent 0;
                        border-bottom: solid var(--font-color) font(12);

                        &.open {
                            border-bottom: solid transparent 0;
                            border-top: solid var(--font-color) font(12);
                        }
                    }
                }

                .filter-list {
                    position: relative;
                    display: flex;
                    width: fit-content;
                    height: fit-content;
                    flex-direction: column;
                    align-content: flex-start;
                    align-items: flex-start;
                    justify-items: flex-start;
                    justify-content: flex-start;
                    border: solid 2px var(--accent-color);
                    min-width: 100%;

                    &.open {
                        padding: 4px 2px;
                    }

                    .filter-list-item {
                        margin: 2px 0;
                        position: relative;
                        display: flex;
                        width: fit-content;
                        height: fit-content;
                        flex-direction: row;
                        align-content: center;
                        align-items: center;
                        justify-items: flex-start;
                        justify-content: flex-start;
                        pointer-events: visible;

                        .bubble {
                            position: relative;
                            margin-right: 4px;
                            border-radius: 50%;
                            background-clip: border-box;
                            background-color: var(--header-bg);
                            width: font(12);
                            height: font(12);

                            &.active {
                                &:after {
                                    content: "";
                                    position: absolute;
                                    width: 50%;
                                    height: 50%;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%, -50%);
                                    border-radius: 50%;
                                    background-clip: border-box;
                                    background-color: var(--accent-color);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>