import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss'

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);

  return (
    <div>
      {
        cartItems.map(cartItem => {
          const {id, name, quantity} = cartItem; 
          return (
            <div key ={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <span onClick={() => removeItemFromCart(cartItem)}>-</span>
              <span onClick={() => addItemToCart(cartItem)}>+</span>
            </div>
          )
        }
        )
      }
    </div>
  )
}

export default Checkout;