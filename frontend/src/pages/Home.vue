<script lang="ts" setup>
import { ref  } from 'vue';
import type { Ref } from 'vue';
import ItensDoadosService from '../services/ItensDoadosService';
import { useAuthStore } from "../modules/auth/stores/authStore";
import useToast from '../composables/toast';
import DataGrid from '../components/DataGrid/DataGrid.vue';

type FormData = {
  nome: string;
  razaoSocial: string;
};

const date = ref(null);

const authStore = useAuthStore();
const toast = useToast();

const itensDoadosService = new ItensDoadosService();

const form: Ref<FormData> = ref<FormData>({
  nome: '',
  razaoSocial: '',
});
const dialog = ref(false);
const isEditing = ref(false);
const dataGridRef = ref();

const openModalCreate = () => {
  isEditing.value = false;
  form.value.nome = '';
  form.value.razaoSocial = '';
  dialog.value = true;
};

const openModalEdit = () => {
  isEditing.value = true;
  form.value.nome = '';
  form.value.razaoSocial = '';
  dialog.value = true;
};

const createOng = async () => {
  if (!form.value.nome || !form.value.razaoSocial || !authStore.auth.id || !authStore.auth?.email) {
    return;
  }

  // const response = await ongsService.createOng({ ong_nome: form.value.nome, ong_razao_social: form.value.razaoSocial, adm_id: authStore.auth.id });
  
  // if (!response.success || !response?.data?.ong_id) {
  //   toast.toastError('Erro ao criar ONG');
  //   return;
  // }

  // toast.toastSuccess('ONG criada com sucesso');

  // dialog.value = false;

  // dataGridRef.value?.refresh();
};

</script>


<template>
  <DataGrid ref="dataGridRef" title="Item Doado" :api="new ItensDoadosService()" :loadHeaders="itensDoadosService.getHeaders" :loadItems="itensDoadosService.getItensDoados">
    <template #inBatchActions>
      <v-btn height="48" append-icon="mdi-plus-circle-outline" variant="text" @click="openModalCreate">
          Cadastrar Item para Doação
      </v-btn>
    </template>
    <template #inlineActions="{item}">
        <v-btn icon="mdi-pencil-outline" color="#98A9BC" variant="text" @click="openModalEdit"></v-btn>
        <v-btn icon="mdi-delete-outline" color="#98A9BC" variant="text"></v-btn>
    </template>
  </DataGrid>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Editar' : 'Cadastrar' }} Item para Doação</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nome"
                  label="Nome do Produto*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.razaoSocial"
                  label="Quantidade*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Categoria*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field v-model="date" type="date" />
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
            @click="createOng"
          >
            {{ isEditing ? 'Editar' : 'Criar' }}
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
