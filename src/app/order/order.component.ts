import order from './order.component.html';
import style from './order.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { deleteOrder, getAllOrders } from '../service/order.service';

$("app-order").replaceWith('<div id="order">' + order + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

$("#tbl-orders tbody").on('click', 'tr .fas', async (event: Event)=>{
    let orderId = ($(event.target as any).parents("tr").find("td:first-child").text());
    try{
        await deleteOrder(orderId);
        alert("Order has been deleted successfully");
        loadAllOrders();
    }catch(error){
        alert("Failed to delete the Order Item");
    }
});

let dataTable: any = null;

async function loadAllOrders(){

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

}

loadAllOrders();


