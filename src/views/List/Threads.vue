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
    background-color: #282828;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0.5em 0.5em 1em 1em;
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
