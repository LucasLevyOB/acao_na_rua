<script lang="ts" setup>
import { computed } from 'vue';

import useAuthService from "../modules/auth/composables/authService";
import { useAuthStore } from '../modules/auth/stores/authStore';
import { useRouter } from 'vue-router';

type Props = {
    isVisible: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:isVisible']);

const { authLogout } = useAuthService();
const authStore = useAuthStore();
const router = useRouter();

const isVisible = computed({
    get() {
        return props.isVisible;
    },
    set(value: boolean) {
        emit('update:isVisible', value);
    }
});

const goTo = (route: string) => {
    router.push(route);
}

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
            <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" @click="goTo('/')"></v-list-item>
            <v-list-item v-if="authStore.isLogged && authStore.isAdmin" prepend-icon="mdi-charity" title="ONG" value="ong" @click="goTo('/ongs')"></v-list-item>
            <v-list-item v-if="authStore.isLogged" prepend-icon="mdi-account"  title="Pessoas em Situação de Rua" value="pessoas em situação de rua" @click="goTo('/pessoa-situacao-rua')"></v-list-item>
            <v-list-item v-if="authStore.isLogged" prepend-icon="mdi-account-heart"  title="Ajuda Pessoa" value="ajuda pessoa" @click="goTo('/doacao-psr')"></v-list-item>
            <v-list-item v-if="authStore.isLogged && authStore.isAdmin" prepend-icon="mdi-account-supervisor" title="Voluntário" value="voluntário" @click="goTo('/voluntarios')"></v-list-item>
            <v-list-item v-if="authStore.isLogged" prepend-icon="mdi-archive" title="Item Doação" value="item doação" @click="goTo('/item-doacao')"></v-list-item>
            <v-list-item v-if="authStore.isLogged" prepend-icon="mdi-hand-coin" color="#fff" title="Doação" value="doação" @click="goTo('/doacao-ong')"></v-list-item>
            <v-list-item prepend-icon="mdi-help-circle" color="#fff" title="Sobre" value="sobre" @click="goTo('/sobre')"></v-list-item>
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