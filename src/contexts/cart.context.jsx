import { createContext, useState } from 'react';

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
  addItemToCart: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productsToAdd) => {
    setCartItems(addCartItem(cartItems, productsToAdd));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
};