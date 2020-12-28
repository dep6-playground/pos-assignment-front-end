import { Item } from "../model/item";

export let items: Array<Item> = [];
let loaded = false;

export function getAllItems(): Promise<Array<Item>> {
    // To-do: retrive data from backend and fill the customers array

    return new Promise((resolve, reject) => {

        if (!loaded) {

            $.ajax({
                method: "GET",
                url: 'http://localhost:8080/myapp/items'
            }).then((data)=>{
                items = data;
                loaded = true;
                resolve(items);
            }).fail(()=>{
                reject();
            })

        }else{
            resolve(items);
        }

    });
}

export function saveItem(item: Item): Promise<void> {

    return new Promise((resolve, reject) => {

        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/myapp/items',
            contentType: 'application/json',
            data: JSON.stringify(item)
        }).then(()=>{
            items.push(item);
            resolve();
        }).fail(()=>{
            reject();
        })

    });

}

export function deleteItem(code: string): Promise<void>{
    return new Promise((resolve, reject)=>{

        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/myapp/items?code=${code}`
        }).then(()=>{
            items.splice(items.findIndex((elm)=>elm.code===code),1);
            resolve(); 
        }).catch(()=>{
            reject();
        })

    });
}

export function updateItem(code: String):Promise<void>{

    return new Promise((resolve,reject)=>{

        $.ajax({
            method: "PUT",
            url: `http://localhost:8080/myapp/items?code=${code}`,
            data: JSON.stringify({
/*                 code:null,
 */                description : $('#txt-description').val(),
                qtyOnHand : $('#txt-qty').val(),
                unitPrice : $('#txt-unitPrice').val()
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

    
}