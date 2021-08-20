

exports.generateSession = async (req, res) => {

    const stripe = require('stripe')(process.env.STRIPE_KEY);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: 'price_1JQJU1Eoe6qswn14Zh4OHha8',
                quantity: 1
            }
        ],
        mode: 'payment',
        payment_method_types: [
            'card',
            'oxxo',
        ],
        success_url: `${process.env.REACT_URL}/pago-completado`,
        cancel_url: `${process.env.REACT_URL}/cancelado`,
    })

    res.json({
        redirect_url: session.url
    })
}