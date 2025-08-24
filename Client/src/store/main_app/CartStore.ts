import { create } from "zustand";
import { ProductStore } from "./ProductStore.ts";
import { Address, product, type CartStates } from "../../Helpers/types.ts";
import toast from "react-hot-toast";
import { AppStore } from "./AppStore.ts";
import { axiosInstance } from "../../Helpers/utils.ts";
import { AxiosError } from "axios";

export const CartStore = create<CartStates>((set, get) => ({
  cartItems: {},
  paymentOption: "COD",
  settingOrder: false,
  setPaymentOption: (option) => {
    set({ paymentOption: option });
  },
  setCart: async () => {
    try {
      const { AuthUser } = AppStore.getState();
      if (AuthUser) {
        if (Object.keys(AuthUser.cartItems).length > 0) {
          set({ cartItems: AuthUser.cartItems });
        } else {
          get().updateCart();
        }
      } else {
        set({ cartItems: {} });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data as string);
      } else {
        toast.error("an unexprected error ocurred.");
      }
    }
  },
  updateCart: async () => {
    const { cartItems } = get();
    try {
      await axiosInstance.post("/cart/update", cartItems);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data as string);
      } else {
        toast.error("an unexpected error occured.");
      }
    } finally {
      AppStore.getState().setUser();
    }
  },
  addtoCart: async (itemid) => {
    const { cartItems } = get();
    const { AuthUser } = AppStore.getState();
    try {
      const cartdata = { ...cartItems };
      if (cartdata[itemid]) {
        cartdata[itemid]++;
      } else {
        cartdata[itemid] = 1;
      }
      set({ cartItems: cartdata });
      toast.success("Added to Cart");
    } catch (error) {
      toast.error("An Error occured.");
    } finally {
      if (AuthUser) {
        get().updateCart();
      }
    }
  },
  removefromCart: async (itemid) => {
    const { cartItems } = get();
    const { AuthUser } = AppStore.getState();
    try {
      const cartdata = { ...cartItems };
      if (cartdata[itemid] == 1) {
        delete cartdata[itemid];
      } else {
        cartdata[itemid]--;
      }
      set({ cartItems: cartdata });
      toast.success("Removed from Cart");
    } catch (error) {
      toast.error("An Error occured.");
    } finally {
      if (AuthUser) {
        get().updateCart();
      }
    }
  },
  removeitem: async (itemid) => {
    const { cartItems } = get();
    const { AuthUser } = AppStore.getState();
    try {
      const cartdata = { ...cartItems };
      if (cartdata[itemid]) {
        delete cartdata[itemid];
      }
      set({ cartItems: cartdata });
      toast.success("Completely Removed from the Cart");
    } catch (error) {
      toast.error("An Error occured.");
    } finally {
      if (AuthUser) {
        get().updateCart();
      }
    }
  },
  itemcount: (itemid) => {
    const { cartItems } = get();
    if (!cartItems[itemid]) {
      return 0;
    } else {
      return cartItems[itemid];
    }
  },
  totalitemAmount: (itemid: string) => {
    const { cartItems } = get();
    const products = ProductStore.getState().products as product[];
    const Product = products.find((product) => product._id === itemid);
    if (Product) {
      return Product.offerPrice * cartItems[itemid];
    }
    return 0;
  },
  AllCartItemsPrice: () => {
    let amount = 0;
    const { cartItems, totalitemAmount } = get();
    for (let item in cartItems) {
      amount += totalitemAmount(item);
    }
    return amount;
  },
  totalItems: () => {
    const { cartItems } = get();
    const total = Object.values(cartItems).reduce((curr, prev) => curr + prev, 0);
    return total;
  },
  setOrderCOD: async () => {
    set({ settingOrder: true });
    try {
      const address = AppStore.getState().selectedAddress?._id as string;
      const { cartItems } = get();
      const res = await axiosInstance.post("/order/cod", { cartItems, address });
      toast.success(res.data);
      set({ cartItems: {} });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data as string);
      } else {
        toast.error("an unexpected error occured.");
      }
    } finally {
      set({ settingOrder: false });
    }
  },
  setOrderstripe: async () => {
    set({ settingOrder: true });
    try {
      const { _id: address } = AppStore.getState().selectedAddress as Address;
      const { cartItems } = get();
      const res = await axiosInstance.post("/order/stripe", { cartItems, address });
      window.location.replace(res.data.url);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data as string);
      } else {
        toast.error("an unexpected error occured.");
      }
    } finally {
      set({ settingOrder: false });
    }
  }
}))