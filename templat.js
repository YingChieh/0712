//BIGEN搜尋
function initLocalPage() {
    $("tr  td:nth-child(10) a").each(function () {
        if ($(this).attr("closestatus") == "1")
        {
                    var row = $(this).parents('tr');
                    row.find("td:nth-child(10)").html("<span class='label label-danger'>已開放填寫問卷無法設定</span>");
                    row.find("td:nth-child(10)").css("background-color", "#FFABAB");
        }
    });
}
function Search() {
    var Values = new Array();
    var Obj = new Object;
    var ddlYear = $("#ddlYear").val();
    var ddlSemester = $("#ddlSemester").val();
    var txtTASV_Title = $("#txtTASV_Title").val();
    var ddlTASV_Status = $("#ddlTASV_Status").val();
    var ddlTASM_Class = $("#ddlTASM_Class").val();
    Obj.ddlYear = ddlYear;
    Obj.ddlSemester = ddlSemester;
    Obj.txtTASV_Title = txtTASV_Title;
    Obj.ddlTASV_Status = ddlTASV_Status;
    Obj.ddlTASM_Class = ddlTASM_Class;
    Obj.Page = "1";
    Obj.Type = "";
    var os = new OrderSort("");
    Obj.OrderType = os.ColumnType;
    Obj.OrderColumn = os.Column;
    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    Values.push(Obj);

    var objData = ProcessDataFunction(
       "TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.CTL&N=TA.CTL",
       "text",
       JSON.stringify(Values)
       );

    document.getElementById("formTable").innerHTML = "";
    $("#formTable").append(objData);
    initPage();
    initLocalPage();
}
function Order(id) {
    var os = new OrderSort(id);
    Search();
}
function Clear() {
    $("select").val("");
    $("#txtSV_Title").val("");
}
//END搜尋
//BIGEN新增問卷表頭
function Add() {
    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    var Type = 'Add';
    var edit_dialog = $("#edit_dialog").dialog({
        position: { my: "center top", at: "center top", of: top },
        autoOpen: false,
        title: "新增課程問卷設定",
        width: 900,
        modal: true,
        close: function (event, ui) { $("#edit_dialog").html(""); },
        closeOnEscape: true,
        buttons: {
            "儲存": function () {
                var status = AddSave();
                if (status == "1") {
                    $("#edit_dialog").html("");
                    edit_dialog.dialog("close");
                    Search();
                }
            },
            "取消": function () {
                $("#edit_dialog").html("");
                edit_dialog.dialog("close");
            }
        }
    });
    edit_dialog.load("TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.API&N=TA.API&Type=" + Type).dialog('open');
}
function Addinit() {
    $('#txtAddTASV_OpenTime').datetimepicker({
        addSliderAccess: true,
        sliderAccessArgs: { touchonly: false },
        showOn: "both",
        buttonImage: "images/i_calendar.gif",
        buttonImageOnly: true,
        dateFormat: "yy-m-d"
    });
    $('#txtAddTASV_OpenTime').val("");

    $('#txtAddTASV_EndTime').datetimepicker({
        addSliderAccess: true,
        sliderAccessArgs: { touchonly: false },
        showOn: "both",
        buttonImage: "images/i_calendar.gif",
        buttonImageOnly: true,
        dateFormat: "yy-m-d",
        hour: 23,
        minute: 59,
        second: 59
    });
    $('#txtAddTASV_EndTime').val("");
    initPage();
}
function AddSave() {
    var Values = new Array();
    var Obj = new Object;
    var dllAddTASM_Year = $("#dllAddTASM_Year").val();
    var dllAddTASM_Semester = $("#dllAddTASM_Semester").val();
    var dllAddTASM_Class = $("#dllAddTASM_Class").val();
    var txtAddTASV_Title = $("#txtAddTASV_Title").val();
    var txtAddTASV_Abstract = $("#txtAddTASV_Abstract").val();
    var txtAddTASV_OpenTime = $("#txtAddTASV_OpenTime").val();
    var txtAddTASV_EndTime = $("#txtAddTASV_EndTime").val();
    var rdoStatus = $("input:radio[name='rdoStatus']:checked").val();
    Obj.Type = 'AddSave';
    //Obj.ID = $("#hidSVID").val();
    Obj.dllAddTASM_Year = dllAddTASM_Year;
    Obj.dllAddTASM_Semester = dllAddTASM_Semester;
    Obj.dllAddTASM_Class = dllAddTASM_Class;
    Obj.txtAddTASV_Title = txtAddTASV_Title;
    Obj.txtAddTASV_Abstract = txtAddTASV_Abstract;
    Obj.txtAddTASV_OpenTime = txtAddTASV_OpenTime;
    Obj.txtAddTASV_EndTime = txtAddTASV_EndTime;
    Obj.rdoStatus = rdoStatus;
    Values.push(Obj);

    var objData = ProcessDataFunction(
     "TASetSurvey.aspx?D=TA.CTL&N=TA.CTL",
     "json",
     JSON.stringify(Values)
     );

    alert(objData.Msg);
    return objData.RESULT;
}
//END新增問卷表頭
//BIGEN編輯問卷表頭
function Edit(id) {
    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    var GUID = $("#" + id).attr("GUID");
    var Type = 'Edit';
    var edit_dialog = $("#edit_dialog").dialog({
        position: { my: "center top", at: "center top", of: top },
        autoOpen: false,
        title: "編輯課程問卷設定",
        width: 900,
        modal: true,
        close: function (event, ui) { $("#edit_dialog").html(""); },
        closeOnEscape: true,
        buttons: {
            "儲存": function () {
                var status = EditSave();
                if (status == "1") {
                    $("#edit_dialog").html("");
                    edit_dialog.dialog("close");
                    Search();
                }
            },
            "取消": function () {
                $("#edit_dialog").html("");
                edit_dialog.dialog("close");
            }
        }
    });
    edit_dialog.load("TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.API&N=TA.API&Type=" + Type + "&Guid=" + GUID).dialog('open');
}
function Editinit() {
    var Values = new Array();
    var arrayItem = new Array("hidden");
    Values = GetControlData(arrayItem);
    var Obj1 = new Object;
    Obj1.Type = "InitEdit";
    Values.push(Obj1);

    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    var objData = ProcessDataFunction(
        "TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.CTL&N=TA.CTL",
        "json",
        JSON.stringify(Values)
        );
    //初始化
    $('#txtAddTASV_OpenTime').datetimepicker({
        addSliderAccess: true,
        sliderAccessArgs: { touchonly: false },
        showOn: "both",
        buttonImage: "images/i_calendar.gif",
        buttonImageOnly: true,
        dateFormat: "yy-m-d"
    });
    $('#txtAddTASV_OpenTime').val("");

    $('#txtAddTASV_EndTime').datetimepicker({
        addSliderAccess: true,
        sliderAccessArgs: { touchonly: false },
        showOn: "both",
        buttonImage: "images/i_calendar.gif",
        buttonImageOnly: true,
        dateFormat: "yy-m-d",
        hour: 23,
        minute: 59,
        second: 59
    });
    $('#txtAddTASV_EndTime').val("");
    //初始化選項
    $("#dllAddTASM_Year").val(objData[0].TASM_Year);
    $("#dllAddTASM_Semester").val(objData[0].TASM_Semester);
    $("#dllAddTASM_Class").val(objData[0].TASM_Class);
    $("#dllAddTASM_Year").attr("disabled",true);
    $("#dllAddTASM_Semester").attr("disabled", true);
    $("#dllAddTASM_Class").attr("disabled", true);

    $("#txtAddTASV_Title").val(objData[0].TASV_Title);
    $("#txtAddTASV_Abstract").val(objData[0].TASV_Abstract);
    $("#txtAddTASV_OpenTime").val(objData[0].TASV_OpenTime);
    $("#txtAddTASV_EndTime").val(objData[0].TASV_EndTime);
    if (objData[0].TASV_Status == 1) {
        $("#rdoStatus1").attr("checked", "checked");
    }
    if (objData[0].TASV_Status == 0) {
        $("#rdoStatus0").attr("checked", "checked");
    }
    initPage();
}
function EditSave() {
    var Values = new Array();
    var Obj = new Object;
    var hidGuid = $("#hidGuid").val();
    var dllAddTASM_Year = $("#dllAddTASM_Year").val();
    var dllAddTASM_Semester = $("#dllAddTASM_Semester").val();
    var dllAddTASM_Class = $("#dllAddTASM_Class").val();
    var txtAddTASV_Title = $("#txtAddTASV_Title").val();
    var txtAddTASV_Abstract = $("#txtAddTASV_Abstract").val();
    var txtAddTASV_OpenTime = $("#txtAddTASV_OpenTime").val();
    var txtAddTASV_EndTime = $("#txtAddTASV_EndTime").val();
    var rdoStatus = $("input:radio[name='rdoStatus']:checked").val();
    Obj.Type = 'EditSave';
    Obj.hidGuid = hidGuid;
    Obj.dllAddTASM_Year = dllAddTASM_Year;
    Obj.dllAddTASM_Semester = dllAddTASM_Semester;
    Obj.dllAddTASM_Class = dllAddTASM_Class;
    Obj.txtAddTASV_Title = txtAddTASV_Title;
    Obj.txtAddTASV_Abstract = txtAddTASV_Abstract;
    Obj.txtAddTASV_OpenTime = txtAddTASV_OpenTime;
    Obj.txtAddTASV_EndTime = txtAddTASV_EndTime;
    Obj.rdoStatus = rdoStatus;
    Values.push(Obj);

    var objData = ProcessDataFunction(
     "TASetSurvey.aspx?D=TA.CTL&N=TA.CTL",
     "json",
     JSON.stringify(Values)
     );

    alert(objData.Msg);
    return objData.RESULT;
}
//END編輯問卷表頭
//BIGEN編輯問卷題目
//問卷題目列表
function setQuestion(id) {
    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    var GUID = $("#" + id).attr("GUID");
    var Type = 'EditTopic';
    $("#edit_dialog2").dialog();
    $("#edit_dialog2").dialog("close");
    var edit_dialog = $("#edit_dialog").dialog({
        position: { my: "center top", at: "center top", of: top },
        autoOpen: false,
        title: "編輯課程問卷題目",
        width: 900,
        modal: true,
        close: function (event, ui) {
            if ($("#edit_dialog2").dialog("isOpen")) {
                $("#edit_dialog2").dialog("close");
                $("#edit_dialog2").html("");
            }
            $("#edit_dialog").html("");
        },
        closeOnEscape: true,
        buttons: {
            "儲存": function () {
                var status = EditTopicSave();
                if (status == "1") {
                    $("#edit_dialog").html("");
                    edit_dialog.dialog("close");
                    Search();
                }
            },
            "取消": function () {
                if ($("#edit_dialog2").dialog("isOpen"))
                {
                    $("#edit_dialog2").dialog("close");
                    $("#edit_dialog2").html("");
                }
                $("#edit_dialog").html("");
                edit_dialog.dialog("close");
            }
        }
    });
    edit_dialog.load("TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.API&N=TA.API&Type=" + Type + "&Guid=" + GUID).dialog('open');
}
//問卷題目列表初始化
function setQuestionInit() {
    var Values = new Array();
    var arrayItem = new Array("hidden");
    Values = GetControlData(arrayItem);
    var Obj1 = new Object;
    Obj1.Type = "InitSetQuestion";
    Values.push(Obj1);

    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    var objData = ProcessDataFunction(
        "TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.CTL&N=TA.CTL",
        "json",
        JSON.stringify(Values)
        );
    $("#hidTopicJson").val(objData[0].TASV_Topic_Json);
    var objData = JSON.parse($("#hidTopicJson").val());
    if (objData != undefined) {
        for (var i = 0; i < objData.length ; i++) {
            var JsonObj = JSON.parse(objData[i]);

            var txtType = "";
            var txtStatus = "";

            switch (JsonObj.Type) {
                case "0":
                    txtType = "類別說明";
                    break;
                case "1":
                    txtType = "單選題(計分)";
                    break;
                case "2":
                    txtType = "單選題(不計分)";
                    break;
                case "3":
                    txtType = "問答題(建議)";
                    break;
                case "4":
                    txtType = "問答題(一般)";
                    break;
                case "5":
                    txtType = "單欄輸入框(限數字格式)";
                    break;
                case "":
                    errorMsg += "請選擇題型\n";
                    break
            }
            switch (JsonObj.Required) {
                case "0":
                    txtStatus = "非必填";
                    break;
                case "1":
                    txtStatus = "必填";
                    break;
                case "":
                    txtStatus = "";
                    break;
            }

            $("#SetTopicTable tbody").append(
            "<tr id=\"" + JsonObj.ID + "\">" +
            "<td align=\"center\"><span class=\"ui-icon ui-icon-arrowthick-2-n-s\" style='margin: 0 auto;'></span></td>" +
            "<td align=\"center\">" + txtType + "</td>" +
            "<td align=\"center\">" + JsonObj.Title + "</td>" +
            "<td align=\"center\">" + txtStatus + "</td>" +
            "<td align=\"center\"><a href=\"#\" class=\"ta_bn_edit\" onclick=\"EditQuestion(this);return false;\" GUID = \"" + JsonObj.ID + "\"><span>編輯</span></a></td>" +
            "<td align=\"center\"><a href=\"#\" class=\"ta_bn_del\" onclick=\"delTopic(this);return false;\"><span>刪除</span></a></td>" +
            "</tr>");
            $("[GUID = '" + JsonObj.ID + "']").attr("Content", JSON.stringify(JsonObj));
        }
    }
    $("#SetTopicTable tbody").sortable();
}
//問卷題目儲存
function EditTopicSave() {
    var Values = new Array();
    var TopicValues = new Array();
    var Obj = new Object();
    Obj.TASVID = $("#hidGuid").val();
    Obj.Type = 'EditTopicSave';
    $("#SetTopicTable tbody tr").each(function () {
        var ObjTopic = $("[GUID = '" + $(this).attr("id") + "']").attr("Content");
        TopicValues.push(ObjTopic);
    });
    Obj.Topic = TopicValues;
    Values.push(Obj);
    var objData = ProcessDataFunction(
     "TASetSurvey.aspx?D=TA.CTL&N=TA.CTL",
     "json",
     JSON.stringify(Values)
     );

    alert(objData.Msg);
    return objData.RESULT;
}
//新增問卷題目
function AddQuestion() {
    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    var Type = 'AddQuestion';
    var edit_dialog2 = $("#edit_dialog2").dialog({
        position: { my: "center top", at: "center top", of: top },
        autoOpen: false,
        title: "新增問卷題目",
        width: 750,
        modal: true,
        close: function (event, ui) { $("#edit_dialog2").html(""); },
        closeOnEscape: true,
        buttons: {
            "儲存": function () {
                var status = SaveQuestion();
                if (status == "1") {
                    $("#edit_dialog2").html("");
                    edit_dialog2.dialog("close");
                    $("#SetTopicTable tbody").sortable();
                }
            },
            "取消": function () {
                $("#edit_dialog2").html("");
                edit_dialog2.dialog("close");
            }
        }
    });
    edit_dialog2.load("TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.API&N=TA.API&Type=" + Type).dialog('open');
}
//新增問卷題目，選擇題型時的表單連動處理
function saveTypechange(value) {
    if (value == "0") {
        $("#trTitle").css("display", "");
        $("#trStatus").css("display", "none");
        $("#trOption").css("display", "none");
    }
    if (value == "1" || value == "2") {
        //$("div[name='groupOpt']").remove();
        $("#trStatus").css("display", "");
        $("#trTitle").css("display", "");
        $("#trOption").css("display", "");
    }
    if (value == "3" || value == "4" || value == "5") {
        $("#trStatus").css("display", "");
        $("#trTitle").css("display", "");
        $("#trOption").css("display", "none");
    }

}
//單選、複選題型，增加選項之表單
function addOption() {
    var value = parseInt($("#hidOptCount").val());
    $("#hidOptCount").val(value + 1);
    $("#Option").append("<div id='opt" + (value + 1) + "' name='groupOpt' class='form-group'><span class='ui-icon ui-icon-triangle-2-n-s' style='margin: 0 auto; float: left; margin-right: .3em;margin-top: .3em;'></span>選項：<input type='text'  name='Label'/>分數：<input type='text' name='Value' onkeyup='return ValidateFloat($(this),value)' /><img onclick=\"delopt('opt" + (value + 1) + "')\" src='images/backimage/fsil.gif'></div>");
    $("#Option").sortable();
}
//將問卷題目設定加入問卷題目列表
function SaveQuestion() {
    //var Values = new Array();
    var Obj = new Object;
    var txtType = "";
    var txtTitle = $("#SaveTitle").val();
    var txtStatus = "";
    var txtID = createGuid();
    var errorMsg = "";
    while ($("#" + txtID).length > 0) {
        txtID = createGuid();
    }
    Obj.ID = txtID;
    Obj.Type = $("#ddlSaveType").val();
    Obj.Title = txtTitle;
    Obj.Required = $("input:radio[name='SaveStatus']:checked").val()
    Obj.Verify = "";
    var optGrp = new Array();
    $("div[name='groupOpt']").each(function () {
        var Objopt = new Object;
        var Label = $(this).children("input").eq(0).val();
        var Value = $(this).children("input").eq(1).val();
        Objopt.Label = Label;
        Objopt.Value = Value;
        optGrp.push(Objopt);
        //資料驗證
        var checknum = 0;
        if ($("#ddlSaveType").val() == "1" && Value == "")
        {
            errorMsg += "選項「" + Label + "」分數不得為空值!\n";
        }
        if (Label == "")
        {
            errorMsg += "【選項】不得有空值\n";
        }
        $("[name='Label']").each(function () {
            if ($(this).val() == Label)
            {
                checknum++;
            }
        });
        if (checknum > 1)
        {
            errorMsg += "選項「" + Label + "」有重複選項\n";
        }
    });
    Obj.Option = optGrp;
    //Values.push(Obj);

    switch ($("#ddlSaveType").val()) {
        case "0":
            txtType = "類別說明";
            break;
        case "1":
            txtType = "單選題(計分)";
            break;
        case "2":
            txtType = "單選題(不計分)";
            break;
        case "3":
            txtType = "問答題(建議)";
            var checkType3Num = 0;
            $("#SetTopicTable tbody tr  td:nth-child(2)").each(function () {
                if ($(this).html() == "問答題(建議)") {
                    checkType3Num++;
                }
            });
            if (checkType3Num > 0) {
                errorMsg += "問答題(建議)僅能設定一題\n";
            }
            break;
        case "4":
            txtType = "問答題(一般)";
            break;
        case "5":
            txtType = "單欄輸入框(限數字格式)";
            break;
        case "":
            errorMsg += "請選擇題型\n";
            break
    }
    switch ($("input:radio[name='SaveStatus']:checked").val()) {
        case "0":
            txtStatus = "非必填";
            break;
        case "1":
            txtStatus = "必填";
            break;
        case "":
            txtStatus = "";
            break;
    }

    if (errorMsg == "") {
        $("#SetTopicTable tbody").append(
        "<tr id=\"" + txtID + "\">" +
        "<td align=\"center\"><span class='ui-icon ui-icon-arrowthick-2-n-s' style='margin: 0 auto;'></span></td>" +
        "<td align=\"center\">" + txtType + "</td>" +
        "<td align=\"center\">" + txtTitle + "</td>" +
        "<td align=\"center\">" + txtStatus + "</td>" +
        "<td align=\"center\"><a href=\"#\" class=\"ta_bn_edit\" onclick=\"EditQuestion(this);return false;\" GUID = \"" + txtID + "\"><span>編輯</span></a></td>" +
        "<td align=\"center\"><a href=\"#\" class=\"ta_bn_del\" onclick=\"delTopic(this);return false;\"><span>刪除</span></a></td>" +
        "</tr>"
    );
        $("[GUID = '" + txtID + "']").attr("Content", JSON.stringify(Obj));
        return "1";
    }
    else {
        alert(errorMsg);
        return "0";
    }
}
//問卷選項【值】的表單驗證機制(浮點數)
function ValidateFloat(e, pnumber) {
    if (!/^\d+[.]?\d*$/.test(pnumber)) {
        $(e).val(/^\d+[.]?\d*/.exec($(e).val()));
    }
    return false;
}
//刪除題目中設定的選項
function delopt(id) {
    $("#" + id).remove();
}
//刪除題目項目
function delTopic(id) {
    var row = $(id).parents('tr');
    var index = $('tr').index(row);
    row.remove();
}
//編輯問卷題目
function EditQuestion(elem) {
    var GUID = $(elem).attr("GUID");
    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    var Type = 'AddQuestion';
    var edit_dialog3 = $("#edit_dialog2").dialog({
        position: { my: "center top", at: "center top", of: top },
        autoOpen: false,
        title: "編輯問卷題目",
        width: 700,
        modal: true,
        close: function (event, ui) {
            $("#edit_dialog2").html("");
        },
        closeOnEscape: true,
        buttons: {
            "修改": function () {
                var status = SaveEditQuestion();
                if (status == "1") {
                    $("#edit_dialog2").html("");
                    edit_dialog3.dialog("close");
                    $("#SetTopicTable tbody").sortable();
                }
            },
            "取消": function () {
                $("#edit_dialog2").html("");
                edit_dialog3.dialog("close");
            }
        }
    });
    edit_dialog3.load("TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.API&N=TA.API&Type=" + Type + "&Guid=" + GUID).dialog('open');
}
//編輯問卷題目，初始化
function EditQuestionInit() {
    var JsonData = JSON.parse($("[GUID = '" + $("#hidSIID").val() + "']").attr("Content"));
    $("#ddlSaveType").val(JsonData.Type);
    switch (JsonData.Type) {
        case "0":
            $("#trTitle").css("display", "");
            $("#trStatus").css("display", "none");
            $("#trOption").css("display", "none");
            $("#SaveTitle").val(JsonData.Title);
            break;
        case "1":
            $("div[name='groupOpt']").remove();
            $("#trStatus").css("display", "");
            $("#trTitle").css("display", "");
            $("#trOption").css("display", "");
            $("#SaveTitle").val(JsonData.Title);
            if (JsonData.Required == "1") {
                $("#SaveTitle").val(JsonData.Title);
                $("#rioTrue").attr("checked", true);
            }
            else {
                $("#rioFalse").attr("checked", true);
            }
            var Option = JsonData.Option;
            for (var i = 0; i < Option.length ; i++) {
                var value = parseInt($("#hidOptCount").val());
                $("#hidOptCount").val(value + 1);
                $("#Option").append(
                    "<div id='opt" + (value + 1) + "' name='groupOpt' class='ui-menu-item'><span class=\"ui-icon ui-icon-triangle-2-n-s\" style=\"float: left; margin-right: .3em;margin-top: .3em;\"></span>" +
                    "選項：<input type='text' name='Label'  value='" + Option[i].Label + "'/>" +
                    "分數：<input type='text' name='Value' onkeyup=\"return ValidateFloat($(this),value)\" value='" + Option[i].Value + "'/>" +
                    "<img onclick=\"delopt('opt" + (value + 1) + "')\" src='images/backimage/fsil.gif'>" +
                    "</div>");
            }
            break;
        case "2":
            $("div[name='groupOpt']").remove();
            $("#trStatus").css("display", "");
            $("#trTitle").css("display", "");
            $("#trOption").css("display", "");
            $("#SaveTitle").val(JsonData.Title);
            if (JsonData.Required == "1") {
                $("#rioTrue").attr("checked", true);
            }
            else {
                $("#rioFalse").attr("checked", true);
            }
            var Option = JsonData.Option;
            for (var i = 0; i < Option.length ; i++) {
                var value = parseInt($("#hidOptCount").val());
                $("#hidOptCount").val(value + 1);
                $("#Option").append(
                    "<div id='opt" + (value + 1) + "' name='groupOpt'><span class=\"ui-icon ui-icon-triangle-2-n-s\" style=\"float: left; margin-right: .3em;margin-top: .3em;\"></span>" +
                    "選項：<input type='text' name='Label'  value='" + Option[i].Label + "'/>" +
                    "分數：<input type='text' name='Value' onkeyup=\"return ValidateFloat($(this),value)\" value='" + Option[i].Value + "'/>" +
                    "<img onclick=\"delopt('opt" + (value + 1) + "')\" src='images/backimage/fsil.gif'>" +
                    "</div>");
            }
            break;
        case "3":
            $("#trStatus").css("display", "");
            $("#trTitle").css("display", "");
            $("#trOption").css("display", "none");
            $("#SaveTitle").val(JsonData.Title);
            if (JsonData.Required == "1") {
                $("#rioTrue").attr("checked", true);
            }
            else {
                $("#rioFalse").attr("checked", true);
            }
            break;
        case "4":
            $("#trStatus").css("display", "");
            $("#trTitle").css("display", "");
            $("#trOption").css("display", "none");
            $("#SaveTitle").val(JsonData.Title);
            if (JsonData.Required == "1") {
                $("#rioTrue").attr("checked", true);
            }
            else {
                $("#rioFalse").attr("checked", true);
            }
        case "5":
            $("#trStatus").css("display", "");
            $("#trTitle").css("display", "");
            $("#trOption").css("display", "none");
            $("#SaveTitle").val(JsonData.Title);
            if (JsonData.Required == "1") {
                $("#rioTrue").attr("checked", true);
            }
            else {
                $("#rioFalse").attr("checked", true);
            }
            break;
    }
    $("#Option").sortable();
}
//將問卷題目編輯結果更新回問卷題目列表
function SaveEditQuestion() {
    //var Values = new Array();
    var Obj = new Object;
    var txtType = "";
    var txtTitle = $("#SaveTitle").val();
    var txtStatus = "";
    var txtID = $("#hidSIID").val();
    var errorMsg = "";
    Obj.ID = txtID;
    Obj.Type = $("#ddlSaveType").val();
    Obj.Title = txtTitle;
    Obj.Required = $("input:radio[name='SaveStatus']:checked").val()
    Obj.Verify = "";
    var optGrp = new Array();
    $("div[name='groupOpt']").each(function () {
        var Objopt = new Object;
        var Label = $(this).children("input").eq(0).val();
        var Value = $(this).children("input").eq(1).val();
        Objopt.Label = Label;
        Objopt.Value = Value;
        optGrp.push(Objopt);
        //資料驗證
        var checknum = 0;
        if ($("#ddlSaveType").val() == "1" && Value == "") {
            errorMsg += "選項「" + Label + "」分數不得為空值!\n";
        }
        if (Label == "")
        {
            errorMsg += "【選項】不得有空值\n";
        }
        $("[name='Label']").each(function () {
            if ($(this).val() == Label)
            {
                checknum++;
            }
        });
        if (checknum > 1)
        {
            errorMsg += "選項「" + Label + "」有重複選項\n";
        }
    });
    Obj.Option = optGrp;
    //Values.push(Obj);

    switch ($("#ddlSaveType").val()) {
        case "0":
            txtType = "類別說明";
            break;
        case "1":
            txtType = "單選題(計分)";
            break;
        case "2":
            txtType = "單選題(不計分)";
            break;
        case "3":
            txtType = "問答題(建議)";
            var checkType3Num = 0;
            $("#SetTopicTable tbody tr  td:nth-child(2)").each(function () {
                if ($(this).html() == "問答題(建議)") {
                    checkType3Num++;
                }
            });
            if (checkType3Num > 1)
            {
                errorMsg += "問答題(建議)僅能設定一題\n";
            }
            break;
        case "4":
            txtType = "問答題(一般)";
            break;
        case "5":
            txtType = "單欄輸入框(限數字格式)";
            break;
        case "":
            errorMsg += "請選擇題型\n";
            break
    }
    switch ($("input:radio[name='SaveStatus']:checked").val()) {
        case "0":
            txtStatus = "非必填";
            break;
        case "1":
            txtStatus = "必填";
            break;
        case "":
            txtStatus = "";
            break;
    }

    if (errorMsg == "") {
        $("#" + txtID).html(
        "<td align=\"center\"><span class='ui-icon ui-icon-arrowthick-2-n-s' style='margin: 0 auto;'></span></td>" +
        "<td align=\"center\">" + txtType + "</td>" +
        "<td align=\"center\">" + txtTitle + "</td>" +
        "<td align=\"center\">" + txtStatus + "</td>" +
        "<td align=\"center\"><a href=\"#\" class=\"ta_bn_edit\" onclick=\"EditQuestion(this)\" GUID = \"" + txtID + "\"><span>編輯</span></a></td>" +
        "<td align=\"center\"><a href=\"#\" class=\"ta_bn_del\" onclick=\"delTopic(this)\"><span>刪除</span></a></td>"
    );
        $("[GUID = '" + txtID + "']").attr("Content", JSON.stringify(Obj));
        return "1";
    }
    else {
        alert(errorMsg);
        return "0";
    }
}
//END編輯問卷題目
//BEGIN瀏覽問卷設計
function View(id)
{
    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    var GUID = id;
    var Type = 'View';
    var edit_dialog = $("#edit_dialog").dialog({
        autoOpen: false,
        title: "瀏覽問卷設定",
        width: 900,
        modal: true,
        close: function (event, ui) { $("#edit_dialog").html(""); },
        closeOnEscape: true,
        buttons: {
            "取消": function () {
                $("#edit_dialog").html("");
                edit_dialog.dialog("close");
            }
        }
    });
    edit_dialog.load("TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.API&N=TA.API&Type=" + Type + "&Guid=" + GUID).dialog('open');
}
function ViewInit()
{
    var Values = new Array();
    var arrayItem = new Array("hidden");

    Values = GetControlData(arrayItem);
    var Obj1 = new Object;
    Obj1.Type = "InitView";
    Values.push(Obj1);

    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    var objData = ProcessDataFunction(
        "TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.CTL&N=TA.CTL",
        "json",
        JSON.stringify(Values)
        );

    if (objData[0].TASV_Abstract != "")
    {
        $("#SurveyView tbody").append("<tr><th><pre>" + objData[0].TASV_Abstract + "</pre></th></tr>");
    }

    $("#hidTopicJson").val(objData[0].TASV_Topic_Json);
    var objData2 = JSON.parse($("#hidTopicJson").val());
    if (objData2 != undefined) {
        for (var i = 0; i < objData2.length ; i++) {
            var JsonObj = JSON.parse(objData2[i]);
            var HtmlTmp = "";
            var txtType = "";
            var txtStatus = "";
            var HtmlRequired = "<span class=\"star\">＊</span>";
            switch (JsonObj.Type) {
                case "0":
                    HtmlTmp += "<tr ><th class='alert alert-success'>" + JsonObj.Title + "</th></tr>";
                    $("#SurveyView tbody").append(HtmlTmp);
                    break;
                case "1":
                    switch (JsonObj.Required) {
                        case "0":
                            HtmlRequired = "";
                            break;
                        case "1":
                            txtStatus = "必填";
                            break;
                        case "":
                            HtmlRequired = "";
                            break;
                    }
                    HtmlTmp += "<tr><td class='alert alert-info'>" + JsonObj.Title + HtmlRequired + "</th></tr>";
                    HtmlTmp += "<tr><td>";
                    var JsonArr = JsonObj.Option;
                    for (var a = 0; a < JsonArr.length; a++)
                    {
                        HtmlTmp += "<input id=\"" + JsonObj.ID + "_" + a + "\" type=\"radio\" name=\"" + JsonObj.ID + "\" value=\"" + JsonArr[a].Value + "\" >" + JsonArr[a].Label;
                    }
                    HtmlTmp += "</tr></td>";
                    $("#SurveyView tbody").append(HtmlTmp);
                    break;
                case "2":
                    switch (JsonObj.Required) {
                        case "0":
                            HtmlRequired = "";
                            break;
                        case "1":
                            txtStatus = "必填";
                            break;
                        case "":
                            HtmlRequired = "";
                            break;
                    }
                    HtmlTmp += "<tr><td class='alert alert-info'>" + JsonObj.Title + HtmlRequired + "</th></tr>";
                    HtmlTmp += "<tr><td>";
                    var JsonArr = JsonObj.Option;
                    for (var a = 0; a < JsonArr.length; a++) {
                        HtmlTmp += "<input id=\"" + JsonObj.ID + "_" + a + "\" type=\"radio\" name=\"" + JsonObj.ID + "\" value=\"" + JsonArr[a].Value + "\">" + JsonArr[a].Label;
                    }
                    HtmlTmp += "</tr></td>";
                    $("#SurveyView tbody").append(HtmlTmp);
                    break;
                case "3":
                    switch (JsonObj.Required) {
                        case "0":
                            HtmlRequired = "";
                            break;
                        case "1":
                            txtStatus = "必填";
                            break;
                        case "":
                            HtmlRequired = "";
                            break;
                    }
                    HtmlTmp += "<tr><td class='alert alert-info'>" + JsonObj.Title + HtmlRequired + "</th></tr>";
                    HtmlTmp += "<tr><td>";
                    HtmlTmp += "<textarea id=\"" + JsonObj.ID + "\" ></textarea>";
                    HtmlTmp += "</tr></td>";
                    $("#SurveyView tbody").append(HtmlTmp);
                    $("#" + JsonObj.ID).attr("class", "form-control");
                    break;
                case "4":
                    switch (JsonObj.Required) {
                        case "0":
                            HtmlRequired = "";
                            break;
                        case "1":
                            txtStatus = "必填";
                            break;
                        case "":
                            HtmlRequired = "";
                            break;
                    }
                    HtmlTmp += "<tr><td class='alert alert-info'>" + JsonObj.Title + HtmlRequired + "</th></tr>";
                    HtmlTmp += "<tr><td>";
                    HtmlTmp += "<textarea id=\"" + JsonObj.ID + "\" ></textarea>";
                    HtmlTmp += "</tr></td>";
                    $("#SurveyView tbody").append(HtmlTmp);
                    $("#" + JsonObj.ID).attr("class", "form-control");
                    break;
                case "5":
                    switch (JsonObj.Required) {
                        case "0":
                            HtmlRequired = "";
                            break;
                        case "1":
                            txtStatus = "必填";
                            break;
                        case "":
                            HtmlRequired = "";
                            break;
                    }
                    HtmlTmp += "<tr><td  class='alert alert-info'>" + JsonObj.Title + HtmlRequired + "</th></tr>";
                    HtmlTmp += "<tr><td>";
                    HtmlTmp += "<input type='text' id=\"" + JsonObj.ID + "\" name=\"" + JsonObj.ID + "\" value=''>";
                    HtmlTmp += "</tr></td>";
                    $("#SurveyView tbody").append(HtmlTmp);
                    $("#" + JsonObj.ID).attr("class", "spinner form-control");
                    break;
            }
            
        }
    }
    initPage();
}
//END瀏覽問卷設計
//BEGIN刪除
function Delete() {
    var Values = new Array();
    var arrayItem = new Array("Checkbox");
    Values = GetControlData(arrayItem);

    if (Values != "") {
        if (confirm("刪除問卷時，亦將刪除該份問卷之填答結果，確定刪除請按【確定】按鈕")) {
            var Obj = new Object;
            Obj.Type = "Delete";
            Values.push(Obj);
            var objData = ProcessDataFunction(
             "TASetSurvey.aspx?D=TA.CTL&N=TA.CTL",
             "text",
             JSON.stringify(Values));

            objData = jQuery.parseJSON(objData);
            if (objData.RESULT == "1") {
                alert(objData.Msg);
                Search();
            }
            else {
                alert(objData.Msg);
            }
        }
        else {
            return false;
        }
    }
    else {
        alert("至少選一筆");
    }
}
//END刪除
//BEGIN複製
function Copy() {
    var ErrorMsg = "";
    var Values = new Array();
    var arrayItem = new Array("Checkbox");
    Values = GetControlData(arrayItem);
    var TargetYear = $("#ddlCopyYear").val();
    var TargetSemester = $("#ddlCopySemester").val();
    if (TargetYear == "")
    {
        ErrorMsg += "請選擇目標學年度\n";
    }
    if (TargetSemester == "")
    {
        ErrorMsg += "請選擇目標學期\n";
    }
    if (Values == "") {
        ErrorMsg += "至少選一筆來源設定!";
    }
    if (ErrorMsg == "") {
        var Obj = new Object;
        Obj.Type = "Copy";
        Obj.Target_Year = TargetYear;
        Obj.Target_Semester = TargetSemester;
        Values.push(Obj);
        var objData = ProcessDataFunction(
         "TASetSurvey.aspx?D=TA.CTL&N=TA.CTL",
         "text",
         JSON.stringify(Values));

        objData = jQuery.parseJSON(objData);
        if (objData.RESULT == "1") {
            alert(objData.Msg);
            Search();
        }
        else {
            alert(objData.Msg);
            Search();
        }
    }
    else {
        alert(ErrorMsg);
    }
}
//END複製
//BEGIN啟用/停用
function OorC(TASV_Status) {
    var Values = new Array();
    var Obj = new Object;
    Obj.TASV_Status = TASV_Status;
    Obj.Type = "SetTASV_Status";
    var arrayItem = new Array("Checkbox");
    Values = GetControlData(arrayItem);

    if (Values.length == 0) {
        alert("至少選一筆");
    }
    else {
        Values.push(Obj);
        var objData = ProcessDataFunction(
          "TASetSurvey.aspx?D=TA.CTL&N=TA.CTL",
          "json",
          JSON.stringify(Values));

        if (objData.RESULT == "1") {
            alert(objData.Msg);
            Search();
        }
        else {
            alert(objData.Msg);
        }
    }
}
//END啟用/停用
function checkorCancl_all(value, name) {
    if (value == "1")
        $("input[name=" + name + "]").prop("checked", "checked");
    if (value == "0")
        $("input[name=" + name + "]:checked").removeAttr("checked");
}

//匯出RAW
function GetRAW(id)
{
    var Values = new Array();
    var Obj = new Object;
    var vS_UID = $("#S_UID").val();
    var vP_UID = $("#P_UID").val();
    var TASV_ID = $("#" + id).attr("GUID");

    Obj.TASV_ID = TASV_ID;
    Obj.Type = "ExcelExport";
    Values.push(Obj);
    document.getElementById("Form1").action = "TASetSurvey.aspx?S_UID=" + vS_UID + "&P_UID=" + vP_UID + "&D=TA.CTL&N=TA.CTL&Para=" + JSON.stringify(Values);
    document.getElementById("Form1").submit();
}
