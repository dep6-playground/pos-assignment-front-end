/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/26/20
 **/

import manageItems from './manage-items.component.html';
import style from './manage-items.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { deleteItem, getAllItems,items, saveItem, updateItem } from '../service/item.service';
import { Item } from '../model/item';

$("app-manage-items").replaceWith('<div id="manage-items">' + manageItems + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

$("#tbl-items tbody").on('click', 'tr .fas', async (event: Event)=>{
    let code = ($(event.target as any).parents("tr").find("td:first-child").text());
    try{
        await deleteItem(code);
        alert("Item has been deleted successfully");
        loadAllItems();
    }catch(error){
        alert("Failed to delete the item");
    }
});

let dataTable: any = null;

async function loadAllItems(){

    let items = await getAllItems();

    if (dataTable) {
        ($("#tbl-items") as any).DataTable().destroy();
        $("#tbl-items tbody tr").remove();
    }

    for (const item of items) {
        $("#tbl-items tbody").append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.description}</td>
                <td>${item.qtyOnHand}</td>
                <td>${item.unitPrice}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
        `);
    }
    
    dataTable = ($("#tbl-items") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering": false,
    });

    dataTable.page(Math.ceil(items.length / 5)-1).draw(false);

    $('#tbl-items tbody').find('tr').each((index,elm)=>{
        $(elm).click(()=>{
            $('#txt-code').val(($($(elm).find('td')[0]).text())); 
            $('#txt-description').val(($($(elm).find('td')[1]).text())); 
            $('#txt-qty').val(($($(elm).find('td')[2]).text())); 
            $('#txt-unitPrice').val(($($(elm).find('td')[3]).text())); 
        })
    });
}

loadAllItems();

$("#btn-save1").click(async () => {

    let code = <string>$("#txt-code").val();
    let description = <string>$("#txt-description").val();
    let qty = <string>$("#txt-qty").val();
    let unitPrice = <string>$("#txt-unitPrice").val();

    let anUpdate:boolean = false;

    for(let i=0; i<items.length; i++){
        if (code==items[i].code){
            anUpdate=true;
            break;
        }
    }

    /* Font-end validation */
    if (!code.match(/^I\d{3}$/) || description.trim().length === 0 || qty.trim().length === 0 || unitPrice.trim().length === 0) {
        alert("Invalid item infromation");
        return;
    }


    if(anUpdate){
        try {
            await updateItem(code);
            alert("Item Updated");
            console.log(items);
            loadAllItems();
        } catch (error) {
            alert("Failed to save the item");
        }
    }
    else{
        try {
            await saveItem(new Item(code, description, qty,unitPrice));
            alert("Item Saved");
            loadAllItems();
        } catch (error) {
            alert("Failed to save the item");
        }

     }

    
});












