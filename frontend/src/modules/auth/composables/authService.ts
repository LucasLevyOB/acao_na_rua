import { useRouter } from "vue-router";
import Administrador from "../../../models/Adminstrador";
import Voluntario from "../../../models/Voluntario";
import AuthService from "../services/AuthService";
import { useAuthStore } from "../stores/authStore";

const useAuthService = () => {
    const authStore = useAuthStore();
    const authService = new AuthService();
    const router = useRouter();

    const authLogin = async (emailCpf: string, senha: string) => {
        const response = await authService.login(emailCpf, senha);

        if (!response.success || !response.data) {
            return response;
        }

        const { auth, token } = response.data;

        // admin
        if (auth.id_role === 1) {
            const admin = auth as Administrador;
            authStore.auth.email = admin.adm_email;
            authStore.auth.name = admin.adm_nome;
            authStore.auth.role = 'admin';
            authStore.auth.token = token;
            router.push({ name: 'PaginaPrivada' });
            return;
        }
        
        // volunteer
        if (auth.id_role === 2) {
            const volunteer = auth as Voluntario;
            authStore.auth.name = volunteer.vol_nome;
            authStore.auth.cpf = volunteer.vol_cpf;
            authStore.auth.role = 'voluntario';
            authStore.auth.token = token;
            router.push({ name: 'PaginaPrivada' });
            return;
        }
        
        console.error('Erro ao fazer login');
    };
    
    const authLogout = () => {
        authStore.auth.token = '';
        authStore.auth.email = '';
        authStore.auth.name = '';
        authStore.auth.cpf = '';
        authStore.auth.role = 'visitante';
        router.push({ name: 'Home' });
    };

    return {
        authLogin,
        authLogout
    }
}

export default useAuthService;