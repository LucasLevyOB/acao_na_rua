<script lang="ts" setup>
import { ref} from 'vue';
import { useRouter } from 'vue-router';

import AdministradorService from '../modules/auth/services/AdminstadorService';
import useToast from '../composables/toast';

const visible = ref(false);
const form = ref(false);
const name = ref(null);
const email = ref(null);
const password = ref(null);
const loading = ref(false);
const adminService = new AdministradorService();
const toast = useToast();
const router = useRouter();

const onSubmit = async () => {
  if (!form.value) return;

  if (!name.value || !email.value || !password.value) {
    return;
  }

  loading.value = true;

  const response = await adminService.create({
    adm_nome: name.value,
    adm_email: email.value,
    adm_senha: password.value,
  });

  if (!response.success || !response.data?.adm_id) {
    toast.toastError('Erro ao cadastrar administrador');
    loading.value = false;
    return;
  }

  toast.toastSuccess('Administrador cadastrado com sucesso! Faça login para continuar.');
  router.push('/login');

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
      <h1>Cadastrar</h1>
      <div class="input_texts">
        <v-form
        v-model="form"
        @submit.prevent="onSubmit">
          
        <v-text-field
        v-model="name"
        :rules="[required]"
        class="input_texts_esp"
        density="compact"
        placeholder="Nome"
        prepend-inner-icon="mdi-account-circle-outline"
        variant="outlined"
        required
        ></v-text-field>

        <v-text-field
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
        <div class="btn_cadastrar">
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
          Cadastrar
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
  justify-content: center;
  flex: 1;
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

.content .btn_cadastrar{
  max-width:500px;
  width: 100%;
  left: 47.01%;
  right: 6.39%;
  top: 54.3%;
  bottom: 38.18%;
 
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