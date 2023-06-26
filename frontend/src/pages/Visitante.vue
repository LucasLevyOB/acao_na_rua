<script lang="ts" setup>
import { ref } from 'vue';

const dialog = ref(false);
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
  <div>  
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-charity" title="ONG" value="ong"></v-list-item>
          <v-list-item prepend-icon="mdi-account-heart"  title="Ajuda Pessoa" value="ajuda pessoa"></v-list-item>
          <v-list-item prepend-icon="mdi-account-supervisor" title="Voluntário" value="voluntário"></v-list-item>
          <v-list-item prepend-icon="mdi-archive" title="Item Doação" value="item doação"></v-list-item>
          <v-list-item prepend-icon="mdi-hand-coin" color="#fff" title="Doação" value="doação"></v-list-item>
          <v-list-item prepend-icon="mdi-help-circle" color="#fff" title="Sobre" value="sobre"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" color="#fff" title="Sair" value="sair"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
  <v-card
    class="mx-auto card-ong"
  >
    <v-list lines="two">

      <v-list-item class="texto-lista-itens"
        v-for="file in files"
        :key="file.title"
        :title="file.title"
        :subtitle="file.subtitle"
      >
        <template v-slot:prepend>
          <v-avatar :color="file.color">
            <v-icon color="white">{{ file.icon }}</v-icon>
          </v-avatar>
        </template>
        <template v-slot:append>
          <v-btn class="saiba-mais"
            @click="dialog = true"
          >
            Saiba Mais
          </v-btn>
        </template>
        <div class="text-center">
          <v-dialog
            v-model="dialog"
            width="auto"
          >
            <v-card>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">Fechar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-list-item>
    </v-list>
  </v-card>
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

.card-ong{
  margin-top: 50px;
  max-width: 1200px;
}

.saiba-mais{
  background-color: #8A2DD6;
  color: #fff;
}

.texto-lista-itens{
  color: #000;
  box-shadow: 5px 3px 5px 0px rgba(0, 0, 0, 0.10);
  border-radius: 16px;

}
</style>

