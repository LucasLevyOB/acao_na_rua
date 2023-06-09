<script lang="ts" setup generic="T">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import useDayjs from '../../composables/dayjs';

import useToast from '../../composables/toast';
import type { TableHeader, BaseAPIResponse } from '../../types';
import type BaseAPI from '../../services/BaseAPI';

type Props = {
    title: string;
    api: BaseAPI,
    loadHeaders: () => TableHeader[];
    loadItems: () => Promise<BaseAPIResponse<T[]>>;
}

const props = defineProps<Props>();

const headers: Ref<TableHeader[]> = ref([]);
const items: Ref<T[]> = ref([]);
const search = ref('');
const toast = useToast();
const isLoading = ref(false);
const dayjs = useDayjs();
const datagridRef = ref();


const loadHeaders = async () => {
    const response = await props.loadHeaders.call(props.api);
    
    headers.value = response;
};

const loadItems = async () => {
    const response = await props.loadItems.call(props.api);
    
    if (!response.success || !response.data) {
        toast.toastError(response?.message ? response.message : 'Erro ao carregar dados da tabela');
        return;
    }

    items.value = response.data;
};

const formatValue = (value: string | number, column: TableHeader) => {
    if (value === null || value === undefined) return '';
    if (column.type === 'date') {
        return dayjs(value).format('DD/MM/YYYY');
    }
    return value;
};

const refresh = async () => {
    await loadItems();
};

const formatCsv = () => {
  const csvHeaders = headers.value.map(header => header.title);
  const itemsCsv = items.value.map((value: T) => headers.value.map(header => value[header.key as keyof T]));
  const csvString = [csvHeaders, ...itemsCsv].map(e => e.join(",")).join("\n");
  return csvString;
}

const downloadCsv = (dataContent: string) => {
  const blob = new Blob([dataContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('exportar_dados', 'exportar_dados.csv');
  a.click();
}

const exportData = () => {
  const csvContent = formatCsv();
  downloadCsv(csvContent);
}

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
                    <v-btn height="48" append-icon="mdi-download-outline" variant="text" @click="exportData">
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
            ref="datagridRef"
            :headers="headers"
            :items="items"
            :search="search"
            >
                <template v-slot:headers>
                    <tr>
                        <template v-for="column in headers" :key="column.key">
                            <th v-if="column.show">
                                {{ column.title }}
                            </th>
                        </template>
                    </tr>
                </template>
                <template v-slot:item="{ item }">
                    <tr>
                        <template v-for="column in headers" :key="column.key">
                            <template v-if="!column.show"></template>
                            <td v-else-if="column.type !== 'custom'">
                                {{ formatValue(item.columns[column.key], column) }}
                            </td>
                            <td v-else>
                                <slot name="inlineActions" :item="item"></slot>
                            </td>
                        </template>
                    </tr>
                </template>
            </v-data-table>
            <v-progress-circular v-show="isLoading" slot="progress" color="blue" indeterminate>
        </v-progress-circular>
        </v-card>
  </div>
</template>

<style scoped>

.v-progress-circular {
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    position: absolute;
    margin: 1rem;
}
.tabela{
    width: 100%;
    padding-left: 20px;
    padding-right: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
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
  min-height: 412px;
  position: relative;
  background-color: #F9F8FE;
}
</style>
