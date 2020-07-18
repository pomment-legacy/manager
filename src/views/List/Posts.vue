<template>
    <div>
        <div class="section-outer">
            <header>
                <label for="post-title" style="display: none">Title: </label>
                <input
                    id="post-title"
                    class="title"
                    type="text"
                    placeholder="Title"
                    v-model="thread.attr.title"
                    v-on:focus="setPrevTitle"
                    v-on:blur="updateTitle">
                <div class="padder">
                    <div class="meta desc">
                        {{ thread.attr.amount }} Replies (Since {{ latestPosted }})
                    </div>
                    <ul class="meta thread-option">
                        <li><router-link to="/list/threads">Back</router-link></li>
                        <li>
                            <a
                            href="#"
                            v-on:click.prevent="toggleLock"
                            :class="{ disabled: isToggling }">
                                {{ lockStatus }}
                            </a>
                        </li>
                        <li><a :href="thread.url" target="_blank">Original</a></li>
                    </ul>
                </div>
            </header>
        </div>
        <div :class="{
            'section-outer': true,
            compose: true,
            'allow-sticky': allowSticky,
            sticky: stickyCompose,
        }" ref="compose" v-scroll="toggleSticky">
            <h2>Add new comment</h2>
            <form v-on:submit.prevent="addComment">
                <div class="reply-to" v-if="this.replyID >= 0">
                    You are repling {{ replyName }}'s comment.&nbsp;
                    <a href="#" v-on:click.prevent="setReplyTarget(-1)">Cancel</a>
                </div>
                <textarea
                placeholder="Input your comment here ..."
                ref="commentBox"
                v-model="content"
                v-on:input="updateHeight"
                required />
                <input
                    type="submit"
                    value="Submit"
                    v-model="submitDisplay"
                    v-bind:disabled="noSubmit">
                <div class="options" v-if="stickySupport">
                    <input id="enable-sticky" type="checkbox" class="switch" v-model="allowSticky">
                    <label for="enable-sticky">Stick Form</label>
                </div>
            </form>
        </div>
        <div class="section-outer comments">
            <ul class="comment-items">
                <PostItem
                    v-for="post in thread.content"
                    v-on:reply="setReplyTarget"
                    :id="post.id"
                    :name="post.name"
                    :content="post.content"
                    :email="post.email"
                    :avatar="post.avatar"
                    :website="post.website"
                    :byAdmin="post.byAdmin"
                    :hidden="post.hidden"
                    :createdAt="post.createdAt"
                    :isActive="replyID === post.id"
                    :key="post.id" />
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$mobile: 480px;
$stickyTop: 3.5rem + 0.8rem;

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
    header {
        .title {
            $lineHeight: 2.4rem;
            line-height: $lineHeight;
            padding: 0.4rem 0.8rem;
            margin: 0;
            margin-bottom: 0.6rem;
            border-radius: 0.5rem 0.5rem 0 0;
            box-sizing: border-box;
            font-size: 1.4rem;
            color: var(--text);
            @media (min-width: 640px) {
                $lineHeight: 4rem;
                line-height: $lineHeight;
                font-size: 2rem;
            }
        }
        input.title {
            appearance: none;
            width: 100%;
            border: 0;
            background-color: var(--inputTitle);
            font-weight: bold;
            &:focus {
                outline: none;
            }
        }
        .padder {
            padding: 0 0.8rem;
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
                a.disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                    pointer-events: none;
                }
            }
        }
    }
    section.status {
        background-color: var(--status);
        padding: 0.6rem 0.8rem;
        font-size: 0.875rem;
    }
    &.comments, &.compose {
        margin-top: 1rem;
    }
    &.compose {
        z-index: 3500;
        transition: box-shadow 0.2s;
        &.allow-sticky {
            position: sticky;
            top: $stickyTop;
            &.sticky {
                box-shadow: var(--shadowFocus);
            }
        }
        h2 {
            margin: 0;
            padding: 0.8rem 0.8rem;
            font-size: 1.2rem;
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
    &.comments {
        z-index: 3000;
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
        isToggling: boolean;
        prevTitle: string;
        minHeight: number;
        noSubmit: boolean;
        submitDisplay: string;
        content: string;
        replyID: number;
        replyName: string;
        stickySupport: boolean;
        stickyCompose: boolean;
        allowSticky: boolean;
    }
}

export default Vue.extend({
    data() {
        return {
            actualTitle: '',
            thread: {
                url: '',
                attr: {},
                locked: false,
                content: [],
                prevTitle: '',
            },
            isToggling: false,
            minHeight: 0,
            noSubmit: false,
            submitDisplay: 'Submit',
            content: '',
            replyID: -1,
            replyName: '',
            stickySupport: CSS.supports ? CSS.supports('position', 'sticky') : false,
            stickyCompose: false,
            allowSticky: true,
        };
    },
    methods: {
        toggleSticky() {
            if (this.stickySupport && this.allowSticky) {
                const stickyElm = this.$refs.compose as HTMLDivElement;
                const current = Math.round(stickyElm.getBoundingClientRect().top);
                const target = parseFloat(getComputedStyle(stickyElm).top);
                this.stickyCompose = current - 1 <= target;
            }
        },
        toggleLock() {
            if (this.isToggling) {
                return;
            }
            this.isToggling = true;
            axios.post(`${Store.state.url}/v3/manage/lock`, {
                auth: getAuthObject(Store.state.token),
                url: this.thread.url,
                locked: !this.thread.locked,
            }).then(() => {
                this.thread.locked = !this.thread.locked;
                this.isToggling = false;
                this.$notify({
                    group: 'main',
                    title: 'Success',
                    type: 'success',
                    text: 'Lock status toggled',
                });
            }).catch((e) => {
                this.$notify({
                    group: 'main',
                    title: 'Toggle Lock Failed',
                    type: 'error',
                    text: e,
                });
                this.isToggling = false;
            });
        },
        setPrevTitle() {
            this.prevTitle = this.thread.attr.title;
        },
        updateTitle() {
            if (this.prevTitle === this.thread.attr.title) {
                return;
            }
            axios.post(`${Store.state.url}/v3/manage/edit-title`, {
                auth: getAuthObject(Store.state.token),
                url: this.thread.url,
                title: this.thread.attr.title,
            }).then(() => {
                this.$store.commit('setThreadTitle', {
                    url: this.thread.url,
                    title: this.thread.attr.title,
                });
                this.$notify({
                    group: 'main',
                    title: 'Thread Updated',
                    type: 'success',
                    text: 'The title of this thread is updated',
                });
            }).catch((e) => {
                this.$notify({
                    group: 'main',
                    title: 'Thread Update Failed',
                    type: 'error',
                    text: e,
                });
                this.isToggling = false;
            });
        },
        updateHeight() {
            const element = (this.$refs.commentBox as HTMLTextAreaElement);
            element.style.height = '0px';
            element.style.height = `${Math.max(this.minHeight, element.scrollHeight + 3)}px`;
        },
        addComment() {
            this.noSubmit = true;
            this.submitDisplay = 'Please Wait ...';
            axios.post(`${Store.state.url}/v3/manage/submit`, {
                auth: getAuthObject(Store.state.token),
                url: this.thread.url,
                title: this.thread.attr.title,
                parent: this.replyID,
                content: this.content,
            }).then((e) => {
                this.thread.content.push(e.data);
                this.noSubmit = false;
                this.submitDisplay = 'Submit';
                this.$notify({
                    group: 'main',
                    title: 'Success',
                    type: 'success',
                    text: 'Your comment is posted',
                });
            }).catch((e) => {
                this.noSubmit = false;
                this.submitDisplay = 'Submit';
                this.$notify({
                    group: 'main',
                    title: 'Comment Post Failed',
                    type: 'error',
                    text: e,
                });
            });
        },
        setReplyTarget(id: number, name: string) {
            this.replyID = id;
            this.replyName = name;
        },
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
            return moment(this.thread.attr.latestPostAt).format('MMM Do, YYYY');
        },
        lockStatus() {
            return this.thread.locked ? 'Unlock' : 'Lock';
        },
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
    components: {
        PostItem,
    },
});
</script>
