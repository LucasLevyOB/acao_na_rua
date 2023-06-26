<script lang="ts" setup>
import { ref } from 'vue';

import Sidebar from '../components/Sidebar.vue';
import Menu2 from '../components/Menu2.vue';

const sidebarIsOpen = ref(false);

</script>

<template>
    <main class="default-layout">
        <Menu2 v-model:is-visible="sidebarIsOpen" />
        <Sidebar v-model:is-visible="sidebarIsOpen" />
        <div class="content">
            <slot />
        </div>
    </main>
</template>

<style scoped>
.default-layout {
    height: 100vh;
    width: 100vw;
}
</style>
