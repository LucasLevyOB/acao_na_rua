<script lang="ts" setup>
import { ref } from 'vue';

      const visible = ref(false);

</script>

<template>
    <div class="d-flex ">
    <div class="ilustration"></div>
    <div class="content">
      <div class="tabs"><v-btn variant="text" class="tabs_action tabs_texts">
            Voluntário
          </v-btn>
          <v-btn variant="text" class="tabs_texts">
            Administrador
          </v-btn>
      </div>
      <h1>Entrar</h1>
      <div class="input_texts">
        <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
        class="input_texts_esp"
        v-model="mask"
        density="compact"
        placeholder="CPF"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        ></v-text-field>

        <v-text-field
        class="input_texts_esp"
        v-model="mask"
        density="compact"
        placeholder="Email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        ></v-text-field>

        <v-text-field
          class="input_texts_esp"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <br>
      </v-form>
      </div>
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
        <p>Ainda não tem uma conta?<a href="">Cadastre-se</a></p>
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
  justify-content: center;
  flex: 1;
}

.tabs{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  
}

.tabs_texts{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 42px;
}

.tabs_action{
  border-bottom: 3px solid #8A2DD6;
}

.input_texts{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input_texts_esp{
  width: 100%;
  max-width: 500px;
  margin: auto;
  margin-top: 25px;

}

.v-form .v-input .v-input__append{
  background-color: #8A2DD6;
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

a{
  text-decoration: none;
  color: var(--primary-color, #6358DC);
  font-size: 16px;
  font-family: Poppins;
  font-weight: 600;
  line-height: 135.5%;
}
p{
  text-align: center;
  color: #5B5B5B;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 500;
  line-height: 135.5%;
}


h1 {

  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 170px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-size: 46px;
  line-height: 135.5%;


  color: #8A2DD6;

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