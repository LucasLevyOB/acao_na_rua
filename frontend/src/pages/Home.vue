<script lang="ts">

export default {
    data () {
      return {
        show1: false,
        show2: true,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },
  }

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
          v-model="CPF"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 input_texts_esp"
          clearable
          label="CPF"
          placeholder="XXX.XXX.XXX-XX"
        ></v-text-field>

        <v-text-field
          class="input_texts_esp"
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Senha"
          hint="Digite pelo menos 8 caracteres"
          counter
          @click:append="show1 = !show1"
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