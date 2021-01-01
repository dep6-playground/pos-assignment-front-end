import { Order } from "../model/order";
let loaded = false;
export let orders: Array<Order>=[];

export function getAllOrders(): Promise<Array<Order>> {
    // To-do: retrive data from backend and fill the customers array

    return new Promise((resolve, reject) => {

        if (!loaded) {

            $.ajax({
                method: "GET",
                url: 'http://localhost:8080/myapp/orders'
            }).then((data)=>{
                orders = data;
                loaded = true;
                resolve(orders);
            }).fail(()=>{
                reject();
            })

        }else{
            resolve(orders);
        }

    });
}

export function saveOrder(orderId: string,customerId:string): Promise<Order> {

    return new Promise((resolve, reject) => {

        $.ajax({
            method: 'POST',
            url: `http://localhost:8080/myapp/orders?orderId=${orderId}&customerId=${customerId}`,
            contentType: 'application/json',
            
        }).then(()=>{
            resolve();
        }).fail(()=>{
            reject();
        })

    });

}

export function deleteOrder(orderId: string): Promise<void>{
    return new Promise((resolve, reject)=>{

        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/myapp/orders?orderId=${orderId}`
        }).then(()=>{
            let index=0;
            for(let i=0; i<orders.length;i++){
                if (orders[i].orderId === orderId){
                    index=i;
                    break;
                }
            }
            orders.splice(index,1);
            resolve(); 
        }).catch(()=>{
            reject();
        })

    });
}