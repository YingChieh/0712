// JavaScript source code
$(document).ready(function () {

    obj = new Object(); // 暫存guid內容
    arrayList = [];     // 所有guid內容
    i = 0;              // guid 所屬的index值
    var prdate = "";    // 所有[問卷結束時間]內容

    $("#dialog").dialog({  // 編輯視窗
        autoOpen: false,
        height: 435,
        width: 365
    });

    // 【方法一】[匯出RAW檔] closestatus = 1，把[編輯]的內容變[瀏覽]的內容
    $("tr").find("td:eq(9) a").each(function () { // 第9 column(匯出RAW檔)
        if ($(this).attr('closestatus') == 1) {  
            tempId = "#" + $(this).parent().parent().find("td:eq(10) a").attr("id");  // 第10 column(瀏覽)的id
            tempId2 = "#" + $(this).parent().parent().find("td:eq(11) a").attr("id"); // 第11 column(編輯)的id
            $(tempId2).html($(tempId).html()); //[瀏覽]的內容放入[編輯]
        }
    });
    
    // 【方法二】[匯出RAW檔] closestatus = 1，把[編輯]的內容變[瀏覽]的內容
    //$("tr").find("td:eq(9) a").each(function () {
    //    if ($(this).attr('closestatus') == 1) {
    //        //alert($(this).parent().parent().html());
    //        //alert($(this).parent().parent().find("td:eq(10)").html());

    //        $(this).parent().parent().find("td:eq(11)").html($(this).parent().parent().find("td:eq(10)").html());
    //    }
    //});

    // 【方法三】[匯出RAW檔] closestatus = 1，把[編輯]的內容變[瀏覽]的內容
    //$("tr").find("td:eq(9) a").each(function () {
    //    count++;
    //    if ($(this).attr('closestatus') == 1) {
    //        viewId = "#ShowSurvey_" + count;
    //        editId = "#EditSurvey_" + count;
    //        //alert($(viewId).parent().html());
    //        $(editId).parent().html($(viewId).parent().html());
    //    }
    //});

    //更改closestatus = 1 的儲存格
    $("tr").find("td:eq(9) a").each(function () { // 第9 column(匯出RAW檔)
        if ($(this).attr("closestatus") == "1") {
            $(this).parent().attr("BGColor", "red");  // 第9 column 底色紅
            $(this).parent().html("已開放<br>填寫問卷無法設定");  // 第9 column 文字改為 已開放填寫問卷無法設定
        }
    });

    //輸出最後一欄的guid
    $("[id^=GetRAW_]").each(function () { // select id前面字串為GetRAW_
        temp = $(this).attr("guid");      // select guid內容
        obj = { "index": i, "Guid:": temp };
        arrayList.push(obj);
        i++;
    });
    var jsonText = JSON.stringify(arrayList);
    $("#print_guid").text(jsonText); // 顯示所有 guid 在初始頁面下方

    //列出所有結束時間
    $("tr").find("td:eq(6)").each(function () { // 第6 column(問卷結束時間)
        prdate += $(this).text() + "<br>";
    });
    $("#date").html(prdate); // 顯示所有問卷結束時間在初始頁面下方

});

// 點 [匯出RAW] 跳出警告視窗顯示該 guid
function GetRAW(id) {
    thisid = "#" + id;
    alert($(thisid).attr("guid"));
}

// 點 [編輯]
function Edit(id) {
    editID = "#" + id;
    $("#dialog").dialog("open"); // 跳出對話視窗

    $("#dia_content tbody ").remove(); // 初始化表格
    $("#dia_content").append(          // 增加表格內容
        '<tbody><tr><th>學年度</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(1)").text() + '</td>' + // 由 editID 的 parent 去找同 row 第 1 column的內容
        '</tr>' +
        '<tr><th>學期</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(2)").text() + '</td>' +
        '</tr>' +
        '<tr><th>評量類型</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(3)").text() + '</td>' +
        '</tr>' +
        '<tr><th>問卷標題</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(4)").text() + '</td>' +
        '</tr>' +
        '<tr><th>問卷開放時間</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(5)").text() + '</td>' +
        '</tr>' +
        '<tr><th>問卷結束時間</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(6)").text() + '</td>' +
        '</tr>' +
        '<tr><th>問卷建立時間</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(7)").text() + '</td>' +
        '</tr>' +
        '<tr><th>狀態</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(8)").text() + '</td>' +
        '</tr>' +
        '<tr><th>題目</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(9)").html() + '</td>' +
        '</tr>' +
        '<tr><th>瀏覽</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(10)").html() + '</td>' +
        '</tr>' +
        '<tr><th>匯出RAW檔</th>' +
        '<td>' + $(editID).parent().parent().find("td:eq(12)").html() + '</td>' +
        '</tr></tbody>'
    );
};
