<template>
    <li class="thread-item">
        <span class="meta first"><router-link :to="base64url">{{ title }}</router-link></span>
        <span class="meta second">
            {{ amount }} Replies&nbsp;&nbsp;•&nbsp;&nbsp;{{ latestPosted }}
        </span>
    </li>
</template>

<style scoped lang="scss">
li {
    list-style: none;
    color: #fff;
    padding: 0.6em 1em;
    border-bottom: 2px solid rgba(0, 0, 0, 0.39);
    .meta {
        display: block;
        a {
            color: rgba(255, 255, 255, 0.75);
            text-decoration: none;
            &:hover {
                color: #fff;
                text-decoration: underline;
            }
        }
        &.first {
            line-height: 1.5em;
            // margin-top: -0.25em;
            margin-bottom: -0.25em;
        }
        &.second {
            margin-top: 0.8em;
            font-size: 0.875em;
            color: rgba(255, 255, 255, 0.4);
        }
    }
}
</style>

<script lang="ts">
import base64url from 'base64url';
import moment from 'moment';
import { Component, Prop, Vue } from 'vue-property-decorator';

declare module 'vue/types/vue' {
    interface Vue {
        title: string;
        url: string;
        amount: number;
        latestPostAt: number;
    }
}

@Component({
    computed: {
        base64url() {
            return `/list/posts/${base64url(this.url)}`;
        },
        latestPosted() {
            return moment(this.latestPostAt).fromNow();
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
