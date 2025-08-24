import React, { useState } from "react"
import { assets, categories } from "../../../../assets/assets.ts";
import { SellerStore } from "../../../../store/seller_dashboard/SellerStore.ts";
import toast from "react-hot-toast";
import { SellerStates } from "../../../../Helpers/types.ts";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {

    const { addProduct, addingnewProduct } = SellerStore() as SellerStates;
    const navigate = useNavigate();

    const [files, setfiles] = useState<File[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [realprice, setRealPrice] = useState("");
    const [offerprice, setOfferPrice] = useState("");
    const [category, setCategory] = useState("Vegetables");

    function handlefileChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!(file.type.startsWith("image/"))) {
            toast.error("Please select a valid image file");
            return;
        }
        const maxSizeMB = 10;
        const maxSizeKB = 1024 * maxSizeMB;
        if (file.size / 1024 > maxSizeKB) {
            toast.error("Image selected exceed the size limit of 10MB.");
            return;
        }
        const newfiles = [...files];
        newfiles[idx] = file;
        setfiles(newfiles);
    }

    async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (files.length == 0) {
            toast.error("You must provide atleast one image of the product.");
            return;
        }
        const selectedfiles = files.filter(file => file !== undefined);
        const descriptions = description.split(".").filter(desc=> desc !== "");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("price", realprice); // Keep as string, convert in backend
        formData.append("offerprice", offerprice); // Keep as string, convert in backend

        // Append each file individually
        selectedfiles.forEach((file) => {
            formData.append("image", file);
        });

        descriptions.forEach((desc) => {
            formData.append("description", desc.trim());
        });
        // call to the backend
        await addProduct(formData);
        navigate("/seller/dashboard/list");
    }

    return (
        <div className="dashboard_page">
            <h1 className="seller_heading">List a New product</h1>
            <form className="addproduct_form" onSubmit={onSubmitHandler}>
                <div className="addproduct_babydiv">
                    <label htmlFor="name" className="seller_subheading">Product Name</label>

                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="new_product_form_input" placeholder="Type here" required />
                </div>
                <div className="addproduct_babydiv">
                    <label htmlFor="description" className="seller_subheading">Product Description</label>

                    <textarea name="description" id="description" value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="new_product_form_input"
                        placeholder="Type here" required></textarea>
                </div>
                <div className="addproduct_babydiv">
                    <section className="seller_subheading">Product Image</section>
                    <div className="flex gap-4">
                        {Array(4).fill(0).map((_, idx) => {
                            return (
                                <label htmlFor={`image${idx + 1}`}>
                                    <img className="w-28" src={files[idx] ? URL.createObjectURL(files[idx]) : assets.upload_area} alt="prod image" />
                                    <input type="file" id={`image${idx + 1}`} onChange={(e) => handlefileChange(e, idx)} hidden />
                                </label>
                            )
                        })}
                    </div>
                </div>
                <div className="addproduct_babydiv">
                    <label htmlFor="category" className="seller_subheading">Product Category</label>

                    <select name="category" id="category" className="w-1/2 new_product_form_input"
                        value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((category, idx) => {
                            return <option key={idx} value={category.path}>{category.path}</option>
                        })}
                        <option value="Instant">Instant</option>
                    </select>
                </div>
                <div className="addproduct_price_div">
                    <div className="addproduct_babydiv">
                        <label htmlFor="realprice" className="seller_subheading">Product Price</label>

                        <input type="number" name="realprice" id="realprice" value={realprice} onChange={(e) => setRealPrice(e.target.value)} className="new_product_form_input" placeholder="Type here" required />
                    </div>
                    <div className="addproduct_babydiv">
                        <label htmlFor="offerprice" className="seller_subheading">Product OfferPrice</label>

                        <input type="number" name="offerprice" id="offerprice" value={offerprice}
                            onChange={(e) => setOfferPrice(e.target.value)} className="new_product_form_input" placeholder="Type here" required />
                    </div>
                </div>
                <button className="addproduct_btn" disabled={addingnewProduct}>{addingnewProduct ? <LoaderCircle className="addProduct_loader" /> : "Submit"}</button>

            </form>
        </div >
    )
}

export default Addproduct