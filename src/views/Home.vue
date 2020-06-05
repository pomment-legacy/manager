<template>
    <div class="home">
        <HelloWorld msg="土豆大王真是太伟大了！！！"/>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'Home',
    components: {
        HelloWorld,
    },
};
</script>
