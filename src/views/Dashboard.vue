<template>
    <div>
        <h1>You logged in!</h1>
        <p>Token: {{ token }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            token: this.$store.state.token,
        };
    },
});
</script>
