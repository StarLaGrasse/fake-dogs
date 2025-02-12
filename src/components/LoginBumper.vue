<template>
    <div class="login-container">
        <div class="login-box">
            <span class="login-header" v-html="translate('login-title')" />
            <span class="login-error" v-if="failed > 0" v-html="translate(failed === 1 ? 'login-error-nothing' : failed === 2 ? 'login-error-no-name' : failed === 3 ? 'login-error-no-email': failed === 4 ? 'login-error-not-found' : failed === 5 ? 'login-error-invalid': 'login-error-unknown')"/>
            <div class="entry-container">
                <span class="entry-title" v-html="translate('user-entry')" />
                <input type="text" class="entry-input" size="32" id="username" tabindex="0" />
            </div>

            <div class="entry-container">
                <span class="entry-title" v-html="translate('pass-entry')" />
                <input type="text" class="entry-input" size="32" id="email" tabindex="0" v-on:keydown.enter="login" />
            </div>

            <div class="login-button" v-if="!logging" tabindex="0" role="button" id="login-button" @click="login" v-on:keydown.enter="login">
                <span v-html="translate('login-entry-button')" />
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
                failed: 0,
                logging: false
            };
        },
        mounted: async function()
        {
        },
        methods:{
            login: async function()
            {
                let user = document.getElementById("username").value;
                let email = document.getElementById("email").value;
                if (user === "" && email === "") {
                    this.failed = 1;
                    return;
                }
                if (user === "") {
                    this.failed = 2;
                    return;
                }
                if (email === "") {
                    this.failed = 3;
                    return;
                }
                this.logging = true;
                //4 server not found
                //5 invalid
                //6 unknown error
                let loginData = {"name": user, "email": email};
                await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
                    "method": "POST",
                    "body": JSON.stringify(loginData),
                    "headers": {"Content-Type": "application/json; charset=utf-8"},
                    "credentials":"include"
                }).then((response) => {switch(response.status){
                    case 200:
                        this.dispatchLogin();
                        this.$store.commit("setLoggedin", true);
                        break;
                    case 404:
                            this.failed = 4;
                            this.logging = false;
                            break;
                    case 401: case 400:
                        this.failed = 5;
                        this.logging = false;
                        break;
                    default:
                        this.failed = 6;
                        this.logging = false;
                        break;
                }});
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
            padding: 16px 8px;
            margin: 0 12px;
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
            justify-items: center;
            justify-content: center;
            background-color: var(--accent-color);
            border-radius: 16px;
            background-clip: border-box;

            .login-header {
                position: relative;
                font-family: var(--header-font);
                color: var(--header-bg);
                font-size: font(32);
                text-align: center;
                text-wrap: balance;
            }

            .login-error {
                position: relative;
                color: var(--content-bg);
                text-shadow: 1px 1px 2px var(--header-bg), -1px 1px 2px var(--header-bg), 1px -1px 2px var(--header-bg), -1px -1px 2px var(--header-bg);
                text-transform: uppercase;
                text-align: center;
                text-wrap: balance;

                margin: 4px 0;
            }

            .entry-container {
                position: relative;
                display: flex;
                flex-direction: column;
                align-content: flex-start;
                align-items: flex-start;
                justify-items: center;
                justify-content: center;
                width: fit-content;
                height: fit-content;
                margin: 8px 0;

                .entry-title {
                    position: relative;
                    margin-bottom: 4px;
                }

                .entry-input {
                    position: relative;
                    -webkit-appearance: none;
                    appearance: none;
                    background-color: var(--content-bg);
                    border: solid 2px var(--header-bg);
                    box-shadow: 2px 2px 2px var(--font-color);
                    height: font(16);
                    font-size: font(12);
                    flex-grow: 1;
                    font-family: var(--body-font);
                    width: auto;
                    color: var(--font-color);

                    &:active, &:focus {
                        border: solid 2px var(--accent-color);
                        box-shadow: 1px 1px 1px var(--font-color);
                        outline: none;
                    }
                }
            }

            .login-button {
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
                    color: var(--accent-color);
                }

                &:hover, &:active {
                    background-color: var(--content-bg);
                }

                &:active {
                    filter: none;
                }
            }
        }
    }
</style>
