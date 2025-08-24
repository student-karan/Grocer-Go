import { create } from "zustand";
import { type ProductStates } from "../../Helpers/types.ts";
import { axiosInstance } from "../../Helpers/utils.ts";

export const ProductStore = create<ProductStates>((set) => ({
  products: [],
  loadingProducts: false,
  loadproducts: async () => {
    set({ loadingProducts: true });
    try {
      const res = await axiosInstance.get("/product/user");
      set({products:res.data});
    } catch (err) {
      set({ products: []});
    } finally {
      set({ loadingProducts: false });
    }
  }
}))