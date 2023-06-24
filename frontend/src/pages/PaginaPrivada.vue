<script lang="ts" setup>
import useAuthService from "../modules/auth/composables/authService";

const { authLogout } = useAuthService();

</script>

<template>
    <h1>Página Privada</h1>
    <button @click="authLogout">Logout</button>
</template>