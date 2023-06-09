<script lang="ts" setup>
import { ref  } from 'vue';
import type { Ref } from 'vue';
import ItensDoadosService from '../services/ItensDoadosService';
import useToast from '../composables/toast';
import DataGrid from '../components/DataGrid/DataGrid.vue';
import ItemDoacao from '../models/ItemDoacao';
import useDayjs from '../composables/dayjs';

type FormData = {
  id: number;
  itd_nome: string;
  itd_quantidade: number;
  itd_categoria: string;
  itd_validade: string | null;
};

const toast = useToast();
const dayjs = useDayjs();

const itensDoadosService = new ItensDoadosService();

const form: Ref<FormData> = ref<FormData>({
  id: 0,
  itd_nome: '',
  itd_quantidade: 0,
  itd_categoria: '',
  itd_validade: null,
});
const dialog = ref(false);
const dataGridRef = ref();
const btnEditIsLoading = ref(false);

const openModalEdit = (item: ItemDoacao) => {
  dialog.value = true;
  if (!item.itd_id) return;
  form.value = {
    id: item.itd_id,
    itd_nome: item.itd_nome,
    itd_quantidade: item.itd_quantidade,
    itd_categoria: item.itd_categoria,
    itd_validade: dayjs(item.itd_validade).format('YYYY-MM-DD'),
  };
};

const editItemDoacao = async () => {
  btnEditIsLoading.value = true;
  const { id, itd_categoria, itd_nome, itd_quantidade, itd_validade } = form.value;

  if (!id || !itd_categoria || !itd_nome || !itd_quantidade || !itd_validade) {
    toast.toastError('Preencha todos os campos obrigatórios');
    btnEditIsLoading.value = false;
    return;
  }

  const response = await itensDoadosService.editItemDoacao(id, { itd_categoria, itd_nome, itd_quantidade, itd_validade });

  btnEditIsLoading.value = false;

  if (!response.success) {
    toast.toastError(response.message ? response.message : 'Erro ao editar item para doação');
    return;
  }

  toast.toastSuccess('Item para doação editado com sucesso');
  dialog.value = false;
  dataGridRef.value?.refresh();
};

const deleteItem = async (item: ItemDoacao) => {
  if (!item.itd_id) {
    return;
  }
  const response = await itensDoadosService.deleteItemDoacao(item.itd_id);

  if (!response.success) {
    toast.toastError(response.message ? response.message : 'Erro ao deletar item doação');
    return;
  }

  toast.toastSuccess('Item para doação deletado com sucess');
  dataGridRef.value?.refresh();
}

</script>


<template>
  <DataGrid ref="dataGridRef" title="Item Doado" :api="new ItensDoadosService()" :loadHeaders="itensDoadosService.getHeaders" :loadItems="itensDoadosService.getItensDoados">
    <template #inlineActions="{item}">
        <v-btn icon="mdi-pencil-outline" color="#98A9BC" variant="text" @click="openModalEdit(item.columns as ItemDoacao)"></v-btn>
        <v-btn icon="mdi-delete-outline" color="#98A9BC" variant="text" @click="deleteItem(item.columns as ItemDoacao)"></v-btn>
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
          <span class="text-h5">Editar Item para Doação</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.itd_nome"
                  label="Nome do Produto*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.itd_quantidade"
                  label="Quantidade*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
              cols="12"
              sm="6"
              >
                <v-text-field
                  v-model="form.itd_categoria"
                  label="Categoria*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field v-model="form.itd_validade" type="date" />
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
            :loading="btnEditIsLoading"
            @click="editItemDoacao"
          >
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style>

.vs
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
