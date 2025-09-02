/* eslint-disable default-param-last */
import { ToastContainer, toast } from 'react-toastify';

const customId = "custom-id-yes";
export const showToast = (type = "success", msg) => {
    if (type === "success") {
        toast.success(msg, {
            theme: "colored",
            toastId: customId
        });
    } else if (type === "error") {
        toast.error(msg, {
            theme: "colored",
            toastId: customId
        });
    } else if (type === "warning") {
        toast.warn(msg, {
            theme: "colored",
            toastId: customId
        });
    }
}


export const showSucess = (msg) => {
    showToast('success', msg);
}

export const showError = (msg) => {
    showToast('error', msg);
}

export const showWarning = (msg) => {
    showToast('warning', msg);
}