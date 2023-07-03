<script lang="ts">
import { ref, computed } from 'vue';

export default {
  setup() {
    const loaded = ref(false);
    const loading = ref(false);
    const selectedItem = ref('');
    const nome = "Nome";

    const buttonText = computed(() => {
      return loading.value ? 'Carregando...' : 'Clique para carregar';
    });

    function onClick() {
      loading.value = true;

      setTimeout(() => {
        loading.value = false;
        loaded.value = true;
      }, 2000);
    }

    function selectItem(item) {
      selectedItem.value = item;
    }

    function handleAboutClick() {
      // Lógica para o clique no botão "Sobre"
    }

    function handleLogoutClick() {
      // Lógica para o clique no botão "Sair"
    }

    return {
      nome,
      loaded,
      loading,
      onClick,
      buttonText,
      selectedItem,
      selectItem,
      handleAboutClick,
      handleLogoutClick
    };
  }
}
</script>


<template>
  <div class="sobre">
    <h1>Sobre Nós</h1>
    <p>O sistema é voltado para a temática de auxiliar as ONGs no atendimento a pessoas em situação de rua. 
      Os seus objetivos estão voltados em ajudar as ONGs auxiliando na logística de distribuição de utensílios
      (comida, roupas, cobertores, água, produtos de higiene pessoal e etc), além disso, coordenar situações de 
      extrema importância como o recebimento e repasse de doações.</p>
  </div>
  <div class="card-container">
    <div class="card">
      <div class="circle">
        <v-icon icon="mdi-hand-heart" size="50"></v-icon>
      </div>
      <div class="info">
        <h3>Compaixão</h3>
        <p>A compaixão é um dos princípios centrais de nosso site. Buscamos despertar e cultivar a compaixão em nossos leitores, 
          incentivando-os a agir com bondade e empatia. Acreditamos que através da compaixão podemos criar um mundo mais harmonioso,
          onde cada indivíduo se preocupa genuinamente com o bem-estar dos outros. Faça parte dessa jornada de compaixão e inspire-se 
          a fazer a diferença na vida das pessoas ao seu redor.</p>
      </div>
    </div>

    <div class="card">
      <div class="circle">
        <v-icon icon="mdi-account-group" size="50"></v-icon>
      </div>
      <div class="info">
        <h3>Fraternidade</h3>
        <p>A fraternidade é um pilar essencial em nosso site. Acreditamos na união e no respeito mútuo entre todas as pessoas. 
          Aqui, buscamos criar uma comunidade acolhedora e inclusiva, onde todos são valorizados e ouvidos. Promovemos o diálogo 
          construtivo e a colaboração, cultivando um ambiente de solidariedade e compreensão. Junte-se a nós e vamos construir um 
          mundo mais fraterno juntos.</p>
      </div>
    </div>

    <div class="card">
      <div class="circle">
        <v-icon icon="mdi-account-heart" size="50"></v-icon>
      </div>
      <div class="info">
        <h3>Amor ao próximo</h3>
        <p>Nosso site promove o amor ao próximo como um valor fundamental. Acreditamos na importância de estender a 
          mão e ajudar aqueles que estão em necessidade. Por meio de conteúdo inspirador e ações solidárias, buscamos 
          fortalecer os laços humanos e incentivar a empatia em nossa comunidade. Junte-se a nós nessa jornada de bondade 
          e compaixão.</p>
      </div>
    </div>
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

.sobre{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sobre h1{
  margin-top: 30px;
  color: #8a2dd6;
  font: 600 64px/135.5% "Poppins", sans-serif;
}

.sobre p{
  margin-top: 20px;
  color: #5b5b5b;
  font: 500 20px/135.5% "Poppins", sans-serif;
  width: 1156px;
  height: 198px;
}

.card-container {
  display: flex;
  justify-content: space-evenly;
}

.card {
  margin-bottom: 30px;
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle .v-icon{
  color: #8A2DD6;
}

.info {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    margin-bottom: 20px;
  }
}
</style>
