<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';

import OngsService from '../services/OngsService';
import Ong from '../models/Ong';
import useToast from '../composables/toast';
import { onMounted } from 'vue';

const ongsService = new OngsService();
const toast = useToast();

const ongs: Ref<Ong[]> = ref([]);

const loadOngs = async () => {
  const response = await ongsService.getOngs();

  if (!response.success || !response.data) {
    toast.toastError('Erro ao carregar ONGs');
    return;
  }

  ongs.value = response.data;
};

onMounted(async () => {
  await loadOngs();
});

</script>

<template>
  <h2 class="page-title">ONGs</h2>
  <v-card class="mx-auto card-ong">
    <v-list lines="two">
      <v-list-item class="texto-lista-itens" v-for="ong in ongs" :key="ong.ong_id">
        <template v-slot:default>
          <v-avatar color="#8A2DD6">
            <v-icon color="white">mdi-charity</v-icon>
          </v-avatar>
          <div>
            <v-list-item-title class="file-title">{{ ong.ong_nome }}</v-list-item-title>
            <v-list-item-subtitle class="file-subtitle">{{ ong.ong_razao_social }}</v-list-item-subtitle>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style>
.v-list-item__content{
  gap: 8px;
  display: flex;
  width: 100%;
}
.card-ong {
  width: 100%;
  margin-top: 50px;
  max-width: 1200px;
}

.texto-lista-itens {
  box-shadow: 5px 3px 5px 0px rgba(0, 0, 0, 0.10);
  border-radius: 16px;
}

.file-title {
  color: #000 !important;
  font-size: 15px;
  font-family: Poppins;
  font-weight: 500;
  text-transform: capitalize;
}

.file-subtitle {
  color: #000;
  font-size: 12px;
  font-family: Poppins;
  font-weight: 500;
  text-transform: capitalize;
}

.page-title {
  display: flex;
  width: 100%;
  align-items: start;
  margin-top: 50px;
  margin-left: 155px;
  color: #000;
  font-size: 33.383px;
  font-family: Poppins;
  font-weight: 500;
  text-transform: capitalize;
}

/* Responsiveness */
@media (max-width: 768px) {
  .card-ong {
    margin: 10px;
    max-width: none;
  }

  .page-title {
    margin-left: 10px;
    margin-top: 10px;
    font-size: 24px;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 20px;
  }
}
</style>
