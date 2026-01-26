import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/ProductApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const {
    data: productData,
    refetch,
    isLoading,
    isError,
  } = useGetProductByIdQuery(_id);

  const { data: categories = [] } = useFetchCategoriesQuery();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setCategory(productData.category?._id || "");
      setQuantity(productData.quantity || "");
      setBrand(productData.brand || "");
      setImage(productData.image || "");
      setStock(productData.countInStock || "");
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Image upload failed");
    }
  };

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

      await updateProduct({ productId: _id, formData }).unwrap();

      toast.success("Product updated successfully");

      // 🔥 يجبر RTK Query يعيد جلب المنتج المحدث
      await refetch();

      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error(error?.data?.message || "Product update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteProduct(_id).unwrap();
      toast.success("Product deleted");
      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error(error?.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10">Failed to load product</p>;

  return (
    <div className="container mx-auto px-4 xl:px-36 mt-10">
      <div className="flex flex-col md:flex-row gap-8">
        <AdminMenu />

        <div className="md:flex-1 bg-[#D8BFAA] p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-black mb-8">
            Update / Delete Product
          </h2>

          {image && (
            <div className="mb-6 flex justify-center">
              <img
                src={image}
                alt="product"
                className="w-full max-w-md h-64 object-contain rounded-lg"
              />
            </div>
          )}

          <label className="block mb-6 cursor-pointer text-center text-black font-bold py-4 rounded-lg bg-[#D8BFAA] hover:bg-white transition duration-200">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={uploadFileHandler}
              className="hidden"
            />
          </label>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-petPrimary mb-2 block">Name</label>
              <input
                type="text"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-petPrimary mb-2 block">Price</label>
              <input
                type="number"
                className="input-field"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="text-petPrimary mb-2 block">Quantity</label>
              <input
                type="number"
                className="input-field"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div>
              <label className="text-petPrimary mb-2 block">Brand</label>
              <input
                type="text"
                className="input-field"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-petPrimary mb-2 block">Description</label>
              <textarea
                rows="4"
                className="input-field w-full resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="text-petPrimary mb-2 block">
                Count In Stock
              </label>
              <input
                type="number"
                className="input-field"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label className="text-petPrimary mb-2 block">Category</label>
              <select
                className="input-field text-black"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <div className="flex gap-6 mt-8">
            <button
              onClick={handleSubmit}
              className="bg-petPrimary hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg transition hover:scale-105"
            >
              Update
            </button>

            <button
              onClick={handleDelete}
              className="bg-petPrimary hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg transition hover:scale-105"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
