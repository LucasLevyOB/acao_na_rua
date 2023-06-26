<script lang="ts" setup>
import { ref, computed } from 'vue';

type Props = {
    isVisible: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:isVisible']);

const loaded = ref(false);
const loading = ref(false);
const nome = "Nome";

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
    <div class="logo">
      <img src="../img/logo_1.png" alt="Logo" />
    </div>
    <div>
        <v-btn icon="mdi-menu" @click="toggleSidebar" />
    </div>
    <div class="pesquisa_geral">
      <v-text-field
        class="pesquisa_esp"
        :loading="loading"
        density="compact"
        variant="solo"
        label="Pesquisar"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
    </div>
    <div class="user-profile">
      <v-avatar color="#FFFFFF">
      <v-icon icon="mdi-account-circle"></v-icon>
      </v-avatar>
      <span>{{ nome }}</span>
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

.pesquisa_geral {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.pesquisa_esp{
  width: 100%;
  max-width: 450px;
  margin: auto;
}
.user-profile{
  display: flex;
}

.user-profile span {
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
.v-list .v-icon{
  color: white;
}

.v-list-item {
  color: #fff;
}
</style>