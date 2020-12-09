/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/26/20
 **/

import manageCustomers from './manage-customers.component.html';
import style from './manage-customers.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';

$("app-manage-customers").replaceWith('<div id="manage-customers">' + manageCustomers + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

($("#tbl-customers") as any).DataTable({
    "info": false,
    "searching": false,
    "lengthChange": false,
    "pageLength": 5,
});


