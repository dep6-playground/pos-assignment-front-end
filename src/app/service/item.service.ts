import { Item } from "../model/item";

let items: Array<Item> = [];

export function getAllItems(): Promise<Array<Item>> {

    return new Promise((resolve, reject) => {

        // (1) Initiate a XMLHttpRequest
        let http = new XMLHttpRequest();

        // (2) Setting up the call back function
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                // let dom = $(http.responseXML as any);
                // $(dom).find("item").each((index, elm) => {
                //     let code = $(elm).find("code").text();
                //     let description = $(elm).find("description").text();
                //     let unitPrice = $(elm).find("unit-price").text();
                //     let qtyOnHand = $(elm).find("qty-on-hand").text();
                //     items.push(new Item(code, description, +unitPrice, +qtyOnHand));
                // });
                resolve(items = JSON.parse(http.responseText));
            }
        }

        // (3) Let's open the request
        http.open('GET', 'http://localhost:8080/pos/items', true);

        // (4) If we have to set headers

        // (5)
        http.send();

    });
}