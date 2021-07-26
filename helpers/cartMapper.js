const cartMapper = (cart)=>{
    let totalItems = cart.totalQty, totalValue = cart.totalPrice
    const mappedCart = {}
    let items= []

    for(let item in cart.items){
        items.push(cart.items[item].item)      
    }

    mappedCart.items = items
    mappedCart.totalItems = totalItems
    mappedCart.totalValue = totalValue
    return mappedCart
}



module.exports = {
    cartMapper
}