/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/26/20
 **/

import './app/app.module';
import style from './style.scss';

var html = '<style>' + style + '</style>';
$("head").append(html);
