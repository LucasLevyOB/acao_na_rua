import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

import type { Role } from "../../../types";

interface AuthState {
    token: string;
    email?: string;
    id: number;
    name: string;
    cpf?: string;
    role: Role;
}

export interface AuthStore {
    auth: AuthState;
    isAdmin: boolean;
    isLogged: boolean;
}

export const useAuthStore = defineStore(
    'auth',
    () => {
        const auth: Ref<AuthState> = ref({
            token: '',
            name: '',
            id: 0,
            role: 'visitante',
        });

        const isAdmin = computed(() => auth.value.role === 'admin');

        const isLogged = computed(() => auth.value.token !== '');

        return {
            auth,
            isAdmin,
            isLogged
        };
    }, 
    {
        persist: {
            paths: ['auth']
        },
    }
);