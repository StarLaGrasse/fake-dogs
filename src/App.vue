<template>
    <div class="app-container">
        <div class="header">
            <div class="header-option" role="button" tabindex="0" id="about-tab" :class="{'current': currentPage === 1}" @click="changePage(1)" v-on:keydown.enter="changePage(1)">
                <span v-html="translate('home-button')" />
            </div>
            <div class="header-option" role="button" tabindex="0" id="options-tab" :class="{'current': currentPage === 10}" @click="changePage(10)" v-on:keydown.enter="changePage(10)">
                <span v-html="translate('options-button')" />
            </div>
        </div>
        <div class="app-content">
            <div class="app-view-window">
                <div class="app-panel">
                    <TransitionerObject name="fade-and-blur-normal">
                        <HomePage v-if="displayedPage === 1" :style="{'pointer-events': loggedin ? 'visible' : 'none'}" />
                    </TransitionerObject>
                    <TransitionerObject name="fade-and-blur-normal">
                        <OptionsMenu v-if="displayedPage===10" />
                    </TransitionerObject>
                </div>
            </div>
            <div class="box-overlay" v-if="scanlines" />
            <LoginBumper v-if="!loggedin && displayedPage!==10" />
        </div>
        <div class="attribution">
        <div class="contacts-container" v-if="desktop">
            <div class="buttons-container">
                <a href="https://starlenelagrasse.com/" target="_blank">
                    <div class="contact-button">
                        <img src="./assets/imgs/starlene-lagrasse.png" />
                    </div>
                </a>
            </div>
            <span>Site created by Starlene F. LaGrasse</span>
            <div class="buttons-container">
                <a href="https://www.linkedin.com/in/star-lagrasse" target="_blank">
                    <div class="contact-button">
                        <img src="./assets/imgs/linkedin.png" />
                    </div>
                </a>
            </div>
        </div>
        <div class="contacts-container mobile" v-else>
            <span>Site created by Starlene F. LaGrasse</span>
            <div class="buttons-container">
                <a href="https://starlenelagrasse.com/" target="_blank">
                    <div class="contact-button">
                        <img src="./assets/imgs/starlene-lagrasse.png" />
                    </div>
                </a>
                <a href="https://www.linkedin.com/in/star-lagrasse" target="_blank">
                    <div class="contact-button">
                        <img src="./assets/imgs/linkedin.png" />
                    </div>
                </a>
            </div>
        </div>
        </div>
        <div class="scrolling-effect" v-if="scanlines">
            <div class="scroll-line" />
            <div class="scroll-line" />
            <div class="scroll-line" />
        </div>
        <div class="scrolling-effect" style="animation-delay: 32s;" v-if="scanlines">
            <div class="scroll-line" />
            <div class="scroll-line" />
            <div class="scroll-line" />
        </div>
        <div class="scrolling-effect" style="animation-delay: 64s;" v-if="scanlines">
            <div class="scroll-line" />
            <div class="scroll-line" />
            <div class="scroll-line" />
        </div>
        <div class="scrolling-effect" style="animation-delay: 96s;" v-if="scanlines">
            <div class="scroll-line" />
            <div class="scroll-line" />
            <div class="scroll-line" />
        </div>
        <ScanlineEffect v-if="scanlines" />
    </div>
</template>

<script>
    import HomePage from './components/HomePage.vue';
	import ScanlineEffect from './components/ScanlineEffect.vue';
    import OptionsMenu from './components/OptionsMenu.vue';
    import TransitionerObject from './components/TransitionerObject.vue';
    import LoginBumper from './components/LoginBumper.vue';
    import { mapGetters } from 'vuex';

	export default {
		name: 'App',
		components: {
            HomePage,
			ScanlineEffect,
            OptionsMenu,
            TransitionerObject,
            LoginBumper
		},
		data: function () {
			return {
				displayedPage: 0,
                pageTimeout: null,
			};
		},
		methods:
		{
			changePage: function (page, skipHistory = false) {
				if (this.currentPage === page || this.pageTimeout) return;
				this.displayedPage = 0;
                this.$store.commit("setCurrentPage", page);
				if (this.pageTimeout) clearTimeout(this.pageTimeout);
				this.pageTimeout = setTimeout(function () {
                    this.displayedPage = page;
                    let display = "home";
                    switch (page)
                    {
                        default:
                            break;
                        case 10:
                            display = "options";
                            break;
                    }
                    if (!skipHistory) window.history.pushState(null, "", "?page=" + display);
					this.pageTimeout = null;
				}.bind(this), 500);
            },
            goBack: function ()
            {
                let query = new URLSearchParams(window.location.search);
                if (query.get("page")) {
                    let page = query.get("page");
                    switch (query.get("page")) {
                        default: case 0: case 1:case "home":
                            this.changePage(1, page, true);
                            break;
                        case 10: case "options": case "config": case "configuration": case "menu": case "font":
                            this.changePage(10, page, true);
                            break;
                    }
                }
            }
		},
		computed:
		{
			...mapGetters({
                scanlines: 'getScanlines',
                currentPage: 'getCurrentPage',
                loggedin: 'getLoggedin'
			})
        },
        mounted: async function ()
        {
            this.displayedPage=this.currentPage;

            window.addEventListener( "popstate", function () { requestAnimationFrame(this.goBack.bind(this)) }.bind(this));
        }
}
</script>

<style lang="scss">
    $normal-transition-weight: 0.49s;
    $light-transition-weight: 0.24s;
    $heavy-transition-weight: 0.99s;
    .app-container {
        overflow-wrap: break-word;
        overflow-y: hidden;

        * {
            overflow-wrap: break-word;
        }

        font-family: var(--body-font);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-items: flex-start;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;

        .header {
            position: relative;
            width: 100%;
            height: fit-content;
            display: flex;
            flex-direction: row;
            justify-items: center;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
            background-color: var(--header-bg);

            .header-option {
                position: relative;
                width: fit-content;
                height: fit-content;
                padding: 16px 24px;
                flex-grow: 1;
                background-color: var(--header-bg);
                pointer-events: visible;
                display: flex;
                flex-direction: row;
                justify-items: center;
                justify-content: center;
                align-items: center;
                align-content: center;
                border-left: 1px solid var(--font-color);
                border-right: 1px solid var(--font-color);

                span {
                    font-family: var(--header-font);
                    pointer-events: none;
                    position: relative;
                    font-size: font(16);
                    color: var(--font-color);
                    font-weight: 700;
                    text-shadow: 1px 1px 2px var(--content-bg), -1px 1px 2px var(--content-bg), 1px -1px 2px var(--content-bg), -1px -1px 2px var(--content-bg);
                    text-transform: uppercase;
                    text-align: center;
                }

                &:hover, &.current {
                    background-color: var(--accent-color);
                }

                &:active {
                    background-color: var(--content-bg);
                    box-shadow: inset 1px 1px 4px var(--font-color), inset -1px -1px 4px var(--font-color);
                }
            }
        }

        .app-content {
            position: relative;
            width: 100%;
            height: auto;
            flex-grow: 1;
            background-color: var(--content-bg);

            .app-view-window {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                flex-direction: column;
                justify-items: flex-start;
                justify-content: flex-start;
                align-items: flex-start;
                align-content: flex-start;
                overflow-y: scroll;
                pointer-events: visible;

                .app-panel {
                    position: relative;
                    width: 100%;
                    min-height: 100%;
                    height: fit-content;
                    display: flex;
                    flex-direction: column;
                    justify-items: flex-start;
                    justify-content: flex-start;
                    align-items: flex-start;
                    align-content: flex-start;
                }
            }

            .box-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                box-shadow: inset 4px 4px 8px var(--font-color), inset -4px -4px 8px var(--font-color);
                pointer-events: none;
                animation: box-pulse infinite ease-in-out 16s;
            }
        }

        .attribution {
            position: relative;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-items: center;
            justify-content: center;
            align-items: center;
            align-content: center;
            background-color: var(--accent-color);

            .contacts-container {
                position: relative;
                margin: 16px 0;
                display: flex;
                flex-direction: row;
                justify-items: center;
                align-items: center;
                justify-content: center;
                align-content: center;
                width: fit-content;
                height: fit-content;

                &.mobile {
                    flex-direction: column;
                }

                span {
                    position: relative;
                    font-size: font(24);
                    text-transform: uppercase;
                    margin: 0 8px;
                    text-align: center;
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

                    a {
                        position: relative;
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

        .music-player-spacer {
            animation: grow-player linear $normal-transition-weight;
            animation-iteration-count: 1;
            width: 100%;
            height: 96px;
        }

        @keyframes grow-player {
            0% {
                height: 0;
            }

            100% {
                height: 96px;
            }
        }

        .scrolling-effect {
            position: absolute;
            left: 0;
            top: -50%;
            width: 100%;
            height: fit-content;
            filter: blur(16px);
            opacity: 0.75;
            display: flex;
            flex-direction: column-reverse;
            justify-items: flex-end;
            justify-content: flex-end;
            align-items: flex-start;
            align-content: flex-start;
            animation: line-scroll linear 128s infinite;
            pointer-events: none;

            * {
                pointer-events: none;
            }

            .scroll-line {
                position: relative;
                width: 100%;
                background-color: var(--header-bg);
                height: 8px;

                &:first-of-type {
                    background-color: var(--font-color);
                }

                &:last-of-type {
                    background-color: var(--accent-color);
                }
            }
        }

        @keyframes box-pulse {
            0% {
                box-shadow: inset 4px 4px 10px var(--font-color), inset -4px -4px 10px var(--font-color);
            }

            50% {
                box-shadow: inset 8px 8px 8px var(--font-color), inset -8px -8px 8px var(--font-color);
            }

            100% {
                box-shadow: inset 4px 4px 10px var(--font-color), inset -4px -4px 10px var(--font-color);
            }
        }

        @keyframes line-scroll {
            0% {
                top: -50%;
            }

            100% {
                top: 150%;
            }
        }
    }
</style>
