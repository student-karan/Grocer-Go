import { NextFunction, Request, Response } from "express";
import { productinStock} from "./../helpers/types";
import { productData } from "./../helpers/validation";
import Product from "./../models/productModel";
import ExpressError from "./../ExpressError";

// Add product : /api/product/add
export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
   const product = req.body as productData;
   const images = req.files as Express.Multer.File[];

   const image: string[] = images.map(img => img.path);
   const price = Number.parseInt(product.price);
   const offerPrice = Number.parseInt(product.offerprice);
   const newProduct = new Product({ ...product, image,price,offerPrice});
   if (newProduct) {
      await newProduct.save();
   }
   res.status(200).send("Product added to product list.")
}

// get products(seller) : /api/product/seller
export const allProductsSeller = async (req: Request, res: Response, next: NextFunction) => {
   const products = await Product.find({});
   res.status(200).send(products);
}

// get products(user) : /api/product/user
export const allProducts = async (req: Request, res: Response, next: NextFunction) => {
   const products = await Product.find({inStock:true});
   res.status(200).send(products);
}

// get product : /api/product/:id
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;

   const product = await Product.findById(id);
   if (!product) {
      throw new ExpressError(400, "The product you're looking for doesn't exist");
   }
   res.status(200).send(product);
}

// change product inStock : /api/product/stock/:id
export const changestock = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   const { inStock } = req.body as productinStock;

   const product = await Product.findByIdAndUpdate(id, { inStock:inStock },{runValidators:true,new:true});
   if (!product) {
      throw new ExpressError(400, "The product you're looking for doesn't exist");
   }
   res.status(200).send({message:"The product stock has been updated"});
}