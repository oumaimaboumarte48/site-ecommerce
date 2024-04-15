import React, { useState } from 'react'
import { Image } from "@chakra-ui/react"
import { Helmet } from 'react-helmet';

import cover from './cover.jpg'
import { Input,InputGroup, InputLeftElement, Textarea,Button  } from "@chakra-ui/react"
import {BsEnvelope, GiPositionMarker, HiOutlinePhone} from 'react-icons/all'
import './contactuscss.css'
const Contactus = () => {
    const [email, setemail] = useState('')
    const [body, setbody] = useState('')

    const handlesubmit = () =>{
        window.open(`mailto:boumarteoumaima48@gmail.com?subject=Sample&body=${body}`)
    }
    return (

        <div className="contactUs">
            <Helmet>
                <title>Contact</title>
            </Helmet>
        <div className="headerContact">
            <Image className="imageContact" src='https://i.imgur.com/hMwWynM.jpg' alt="contactImage" objectFit="cover"/>
            <div className="text">
                <h2>Contact</h2>  
            </div>
              
        </div>

        <div className="card-contact">
            <div className="sendMsg">
                <h4>Envoie-nous un message</h4>
                    <div className="inputContact">
                        <InputGroup width="450px" >
                            <InputLeftElement       pointerEvents="none"  children={<BsEnvelope className = 'envolope' color="gray.300" />}/>
                            <Input value = {email} onChange = {e=> setemail(e.target.value)} type="text" placeholder="Votre adresse e-mail"/>
                        </InputGroup>
                        
                    </div>
                    <div className="textAreaCnt">
                        <Textarea value = {body} onChange = {e=> setbody(e.target.value)} width="450px"  placeholder="comment pouvons nous aider" height="200px" />
                    </div>
                    <div className="contentContact">
                        <Button onClick = {handlesubmit} borderRadius="90px" colorScheme="teal" variant="solid" size="180px" className="contactBtn">Soumettre</Button>
                    </div>

            </div>
            <div className="showAdrss">
                <div className="box">
                    <div className="iconCtn"><GiPositionMarker opacity="0.8"/></div>
                    <div className="adressCtn">

                        <h3> Address</h3>
                        <p>N°27 Rue 5 Hay Riad El Jadida</p>
                    </div>
                </div>
                    <div className="box">
                    <div className="iconCtn"><HiOutlinePhone opacity="0.8"/></div>
                    <div className="adressCtn">

                        <h3>Parlons</h3>
                        <p className="infoCtn">+212 634 531 012</p>
                    </div>
                </div>
                <div className="box">
                    <div className="iconCtn"><BsEnvelope opacity="0.8"/></div>
                    <div className="adressCtn">

                        <h3>Aide à la vente</h3>
                        <p className="infoCtn">boumarteoumaima48@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
</div>
    )
}

export default Contactus
