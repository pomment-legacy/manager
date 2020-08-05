<template>
    <div>
        <div class="section-outer edit">
            <div class="head clearfix">
                <h2 class="left">Edit comment</h2>
                <span class="right">
                    <router-link :to="backURL">Back</router-link>
                </span>
            </div>
            <form v-on:submit.prevent="editComment">
                <input class="data-input" type="text" placeholder="Name" v-model="post.name">
                <input class="data-input" type="email" placeholder="Email" v-model="post.email">
                <input class="data-input" type="url" placeholder="Avatar URL" v-model="post.avatar">
                <input class="data-input" type="url" placeholder="Website" v-model="post.website">
                <textarea
                    placeholder="Input your comment here ..."
                    required="required"
                    v-model="post.content"
                    ref="commentBox"
                    v-on:input="updateHeight" />
                <input type="submit" value="Submit">
                <div class="options">
                    <input id="enable-hidden" type="checkbox" class="switch" v-model="post.hidden">
                    <label for="enable-hidden">Removed</label>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$mobile: 480px;

.section-outer {
    --bg: #282828;
    --text: #fff;
    --shadow: rgba(0, 0, 0, 0.1) 0.5rem 0.5rem 1rem 1rem;
    --shadowFocus: rgba(0, 0, 0, 0.6) 0.5rem 0.5rem 2.1rem 0.25rem;
    --border: #484848;
    --actionBar: rgba(255, 255, 255, 0.5);
    --status: rgba(0, 0, 0, 0.25);
    --inputTitle: rgba(255, 255, 255, 0.06);
    @media screen and (prefers-color-scheme: light) {
        --bg: #fff;
        --text: #000;
        --shadow: rgba(0, 0, 0, .09) 0.5rem 0.5rem 1rem 0.25rem;
        --shadowFocus: rgba(0, 0, 0, 0.21) 0.5rem 0.5rem 2.1rem 0.25rem;
        --border: #b9b9b9;
        --actionBar: rgba(0, 0, 0, 0.3);
        --status: rgba(0, 0, 0, 0.09);
        --inputTitle: rgba(0, 0, 0, 0.06);
    }
    background-color: var(--bg);
    border-radius: 0.5rem;
    box-shadow: var(--shadow);

    &.edit {
        z-index: 3500;
        transition: box-shadow 0.2s;
        .head .left {
            float: left;
            margin: 0;
            padding: 1rem 0.8rem;
            font-size: 1.2rem;
            line-height: 1rem;
        }
        .head .right {
            float: right;
            line-height: 3.2rem;
            padding: 0 0.8rem;
        }
        form {
            padding: 0 0.8rem;
            .reply-to {
                padding: 0.6em;
                font-size: 0.875rem;
                background-color: #ff6500;
                border-radius: 0.2rem;
                color: rgba(255, 255, 255, 0.85);
                margin-bottom: 0.6rem;
                line-height: 1.4em;
                a {
                    color: #fff;
                    text-decoration: none;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
            textarea {
                margin-bottom: 0.6rem;
                overflow: hidden;
            }
            input.data-input {
                font-size: 0.875rem;
                padding: 0.5em 0.4em;
            }
            input[type="submit"] {
                font-size: 0.875rem;
                border-radius: 0.2rem;
            }
            .options {
                display: block;
                padding: 0;
                padding-bottom: 0.6rem;
                @media (min-width: $mobile) {
                    display: inline-block;
                    padding: 0;
                    padding-left: 1rem;
                }
                label {
                    margin-left: 0.5em;
                }
            }
        }
    }
}
</style>

<script lang="ts">
/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Store from '@/store/index';
import getAuthObject from '@/lib/getAuthObject';
import base64url from 'base64url';
import axios from 'axios';
import { IPostQueryResults } from 'pomment-common/dist/interface/post';

declare module 'vue/types/vue' {
    interface Vue {
        id: number;
        url: string;
        post: IPostQueryResults;
        noSubmit: boolean;
        submitDisplay: string;
    }
}

export default Vue.extend({
    data() {
        return {
            id: 0,
            url: '',
            post: {},
            noSubmit: false,
            submitDisplay: 'Submit',
        };
    },
    methods: {
        updateHeight() {
            const element = (this.$refs.commentBox as HTMLTextAreaElement);
            element.style.height = '0px';
            element.style.height = `${Math.max(this.minHeight, element.scrollHeight + 3)}px`;
        },
        editComment() {
            this.noSubmit = true;
            this.submitDisplay = 'Please Wait ...';
            axios.post(`${Store.state.url}/v3/manage/edit`, {
                auth: getAuthObject(Store.state.token),
                url: this.url,
                id: this.id,
                name: this.post.name,
                email: this.post.email,
                website: this.post.website,
                avatar: this.post.avatar,
                content: this.post.content,
                hidden: this.post.hidden,
            }).then(() => {
                this.$notify({
                    group: 'main',
                    title: 'Success',
                    type: 'success',
                    text: 'The comment is edited',
                });
                this.$router.push(this.backURL);
            }).catch((e) => {
                this.noSubmit = false;
                this.submitDisplay = 'Submit';
                this.$notify({
                    group: 'main',
                    title: 'Edit Post Failed',
                    type: 'error',
                    text: e,
                });
            });
        },
    },
    computed: {
        backURL() {
            return `/list/posts/${base64url.encode(this.url)}`;
        },
    },
    beforeRouteEnter(to, from, next) {
        axios.post(`${Store.state.url}/v3/manage/post`, {
            url: base64url.decode(to.params.threadURL),
            id: Number(to.params.id),
            auth: getAuthObject(Store.state.token),
        }).then((res) => {
            next((target) => {
                console.log(res);
                target.id = Number(to.params.id);
                target.url = base64url.decode(to.params.threadURL);
                target.post = res.data;
            });
        }).catch(() => {
            next(false);
        });
    },
    mounted() {
        // 可变高度文本框初始化
        const element = this.$refs.commentBox as HTMLTextAreaElement;
        element.style.height = '0px';
        element.value = '\n\n\n\n';
        this.minHeight = element.scrollHeight + 3;
        element.style.height = `${this.minHeight}px`;
        element.value = '';
    },
});
</script>
