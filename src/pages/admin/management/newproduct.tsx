import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { userReducerIntitialState } from "../../../types/reducer-types";
import { useNewwProductMutation } from "../../../redux/api/productAPI";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewProduct = () => {

  const { user } = useSelector(
    (state: { userReducer: userReducerIntitialState }) => state.userReducer
  );

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newProduct] = useNewwProductMutation();
  const navigate = useNavigate();
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async(e:FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!name || !price || stock < 0 || !photo || !category) {
      toast.error('Please fill out all fields');
      return;
    } 
    
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.append("photo", photo!);
    formData.set("category", category);

const res =    await newProduct({
      id: user?._id!,
    formData
})
    
  responseToast(res,navigate,"/admin/product")
    
  };
  
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required={true}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required={true}
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required={true}
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required={true}
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file"   required={true} onChange={changeImageHandler} />
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
