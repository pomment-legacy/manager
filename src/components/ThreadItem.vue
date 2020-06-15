<template>
    <li class="thread-item">
        <span class="meta first"><router-link :to="base64url">{{ title }}</router-link></span>
        <span class="meta second">{{ amount }} Replies | Last Updated {{ latestPostAt }}</span>
    </li>
</template>

<style scoped lang="scss">
li {
    list-style: none;
    color: #fff;
    .meta {
        display: block;
    }
}
</style>

<script lang="ts">
import base64url from 'base64url';
import { Component, Prop, Vue } from 'vue-property-decorator';

declare module 'vue/types/vue' {
    interface Vue {
        url: string;
    }
}

@Component({
    computed: {
        base64url() {
            return `/list/posts/${base64url(this.url)}`;
        },
    },
})

export default class ThreadItem extends Vue {
    @Prop() title!: string;

    @Prop() url!: string;

    @Prop() amount!: number;

    @Prop() latestPostAt!: number;
}
</script>
