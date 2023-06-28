<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';

 const loading = ref(false);

  watch(loading, (val) => {
    if (!val) return;

    setTimeout(() => {
      loading.value = false;
    }, 2000);
  });

  // Função para simular o comportamento de inicialização
  onMounted(() => {
    loading.value = true;
  });

</script>

<template>
    <div class="d-flex ">
    <div class="ilustration"></div>
    <div class="content">
      <h1>Bem-vindo ao <br><span class="spn_acao_rua">Ação na Rua</span></h1>
      <div class="btn_buttons">
        <div class="btn_logar">
          <v-btn
          :disabled="loading"
          :loading="loading"
          block
          class="text-none mb-4 text_btn"
          color="#8A2DD6"
          size="x-large"
          variant="flat"
          @click="loading = !loading"
        >
          Entrar
        </v-btn>
        </div>
        <div class="btn_visitante">
          <v-btn
          :disabled="loading"
          :loading="loading"
          block
          class="text-none mb-4 text_btn"
          color="#8A2DD6"
          size="x-large"
          variant="flat"
          @click="loading = !loading"
        >
          Visitante
        </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.ilustration{
  width: 507.99px;
  height: 507.43px;
  background: url("../img/Illustration.png");
  background-position: center center;
  background-size: cover;
  top: 236px;
  left: 55px;
}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.content .btn_buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
}

.content .btn_logar{
  max-width:500px;
  width: 100%;
  left: 47.01%;
  right: 6.39%;
  top: 54.3%;
  bottom: 38.18%;
 
}

.content .btn_visitante{
  max-width:500px;
  width: 100%;
  left: 46.94%;
  right: 6.46%;
  top: 64.84%;
  bottom: 27.64%;

}

.spn_acao_rua{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-size: 76px;
  line-height: 135.5%;
  /* or 103px */


  color: #8A2DD6;
}



.content h1 {

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 60px;
    line-height: 135.5%;
    /* or 81px */


    /* Black */

    color: #2F2F2F;

}

.text_btn {

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 135.5%;
  /* identical to box height, or 22px */


  color: #FFFFFF;
}


</style>