<template>
    <div>
        <div class="nav-outer">
            <nav class="container">
                <h1>Pomment</h1>
                <ul class="nav-item">
                    <li v-for="item in menuItems" :key="item.to">
                        <router-link v-bind:to="item.to">{{ item.name }}</router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="main container">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
$mainTheme: #03a9f4;

.nav-outer {
    position: fixed;
    background-color: rgba(0, 0, 0, .9);
    box-shadow: 0 0 45px 0 rgba(0, 0, 0, .5);
    width: 100%;
    z-index: 10000;
    nav {
        // max-width: 732px;
        height: 3.5rem;
        margin: 0 auto;
        padding: 0;
        h1 {
            float: left;
            color: #ddd;
            font-size: 1.5em;
            margin: 0;
            height: 3.5rem;
            line-height: 3.5rem;
            padding: 0 1rem;
        }
        ul.nav-item {
            float: right;
            margin: 0;
            padding: 0;
            li {
                display: inline-block;
                a {
                    display: block;
                    font-size: 1rem;
                    padding: 0 1rem;
                    height: 3.5rem;
                    line-height: 3.5rem;
                    color: #ddd;
                    text-decoration: none;
                    box-shadow: inset $mainTheme 0 0 0 0;
                    transition: color .21s, box-shadow .21s;
                    &:hover {
                        color: $mainTheme;
                        box-shadow: inset $mainTheme 0 -3px 0 0;
                        text-decoration: none
                    }
                }
            }
        }
    }
}

.main {
    padding-top: 4.5rem;
    padding-bottom: 1rem;
    max-width: 768px;
}

</style>

<style lang="scss">
body {
    background-color: #141414;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            menuItems: [
                { name: 'Switch Site', to: '/logout' },
            ],
        };
    },
    beforeCreate() {
        if (!this.$store.state.logged) {
            this.$router.push('/login');
        }
        if (this.$route.name === '/list') {
            this.$router.replace('/list/threads');
        }
    },
});
</script>
