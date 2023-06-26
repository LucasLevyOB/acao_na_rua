<script lang="ts">
import { ref, computed,readonly  } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

export default {
  setup() {
    const loaded = ref(false);
    const loading = ref(false);
    const selectedItem = ref('');
    const nome = "Nome";

    const buttonText = computed(() => {
      return loading.value ? 'Carregando...' : 'Clique para carregar';
    });

    
    function onClick() {
      loading.value = true;

      setTimeout(() => {
        loading.value = false;
        loaded.value = true;
      }, 2000);
    }

    function selectItem(item) {
      selectedItem.value = item;
    }

    function handleAboutClick() {
      // Lógica para o clique no botão "Sobre"
    }

    function handleLogoutClick() {
      // Lógica para o clique no botão "Sair"
    }

    return {
      nome,
      loaded,
      loading,
      onClick,
      buttonText,
      selectedItem,
      selectItem,
      handleAboutClick,
      handleLogoutClick,
      search,
      headers: readonly(headers),
      desserts,
      itemKey,
    };
  }
}
</script>


<template>
  <div class="menu">
    <div class="logo">
      <img src="../img/logo_1.png" alt="Logo" />
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
  <div>  
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-charity" title="ONG" value="ong"></v-list-item>
          <v-list-item prepend-icon="mdi-account-heart"  title="Ajuda Pessoa" value="ajuda pessoa"></v-list-item>
          <v-list-item prepend-icon="mdi-account-supervisor" title="Voluntário" value="voluntário"></v-list-item>
          <v-list-item prepend-icon="mdi-archive" title="Item Doação" value="item doação"></v-list-item>
          <v-list-item prepend-icon="mdi-hand-coin" color="#fff" title="Doação" value="doação"></v-list-item>
          <v-list-item prepend-icon="mdi-help-circle" color="#fff" title="Sobre" value="sobre"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" color="#fff" title="Sair" value="sair"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
  <div>
    <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
  </div>
</template>

<style>
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
