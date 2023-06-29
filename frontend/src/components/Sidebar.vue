<script lang="ts" setup>
import { computed } from 'vue';

import useAuthService from "../modules/auth/composables/authService";
import { useAuthStore } from '../modules/auth/stores/authStore';

type Props = {
    isVisible: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:isVisible']);

const isVisible = computed({
    get() {
        return props.isVisible;
    },
    set(value: boolean) {
        emit('update:isVisible', value);
    }
});

const { authLogout } = useAuthService();
const authStore = useAuthStore();

</script>


<template>
    <v-layout>
        <v-navigation-drawer
        v-model="isVisible"
        expand-on-hover
        rail
        permanent
        >
        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"></v-list-item>
            <v-list-item v-if="authStore.isLogged && authStore.isAdmin" prepend-icon="mdi-charity" title="ONG" value="ong"></v-list-item>
            <v-list-item v-if="authStore.isLogged" prepend-icon="mdi-account-heart"  title="Ajuda Pessoa" value="ajuda pessoa"></v-list-item>
            <v-list-item v-if="authStore.isLogged" prepend-icon="mdi-account-supervisor" title="Voluntário" value="voluntário"></v-list-item>
            <v-list-item v-if="authStore.isLogged" prepend-icon="mdi-archive" title="Item Doação" value="item doação"></v-list-item>
            <v-list-item v-if="authStore.isLogged" prepend-icon="mdi-hand-coin" color="#fff" title="Doação" value="doação"></v-list-item>
            <v-list-item prepend-icon="mdi-help-circle" color="#fff" title="Sobre" value="sobre"></v-list-item>
            <v-list-item v-if="authStore.isLogged" prepend-icon="mdi-logout" color="#fff" title="Sair" value="sair" @click="authLogout"></v-list-item>
        </v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<style>
.v-navigation-drawer{
  background-color: #8A2DD6;
  margin-top: 60px !important;
  height: calc(100% - 60px) !important;

}
.v-list .v-icon{
  color: white;
}

.v-list-item__content .v-list-item-title {
  color: #fff;
}

</style>