<template>
    <div class="section-outer">
        <ul>
            <ThreadItem
            v-for="thread in threads"
            :title="thread.title"
            :url="thread.url"
            :amount="thread.amount"
            :latestPostAt="thread.latestPostAt"
            :key="thread.url"
            />
        </ul>
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
    ul {
        margin: 0;
        padding: 0;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import ThreadItem from '@/components/ThreadItem.vue';

export default Vue.extend({
    data() {
        return {
            threads: this.$store.state.threads,
        };
    },
    components: {
        ThreadItem,
    },
});
</script>
