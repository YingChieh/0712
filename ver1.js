// JavaScript source code
allFields = [];
i = 0;

$(function () {
    $("#dialog").dialog({
        autoOpen: false,
        buttons: {
            "儲存": savedatafinal,
            "取消": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dialog2").dialog({
        autoOpen: false,
        buttons: {
            "儲存": addData,
            "取消": function () {
                $(this).dialog("close");
            }
        },
        width: 500,
    });

    $("#dialog3").dialog({
        autoOpen: false,
        buttons: {
            "儲存": editData,
            "取消": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#btnAdd").click(function () {
        $("#dialog").dialog("open");
    });

    $("#create-data").click(function () {
        $("#dialog2").dialog("open");
        //--------------初始化RADIO值---------------
        $('#rioFalse').attr("checked", false);
        $('#rioTrue').attr("checked", true);
    });

    //Select改變時的事件
    $("#SaveType").change(function () {
        $("option:selected", this).each(function () {
            select();
        });
    });

    function select() {
        //document.getElementById("print").innerHTML = $("#SaveType").find(":selected").text();
        temp = $("#SaveType").find(":selected").text();
        switch (temp) {
            case "類別說明":
                $("#trTitle").attr("style", "");
                $("#trStatus").attr("style", "display: none");
                break;
            case "單選題(計分)":
                $("#trStatus").attr("style", "");
                $("#trTitle").attr("style", "");
                $("#trOption").attr("style", "");
                break;
            case "單選題(不計分)":
                $("#trStatus").attr("style", "");
                $("#trTitle").attr("style", "");
                $("#trOption").attr("style", "");
                break;
            case "問答題(建議)":
                $("#trStatus").attr("style", "");
                $("#trTitle").attr("style", "");
                $("#trOption").attr("style", "display: none");
                break;
            case "問答題(一般)":
                $("#trStatus").attr("style", "");
                $("#trTitle").attr("style", "");
                $("#trOption").attr("style", "display: none");
                break;
            default:
        }
    }
});

function q(order, ttype, que, anstype) {
    this.Order = order;
    this.Ttype = ttype;
    this.Que = que;
    this.Anstype = anstype;
}

function addData() {
    if ($('input:radio:checked[name="SaveStatus"]').val() == 1)
        print = "必填";
    else if ($('input:radio:checked[name="SaveStatus"]').val() == 0)
        print = "非必填";
    else
        print = "必填";
    //----JSON
    var qObject = new q(++i, $("#SaveType").find(":selected").text(), $("#SaveTitle").val(), print);
    allFields.push(qObject);
    $("#SetTopicTable tbody").append("<tr>" +
        "<td>" + i + "</td>" +
        "<td>" + $("#SaveType").find(":selected").text() + "</td>" +
        "<td>" + $("#SaveTitle").val() + "</td>" +
        "<td>" + print + "</td>" +
        '<td><a href="#" class="ui-icon ui-icon-pencil" onclick="EditQuestion(this)"></a></td>' +
        '<td><a href="#" class="ui-icon ui-icon-trash"  onclick="del(this)"></a></td>' +
        "</tr>");
    //--------------初始化RADIO值---------------

    $('#rioFalse').attr("checked", false);
    $('#rioTrue').attr("checked", true);

    //--------------初始化textbox值---------------
    $('#SaveTitle').attr("value", "");//

    $(this).dialog("close");
}

function editData() {

}

//編輯題目按鈕
function EditQuestion(id) {
    $("#dialog3").dialog("open");
    var temp = $(id).parents('tr');
    var index=$('tr').index(temp);
    alert(allFields[index - 1].Oder);
}

//儲存表格資料
function savedatafinal() {
    $('#test').append(document.write(JSON.stringify(allFields))); //JSON
}

//刪除題目項目
function del(input) {
    var row = $(input).parents('tr');
    var index = $('tr').index(row);
    row.remove();
}

//單選、複選題型，增加選項之表單
function addOption(){
    var value = parseInt($("#hidOptCount").val());
    $("#hidOptCount").val(value + 1);
    $("#Option").append("<div id='opt" + (value + 1) + "' name='groupOpt' class='form-group'><span class='ui-icon ui-icon-triangle-2-n-s' style='margin: 0 auto; float: left; margin-right: .3em;margin-top: .3em;'></span>選項：<input type='text'  name='Label'/>分數：<input type='text' name='Value' onkeyup='return ValidateFloat($(this),value)' /><img onclick=\"delopt('opt" + (value + 1) + "')\" src='images/backimage/fsil.gif'></div>");
    $("#Option").sortable();
}

//刪除題目中設定的選項
function delopt(id) {
    $("#" + id).remove();
}

