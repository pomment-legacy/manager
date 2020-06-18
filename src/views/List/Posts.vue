<template>
    <div class="section-outer">
        <header>
            <ul class="breadcrumb">
                <li><router-link to="/list/threads">Threads</router-link></li>
                <li>{{ thread.attr.title }}</li>
            </ul>
            <h1 class="title">{{ thread.attr.title }}</h1>
        </header>
    </div>
</template>

<style lang="scss" scoped>
.section-outer {
    --bg: #282828;
    --shadow: rgba(0, 0, 0, 0.1) 0.5rem 0.5rem 1rem 1rem;
    @media screen and (prefers-color-scheme: light) {
        --bg: #fff;
        --shadow: rgba(0, 0, 0, .09) 0.5rem 0.5rem 1rem 0.25rem;
    }

    background-color: var(--bg);
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    padding: 0 0.75em;
    ul.breadcrumb {
        margin: 0;
        padding: 1em 0;
        font-size: 0.875rem;
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
    h1.title {
        margin: 0;
        padding: 0.8rem 0;
        font-size: 1.6em;
    }
}
</style>

<script lang="ts">
/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Store from '@/store/index';
import base64url from 'base64url';
import axios from 'axios';
import getAuthObject from '@/lib/getAuthObject';
import { IThreadItem, IPostQueryResults } from 'pomment-common/dist/interface/post';

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
        if (!Store.state.logged) {
            next((target) => {
                target.$router.replace('/login');
            });
            return;
        }
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
});
</script>
