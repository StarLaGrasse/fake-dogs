<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-button" tabindex="0" role="button" id="login-button" @click="login" v-on:keydown.enter="login">
                <span>LOGIN</span>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'LoginBumper',
        props: {
        },
        data: function () {
            return {
            };
        },
        mounted: async function()
        {
        },
        methods:{
            login: async function()
            {
                this.$store.commit("setLoggedin", true)
            }
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
    .login-container {
        position: absolute;
        pointer-events: all;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-items: center;
        align-content: center;
        align-items: center;
        color: var(--font-color);
        font-size: font(16);
        font-family: var(--body-font);

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--font-color);
            opacity: 0.85;
        }

        .login-box {
            position: relative;
            width: fit-content;
            height: fit-content;
            padding: 48px 32px;
            display: flex;
            flex-direction: column;
            align-content: flex-start;
            align-items: flex-start;
            justify-items: center;
            justify-content: center;
            background-color: var(--accent-color);
            border-radius: 16px;
            background-clip: border-box;

            .login-button {
                position: relative;
                pointer-events: visible;
                background-color: var(--header-bg);
                width: fit-content;
                height: fit-content;
                font-size: font(24);
                align-self: center;
                display: flex;
                flex-direction: column;
                align-content: center;
                align-items: center;
                justify-items: center;
                justify-content: center;
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
                    color: var(--accent-color);
                }

                &:hover, &:active {
                    background-color: var(--content-bg);
                }
                &:active
                {
                    filter: none;
                }
            }
        }
    }
</style>
