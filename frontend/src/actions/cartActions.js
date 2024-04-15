import axios from 'axios'
import {CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADRESSE,CART_SAVE_PAYMENT} from '../constants/cartConstants'

// Action pour ajouter un produit au panier
export const addToCart = (id, qty) => async (dispatch, getState) => {
    // Récupération des détails du produit depuis l'API
const { data } = await axios.get(`/api/products/${id}`)
console.log(data)
  // Dispatch de l'action pour ajouter l'article au panier avec ses détails
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      images: data.images,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })
  // Mise à jour du panier dans le stockage local
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
// Action pour supprimer un article du panier
export const removeFromCart= (id)=> (dispatch,getState)=>{
    // Dispatch de l'action pour supprimer l'article du panier
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id
    })
      // Mise à jour du panier dans le stockage local
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}
// Action pour sauvegarder l'adresse de livraison
export const saveAddressshipping = (data)=> (dispatch,getState)=>{
    // Dispatch de l'action pour sauvegarder l'adresse de livraison
  dispatch({
    type: CART_SAVE_SHIPPING_ADRESSE,
    payload: data
  })
    // Mise à jour de l'adresse de livraison dans le stockage local
  localStorage.setItem('shippingAddress', JSON.stringify(data))

}
// Action pour sauvegarder la méthode de paiement
export const savepaymentmethod = (data)=> (dispatch,getState)=>{
    // Dispatch de l'action pour sauvegarder la méthode de paiement
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: data
  })
    // Mise à jour de la méthode de paiement dans le stockage local
  localStorage.setItem('paymentMethod', JSON.stringify(data))

}