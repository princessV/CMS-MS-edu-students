/**
 * Created by puddingtea07 on 12/6/16.
 */
$('select[name="entries-per-page"]').change(function () {
    var new_rows = $(this).val();
    window.location.href = '/index/callback?page=1&rows=' + new_rows;
});

$('.home-page-btn').click(function () {
    window.location.href = '/index/callback?page=1' + '&rows=' + dataOfRows;
});

$('.pre-page-btn').click(function () {
    window.location.href = '/index/callback?page=' + (parseInt(dataOfCP) - 1) + '&rows=' + dataOfRows;
});

$('.go-page-btn').click(function () {
    var page_index = parseInt($('input[name="page_index"]').val());
    page_index = (page_index > dataOfTP) ? dataOfTP : page_index;
    window.location.href = '/index/callback?page=' + page_index + '&rows=' + dataOfRows;
});

$('.next-page-btn').click(function () {
    window.location.href = '/index/callback?page=' + (parseInt(dataOfCP) + 1) + '&rows=' + dataOfRows;
});

$('.end-page-btn').click(function () {
    window.location.href = '/index/callback?page=' + dataOfTP + '&rows=' + dataOfRows;
});

$(document).ready(function () {
});