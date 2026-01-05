import { create } from "zustand";
import { axiosInstance } from "../../Helpers/utils.ts";
import { toast } from "react-hot-toast";
import { type Login, type Signup, AppStates } from "../../Helpers/types.js";
import { AxiosError } from "axios";

export const AppStore = create<AppStates>((set, get) => ({
  AuthUser: null,
  isCheckingAuth: false,
  isSigingUp: false,
  isLoggingUp: false,
  isLoggingOut: false,
  addresses: [],
  gettingAddress: false,
  showAddress: false,
  selectedAddress: null,
  myOrders: [],
  setMyorders: async () => {
    try {
      const res = await axiosInstance.get("/order/user");
      set({ myOrders: res.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data as string);
      } else {
        toast.error("an unexprected error ocurred.");
      }
    }
  },
  addAddress: async (address) => {
    set({ gettingAddress: true });
    try {
      const res = await axiosInstance.post("/address/add", address);
      get().getAddresses();
      toast.success(res.data);
      return true;
    } catch (error: unknown) {
      console.log(error);
      return false;
    } finally {
      set({ gettingAddress: false });
    }
  },
  getAddresses: async () => {
    set({ gettingAddress: true });
    try {
      const res = await axiosInstance.get("/address/get");
      set({ addresses: res.data });
    } catch (error: unknown) {
      console.log(error);
    } finally {
      set({ gettingAddress: false });
    }
  },
  setShowAddress: () => {
    const { showAddress } = get();
    set({ showAddress: !showAddress });
  },
  setSelectedAddress: (address) => {
    set({ selectedAddress: address });
  },
  setUser: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/user/checkUser", {
        timeout: 60000, // 60 seconds for cold start
      });
      set({ AuthUser: res.data?.user });
    } catch (error) {
      set({ AuthUser: null });

      if (error instanceof AxiosError) {
        if (error.code === "ECONNABORTED") {
          toast.error("Server is waking up. Please try again.");
        } else {
          toast.error(error.response?.data as string);
        }
      } else {
        toast.error("an unexpected error occurred.");
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  Signup: async (data: Signup) => {
    set({ isSigingUp: true });
    try {
      const res = await axiosInstance.post("/user/signup", data);
      set({ AuthUser: res.data?.user });
      toast.success(res.data?.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data as string);
      } else {
        toast.error("an unexprected error ocurred.");
      }
    } finally {
      set({ isSigingUp: false });
    }
  },
  Login: async (data: Login) => {
    set({ isLoggingUp: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      set({ AuthUser: res.data?.user });
      toast.success(res.data?.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data as string);
      } else {
        toast.error("an unexprected error ocurred.");
      }
    } finally {
      set({ isLoggingUp: false });
    }
  },
  LogOut: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.get("/user/logout");
      set({ AuthUser: null });
      toast.success(res.data?.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data as string);
      } else {
        toast.error("an unexprected error ocurred.");
      }
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
