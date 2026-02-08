import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {NEW_MESSAGE} from "../constants/events";

// Helper function to safely extract error message
const getErrorMessage = (error) => {
    if (!error) return 'Something went wrong';

    if (typeof error === 'string') return error;
    
    if (typeof error === 'object') {
        // Handle RTK Query error format
        if (error?.data?.message) return error.data.message;
        // Handle axios error format
        if (error?.response?.data?.message) return error.response.data.message;
        // Handle standard error format
        if (error?.message) return error.message;
    }

    return 'Something went wrong';
};
const useErrors = (errors = []) => {
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) {
                    fallback();
                } else {
                    const errorMessage = getErrorMessage(error);
                    toast.error(errorMessage);
                }
            }
        });
    }, [errors.map(e => e.isError).join(',')]);
}

const useAsyncMutation = (mutatationHook) => {
    const [isLoading, setIsLoading] = useState(false);
    const [mutation] = mutatationHook();

    const mutationHandler = async (toastMessage = "", ...args) => {
        setIsLoading(true);
        try {
            const res = await mutation(...args);
            if (res.data) {
                toast.success(toastMessage || "Success");
            } else {
                const errorMessage = getErrorMessage(res?.error);
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error("Mutation error:", error);
            toast.error("Error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return [mutationHandler, isLoading];
}



const useSocketEvents = (socket,handlers)=>{
    useEffect(() => {
      if (!socket) return;
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });
    return () => {
        Object.entries(handlers).forEach(([event, handler]) => {
          socket.off(event, handler);
        });
    };
    }, []);
}

export { useErrors, useAsyncMutation, getErrorMessage,useSocketEvents };