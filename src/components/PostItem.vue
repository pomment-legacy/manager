<template>
    <li :class="{ comment: true, hidden: hidden, active: isActive }">
        <div class="item">
            <div :class="{ avatar: true, 'no-name': noAvatar }"
                aria-hidden="true"
                v-bind:style="{ backgroundImage: 'url(' + computedAvatar + ')' }">
            </div>
            <div class="content">
                <div class="entry">
                    <div class="upper">
                        <a
                            target="_blank"
                            rel="nofollow"
                            class="name"
                            :href="website">{{ name }}</a>
                        <span class="badge admin" v-if="byAdmin">MOD</span>
                        <span class="badge hidden" v-if="hidden">REMOVED</span>
                        <time :datetime="postedAtISO" :title="postedAtPretty">{{ postedAt }}</time>
                    </div>
                    <div class="text">{{ content }}</div>
                    <ul class="action">
                        <li><a v-on:click.prevent="$emit('reply', id, name)" href="#">Reply</a></li>
                        <li><a>Edit</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </li>
</template>

<style lang="scss" scoped>
$padding: 0.7rem;
$avatar: 3.4rem;

.comment {
    --border: #484848;
    --actionBar: rgba(255, 255, 255, 0.5);
    --active: rgba(255, 255, 255, 0.08);
    @media screen and (prefers-color-scheme: light) {
        --border: #b9b9b9;
        --actionBar: rgba(0, 0, 0, 0.3);
        --active: rgba(0, 0, 0, 0.08);
    }
    display: block;
    font-size: 0.875rem;
    transition: background-color 0.2s;
    &.active {
        background-color: var(--active);
    }
    &:first-child {
        border-radius: 0.5rem 0.5rem 0 0;
    }
    &:last-child {
        border-radius: 0 0 0.5rem 0.5rem;
    }
    &.hidden {
        opacity: 0.2;
        transition: opacity 0.25s;
        &:hover {
            opacity: 1;
        }
    }
    .item {
        padding: $padding $padding 0em $avatar + $padding * 2;
        position: relative;
        .avatar {
            position: absolute;
            left: $padding;
            top: $padding;
            width: $avatar;
            height: $avatar;
            border-radius: 0.4rem;
            background-color: #fff;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            &.no-name {
                background-color: #666;
                &::after {
                    content: "?";
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    font-size: $avatar * 0.75;
                    font-family: 'Rubik', sans-serif;
                    color: #fff;
                    line-height: $avatar;
                    text-align: center;
                    pointer-events: none;
                }
            }
        }
        .content {
            a.name {
                font-weight: bold;
                padding-right: 0.5rem;
            }
            span.badge {
                padding: 0.18em 0.4em;
                font-weight: bold;
                border-radius: 0.3em;
                font-size: 0.875em;
                margin-right: 0.6rem;
                &.admin {
                    background-color: #888;
                    color: #fff;
                }
                &.hidden {
                    background-color: #d32f2f;
                    color: #fff;
                }
            }
            time {
                padding-left: 0.5rem;
                opacity: 0.8;
            }
            .text {
                padding: calc(0.6rem - 0.25em) 0;
                line-height: 1.5em;
                white-space: pre-wrap;
                word-break: break-all;
            }
            ul.action {
                margin: 0;
                padding: 0.6em 0;
                border-top: .0625rem var(--border) dashed;
                li {
                    margin: 0;
                    padding: 0;
                    padding-right: 1.6em;
                    list-style: none;
                    display: inline-block;
                    &:after {
                        content: '|';
                        position: absolute;
                        width: 1.6em;
                        height: 1em;
                        line-height: 1em;
                        text-align: center;
                        color: var(--actionBar);
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
}
</style>

<script lang="ts">
/* eslint-disable lines-between-class-members */

import md5 from 'blueimp-md5';
import moment from 'moment';
import { Component, Prop, Vue } from 'vue-property-decorator';

declare module 'vue/types/vue' {
    interface Vue {
        id: number;
        name: string;
        content: string;
        email: string;
        avatar: string;
        website: string;
        hidden: boolean;
        byAdmin: boolean;
        createdAt: number;
        isActive: boolean;
    }
}

@Component({
    computed: {
        computedAvatar() {
            if (this.avatar) {
                return this.avatar;
            }
            if (this.email) {
                return `${this.$store.state.avatarPrefix + md5(this.email)}?s=256`;
            }
            return null;
        },
        noAvatar() {
            return !(this.avatar || this.email);
        },
        postedAt() {
            if (new Date().getTime() - this.createdAt >= 31536000000) {
                return moment(this.createdAt).format('MMM Do, YYYY');
            }
            return moment(this.createdAt).fromNow();
        },
        postedAtPretty() {
            return moment(this.createdAt).format('MMMM Do YYYY, H:mm:ss');
        },
        postedAtISO() {
            return new Date(this.createdAt).toISOString();
        },
    },
})

export default class ThreadItem extends Vue {
    @Prop() id!: number;
    @Prop() name!: string;
    @Prop() content!: string;
    @Prop() email!: string;
    @Prop() avatar!: string;
    @Prop() website!: string;
    @Prop() hidden!: boolean;
    @Prop() byAdmin!: boolean;
    @Prop() createdAt!: number;
    @Prop() isActive!: boolean;
}
</script>
