<script lang="ts" setup generic="T">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

import useToast from '../../composables/toast';
import type { TableHeader, BaseAPIResponse } from '../../types';
import type BaseAPI from '../../services/BaseAPI';

type Props = {
    title: string;
    api: BaseAPI,
    loadHeaders: () => Promise<TableHeader[]>;
    loadItems: () => Promise<BaseAPIResponse<T[]>>;
}

const props = defineProps<Props>();

const headers: Ref<TableHeader[]> = ref([]);
const items: Ref<T[]> = ref([]);
const search = ref('');
const toast = useToast();
const isLoading = ref(false);

const loadHeaders = async () => {
    const response = await props.loadHeaders.call(props.api);
    
    headers.value = response;
};

const loadItems = async () => {
    const response = await props.loadItems.call(props.api);
    
    if (!response.success || !response.data) {
        toast.toastError(response.message);
        return;
    }

    items.value = response.data;
};

const refresh = async () => {
    await loadItems();
};

onMounted(async () => {
    isLoading.value = true;
    await loadHeaders();
    await loadItems();
    isLoading.value = false;
});

defineExpose({
    refresh,
});

</script>

<template>
    <div class="tabela">
        <v-card>
            <v-card-title class="titulo-tabela">
                {{ props.title }}
                <v-spacer></v-spacer>
                <div class="btn-cad-exp">
                    <slot name="inBatchActions"></slot>
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
            :items="items"
            :search="search"
            >
                <template v-slot:item.action="{ item }">
                    <slot name="inlineActions" :item="item"></slot>
                </template>
            </v-data-table>
        </v-card>
  </div>
</template>

<style scoped>
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