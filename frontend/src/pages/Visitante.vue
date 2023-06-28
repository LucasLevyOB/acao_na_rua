<script lang="ts" setup>
import { ref } from 'vue';

const files = ref([
  {
    color: '#8A2DD6',
    icon: 'mdi-charity',
    subtitle: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    title: 'Santa Maria',
  },
  {
    color: '#8A2DD6',
    icon: 'mdi-charity',
    subtitle: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    title: 'Kitchen remodel',
  },
]);

</script>

<template>
  <h2 class="page-title">ONGs</h2>
  <v-card class="mx-auto card-ong">
    <v-list lines="two">
      <v-list-item class="texto-lista-itens" v-for="file in files" :key="file.title">
        <template v-slot:default>
          <v-avatar :color="file.color">
            <v-icon color="white">{{ file.icon }}</v-icon>
          </v-avatar>
          <div>
            <v-list-item-title class="file-title">{{ file.title }}</v-list-item-title>
            <v-list-item-subtitle class="file-subtitle">{{ file.subtitle }}</v-list-item-subtitle>
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
