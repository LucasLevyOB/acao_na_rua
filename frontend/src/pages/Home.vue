<script lang="ts" setup>
import { ref  } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const search = ref('');

</script>


<template>
  <div>
    <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
  </div>
</template>

<style>
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
</style>
