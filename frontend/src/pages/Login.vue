<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import { RouterLink } from 'vue-router';

import useAuthService from '../modules/auth/composables/authService';

type LoginType = 'voluntario' | 'admin';

const visible = ref(false);
const form = ref(false);
const cpf = ref('');
const email = ref('');
const password = ref(null);
const loading = ref(false);
const loginType: Ref<LoginType> = ref('voluntario');
const { authLogin } = useAuthService();

const switchLoginType = (type: LoginType) => {
  loginType.value = type;
}

const onSubmit = async () => {
  if (!form.value || !password.value) return;

  if ((loginType.value === 'admin' && !email.value)  || (loginType.value === 'voluntario' && !cpf.value)) {
    return;
  }
  
  loading.value = true;
  
  const emailCpf = loginType.value === 'admin' ? email.value : cpf.value;

  await authLogin(emailCpf, password.value);

  loading.value = false;
};

const required = (v:String) => {
  return !!v || 'Este campo é necessário';
};

</script>

<template>
    <div class="d-flex ">
    <div class="ilustration"></div>
    <div class="content">
      <div class="tabs"><v-btn variant="text" class="tabs_texts" :class="{tabs_action: loginType === 'voluntario'}" @click="switchLoginType('voluntario')">
            Voluntário
          </v-btn>
          <v-btn variant="text" class="tabs_texts" :class="{tabs_action: loginType === 'admin'}" @click="switchLoginType('admin')">
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
        v-if="loginType === 'voluntario'"
        v-model="cpf"
        :rules="[required]"
        class="input_texts_esp"
        density="compact"
        placeholder="CPF"
        prepend-inner-icon="mdi-smart-card-outline"
        variant="outlined"
        ></v-text-field>

        <v-text-field
        v-else
        v-model="email"
        :rules="[required]"
        class="input_texts_esp"
        density="compact"
        placeholder="Email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[required]"
          class="input_texts_esp"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Digite sua senha"
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
          :disabled="!form"
          :loading="loading"
          block
          class="text-none mb-4 text_btn"
          color="#8A2DD6"
          size="x-large"
          variant="flat"
          @click="onSubmit"
        >
          Entrar
        </v-btn>
        <p v-show="loginType === 'admin'">Ainda não tem uma conta?<router-link :to="{ name: 'Cadastrar' }">Cadastre-se</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.ilustration{
  margin-right: 100px;
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

.tabs_texts .v-btn__content{
  color: black !important;
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

.btn_logar .v-btn__content{
  color: #FFFFFF;
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