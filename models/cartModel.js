module.exports = class Cart{
    constructor(oldCart){
        this.items = oldCart.items || {},
        this.totalQty = oldCart.totalQty ||0,
        this.totalPrice = oldCart.totalPrice || 0
    }
    add(item , id){
        let storedItem = this.items[id];
        if(!storedItem){
            let inItem = {
                item_id : id,
                item_name: item.product_name,
                qty: 0,
                value: item.base_value+ (item.base_value*item.tax_rate)
            }
            storedItem =  this.items[id] = {item: inItem , qty: 0, value: 0}
        }
        storedItem.qty++;
        storedItem.item.qty = storedItem.qty
        storedItem.value = storedItem.item.value*storedItem.qty
        this.totalQty++,
        this.totalPrice += storedItem.item.value 
    }

    generateArray(){
        let arr = []
        for(let id in this.items){
            arr.push(this.items[id])
        }
        return arr
    }
}