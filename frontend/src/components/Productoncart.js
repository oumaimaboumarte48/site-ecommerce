import { Image } from '@chakra-ui/image'
import React,{useRef,useState,useEffect} from 'react'
import { Select } from "@chakra-ui/react"
import { VscChromeClose } from "react-icons/all";
import { addToCart,removeFromCart } from '../actions/cartActions';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';



const Productoncart = ({product}) => {
    const dispatch = useDispatch();

    const [qty,setqty] = useState(0)
    const select = useRef(null);
    useEffect(() => {
                // Affiche les images du produit dans la console lors du rendu initial
        console.log(product.images)
        return () => {
        }
                    // Code à exécuter lors du démontage du composant

    },[])
    // Fonction appelée lors du changement de la valeur de l'option du Select
    const optionvalue = () => {
                // Met à jour la quantité en fonction de la valeur sélectionnée
         setqty(parseInt(select.current.value));
    }

        // Fonction pour retirer un produit du panier
    const removeFromCartHandler  = (id) =>{
        dispatch(removeFromCart(id))
    }
    return (
        <div className = 'productcart'>
            <div className = 'imagecart'>
            <Image objectFit="cover" src = {product.images[0]}/>

            </div>
                <div>
                    <Link to = {`/product/${product.product}`}>
                        <h2 className = 'productname'>
                            {product.name}
                        </h2>
                    </Link>

                <h2 className = 'priceproduct'>
                    {product.price}$</h2>
                <h2 className = 'sandh'>
                vendu et expédié par YvesOum</h2>

                </div>
                <div className = 'qtyoption' >
                <Select ref = {select} defaultValue = {product.qty}  onChange ={e =>dispatch(addToCart(product.product,Number(e.target.value)))}>
                    {[...Array(product.countInStock).keys()].map(x=>
                     (
                     <option value={x+1}> {x+1}</option>
                     )
                    )}
                </Select>
                <h2>
                {(qty === 0 ? product.qty*product.price : qty*product.price).toFixed(2)}$
                </h2>
                </div>
                <VscChromeClose className = 'deletecart' size = '26' onClick = {() => removeFromCartHandler(product.product)} />



            
        </div>
    )
}

export default Productoncart
