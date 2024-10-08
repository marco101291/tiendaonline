import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart, purchaseCart, incrementQuantity, decrementQuantity, resetStatus } from "../redux/cartSlice";
import {Link, useNavigate} from 'react-router-dom';
import RelatedProducts from "./RelatedProducts";

const Cart = () =>{


     //Gets items, purchase and user state from store using a selector
     const cartItems = useSelector((state)=> state.cart.items);
     const purchaseStatus = useSelector((state)=> state.cart.purchaseStatus);
     const user = useSelector((state)=>state.auth.user);
     const dispatch = useDispatch();
     const navigate = useNavigate();

     //Sends the dispatch to trigger purchase API
     const handlePurchase = () => {
          if(!user) {
               navigate('/login');
          } else {
               dispatch(purchaseCart());
          }
     };


     //Functions to add or decrement quantity and cart emptying


     const handleIncrement = (id) => {
          dispatch(incrementQuantity(id));
     }
     const handleDecrement = (id) => {
          dispatch(decrementQuantity(id));
     }

     const handleRemove = (id) => {
          dispatch(removeItem(id));
     };

     const handleClearCart = () => {
          dispatch(clearCart());
     }

     //Adds item quantity to total
     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

     //Adds quantity and all kind of items to total price
     const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
     
     setTimeout(()=>{
          if(purchaseStatus !== 'idle'){
               
               dispatch(resetStatus())
          }
     },2000)

     const currentProductId = cartItems.length > 0 ? cartItems[0].id : null;

     return(
          <div className="container mx-auto p-4 flex flex-col md:flex-row">
               <div className="w-full md:w-2/3">
               <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
               {cartItems.length === 0 && purchaseStatus === 'idle' ? (
               <div>
                    <p>Your cart is empty.</p>
                    <Link to="/" className="text-blue-500 underline">Continue Shopping</Link>
               </div>
               ) : (
               <>
                    <ul>
                    {cartItems.map((item) => (
                         <li key={item.id} className="flex justify-between items-center mb-2">
                         <div className="flex items-center">
                         <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                         <div>
                              <p>{item.name}</p>
                              <p>{item.price} x {item.quantity}</p>
                              <div className="flex items-center mb-4">
                                   <button onClick={() => handleDecrement(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                        -
                                   </button>
                                   <span className="mx-4">{item.quantity}</span>
                                   <button onClick={() => handleIncrement(item.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                                        +
                                   </button>
                              </div>
                                   <button
                                   onClick={() => handleRemove(item.id)}
                                   className="text-red-600"
                                   >
                                   Remove Item
                                   </button>
                              </div>
                         </div>
                         
                         </li>
                    ))}
                    </ul>
                    <div className="mt-4">
                    <p>Total Items: {totalItems}</p>
                    <p className="mb-3">Total Price: ${totalPrice.toFixed(2)}</p>
                    <button
                         onClick={handlePurchase}
                         className="bg-green-600 text-white py-2 px-4 rounded mr-2"
                         disabled={purchaseStatus === 'loading'}
                    >
                         {purchaseStatus === 'loading' ? 'Processing...' : 'Purchase'}
                    </button>
                    <button
                         onClick={handleClearCart}
                         className="bg-red-600 text-white py-2 px-4 rounded"
                    >
                         Clear Cart
                    </button>
                    <Link to="/" className="text-blue-500 py-2 px-4 ml-2">
                         Continue Shopping
                    </Link>
                    </div>
                    {purchaseStatus === 'succeeded' && (
                    <p className="mt-2 text-green-600">Purchase successful</p>
                    )}
                    {purchaseStatus === 'failed' && (
                    <p className="mt-2 text-red-600">Purchase failed. Try again</p>
                    )}
               </>
               )}
                    
               </div>
               <div className="w-full md:w-1/3 md:pl-4 mt-8 md:mt-0">
                    {currentProductId && <RelatedProducts currentProductId={currentProductId} />}
               </div>
          </div>
     )
        
}

export default Cart;