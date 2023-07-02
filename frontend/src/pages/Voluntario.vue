<script lang="ts" setup>
import { ref  } from 'vue';
import type { Ref } from 'vue';
import VoluntariosService from '../services/VoluntariosService';
import useToast from '../composables/toast';
import DataGrid from '../components/DataGrid/DataGrid.vue';
import OngsService from '../services/OngsService';
import Ong from '../models/Ong';
import { onMounted } from 'vue';

type FormData = {
  vol_cpf: string,
  vol_nome: string,
  vol_senha: string,
  vol_setor: string,
  ong_id: string
};

const toast = useToast();

const voluntariosService = new VoluntariosService();
const ongsService = new OngsService();

const form: Ref<FormData> = ref<FormData>({
  vol_cpf: '',
  vol_nome: '',
  vol_senha: '',
  vol_setor: '',
  ong_id: ''
});
const ongItems: Ref<Ong[]> = ref([]);
const dialog = ref(false);
const dataGridRef = ref();
const btnCreateIsLoading = ref(false);

const openModalCreate = () => {
  dialog.value = true;
};

const createVoluntario = async () => {
  btnCreateIsLoading.value = true;
  const { ong_id, vol_cpf, vol_nome, vol_senha, vol_setor } = form.value;

  if (!ong_id || !vol_cpf || !vol_nome || !vol_senha || !vol_setor) {
    toast.toastError('Preencha todos os campos obrigatórios');
    btnCreateIsLoading.value = false;
    return;
  }

  const response = await voluntariosService.createVoluntario({ ong_id: parseInt(ong_id), vol_cpf, vol_nome, vol_senha, vol_setor });

  btnCreateIsLoading.value = false;

  if (!response.success) {
    toast.toastError(response.message ? response.message : 'Erro ao cadastrar voluntário');
    return;
  }

  toast.toastSuccess('Voluntário cadastrado com sucesso');
  dialog.value = false;
  dataGridRef.value?.refresh();
};

const loadOngs = async () => {
  const response = await ongsService.getOngs();
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
  <DataGrid ref="dataGridRef" title="Voluntário" :api="new VoluntariosService()" :loadHeaders="voluntariosService.getHeaders" :loadItems="voluntariosService.getVoluntarios">
    <template #inBatchActions>
      <v-btn height="48" append-icon="mdi-plus-circle-outline" variant="text" @click="openModalCreate">
          Cadastrar Voluntário
      </v-btn>
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
          <span class="text-h5">Cadastrar Voluntário</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.vol_nome"
                  label="Nome do Voluntário*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.vol_cpf"
                  label="CPF*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.vol_senha"
                  label="Senha*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.vol_setor"
                  label="Setor*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              <v-select
                v-model="form.ong_id"
                label="Selecionar ONG*"
                :items="ongItems"
                item-title="ong_nome"
                item-value="ong_id"
              ></v-select>
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
            :loading="btnCreateIsLoading"
            @click="createVoluntario"
          >
            Cadastrar
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
