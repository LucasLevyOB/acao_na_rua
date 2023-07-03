<script lang="ts" setup>
import { ref  } from 'vue';
import type { Ref } from 'vue';
import ItensDoadosService from '../services/ItensDoadosService';
import useToast from '../composables/toast';
import DataGrid from '../components/DataGrid/DataGrid.vue';
import PsrService from '../services/PsrService';

type SexoOptions = {
  text: string;
  value: string;
};

type FormData = {
  pes_nome: string;
  pes_data_nasc: Date;
  pes_sexo: string;
};


const toast = useToast();

const psrService = new PsrService();

const form: Ref<FormData> = ref<FormData>({
  pes_nome: '',
  pes_data_nasc: new Date(),
  pes_sexo: '0',
});
const dialog = ref(false);
const dataGridRef = ref();
const btnEditIsLoading = ref(false);
const sexoOptions = ref<SexoOptions[]>([
  { text: 'Masculino', value: '0' },
  { text: 'Feminino', value: '1' },
  { text: 'Prefiro não informar', value: '2' },
]);

const openModalCreate = () => {
  dialog.value = true;
};

const createPSR = async () => {
  btnEditIsLoading.value = true;
  const { pes_data_nasc, pes_nome, pes_sexo } = form.value;

  if (!pes_data_nasc || !pes_nome || !pes_sexo) {
    toast.toastError('Preencha todos os campos obrigatórios');
    btnEditIsLoading.value = false;
    return;
  }

  const response = await psrService.createPsr({ pes_data_nasc, pes_nome, pes_sexo: parseInt(pes_sexo) });

  btnEditIsLoading.value = false;

  if (!response.success) {
    toast.toastError(response.message ? response.message : 'Erro ao criar Pessoa em Situação de Rua');
    return;
  }

  toast.toastSuccess('Pesoa em Situação de Rua criada com sucesso');
  dialog.value = false;
  dataGridRef.value?.refresh();
};

</script>


<template>
  <DataGrid ref="dataGridRef" title="Pessaoa em Situação de Rua" :api="new ItensDoadosService()" :loadHeaders="psrService.getHeaders" :loadItems="psrService.getPsr">
    <template #inBatchActions>
      <v-btn height="48" append-icon="mdi-plus-circle-outline" variant="text" @click="openModalCreate">
          Cadastrar Pessoa em Situação de Rua
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
          <span class="text-h5">Cadastrar Pessoa em Sitaução de Rua</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.pes_nome"
                  label="Nome da Pessoa em Situação de Rua*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
              cols="12"
              sm="6"
              >
              <v-select
                v-model="form.pes_sexo"
                :items="sexoOptions"
                item-title="text"
                item-value="value"
                label="Items"
                solo color="#000"
              ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field v-model="form.pes_data_nasc" type="date" />
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
            @click="createPSR"
          >
            Cadastrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style>

.v-list .v-list-item--active .v-list-item-title{
  color: #000 !important;
}

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
