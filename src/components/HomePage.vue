<template>
    <div class="home-container">
        <div class="search-button" tabindex="0" role="button" id="search-button" @click="changePageFunction(2)" v-on:keydown.enter="changePageFunction(2)">
            <span v-html="translate('search')"/>
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
                myFilters: {}
            };
        },
        mounted: async function()
        {
            this.myFilters = {...this.filters};
        },
        methods:{
        },
        computed: {
            ...mapGetters({
                colorScale: "getColorScale",
                desktop: "getDesktop",
                filters: "getFilters"
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
            margin-top: 8px;
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
    }
</style>