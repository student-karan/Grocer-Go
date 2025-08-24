import React, { ElementType } from "react";
import {ObjectId} from "mongodb";

// --x--x--x-- MAIN WEBSITE --x--x--x-- //

// <-- APP STORE --> //
export type Login = {
    email: string,
    password: string,
}

export type Signup = {
    username: string,
} & Login

export type checkUser = {
    data: {
        user: Record<string, string>
    }
}

export type resUser = {
    data: {
        message: string,
    }
} & checkUser

export type Address = {
    _id: string,
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    street: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
    phone: string,
}

export type orderItem = {
    product: product,
    quantity: number,
    _id: string,
}

export type orders = {
    _id: string,
    userId: string,
    items: orderItem[],
    amount: number,
    address: Address,
    status: string,
    paymentType: string,
    isPaid: boolean,
    createdAt: string,
    updatedAt: string,
}

export type authUser = {
    _id: ObjectId,
    username:string,
    email: string,
    cartItems: Record<string,number>
}

export type AppStates = {
    AuthUser: authUser | null,
    isCheckingAuth: boolean,
    isSigingUp: boolean,
    isLoggingUp: boolean,
    isLoggingOut: boolean,
    addresses: Address[],
    gettingAddress: boolean,
    showAddress: boolean,
    selectedAddress: Address | null,
    myOrders: orders[],
    setMyorders: () => Promise<void>,
    addAddress : (address:validAddress) => Promise<boolean>,
    getAddresses : () => Promise<void>,
    setShowAddress: () => void,
    setSelectedAddress: (address: Address) => void,
    setUser: () => Promise<void>,
    Signup: (data: Signup) => Promise<void>,
    Login: (data: Login) => Promise<void>,
    LogOut: () => Promise<void>,
}

// <-- THEME STORE --> //
export type themeStore = {
    theme: string,
    setTheme: (theme: string) => void,
}

// <-- SEARCH STORE -- > //
export type searchStore = {
    search: string,
    setSearch: (value: string) => void
}

// <-- CART STORE --> //
// CATEGORIES
export type CategorySection = {
    categories: Category[]
}

export type Category = {
    text: string,
    path: string
    image: string,
    bgColor: string,
}

// BEST SELLERS
export type product = {
    _id: string,
    name: string,
    category: string,
    price: number,
    offerPrice: number,
    image: Array<string>,
    description: Array<string>,
    createdAt: string,
    updatedAt: string,
    inStock: boolean,
}


export type CartStates = {
    cartItems: Record<string, number>,
    paymentOption: "COD" | "online",
    settingOrder:boolean,
    setPaymentOption: (option: "COD" | "online") => void,
    setCart : () => Promise<void>,
    updateCart : () => Promise<void>,
    addtoCart: (itemid: string) => void,
    removefromCart: (itemid: string) => void,
    removeitem: (itemid: string) => void,
    itemcount: (itemid: string) => number,
    totalitemAmount: (itemid: string) => number,
    AllCartItemsPrice: () => number,
    totalItems: () => number,
    setOrderCOD : () => Promise<void>,
    setOrderstripe : () => Promise<void>
}
export type ProductStates = {
    products: product[],
    loadingProducts: boolean,
    loadproducts: () => Promise<void>
}

// FEATURE
export type Property = {
    icon: string,
    title: string,
    description: string,
}

// LOGIN DATA
export type validLogin = {
    email: string,
    password: string
}
export type validateLogin = {
    email?: string,
    password?: string
}

// SIGNUP DATA
export type validSignup = {
    username: string,
} & validLogin

export type validateSignup = {
    username?: string,
} & validateLogin

export type formInputdata = {
    label?: string,
    type?: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    id: string,
    placeholder?: string,
    errors: string | undefined,
    Icon?: ElementType,
    className: string

}

export type formIInputPasswordData = {
    showPassword: boolean,
    setShowPassword: (value: boolean) => void
} & formInputdata

export type LinkProps = {
    text: string,
    navigateTo: string,
    type: string,
}

export type addressInput = {
    type: string,
    name: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className: string,
    errors?: string
}

export type validateAddress = {
    firstName?: string,
    lastName?: string,
    email?: string,
    street?: string,
    city?: string,
    state?: string,
    country?: string,
    phone?: string,
    zipcode?: string
}

export type validAddress = {
    firstName: string,
    lastName: string,
    email: string,
    street: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    zipcode: string
}

// --x--x--x-- SELLER DASHBOARD --x--x--x-- //

export type SellerStates = {
    AuthSeller: string | null,
    isLoggingUp: boolean,
    isLoggingOut:boolean,
    isCheckingSeller:boolean,
    addingnewProduct: boolean,
    productList: product[],
    isSettinglist: boolean,
    orders: orders[],
    addProduct: (data: FormData) => Promise<void>
    Login: (data: Login) => Promise<void>,
    Logout: () => Promise<void>,
    setSeller: () => Promise<void>,
    setProductsList: () => Promise<void>,
    toggleStock: (inStock:boolean,itemId:string) => Promise<void>,
    setOrders: () => void
}