import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productsToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productsToAdd.id); 

  //increment quantity if the product is found in cart
  if (existingCartItem) {
    return cartItems.map(cartItem => cartItem.id === productsToAdd.id ? 
      {...cartItem, quantity: cartItem.quantity +1 } 
      : cartItem
    );
  }
  
  return [...cartItems, { ...productsToAdd, quantity: 1 }];
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [], 
  addItemToCart: () => {}, 
  cartItemCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0); 
    setCartItemCount(count);
  }, [cartItems])

  const addItemToCart = (productsToAdd) => {
    setCartItems(addCartItem(cartItems, productsToAdd));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemCount };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
};