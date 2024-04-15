// Importation du gestionnaire asynchrone pour les routes Express

import asyncHandler from 'express-async-handler'

// Importation du modèle Order

import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/orders
// @access Private
const addorderitems = asyncHandler(async (req, res) => {

        // Affiche les informations de l'utilisateur connecté (authentifié)

    console.log(req.user)

    // Extraction des données de la requête

    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

        // Vérification si la liste des articles de commande est vide

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
        return
    }else{
                // Création d'une nouvelle commande avec les données de la requête

        const order = new Order({
            user:req.user._id,
            orderItems,

            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

                // Sauvegarde de la nouvelle commande dans la base de données

        const createdOrder = await order.save()

                // Réponse avec la commande créée

        res.status(201).json(createdOrder)
    }
})
    // @desc get order by id
    // @route GET /api/orders/:id
    // @access Private
const getOrderById = asyncHandler(async (req, res) => {

        // Recherche de la commande par son ID et affichage des informations de l'utilisateur associé

    const order  = await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order Not found')
    }
    
})
    // @desc update order to paid
    // @route update /api/orders/:id/pay
    // @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {

        // Recherche de la commande par son ID

    const order  = await Order.findById(req.params.id)
    if(order){

                // Mise à jour du statut de paiement, de la date de paiement et des détails de paiement

        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,

        }

                // Sauvegarde de la commande mise à jour dans la base de données

        const updatedOrder = await order.save()
        res.json(updatedOrder)

    }else{
        res.status(404)
        throw new Error('Order Not found')
    }
    
})


// @desc update order to delivered
    // @route update /api/orders/:id/deliver
    // @access Private
    const updateOrderToDelivered = asyncHandler(async (req, res) => {
        const order  = await Order.findById(req.params.id)
        if(order){

                    // Mise à jour du statut de livraison et de la date de livraison

            order.isDelivered = true
            order.deliveredAt = Date.now()

                    // Sauvegarde de la commande mise à jour dans la base de données

            const updatedOrder = await order.save()
            res.json(updatedOrder)
    
        }else{
            res.status(404)
            throw new Error('Order Not found')
        }
        
    })
    // @desc get logged in user orders
    // @route GET /api/orders/myorders
    // @access Private
const GetMyOrders = asyncHandler(async (req, res) => {

        // Recherche des commandes associées à l'utilisateur connecté

    const orders  = await Order.find({user: req.user._id})
    res.json(orders)
    
})

// @desc get orders
    // @route GET /api/admin/orders
    // @access Private/admin
    const GetOrders = asyncHandler(async (req, res) => {

            // Recherche de toutes les commandes et affichage des informations de l'utilisateur associé

        const orders  = await Order.find({}).populate('user','id name')
        res.json(orders)
        
    })


    // Exportation des fonctions de gestion des commandes

export {addorderitems,getOrderById,updateOrderToPaid,GetMyOrders,GetOrders,updateOrderToDelivered}