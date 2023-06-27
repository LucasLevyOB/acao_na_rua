<script lang="ts" setup>
import { ref  } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const search = ref('');
const headers = [
      {
        align: 'start',
        key: 'nome',
        sortable: false,
        title: 'Nome',
      },
      { key: 'razaoSocial', title: 'Razão Social' },
      { key: 'action', title: 'Ação' },
    ];
    const desserts = [
      {
        nome: 'Item 1',
        razaoSocial: 'Razão Social 1',
      },
      {
        nome: 'Item 2',
        razaoSocial: 'Razão Social 2',
      },
      {
        nome: 'Item 3',
        razaoSocial: 'Razão Social 3',
      },
    ];

    function editItem(item) {
      // Lógica para editar o item
    }

    function deleteItem(item) {
      // Lógica para deletar o item
    }

</script>


<template>
  <div class="tabela">
    <v-card>
    <v-card-title>
      ONGs
      <v-spacer></v-spacer>
      <v-btn height="48" append-icon="mdi-plus-circle-outline" variant="text">
        Cadastrar ONG
      </v-btn>
      <v-btn height="48" append-icon="mdi-download-outline" variant="text">
        Exportar
      </v-btn>
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
    >
    <template v-slot:item.action="{ item }">
      <div>
        <v-btn icon="mdi-pencil" @click="editItem(item)" variant="text"></v-btn>
        <v-btn icon="mdi-delete" @click="deleteItem(item)" variant="text"></v-btn>
      </div>
    </template>
  </v-data-table>
  </v-card>
  </div>
</template>

<style>
body{
  background-color: #F9F8FE;
}

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

.tabela{
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin:50px 50px 30px;
}
</style>
