<template>
	<div class="home-container">
        <div class="home-content">
            <span class="home-header" v-html="translate('home-header')" />
            <span class="home-subheader" v-html="translate('home-subheader')" />
            <span class="home-body" v-html="translate('home-body')"/>
        </div>
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
		name: 'HomePage',
		props: {
        },
        methods:{
        },
        computed: {
            ...mapGetters({
                colorScale: "getColorScale",
                desktop: "getDesktop"
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

        .home-content {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-items: flex-start;
            justify-content: flex-start;
            align-items: center;
            align-content: center;
            padding: 8px 10%;
            width: fit-content;
            height: fit-content;
        }

        .home-header {
            width: fit-content;
            height: fit-content;
            font-size: font(32);
            font-family: var(--header-font);
            position: relative;
            font-weight: 700;
            text-align: center;
        }

        .home-subheader {
            width: fit-content;
            height: fit-content;
            font-size: font(16);
            font-family: var(--header-font);
            position: relative;
            font-weight: 400;
            text-align: center;
            margin-bottom: 16px;
            font-style: italic;
        }

        .home-body {
            width: fit-content;
            height: fit-content;
            margin-top: 32px;
            position: relative;
            font-family: var(--body-font);
            font-size: font(24);
            font-weight: 400;
            align-self: flex-start;
        }

        .contacts-container {
            position: relative;
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            justify-content: center;
            align-content: center;
            width: fit-content;
            height: fit-content;
            margin-bottom: 24px;

            span {
                position: relative;
                font-size: font(24);
                text-transform: uppercase;
            }

            .buttons-container {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-items: center;
                align-items: center;
                justify-content: center;
                align-content: center;
                width: fit-content;
                height: fit-content;
                flex-wrap: wrap;

                a
                {
                    position:relative;
                    width: fit-content;
                    height: fit-content;
                }

                .contact-button {
                    position: relative;
                    pointer-events: all;
                    width: font(64);
                    height: font(64);
                    margin: 4px 8px;
                    border-radius: 50%;
                    background-color: var(--header-bg);
                    filter: drop-shadow(2px 2px 2px var(--font-color));
                    display: flex;
                    flex-direction: row;
                    justify-items: center;
                    align-items: center;
                    justify-content: center;
                    align-content: center;

                    &:first-of-type {
                        margin-left: 16px;
                    }

                    &:last-of-type {
                        margin-right: 0
                    }

                    &:active, &:hover {
                        background-color: var(--accent-color);
                    }

                    &:active {
                        filter: drop-shadow(1px 1px 1px var(--font-color));
                    }

                    * {
                        position: relative;
                        pointer-events: none;
                    }

                    img {
                        width: 60%;
                        height: auto;
                    }
                }
            }
        }
    }
</style>