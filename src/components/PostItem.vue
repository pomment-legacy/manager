<template>
    <li class="comment">
        <div class="item">
            <div class="avatar"
                aria-hidden="true"
                v-bind:style="{ backgroundImage: 'url(' + computedAvatar + ')' }">
                <div class="unknown-guy" v-show="noAvatar"></div>
            </div>
            <div class="content">
                <div class="entry">
                    <div class="upper">
                        <a
                            target="_blank"
                            rel="nofollow"
                            class="name"
                            :href="website">{{ name }}</a>
                        <span class="admin" v-show="byAdmin">MOD</span>
                        <time :datetime="postedAtISO" :title="postedAtPretty">{{ postedAt }}</time>
                    </div>
                    <div class="text">{{ content }}</div>
                    <ul class="action">
                        <li><a>Reply</a></li>
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
    @media screen and (prefers-color-scheme: light) {
        --border: #b9b9b9;
        --actionBar: rgba(0, 0, 0, 0.3);
    }
    display: block;
    font-size: 0.875rem;
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
            background-color: #666;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .content {
            a.name {
                font-weight: bold;
                padding-right: 0.5rem;
            }
            span.admin {
                padding: 0em 0.4em;
                background-color: #888;
                color: #fff;
                font-weight: bold;
                border-radius: 0.3em;
                font-size: 0.875em;
                margin-right: 0.6rem;
            }
            .text {
                padding: calc(0.6rem - 0.25em) 0;
                line-height: 1.5em;
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
import md5 from 'blueimp-md5';
import moment from 'moment';
import { Component, Prop, Vue } from 'vue-property-decorator';

declare module 'vue/types/vue' {
    interface Vue {
        name: string;
        content: string;
        email: string;
        avatar: string;
        website: string;
        byAdmin: boolean;
        createdAt: number;
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
    @Prop() name!: string;

    @Prop() content!: string;

    @Prop() email!: string;

    @Prop() avatar!: string;

    @Prop() website!: string;

    @Prop() byAdmin!: boolean;

    @Prop() createdAt!: number;
}
</script>
