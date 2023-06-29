<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../modules/auth/stores/authStore';

type Props = {
    isVisible: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:isVisible']);

const loaded = ref(false);
const loading = ref(false);
const authStore = useAuthStore();

function onClick() {
    loading.value = true;

    setTimeout(() => {
    loading.value = false;
    loaded.value = true;
    }, 2000);
}

const isVisible = computed({
    get() {
        return props.isVisible;
    },
    set(value: boolean) {
        emit('update:isVisible', value);
    }
});

const toggleSidebar = () => {
    isVisible.value = !isVisible.value;
}

</script>


<template>
    <div class="menu">
    <v-btn icon="mdi-menu" variant="text" color="white" @click="toggleSidebar"/>
    <div class="logo">
      <img src="../img/logo_1.png" alt="Logo" />
    </div>
    <div v-if="authStore.isLogged" class="user-profile">
      <v-avatar color="#FFFFFF">
      <v-icon icon="mdi-account-circle"></v-icon>
      </v-avatar>
      <span>{{ authStore.auth.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 10px;
  background: #8A2DD6;
  box-shadow: 4px 0px 9px 0px rgba(0, 0, 0, 0.25);
}

.logo img {
  height: 40px;
}
.user-profile{
  display: flex;
}

.user-profile span {
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 75px;
  color: #fff;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
}

.v-navigation-drawer{
  background-color: #8A2DD6;
  margin-top: 4.4%;

}

</style>