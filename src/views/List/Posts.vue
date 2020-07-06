<template>
    <div>
        <div class="section-outer">
            <header>
                <h1 class="title">{{ thread.attr.title }}</h1>
                <div class="meta desc">
                        {{ thread.attr.amount }} Replies (Since {{ latestPosted }})
                </div>
                <ul class="meta thread-option">
                    <li><router-link to="/list/threads">Back</router-link></li>
                    <li><router-link to="meta">Edit Meta</router-link></li>
                    <li>Lock</li>
                    <li><a :href="thread.url" target="_blank">Original</a></li>
                </ul>
            </header>
        </div>
        <div class="section-outer comments">
            <ul class="comment-items">
                <PostItem
                    v-for="post in thread.content"
                    :name="post.name"
                    :content="post.content"
                    :email="post.email"
                    :avatar="post.avatar"
                    :website="post.website"
                    :byAdmin="post.byAdmin"
                    :createdAt="post.createdAt"
                    :key="post.id" />
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.section-outer {
    --bg: #282828;
    --shadow: rgba(0, 0, 0, 0.1) 0.5rem 0.5rem 1rem 1rem;
    --border: #484848;
    --actionBar: rgba(255, 255, 255, 0.5);
    --status: rgba(0, 0, 0, 0.25);
    @media screen and (prefers-color-scheme: light) {
        --bg: #fff;
        --shadow: rgba(0, 0, 0, .09) 0.5rem 0.5rem 1rem 0.25rem;
        --border: #b9b9b9;
        --actionBar: rgba(0, 0, 0, 0.3);
        --status: rgba(0, 0, 0, 0.09);
    }

    background-color: var(--bg);
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    header {
        padding: 0 0.8rem;
        h1.title {
            $lineHeight: 2.4rem;
            line-height: $lineHeight;
            margin: 0;
            padding: 1.2rem - (($lineHeight - 1rem) / 2) 0;
            font-size: 1.4rem;
            @media (min-width: 640px) {
                $lineHeight: 4rem;
                line-height: $lineHeight;
                padding: 1.2rem - (($lineHeight - 1rem) / 2) 0;
                font-size: 2rem;
            }
        }
        .meta {
            margin: 0;
            padding: 0.7rem 0;
            font-size: 0.875rem;
        }
        .desc {
            padding-top: 0;
            border-bottom: 1px var(--border) dashed;
            color: var(--actionBar);
        }
        ul.thread-option {
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
    section.status {
        background-color: var(--status);
        padding: 0.6rem 0.8rem;
        font-size: 0.875rem;
    }
    &.comments {
        margin-top: 1rem;
        ul.comment-items {
            padding: 0;
            margin: 0;
        }
    }
}
</style>

<script lang="ts">
/* eslint-disable no-param-reassign */

import moment from 'moment';
import Vue from 'vue';
import Store from '@/store/index';
import base64url from 'base64url';
import axios from 'axios';
import getAuthObject from '@/lib/getAuthObject';
import { IThreadItem, IPostQueryResults } from 'pomment-common/dist/interface/post';
import PostItem from '@/components/PostItem.vue';

interface PostResult {
    url: string;
    attr: IThreadItem;
    locked: boolean;
    content: IPostQueryResults[];
}

declare module 'vue/types/vue' {
    interface Vue {
        actualTitle: string;
        thread: PostResult;
    }
}

export default Vue.extend({
    data() {
        return {
            actualTitle: '',
            thread: {},
        };
    },
    beforeRouteEnter(to, from, next) {
        axios.post(`${Store.state.url}/v3/manage/list`, {
            url: base64url.decode(to.params.threadURL),
            auth: getAuthObject(Store.state.token),
        }).then((res) => {
            next((target) => {
                target.thread = res.data;
            });
        }).catch(() => {
            next(false);
        });
    },
    computed: {
        latestPosted() {
            return moment(this.latestPostAt).format('MMM Do, YYYY');
        },
    },
    components: {
        PostItem,
    },
});
</script>
