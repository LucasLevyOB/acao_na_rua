<script lang="ts" setup>
import { ref  } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const search = ref('');
const dialog = ref(false);
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
    <v-card-title class="titulo-tabela">
      ONGs
      <v-spacer></v-spacer>
      <div class="btn-cad-exp">
        <v-btn height="48" append-icon="mdi-plus-circle-outline" variant="text">
        Cadastrar ONG
      </v-btn>
      <v-btn height="48" append-icon="mdi-download-outline" variant="text">
        Exportar
      </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
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
        <v-btn icon="mdi-pencil-outline" color="#98A9BC" @click="editItem(item)" variant="text"></v-btn>
        <v-btn icon="mdi-delete-outline" color="#98A9BC" @click="deleteItem(item)" variant="text"></v-btn>
    </template>
    </v-data-table>
  </v-card>
  </div>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">ONG</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome da ONG*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Razão Social*"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*Indicadores de campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="outlined"
            @click="dialog = false"
          >
            Fechar
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            @click="dialog = false"
          >
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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

.btn-cad-exp{
  color: #778CA2;
  font-size: 12px;
  font-family: Rubik;
  font-weight: 700;
  line-height: 16px;
}
.titulo-tabela{
  color: #000;
  font-size: 33.383px;
  font-family: Poppins;
  font-weight: 500;
  text-transform: capitalize;
}

.v-card{
  background-color: #F9F8FE;
}
</style>
