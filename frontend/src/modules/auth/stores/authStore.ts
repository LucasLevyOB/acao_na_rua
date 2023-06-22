import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

import type { Role } from "../../../types";

interface AuthState {
    token: string;
    email?: string;
    name: string;
    cpf?: string;
    role: Role;
}

export interface AuthStore {
    auth: AuthState;
    isAdmin: boolean;
}

export const useAuthStore = defineStore(
    'auth',
    () => {
        const auth: Ref<AuthState> = ref({
            token: '',
            name: '',
            role: 'visitante',
        });

        const isAdmin = computed(() => auth.value.role === 'admin');

        return {
            auth,
            isAdmin,
        };
    }, 
    {
        persist: {
            paths: ['auth']
        },
    }
);