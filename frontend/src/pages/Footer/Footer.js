import React from 'react'
import {FiFacebook, AiOutlineHeart, AiOutlineInstagram, IoLogoYoutube} from 'react-icons/all';
import { Input,Stack } from '@chakra-ui/react'
import './footercss.css'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="footerCmp">
            <footer>
                <div className="footerCategorie">
                    <h1>Catégories</h1>
                    <ul>
                        <li><Link to = '/shop/?cg=Femmes'>Femmes</Link></li>
                        <li><Link to = '/shop/?cg=Hommes'>Hommes</Link></li>
                    </ul>
                </div>

                <div className="fooHelp">
                    <h1>AIDE</h1>
                    <ul>
                        <li>Suivi de commande</li>
                        <li>Retour</li>
                        <li>Expédition</li>
                        <li>FAQ</li>
                    </ul>
                </div>

                <div className="footerGetInTouch">
                    <h1>ENTRER EN CONTACT</h1>
                    <ul>
                        <p>Des questions? Faites-le nous savoir en magasin au N°27 Rue 5 Hay Riad El Jadida, El Jadida 24000 ou appelez-nous au (+212) 634531012</p>
                        <li className="footerIcons">
                            <FiFacebook size="25" />
                        </li>
                        <li className="footerIcons">  
                            <AiOutlineInstagram size="25" />
                        </li>
                        {/* <li className="footerIcons">
                            <IoLogoYoutube size="25"/>
                        </li> */}
                    </ul>
                </div>

                <div className="footerNews">
                    <h1></h1>
                    <ul>
                        <li>
                            <Stack spacing={3}>
                            <Input variant="flushed" placeholder="email@example.com" size="10" width="200px"/>
                            </Stack>
                        </li>
                        <li>
                            <button className="footerBtn">S'abonner</button>
                        </li>
                    </ul>
                </div>

                <div className="creditsIcons">
                    <ul>
                        <li><img src="https://i.imgur.com/AHCoUZO.png" className="img1"/></li>
                        <li><img src="https://i.imgur.com/JZRipBg.png" className="img2" /></li>
                        <li><img src="https://i.imgur.com/l8OAGyo.png" className="img3" /></li>
                        <li><img src="https://i.imgur.com/IDHC2iv.png" className="img4" /></li>
                    </ul>
                    
                </div>
                
                <div className="paragraphFooter"><p>Copyright ©2024 Tous droits réservés Par Oumaima Boumarte</p>
                {/* <Link to = '' >Oumaima Boumarte</Link> */}
                </div>



            </footer>

        </div>
    )
}

export default Footer;
