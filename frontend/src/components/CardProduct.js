import {React,useState,useEffect} from 'react'
import {HiOutlineShoppingCart,HiShoppingCart} from "react-icons/all"
import { Image } from "@chakra-ui/react"
import {Link } from 'react-router-dom'
import Rating from './Rating'
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from 'react-redux'
const CardProduct = ({product}) => {
      // State pour gérer l'affichage du bouton "Ajouter au panier"
    const  [showbtn,setShowbtn] = useState(false) 

      // State pour gérer si le produit est dans le panier
    const  [Incart,setIncart] = useState(false) 
    const dispatch = useDispatch();
    const Cart = useSelector(state => state.cart)
    const {cartItems} = Cart
    useEffect(() => {
            // Vérifie si le produit est déjà dans le panier lors de la mise à jour du composant
       const isincart = cartItems.find(x => x.product === product._id);
       if(isincart){
           setIncart(true);

       }
           // La fonction de nettoyage du useEffect
       return () => {
                 // Vous pouvez effectuer des opérations de nettoyage ici si nécessaire
       }
   }, )
   const addcart = ()=>{
        // Met à jour l'état et envoie une action pour ajouter le produit au panier
       setIncart(true);
       dispatch(addToCart(product._id,1))
   }
    
     return (
        <>  
            <div className='cardProduct' onMouseOver={ ()=> {setShowbtn (true)}} 
                                          onMouseLeave= { ()=> {setShowbtn (false)}}>           
                 <div className='imgDiv'>
                         <Image className='imgProduct' boxSize='350px' objectFit='cover' src={product.images[0]} />  
                 </div>
               <div className='bottomcard'>
                       <Link to={`/product/${product._id}`} exact  >     
                            <span>{product.name}</span>     
                       </Link>
                              {Incart ?  <HiShoppingCart className="iconFav" size ='26'/> : <HiOutlineShoppingCart  className="iconFav" color='#999' size='26'  onClick = {addcart}/>  }

                       <div className = 'productpricecard'> {`${product.price} $`}</div>
                       <div className = 'Rating'>
                       <Rating value={product.rating} text={`${product.numReviews} reviews`}/>

                       </div>

                             
               </div>
              
                      <Link to={`/product/${product._id}`} exact >
                             <button className= { showbtn ? 'QuickView QuickViewActive' : 'QuickView' }> Voir les détails</button>
                      </Link>   
             </div>      
         </>
 
    )
}

export default CardProduct
