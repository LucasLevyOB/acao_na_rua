import { useToast as useToastVue } from 'vue-toast-notification';

const useToast = () => {
    const toast = useToastVue();

    const toastError = (message: string) => {
        toast.open({
            message,
            type: 'error',
            position: 'top-right',
            duration: 5000,
        });
    }

    const toastSuccess = (message: string) => {
        toast.open({
            message,
            type: 'success',
            position: 'top-right',
            duration: 5000,
        });
    }

    return {
        toastError,
        toastSuccess,
    }
};

export default useToast;