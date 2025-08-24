import { create } from "zustand";
import { SellerStates } from "../../Helpers/types.ts";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../Helpers/utils.ts";
import { AxiosError } from "axios";

export const SellerStore = create<SellerStates>((set, get) => ({
    AuthSeller: null,
    isLoggingUp: false,
    isLoggingOut: false,
    isCheckingSeller: false,
    addingnewProduct: false,
    productList: [],
    isSettinglist: false,
    orders: [],
    addProduct: async (data) => {
        set({ addingnewProduct: true });
        try {
            const res = await axiosInstance.post("/product/add", data);
            toast.success(res.data);
            get().setProductsList();
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data as string);
            } else {
                toast.error("an unexpected error occured.");
            }
        } finally {
            set({ addingnewProduct: false });
        }
    },
    Login: async (data) => {
        set({ isLoggingUp: true });
        try {
            const res = await axiosInstance.post("/seller/login", data);
            set({ AuthSeller: res.data });
            toast.success(res.data.message);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data as string);
            } else {
                toast.error("an unexpected error occured.");
            }
        } finally {
            set({ isLoggingUp: false });
        }
    },
    Logout: async () => {
        set({ isLoggingOut: true });
        try {
            const res = await axiosInstance.get("/seller/logout");
            set({ AuthSeller: null });
            toast.success(res.data.message);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data as string);
            } else {
                toast.error("an unexpected error occured.");
            }
        } finally {
            set({ isLoggingOut: false });
        }
    },
    setSeller: async () => {
        set({ isCheckingSeller: true });
        try {
            const res = await axiosInstance.get("/seller/checkSeller");
            set({ AuthSeller: res.data });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data as string);
            } else {
                toast.error("an unexprected error ocurred.");
            }
            set({ AuthSeller: null });
        } finally {
            set({ isCheckingSeller: false });
        }
    },
    setProductsList: async () => {
        set({ isSettinglist: true });
        try {
            const res = await axiosInstance.get("/product/seller");
            set({ productList: res.data });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data as string);
            } else {
                toast.error("an unexpected error occured.");
            }
        } finally {
            set({ isSettinglist: false });
        }
    },
    toggleStock: async (inStock: boolean, itemId: string) => {
        try {
            const res = await axiosInstance.post(`/product/stock/${itemId}`, { inStock });
            toast.success(res.data?.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data as string);
            } else {
                toast.error("an unexpected error occured.");
            }
        } finally {
            await get().setProductsList();
        }
    },
    setOrders: async() => {
        try {
            const res = await axiosInstance.get("/order/seller");
            set({orders:res.data});
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data as string);
            } else {
                toast.error("an unexpected error occured.");
            }
        } finally {
            await get().setProductsList();
        }
    }
}))