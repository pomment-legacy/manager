<template>
    <div class="main">
        <div class="main-panel">
            <h1>Pomment</h1>
            <form v-on:submit.prevent="login">
                <input type="url" placeholder="Site API URL" required v-model="url">
                <input type="password" placeholder="Password" required v-model="password">
                <input type="submit" v-model="submitDisplay" v-bind:disabled="noSubmit">
            </form>
        </div>
        <footer>&copy; The Pomment Team | Version {{ version }}</footer>
    </div>
</template>

<style lang="scss" scoped>
$mobile: 480px;
$mainTheme: #03a9f4;

.main-panel {
    --title: #bdbdbd;
    --inputText: #fff;
    --inputBorder: rgba(255, 255, 255, 0.13);
    --inputBorderFocus: rgba(255, 255, 255, 0.6);

    @media screen and (prefers-color-scheme: light) {
        --title: #383838;
        --inputText: #000;
        --inputBorder: rgba(0, 0, 0, 0.25);
        --inputBorderFocus: rgba(0, 0, 0, 0.7);
    }

    width: calc(100vw - 2em);
    max-width: 24em;
    margin: 0 auto;
    position: absolute;
    left: 1em;
    top: 1em;
    @media (min-width: $mobile) {
        left: calc(50% - 12em);
        top: calc(50% - 7em);
        // transform: translate3d(-50%, -50%, 0);
        width: 24em;
        text-align: center;
    }
    h1 {
        margin: 0;
        padding: 0.5em 0;
        color: var(--title);
        font-family: 'Rubik';
    }
    input[type="url"], input[type="password"] {
        -webkit-appearance: none;
        box-sizing: border-box;
        display: block;
        background-color: transparent;
        color: var(--inputText);
        border: 0;
        border-radius: 0;
        padding: 0.6em 0.4em;
        width: 100%;
        font-size: 1em;
        border-bottom: 2px var(--inputBorder) solid;
        margin-bottom: 0.44em;
        transition: border-bottom-color 0.2s;
        &::placeholder {
            color: var(--inputBorder);
            transition: color 0.2s;
        }
        &:focus {
            outline: none;
            border-bottom: 2px var(--inputBorderFocus) solid;
            &::placeholder {
                color: var(--inputBorderFocus);
            }
        }
    }
    input[type="password"] {
        margin-bottom: 1em;
    }
    input[type="submit"] {
        -webkit-appearance: none;
        width: 100%;
        @media (min-width: $mobile) {
            width: 8em;
        }
        height: 2.5em;
        border: 0;
        border-radius: 0.5em;
        background-color: $mainTheme;
        opacity: 1;
        transition: background-color 0.2s, opacity 0.1s;
        margin-bottom: 1em;
        color: #fff;
        &:focus {
            outline: none;
            background-color: darken($color: $mainTheme, $amount: 10%);
        }
        &:disabled {
            opacity: 0.5;
        }
    }
}
footer {
    --copyright: rgba(255, 255, 255, 0.31);

    @media screen and (prefers-color-scheme: light) {
        --copyright: rgba(0, 0, 0, 0.5);
    }

    width: 100vw;
    text-align: center;
    position: absolute;
    bottom: 0;
    padding: 0.5em 0;
    font-size: 0.875em;
    color: var(--copyright);
}
</style>

<script lang="ts">
import Vue from 'vue';
import { sha512 } from 'js-sha512';
import { version } from '../../package.json';

export default Vue.extend({
    data: () => ({
        url: process.env.NODE_ENV === 'development' ? `http://${document.location.hostname}:5000` : '',
        password: process.env.NODE_ENV === 'development' ? 'password' : '',
        version,
        noSubmit: false,
        submitDisplay: 'Sign in',
    }),
    methods: {
        login() {
            this.noSubmit = true;
            this.submitDisplay = 'Signing in...';
            this.$store.commit('setLoginInfo', {
                url: this.url,
                token: sha512(this.password),
            });
            this.$store.dispatch('getThreadList').then(() => {
                this.$store.commit('setLoginStatus', {
                    logged: true,
                });
                this.$router.push(this.$store.state.nextPath);
            }).catch((e) => {
                let reason = `${e}`;
                if (e.response?.status === 403) {
                    reason = 'Bad password';
                } else if (e.response?.status >= 500) {
                    reason = 'Internal Server Error';
                }
                this.$notify({
                    group: 'main',
                    title: 'Login Failed',
                    type: 'error',
                    text: reason,
                });
                this.noSubmit = false;
                this.submitDisplay = 'Sign in';
            });
        },
    },
});
</script>
