class Order {
    constructor(
        public address: string,
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = [],
        public id?: string
    ){}
}

class OrderItem {//item da compra
    constructor(public quantity: number, public menuId: string){}// quant do item e sua identificacao
}

export { Order, OrderItem}// 