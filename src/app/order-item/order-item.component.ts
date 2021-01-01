import orderItem from './order-item.component.html';
import style from './order-item.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { getAllOrderItems,deleteOrderItem, saveOrderItem } from '../service/place-order.service';
import { getAllCustomers } from '../service/customer.service';
import { getAllItems} from '../service/item.service';
import { OrderItem } from '../model/order-item';
import { saveOrder } from '../service/order.service';
import {getAllOrders} from '../service/order.service'

let orderID = 'O001';

$("app-order-item").replaceWith('<div id="order-item">' + orderItem + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

$("#tbl-order-items tbody").on('click', 'tr .fas', async (event: Event)=>{
    let orderId = ($(event.target as any).parents("tr").find("td:first-child").text());
    let itemCode = ($(event.target as any).parents("tr").find("td:nth-child(3)").text());
    try{
        await deleteOrderItem(orderId,itemCode);
        alert("Order Item has been deleted successfully");
        loadAllOrderItems();
    }catch(error){
        alert("Failed to delete the Order Item");
    }
});

$('#tbl-order-items tbody .fas').on('mousemove',async function(){
    alert('hutta');
})


$('#customers-list').on('change',async function(){
    let customers=await getAllCustomers();
    let customerId=$(this).val() as string;
    for(let i=0; i<customers.length;i++){
        if(customers[i].id == customerId){
            $('#txt-name1').val(customers[i].name);
            $('#txt-address1').val(customers[i].address);
        }
    }
})

$('#items-list').on('change',async function(){
    let items=await getAllItems();
    let itemCode=$(this).val() as string;
    for(let i=0; i<items.length;i++){
        if(items[i].code == itemCode){
            $('#txt-description1').val(items[i].description);
            $('#txt-unitPrice1').val(items[i].unitPrice);
        }
    }
})

let dataTable: any = null;

async function loadAllOrderItems(){

    let orderItems = await getAllOrderItems();

    if (dataTable) {
        ($("#tbl-order-items") as any).DataTable().destroy();
        $("#tbl-order-items tbody tr").remove();
    }

    for (const orderitem of orderItems) {
        $("#tbl-order-items tbody").append(`
            <tr>
                <td>${orderitem.orderId}</td>
                <td>${orderitem.customerId}</td>
                <td>${orderitem.itemCode}</td>
                <td>${orderitem.qty}</td>
                <td>${orderitem.unitPrice}</td>
                <td>${orderitem.subTotal}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
        `);
    }
    
    dataTable = ($("#tbl-order-items") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering": false,
    });

    dataTable.page(Math.ceil(orderItems.length / 5)-1).draw(false);

}

loadAllOrderItems();


async function loadCustomersAndItems(){
    let customers = await getAllCustomers();
    let items = await getAllItems();
    for(let i=0; i<customers.length;i++){
        $('#customers-list').append(`<option>${customers[i].id}</option>`)
    }
    for(let i=0; i<items.length;i++){
        $('#items-list').append(`<option>${items[i].code}</option>`)
    }
}

loadCustomersAndItems();

function isNumber(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}

$("#btn-add").click(async () => {

    let orderId=orderID;
    let customerId = <string>$("#customers-list").val();
    let itemCode = <string>$("#items-list").val();
    let unitPrice = <string>$("#txt-unitPrice1").val();
    let qty = <string>$("#txt-qty1").val();
    let subTotal = (parseInt(qty)*parseFloat(unitPrice)).toString();

    if (!isNumber(qty)){
        alert('Please enter a valid quantity!');
        return;
    }
    
    try {
        await saveOrderItem(new OrderItem(orderId, customerId,itemCode, qty,unitPrice,subTotal));
        alert("OrderItem Saved");
        loadAllOrderItems();
    } catch (error) {
        alert("Failed to save the OrderItem");
    }

    $('#customers-list').prop('disabled',true);

    
});

$("#btn-place").click(async () => {

    let orderId=orderID;
    let customerId = <string>$($($("#tbl-order-items tbody").find('tr')[0]).find('td')[1]).text();

    try {
        await saveOrder(orderId,customerId);
        alert("Order Placed");
        let orders = await getAllOrders();

        if (dataTable) {
            ($("#tbl-orders") as any).DataTable().destroy();
            $("#tbl-orders tbody tr").remove();
        }

        for (const order of orders) {
            $("#tbl-orders tbody").append(`
                <tr>
                    <td>${order.orderId}</td>
                    <td>${order.customerId}</td>
                    <td>${order.orderTotal}</td>
                    <td><i class="fas fa-trash"></i></td>
                </tr>
            `);
        }
    
        dataTable = ($("#tbl-orders") as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
            "ordering": false,
        });

        dataTable.page(Math.ceil(orders.length / 5)-1).draw(false);
        
        window.location.reload();
    } catch (error) {
        alert("Failed to place the Order");
    }




    
});






