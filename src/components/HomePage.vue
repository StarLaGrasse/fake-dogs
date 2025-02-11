<template>
    <div class="home-container">
        <div class="home-content">
            <span v-for="(skill, s) in skills" class="home-body" v-html="skill.proficiency + ' ' + skill.skill" :key="'skill'+s"/>
        </div>
        <div class="contacts-container" v-if="desktop">
            <div class="buttons-container">
                <a href="https://starlenelagrasse.com/" target="_blank">
                    <div class="contact-button">
                        <img src="../assets/imgs/starlene-lagrasse.png" />
                    </div>
                </a>
            </div>
            <span>Site created by Starlene F. LaGrasse</span>
            <div class="buttons-container">
                <a href="https://www.linkedin.com/in/star-lagrasse" target="_blank">
                    <div class="contact-button">
                        <img src="../assets/imgs/linkedin.png" />
                    </div>
                </a>
            </div>
        </div>
        <div class="contacts-container mobile" v-else>
            <span>Site created by Starlene F. LaGrasse</span>
            <div class="buttons-container">
                <a href="https://starlenelagrasse.com/" target="_blank">
                    <div class="contact-button">
                        <img src="../assets/imgs/starlene-lagrasse.png" />
                    </div>
                </a>
                <a href="https://www.linkedin.com/in/star-lagrasse" target="_blank">
                    <div class="contact-button">
                        <img src="../assets/imgs/linkedin.png" />
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
		name: 'HomePage',
		props: {
        },
        data: function () {
            return {
                skills: []
            };
        },
        mounted: async function()
        {
            await fetch('./assets/data/skills-education.json').then((response) => { return response.json(); }).then((data) => {this.skills = this.mergeSort(data.skills, false, ["proficiency","skill"]); });
            console.log(this.skills);
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
            flex-direction: row;
            justify-items: center;
            align-items: center;
            justify-content: center;
            align-content: center;
            width: fit-content;
            height: fit-content;
            margin-bottom: 24px;

            &.mobile
            {
                flex-direction:column;
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