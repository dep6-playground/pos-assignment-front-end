export class OrderItem{
    constructor(public orderId: string, public customerId: string, public itemCode: string, public qty: string, public unitPrice:string, public subTotal:string){
    }
}
