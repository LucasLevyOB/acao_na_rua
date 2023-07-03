<script lang="ts" setup>
import { ref } from 'vue';

import Sidebar from '../components/Sidebar.vue';
import Menu2 from '../components/Menu2.vue';
import {useRouter} from 'vue-router';
import { computed } from 'vue';

const sidebarIsOpen = ref(false);
const router = useRouter();

router.getRoutes();
router.currentRoute;


const removeMenu = computed(()=>{
    const loginRoute = '/login';
    const boasVindasRoute = '/boas-vindas';
    const currentPath = router.currentRoute.value.path;
    return currentPath !== loginRoute && currentPath !== boasVindasRoute;
})

</script>

<template>
    <main class="default-layout">
        <Menu2 v-if="removeMenu" v-model:is-visible="sidebarIsOpen" />
        <Sidebar v-if="removeMenu" v-model:is-visible="sidebarIsOpen" />
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
