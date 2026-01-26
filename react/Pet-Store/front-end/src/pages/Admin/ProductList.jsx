import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/ProductApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const { data } = await createProduct(formData);

      if (data?.error) {
        toast.error("Product creation failed");
      } else {
        toast.success(`${data.name} created successfully`);
        navigate("/");
      }
    } catch (error) {
      toast.error("Product creation failed");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container mx-auto px-4 xl:px-36">
      <div className="flex flex-col md:flex-row gap-6">
        <AdminMenu />

        <div className="md:flex-1 bg-[#D8BFAA] rounded-xl p-4 mt-10 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-petPrimary">
            Create Product
          </h2>

          {/* Image Preview */}
          {imageUrl && (
            <div className="mb-6 text-center">
              <img
                src={imageUrl}
                alt="product"
                className="mx-auto max-h-[220px] rounded-lg"
              />
            </div>
          )}

          {/* Upload Image */}
          <div className="mb-6">
            <label className="flex items-center justify-center border-2 border-dashed  border-pink-500 rounded-lg cursor-pointer py-10 text-white hover:border-pink-500 transition">
              {image ? image.name : "Click to upload image"}
              <input
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-petPrimary ">Name</label>
                <input
                  type="text"
                  className="w-full p-4 rounded-lg bg-white border border-pink-500 text-petPrimary  "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 text-petPrimary">Price</label>
                <input
                  type="number"
                  className="w-full p-4  rounded-lg bg-white border border-pink-500  text-petPrimary"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Quantity & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-petPrimary">Quantity</label>
                <input
                  type="number"
                  className="w-full p-4 rounded-lg bg-white border border-pink-500 text-petPrimary"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 text-petPrimary">Brand</label>
                <input
                  type="text"
                  className="w-full p-4 rounded-lg bg-white border  border-pink-500 text-petPrimary"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 text-petPrimary">Description</label>
              <textarea
                rows="4"
                className="w-full p-4 rounded-lg bg-white border border-pink-500 text-petPrimary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Stock & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-petPrimary">
                  Count In Stock
                </label>
                <input
                  type="number"
                  className="w-full p-4 rounded-lg bg-white border border-pink-500 text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 text-petPrimary">Category</label>
                <select
                  className="w-full p-4 rounded-lg bg-white border border-pink-500 text-petPrimary"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-4 border border-pink-500 hover:bg-petPrimary transition rounded-lg font-bold text-lg"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
