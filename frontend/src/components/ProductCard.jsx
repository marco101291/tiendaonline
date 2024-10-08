import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const ProductCard = ({product}) =>{
     const dispatch = useDispatch();

     const handleAddToCart = () => {
          dispatch(addItem({ ...product, quantity : 1 }));
     }

     return(
          
               <div className="border p-4 rounded shadow-md transition">
                    <Link to={`/products/${product.id}`}>
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4"/>
                    </Link>
                    <h2 className="text-lg">{product.name}</h2>
                    <p className="text-gray-600">${product.price}</p>
                    <button
                         onClick={handleAddToCart}
                         className="mt-2 bg-blue-600 text-white py-1 px-2 rounded"
                    >
                         Add to Cart
                    </button>
               </div>
          
     )
}

export default ProductCard;