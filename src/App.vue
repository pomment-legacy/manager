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
:root {
    --text: #fff;
    --link: rgba(255, 255, 255, 0.75);
    --hover: #fff;

    @media screen and (prefers-color-scheme: light) {
        --text: #111;
        --link: rgba(0, 0, 0, 0.7);
        --hover: #03a9f4;
    }
}

body {
    font-family:
    'Rubik',
    'Arial',
    "PingFang SC",
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
        box-shadow: rgba(0,0,0,.12) 0.25em 0.25em 1em 0.25em;
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
