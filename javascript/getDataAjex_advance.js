
const xhttp = new XMLHttpRequest(); 
let jsonArr = '';
let resultArr = '';
let tableAppend = '';
let data = '';

function editTwitchRecord(recordID) {
    console.log(recordID);
    // cancel readonly ...
    $("#new_region" + recordID).prop('readonly', false);
    $("#new_district" + recordID).prop('readonly', false);
    $("#new_market" + recordID).prop('readonly', false);
    $("#new_type" + recordID).prop('readonly', false);
    $("#new_contact1" + recordID).prop('readonly', false);
    $("#new_contact2" + recordID).prop('readonly', false);

    $("#new_nos_stall" + recordID).prop('readonly', false);
    $("#new_Address_" + recordID).prop('disabled', false);
    $("#new_business_hour" + recordID).prop('disabled', false);
    $("#new_coordinate_" + recordID).prop('disabled', false);
    // handle button ....
    $("#btn_editRecord_" + recordID).hide();
    $("#btn_saveEditRecord_" + recordID).show();
}
function saveEditTwitchRecord(recordID) {
    let dataVars = {};
    let new_region = $("#new_region" + recordID).val();
    let new_district = $("#new_district" + recordID).val();
    let new_market = $("#new_market" + recordID).val();
    let new_type = $("#new_type" + recordID).val();
    let new_contact1 = $("#new_contact1" + recordID).val();
    let new_contact2 = $("#new_contact2" + recordID).val();

    let new_Address_ = $("#new_Address_" + recordID).val();
    let new_business_hour = $("#new_business_hour" + recordID).val();
    let new_coordinate_ = $("#new_coordinate_" + recordID).val();
    let new_nos_stall = $("#new_nos_stall" + recordID).val();
    if (new_region != "" || new_district != "" || new_market != "" || new_type != "" || new_contact1 != "" || new_Address_ != "" || new_business_hour != "" ) {
        dataVars[colRegion] = new_region;
        dataVars[colDistrict] = new_district;
        dataVars[colMarket] = new_market;
        dataVars[colType] = new_type;

        dataVars["new_Contact_1"] = new_contact1;
        dataVars["new_Contact_2"] = new_contact2;
        dataVars["new_nos_stall"] = new_nos_stall;

        dataVars["new_Coordinate"] = new_coordinate_;
        dataVars[colAddress] = new_Address_;
        dataVars[colBusinessHour] = new_business_hour;

        //var mapID = document.getElementById("modalMapID2").value;
        var url = "http://127.0.0.1:8081/api/marketInfo("+ recordID + ')';
        console.log (url , `\n${JSON.stringify(dataVars)}`);

        xhttp.open("PUT", url, true);  // true=>asynchronous, false=>synchronous
        xhttp.onreadystatechange = showDeleteResult;
        xhttp.send(JSON.stringify(dataVars));
        console.log('goDelete');

    } else {
        $("#statusStr").html("<img src='/photo/reddot.jpg' width=15px></img><t font-size=17px>input cannot be epmty...</t>");
    }

}

function initOptionData(){
    $("#viewRecordList").empty();
    $("#serviceUnitList").empty();
    $("#formStatusList").empty();

    $("#viewRecordList").prepend(new Option('All', ''));
    $("#serviceUnitList").prepend(new Option('All', ''));
    $("#formStatusList").prepend(new Option('All', ''));

    let url = '';
    let method = 'GET';
    url = "http://127.0.0.1:8081/api/marketInfo?$filter=id [gt] 0";
    console.log(method + ` initOptionData  ${url}`);
    xhttp.open(method, url, true);
    xhttp.onreadystatechange = newOption;
    xhttp.send();
}
function newOption(){
    if(xhttp.readyState==4){
        if(xhttp.status==200){
            var data = xhttp.responseText;
            jsonArr = JSON.parse(data);
            if(jsonArr.length > 0){
                let typeOptArr = $.unique(jsonArr.map(x => x[colType]).sort());
                typeOptArr.forEach((x) => {
                    $("#viewRecordList").append('<option value="' + x + '">' + x + '</option>');
                });

                let districtOptArr = $.unique(jsonArr.map(x => x[colDistrict])).sort();
                districtOptArr.forEach((x) => {
                    $("#serviceUnitList").append('<option value="' + x + '">' + x + '</option>');
                });
                let regionOptArr = $.unique(jsonArr.map(x => x[colRegion])).sort();
                regionOptArr.forEach((x) => {
                    $("#formStatusList").append('<option value="' + x + '">' + x + '</option>');
                });
            }
        }
    }
}

function startSearch(str){
  // let type = document.getElementById("viewRecordList").value;
    let url = '';
    let method = 'GET';
    url = "http://127.0.0.1:8081/api/marketInfo?$filter=id [gt] 0";

    let filterType=  $("#viewRecordList option:selected").text();
    let filterDistrict=  $("#serviceUnitList option:selected").text();
    let filterRegion=  $("#formStatusList option:selected").text();

    let filterStallStart =  $("#search_startnos_stall").val();
    let filterStallEnd =  $("#search_endnos_stall").val();
    let filterKeyword =  $("#txt_keyword").val();

    console.log("type, district, region, stall start, end, keyword filter: ", filterType,filterDistrict,filterRegion,' ',filterStallStart,' ',filterStallEnd,filterKeyword);
    if(filterType != '' && filterType != 'All'){
        url += ` [and] ${colType} [eq] '${filterType}'`;
    }
    if(filterDistrict !='' && filterDistrict != 'All'){
        url += ` [and] ${colDistrict} [eq] '${filterDistrict}'`;
    }
    if(filterRegion != '' && filterRegion != 'All' && filterRegion != 'Hong Kong & Islands'){
        url += ` [and] ${colRegion} [eq] '${filterRegion}'`;
    }
    if(filterRegion == 'Hong Kong & Islands'){
        url += ` [and] ${colRegion} [like] '%Hong Kong%'`;
    }

    if(filterStallStart != '' ){
        url += ` [and] new_nos_stall [ge] '${filterStallStart}'`;
    }
    if(filterStallEnd != ''){
        url += ` [and] new_nos_stall [le] '${filterStallEnd}'`;
    }
    if(filterKeyword != ''){
        url += ` [and] ${colAddress} [like] '%${filterKeyword}%'`;
    }
    console.log(method + ` start search  ${url}`);
    xhttp.open(method, url, true);
    xhttp.onreadystatechange = updatePage;
    xhttp.send();
}

function updatePage(){
    if(xhttp.readyState==4){
        if(xhttp.status==200){
            var data = xhttp.responseText;
            console.log(data);
            tableAppend = '';
            if(data != 'No Result[]'){
                jsonArr = JSON.parse(data);
                let displayArea = document.getElementById('twitchRecordTable');
                

                 // tableAppend = '<table border= "1"> ';
                //tableAppend += '<tr><th>ID</th><th>Region_e</th><th>Market_e</th><th>Address_e</th><th>Business_Hours_e</th><th>nos_stall</th></tr>';
                tableAppend = '';
                if(jsonArr.length > 0){
                    tableAppend += `<div>Record(s) count(${jsonArr.length})</div>`;
                    jsonArr.forEach(showRecord);
                }
                else{
                    tableAppend += '<table class="table table-longer table-bordered" style="margin-top: 20px; text-align: center;">';
                    tableAppend += '<tr style="text-align: center;">';
                    tableAppend += '<td colspan="7">';
                    tableAppend += 'No Record';
                    tableAppend += '</td>';
                    tableAppend += '</tr>';
                    tableAppend += '</table>';
                }
                //html += a;
                //tableAppend += '</table>';
            }
            else{
                tableAppend += '<table class="table table-longer table-bordered" style="margin-top: 20px; text-align: center;">';
                tableAppend += '<tr style="text-align: center;">';
                tableAppend += '<td colspan="7">';
                tableAppend += 'No Record';
                tableAppend += '</td>';
                tableAppend += '</tr>';
                tableAppend += '</table>';
            }
            $('#twitchRecordTable').empty();
            $("#twitchRecordTable").append(tableAppend);
            //displayArea.innerHTML = tableAppend;
        }
    }
}


function setConfirmDeleteModal(mapID) {
    var element = document.getElementById('modalMapID');
    element.value = mapID;

    for (item of jsonArr) {
        if (item['id']==mapID) {
            district = item[colDistrict];
            type = item[colType];
            name = item[colMarket];
            break;
        }
    }
    document.getElementById('modalDistrict').value = district; 
    document.getElementById('modalType').value = type; 
    document.getElementById('modalName').value = name; 
    console.log('setConfirmDeleteModal');
}

function setConfirmEditModal(mapID) { // obselete
    var element = document.getElementById('modalMapID2');
    element.value = mapID;

    for (item of jsonArr) {
        if (item['id']==mapID) {
            district = item['new_Region_e'];
            type = item['new_Market_e'];
            name = item['new_Address_c'];
            break;
        }
    }
    document.getElementById('modalDistrict2').value = district; 
    document.getElementById('modalType2').value = type; 
    document.getElementById('modalName2').value = name; 
    console.log('setConfirmEditlolModal');
}


function setInputModal(){
    

}

function goCreate() {
    let dataVars = {};

    let new_region = $("#newmodalRegion" ).val();
    let new_district = $("#newmodalDistrict" ).val();
    let new_market = $("#newmmodalMarket" ).val();
    let new_type = $("#newmmodalType" ).val();
    let new_Address_ = $("#newmmodalAddress" ).val();
    let new_business_hour = $("#newmmodalBusinessHour" ).val();

    let new_region2 = $("#newmodalRegion2" ).val();
    let new_district2 = $("#newmodalDistrict2" ).val();
    let new_market2 = $("#newmmodalMarket2" ).val();
    let new_type2 = $("#newmmodalType2" ).val();
    let new_Address2_ = $("#newmmodalAddress2" ).val();
    let new_business_hour2 = $("#newmmodalBusinessHour2" ).val();

    let new_coordinate_ = $("#newmmodalCoordonate" ).val();
    let new_nos_stall = $("#newmmodalStall" ).val();
    let new_contact1 = $("#newmmodalContact1" ).val();
    let new_contact2 = $("#newmmodalContact1" ).val();
    

    if (new_region != "" || new_district != "" || new_market != "" || new_type != "" || new_contact1 != "" || new_Address_ != "" || new_business_hour != "" || new_nos_stall !='') {
     


        dataVars['new_Region_e'] = new_region;
        dataVars['new_Region_c'] = new_region2;
        dataVars['new_District_e'] = new_district;
        dataVars['new_District_c'] = new_district2;
        dataVars['new_Market_e'] = new_market;
        dataVars['new_Market_c'] = new_market2;
        dataVars['new_Address_e'] = new_Address_;
        dataVars['new_Address_c'] = new_Address2_;
        dataVars['new_Business_Hours_e'] = new_business_hour;
        dataVars['new_Business_Hours_c'] = new_business_hour2;
        
        dataVars["new_Coordinate"] = new_coordinate_;
        dataVars["new_Contact_1"] = new_contact1;
        dataVars["new_Contact_2"] = new_contact2;
        dataVars['new_Tenancy_Commodity_e'] = new_type;
        dataVars['new_Tenancy_Commodity_c'] = new_type2;
        dataVars["new_nos_stall"] = new_nos_stall; 
        //dataVars["id"] = 0;
        //var mapID = document.getElementById("modalMapID2").value;
        var url = "http://127.0.0.1:8081/api/marketInfo";
        console.log (url , `\n${JSON.stringify(dataVars)}`);
        xhttp.open("POST", url, true);  // true=>asynchronous, false=>synchronous
        xhttp.onreadystatechange = showDeleteResult;
        xhttp.send(JSON.stringify(dataVars));
        console.log('goCreate');

    } else {
        alert('請填寫資料...');
    }
}
function goDelete() {
    var mapID = document.getElementById("modalMapID").value;
    var url = "http://127.0.0.1:8081/api/marketInfo("+ mapID + ')';

    xhttp.open("DELETE", url, true);  // true=>asynchronous, false=>synchronous
    xhttp.onreadystatechange = showDeleteResult;
    xhttp.send(null);
    console.log('goDelete');
}
function goUpdate() {
    

    var mapID = document.getElementById("modalMapID2").value;
    var url = "http://127.0.0.1:8081/api/marketInfo("+ mapID + ')';
    jsonObj  = {
        id : mapID,
        new_Region_e: document.getElementById('modalDistrict2').value,
        new_Market_e: document.getElementById('modalType2').value,
        new_Address_c: document.getElementById('modalName2').value,
    }
    
    xhttp.open("PUT", url, true);  // true=>asynchronous, false=>synchronous
    xhttp.onreadystatechange = showDeleteResult;
    xhttp.send(JSON.stringify(jsonObj));
    console.log('goDelete');
}

function showDeleteResult() {
    if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let serverData = xhttp.responseText;
            document.getElementById("btnModalCancel").click();
           document.getElementById("btnModalCreate").click();

            let ele = document.getElementById("statusStr");
            resultArr = JSON.parse(serverData);
            let str = JSON.stringify(serverData);
            let status = resultArr[0];
            //let message = resultArray['message'];
            if (status=='success') {
                ele.innerHTML='<img src="/photo/greendot.jpg" width=10px>' +`<t>${"if: "+str}</t>`;
            } else {
                ele.innerHTML='<img src="/photo/greendot.jpg" width=10px>' +`<t>${"else: "+str}</t>`;
            }
            startSearch('');
        }
    }
    console.log('showDeleteResult');
}

function showGoogleMap(address){

    $('#mapDetails').modal('show');
    $('#mapDetails .mapouter iframe').attr('src', `https://maps.google.com/maps?q=${encodeURI(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`)
}