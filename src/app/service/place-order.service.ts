import { OrderItem } from "../model/order-item";
let loaded = false;
export let orderItems: Array<OrderItem>=[];


export function getAllOrderItems(): Promise<Array<OrderItem>> {
    // To-do: retrive data from backend and fill the customers array

    return new Promise((resolve, reject) => {

        if (!loaded) {

            $.ajax({
                method: "GET",
                url: 'http://localhost:8080/myapp/orderItems'
            }).then((data)=>{
                orderItems = data;
                loaded = true;
                resolve(orderItems);
            }).fail(()=>{
                reject();
            })

        }else{
            resolve(orderItems);
        }

    });
}

export function saveOrderItem(orderItem: OrderItem): Promise<void> {

    return new Promise((resolve, reject) => {

        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/myapp/orderItems',
            contentType: 'application/json',
            data: JSON.stringify(orderItem)
        }).then(()=>{
            orderItems.push(orderItem);
            resolve();
        }).fail(()=>{
            reject();
        })

    });

}

export function deleteOrderItem(orderId: string,itemCode:string): Promise<void>{
    return new Promise((resolve, reject)=>{

        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/myapp/orderItems?orderId=${orderId}&itemCode=${itemCode}`
        }).then(()=>{
            let index=0;
            for(let i=0; i<orderItems.length;i++){
                if (orderItems[i].orderId === orderId && orderItems[i].itemCode===itemCode){
                    index=i;
                    break;
                }
            }
            orderItems.splice(index,1);
            resolve(); 
        }).catch(()=>{
            reject();
        })

    });
}
/* 
export function updateOrderItem(orderId: String, itemCode:string):Promise<void>{

    return new Promise((resolve,reject)=>{

        $.ajax({
            method: "PUT",
            url: `http://localhost:8080/myapp/orderItems?orderId=${orderId}&itemCode=${itemCode}`,
            data: JSON.stringify({
                customerId : $('#customers-list').val(),
                qty : $('#txt-qty').val(),
                unitPrice : $('#txt-unitPrice').val(),
                subTotal : $('#txt-subTotal').val()
            })
        }).then(()=>{
            for(let i=0; i<items.length;i++){
                if (code===items[i].code){
                    items[i].description  = $('#txt-description').val() as string;
                    items[i].qtyOnHand  = $('#txt-qty').val() as string;
                    items[i].unitPrice = $('#txt-unitPrice').val() as string;
                }
            }
            resolve(); 
        }).catch(()=>{
            reject();
        })
    })  
} */
