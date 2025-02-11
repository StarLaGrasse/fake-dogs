<template>
    <div class="home-container">
        <div class="home-content">
            <span v-for="(skill, s) in skills" class="home-body" v-html="skill.proficiency + ' ' + skill.skill" :key="'skill'+s"/>
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
    }
</style>