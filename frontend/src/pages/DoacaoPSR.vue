<script lang="ts" setup>
import { onMounted, ref  } from 'vue';
import type { Ref } from 'vue';
import ItensDoadosService from '../services/ItensDoadosService';
import useToast from '../composables/toast';
import DataGrid from '../components/DataGrid/DataGrid.vue';
import ItemDoacao from '../models/ItemDoacao';
import useDayjs from '../composables/dayjs';
import AjudasService from '../services/AjudasService';
import Ajuda from '../models/Ajuda';
import OngsService from '../services/OngsService';
import Ong from '../models/Ong';
import PsrService from '../services/PsrService';
import PessoaSituacaoRua from '../models/PessoaSituacaoRua';

type FormData = {
  ong_id: string,
  pes_id: string,
  itd_id: string,
  ajd_qtde_item: number,
  ajd_data: string
};

const toast = useToast();
const dayjs = useDayjs();

const ajudasService = new AjudasService();
const ongsService = new OngsService();
const itensDoadosService = new ItensDoadosService();
const psrService = new PsrService();

const form: Ref<FormData> = ref<FormData>({
  ajd_data: '',
  ajd_qtde_item: 0,
  itd_id: '',
  ong_id: '',
  pes_id: ''
});
const dialog = ref(false);
const isEditMode = ref(false);
const isEditing = ref(false);
const dataGridRef = ref();
const btnEditIsLoading = ref(false);
const ongItems: Ref<Ong[]> = ref([]);
const itemsDoacao: Ref<ItemDoacao[]> = ref([]);
const psrItems: Ref<PessoaSituacaoRua[]> = ref([]);
const ajudaEditId = ref(0);

const openModalCreate = () => {
  isEditing.value = false;
  isEditMode.value = false;
  dialog.value = true;
  console.log(form.value.ong_id)
  form.value = {
    ajd_data: '',
    ajd_qtde_item: 0,
    itd_id: '',
    ong_id: '',
    pes_id: ''
  };
};

const openModalEdit = (item: Ajuda) => {
  isEditing.value = true;
  isEditMode.value = true;
  dialog.value = true;
  console.log(item)
  if (!item.ajd_id) return;
  ajudaEditId.value = item.ajd_id;
  form.value = {
    ajd_data: item.ajd_data.toString(),
    ajd_qtde_item: item.ajd_qtde_item,
    itd_id: item.itd_id.toString(),
    ong_id: item.ong_id.toString(),
    pes_id: item.pes_id.toString()
  };
};

const createAjuda = async () => {
  btnEditIsLoading.value = true;
  const { ajd_data, ajd_qtde_item, itd_id, ong_id, pes_id } = form.value;

  if (!ajd_data || !ajd_qtde_item || !itd_id || !ong_id || !pes_id) {
    toast.toastError('Preencha todos os campos obrigatórios');
    btnEditIsLoading.value = false;
    return;
  }

  const response = await ajudasService.createAjuda({ ajd_data, ajd_qtde_item, itd_id: parseInt(itd_id), ong_id: parseInt(ong_id), pes_id: parseInt(pes_id) });

  btnEditIsLoading.value = false;

  if (!response.success) {
    toast.toastError(response.message ? response.message : 'Erro ao criar ajuda');
    return;
  }

  toast.toastSuccess('Ajuda criada com sucesso');
  dialog.value = false;
  dataGridRef.value?.refresh();
};

const editAjuda = async () => {
  btnEditIsLoading.value = true;
  const { ajd_data, ajd_qtde_item, itd_id, ong_id, pes_id } = form.value;

  if (!ajd_data || !ajd_qtde_item || !itd_id || !ong_id || !pes_id || !ajudaEditId.value) {
    toast.toastError('Preencha todos os campos obrigatórios');
    btnEditIsLoading.value = false;
    return;
  }

  const response = await ajudasService.editAjuda(ajudaEditId.value, { ajd_data, ajd_qtde_item, itd_id: parseInt(itd_id), ong_id: parseInt(ong_id), pes_id: parseInt(pes_id) });

  btnEditIsLoading.value = false;

  if (!response.success) {
    toast.toastError(response.message ? response.message : 'Erro ao editar ajuda');
    return;
  }

  toast.toastSuccess('Ajuda editada com sucesso');
  dialog.value = false;
  dataGridRef.value?.refresh();
};

const callModalAction = async () => {
  if (isEditMode.value) {
    await editAjuda();
    return;
  }
  await createAjuda();
}

const deleteAjuda = async (item: Ajuda) => {
  if (!item.ajd_id) {
    return;
  }
  const response = await ajudasService.deleteAjuda(item.ajd_id);

  if (!response.success) {
    toast.toastError(response.message ? response.message : 'Erro ao deletar ajuda');
    return;
  }

  toast.toastSuccess('Ajuda deletada com sucesso');
  dataGridRef.value?.refresh();
}

const loadOngs = async () => {
  const response = await ongsService.getOngsByAdmin();
  if (!response.success || !response.data) {
    toast.toastError(response.message ? response.message : 'Erro ao carregar ONGs');
    return;
  }
  ongItems.value = response.data;
};

const loadItensDoados = async () => {
  const response = await itensDoadosService.getItensDoados();
  if (!response.success || !response.data) {
    toast.toastError(response.message ? response.message : 'Erro ao carregar ONGs');
    return;
  }
  itemsDoacao.value = response.data;
};

const loadPsr = async () => {
  const response = await psrService.getPsr();
  if (!response.success || !response.data) {
    toast.toastError(response.message ? response.message : 'Erro ao carregar ONGs');
    return;
  }
  psrItems.value = response.data;
};

onMounted(async () => {
  await loadOngs();
  await loadItensDoados();
  await loadPsr();
});

</script>


<template>
  <DataGrid ref="dataGridRef" title="Doaçaõ para Pessoa em Situação de Rua" :api="new ItensDoadosService()" :loadHeaders="ajudasService.getHeaders" :loadItems="ajudasService.getAjudas">
    <template #inBatchActions>
      <v-btn height="48" append-icon="mdi-plus-circle-outline" variant="text" @click="openModalCreate">
          Cadastrar Doação para Pessoa em Situação de Rua
      </v-btn>
    </template>
    <template #inlineActions="{item}">
        <v-btn icon="mdi-pencil-outline" color="#98A9BC" variant="text" @click="openModalEdit(item.columns as Ajuda)"></v-btn>
        <v-btn icon="mdi-delete-outline" color="#98A9BC" variant="text" @click="deleteAjuda(item.columns as Ajuda)"></v-btn>
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
          <span class="text-h5">{{ isEditing ? 'Editar' : 'Criar' }} Doação para Pessoa em Situação de Rua</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- Adicionar nas opções as ONGs cadastradas no banco -->
                <v-select
                  :items="ongItems"
                  item-title="ong_nome"
                  item-value="ong_id"
                  v-model="form.ong_id"
                  label="ONG*"
                  required
                  :disabled="isEditMode"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="psrItems"
                  item-title="pes_nome"
                  item-value="pes_id"
                  v-model="form.pes_id"
                  label="Nome da Pessoa em Situação de Rua*"
                  required
                  :disabled="isEditMode"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="itemsDoacao"
                  item-title="itd_nome"
                  item-value="itd_id"
                  v-model="form.itd_id"
                  label="Item*"
                  required
                  :disabled="isEditMode"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.ajd_qtde_item"
                  label="Quantidade de itens*"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field v-model="form.ajd_data" type="date" label="Data"/>
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
            @click="callModalAction"
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
