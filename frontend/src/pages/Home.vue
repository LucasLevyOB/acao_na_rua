<script>
export default {
    data: () => ({
      loaded: false,
      loading: false,
    }),

    methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
    },
  }
</script>

<template>
  <div class="menu">
    <div class="logo">
      <img src="../img/logo_1.png" alt="Logo" />
    </div>
    <div class="pesquisa_geral">
      <v-text-field
        class="pesquisa_esp"
        :loading="loading"
        density="compact"
        variant="solo"
        label="Pesquisar"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
    </div>
    <div class="user-profile">
      <v-avatar color="#FFFFFF">
      <v-icon icon="mdi-account-circle"></v-icon>
      </v-avatar>
      <span>{{ nome }}</span>
    </div>
  </div>
</template>

<style scoped>
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

.user-profile img {
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-profile span {
  font-weight: bold;
}
</style>
