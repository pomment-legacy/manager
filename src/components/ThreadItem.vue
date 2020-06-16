<template>
    <li class="thread-item">
        <span class="meta first"><router-link :to="base64url">{{ title }}</router-link></span>
        <ul class="meta second">
            <li>{{ amount }} Replies</li>
            <li>
                <time
                :datetime="latestPostedISO"
                :title="latestPostedPretty"
                >{{ latestPosted }}</time>
                </li>
        </ul>
    </li>
</template>

<style scoped lang="scss">
$mainTheme: #03a9f4;

li.thread-item {
    --text: #fff;
    --link: rgba(255, 255, 255, 0.75);
    --hover: #fff;
    --meta: rgba(255, 255, 255, 0.4);
    --bottomLine: rgba(0, 0, 0, 0.39);

    @media screen and (prefers-color-scheme: light) {
        --text: #111;
        --link: rgba(0, 0, 0, 0.7);
        --hover: #03a9f4;
        --meta: rgba(0, 0, 0, 0.4);
        --bottomLine: rgba(0, 0, 0, 0.137);
    }

    list-style: none;
    color: var(--text);
    padding: 0.6em 1em;
    border-bottom: 2px solid var(--bottomLine);
    &:last-child {
        border-bottom-width: 0;
    }
    .meta {
        display: block;
        a {
            color: var(--link);
            text-decoration: none;
            &:hover {
                color: var(--hover);
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
            padding: 0;
            font-size: 0.875em;
            color: var(--meta);
            li {
                margin: 0;
                padding: 0;
                padding-right: 1.6em;
                list-style: none;
                display: inline-block;
                &:after {
                    content: '•';
                    position: absolute;
                    width: 1.6em;
                    height: 1em;
                    line-height: 1em;
                    text-align: center;
                }
                &:last-child {
                    padding-right: 0;
                    &:after {
                        display: none;
                    }
                }
            }
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
            if (new Date().getTime() - this.latestPostAt >= 31536000000) {
                return moment(this.latestPostAt).format('MMM Do, YYYY');
            }
            return moment(this.latestPostAt).fromNow();
        },
        latestPostedPretty() {
            return moment(this.latestPostAt).format('MMMM Do YYYY, H:mm:ss');
        },
        latestPostedISO() {
            return new Date(this.latestPostAt).toISOString();
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
