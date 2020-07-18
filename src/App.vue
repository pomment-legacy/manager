<template>
    <div id="app">
        <router-view />
        <notifications
            group="main"
            position="top center"
            class="pomment-notification"
            width="330px"
        />
    </div>
</template>

<style lang="scss">
$mobile: 480px;
$mainTheme: #03a9f4;

:root {
    --text: #fff;
    --link: rgba(255, 255, 255, 0.75);
    --hover: #fff;
    --inputText: #fff;
    --inputBorder: rgba(255, 255, 255, 0.13);
    --inputBorderFocus: rgba(255, 255, 255, 0.6);

    @media screen and (prefers-color-scheme: light) {
        --text: #111;
        --link: rgba(0, 0, 0, 0.7);
        --hover: $mainTheme;
        --inputText: #000;
        --inputBorder: rgba(0, 0, 0, 0.25);
        --inputBorderFocus: rgba(0, 0, 0, 0.7);
    }
}

body {
    font-family:
        "lucida grande",
        "lucida sans unicode",
        "Helvetica Neue",
        Tahoma,
        "PingFang SC",
        "Hiragino Sans GB",
        "Source Han Sans CN Normal",
        "Heiti SC",
        "Microsoft YaHei",
        "WenQuanYi Micro Hei",
        SimSun,
        sans-serif;
    margin: 0;
    color: var(--text);
    background-color: #141414;
    @media screen and (prefers-color-scheme: light) {
        background-color: #e2e2e2;
    }
    a {
        color: var(--link);
        text-decoration: none;
        &:hover {
            color: var(--hover);
            text-decoration: underline;
        }
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
    textarea {
        appearance: none;
        display: block;
        width: 100%;
        height: 120px;
        box-sizing: border-box;
        box-shadow: unset;
        border: 2px solid var(--inputBorder);
        transition: border-color 0.1s;
        border-radius: 0.2rem;
        resize: none;
        padding: 0.3em 0.4em;
        line-height: 1.5em;
        font-size: 0.875rem;
        background-color: transparent;
        color: var(--inputText);
        &:focus {
            outline: none;
            border: 2px solid var(--inputBorderFocus);
        }
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
        margin-bottom: 0.8rem;
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

.pomment-notification .vue-notification-wrapper {
    overflow: unset;
    .vue-notification {
        font-size: 0.9rem;
        padding: 0.8em;
        margin: 0.6em 0.6em 0;
        color: #fff;
        background: #44a4fc;
        border: 0;
        border-radius: 0.4em;
        box-shadow: rgba(0, 0, 0, .12) 0 1rem 2rem 0;
        // line-height: 1.6em;
        .notification-title {
            font-weight: bold;
            font-size: 1.3rem;
            padding-bottom: 0.5em;
        }
        .notification-content {
            line-height: 1.6em;
            margin-top: -0.3em;
            margin-bottom: -0.3em;
        }
        &.warn {
            background: #ffb648;
        }
        &.error {
            background: #E54D42;
        }
        &.success {
            background: #68CD86;
        }
    }
}
</style>
