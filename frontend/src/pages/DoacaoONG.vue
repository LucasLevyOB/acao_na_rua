<script lang="ts" setup>
import { ref  } from 'vue';
import type { Ref } from 'vue';
import DoacoesService from '../services/DoacoesService';
import useToast from '../composables/toast';
import DataGrid from '../components/DataGrid/DataGrid.vue';
import ItemDoacao from '../models/ItemDoacao';
import useDayjs from '../composables/dayjs';
import type { CreateDoacaoPayload, EditDoacaoPayload } from '../services/DoacoesService';
import Doacao from '../models/Doacao';
import { onMounted } from 'vue';
import OngsService from '../services/OngsService';
import Ong from '../models/Ong';
import { useAuthStore } from '../modules/auth/stores/authStore';

const toast = useToast();
const dayjs = useDayjs();
const auth = useAuthStore();

const doacoesService = new DoacoesService();
const ongsService = new OngsService();

const form: Ref<CreateDoacaoPayload> = ref<CreateDoacaoPayload>({
  ong_id: '',
  doa_nome: '',
  doa_cpfcnpj: '',
  item_doacao: {
    itd_categoria: '',
    itd_nome: '',
    itd_quantidade: 0,
    itd_validade: dayjs().format('YYYY-MM-DD'),
  },
});
const formEdit: Ref<EditDoacaoPayload> = ref<EditDoacaoPayload>({
  doa_nome: '',
  doa_cpfcnpj: '',
  doa_data: '',
});
const dialog = ref(false);
const isEditMode = ref(false);
const dataGridRef = ref();
const btnEditIsLoading = ref(false);
const isEditing = ref(false);
const ongItems: Ref<Ong[]> = ref([]);

const openModalCreate = (item: ItemDoacao) => {
  isEditing.value = false;
  isEditMode.value = false;
  dialog.value = true;
  if (!item.itd_id) return;
  form.value = {
    ong_id: '',
    doa_cpfcnpj: '',
    doa_nome: '',
    item_doacao: {
      itd_categoria: '',
      itd_nome: '',
      itd_quantidade: 0,
      itd_validade: dayjs().format('YYYY-MM-DD'),
    },
  };
};

const openModalEdit = (item: Doacao) => {
  isEditing.value = true;
  isEditMode.value = true;
  dialog.value = true;
  if (!item.id_doacao) return;
  formEdit.value = {
    doa_nome: item.doa_nome,
    doa_cpfcnpj: item.doa_cpfcnpj,
    doa_data: item.doa_data,
  };
};

const createDoacao = async () => {
  btnEditIsLoading.value = true;
  const { doa_cpfcnpj, doa_nome, ong_id, item_doacao } = form.value;

  if (!ong_id || !doa_cpfcnpj || !doa_nome || !item_doacao.itd_categoria || !item_doacao.itd_nome || !item_doacao.itd_quantidade || !item_doacao.itd_validade) {
    toast.toastError('Preencha todos os campos obrigatórios');
    btnEditIsLoading.value = false;
    return;
  }

  const response = await doacoesService.createDoacao({ ong_id, doa_cpfcnpj, doa_nome, item_doacao });

  btnEditIsLoading.value = false;

  if (!response.success) {
    toast.toastError(response.message ? response.message : 'Erro ao criar doação');
    return;
  }

  toast.toastSuccess('Doação editada com sucesso');
  dialog.value = false;
  dataGridRef.value?.refresh();
};

const loadOngs = async () => {
  const response = auth.isAdmin ? await ongsService.getOngsByAdmin() : await ongsService.getOngsByVoluntario();
  if (!response.success || !response.data) {
    toast.toastError(response.message ? response.message : 'Erro ao carregar ONGs');
    return;
  }
  ongItems.value = response.data;
};

onMounted(async () => {
  await loadOngs();
});

</script>


<template>
  <DataGrid ref="dataGridRef" title="Doaçaõ para ONG" :api="new DoacoesService()" :loadHeaders="doacoesService.getHeaders" :loadItems="doacoesService.getDoacoes">
    <template #inBatchActions>
      <v-btn height="48" append-icon="mdi-plus-circle-outline" variant="text" @click="openModalCreate">
          Cadastrar Doação para ONG
      </v-btn>
    </template>
    <template #inlineActions="{item}">
        <v-btn icon="mdi-pencil-outline" color="#98A9BC" variant="text" @click="openModalEdit(item.columns as Doacao)"></v-btn>
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
          <span class="text-h5">Cadastrar Doação para ONG</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.item_doacao.itd_nome"
                  label="Nome do Item*"
                  required
                  :disabled="isEditMode"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.item_doacao.itd_quantidade"
                  label="Quantidade*"
                  type="number"
                  required
                  :disabled="isEditMode"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.item_doacao.itd_categoria"
                  label="Categoria*"
                  required
                  :disabled="isEditMode"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field v-model="form.item_doacao.itd_validade" type="date" label="Validade" :disabled="isEditMode"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.doa_nome"
                  label="Nome do Doador*"
                  required
                ></v-text-field>
              </v-col>
              <v-select
                v-model="form.ong_id"
                label="Selecionar ONG*"
                :items="ongItems"
                item-title="ong_nome"
                item-value="ong_id"
              ></v-select>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.doa_cpfcnpj"
                  label="CPF do Doador*"
                  required
                ></v-text-field>
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
            @click="createDoacao"
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
