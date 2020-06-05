<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
    <router-view/>
    </div>
</template>

<style lang="scss">
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
}
</style>
