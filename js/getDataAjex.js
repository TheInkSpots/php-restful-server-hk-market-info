
function queryEntity(params) {
    let entityParam = params.hasOwnProperty("entity") ? params["entity"] : null;
    let filterParam = params.hasOwnProperty("filter") ? params["filter"] : null;
    let orderbyParam = params.hasOwnProperty("orderby") ? params["orderby"] : null;
    let topParam = params.hasOwnProperty("top") ? params["top"] : null;
    let selectParam = params.hasOwnProperty("select") ? params["select"] : null;

    return new Promise((resolve, reject) => {
        let url = "/api/data/v8.2/" + entityParam + "?$filter=";

        let filter = "";

        let orderby = "";

        let top = "";

        let select = "";

        if (filterParam) {
            filterParam.forEach(e => {
                if (e.hasOwnProperty('custom')) {
                    filter += e["custom"];
                } else if (e.hasOwnProperty("division") && e.hasOwnProperty("column") && e.hasOwnProperty("operator") && e.hasOwnProperty("value") && e.hasOwnProperty("type")) {
                    if (filter.endsWith('(')) {
                        if (e["type"] == "Text") {
                            if (e["operator"] == "ContainValues") {
                                filter += "Microsoft.Dynamics.CRM.ContainValues(PropertyName='" + e["column"] + "',PropertyValues=" + e["value"] + ")";
                            }
                            else if (e["operator"] == "contains")
                                filter += "contains(" + e["column"] + ",'" + encodeURIComponent(e["value"]) + "') ";
                            else
                                filter += e["column"] + " " + e["operator"] + " '" + encodeURIComponent(e["value"]) + "' ";
                        } else if (["Boolean", "Number", "GUID", "Null"].includes(e["type"])) {
                            if (e["operator"] == "contains")
                                filter += "contains(" + e["column"] + "," + encodeURIComponent(e["value"]) + ") ";
                            else
                                filter += e["column"] + " " + e["operator"] + " " + encodeURIComponent(e["value"]) + " ";
                        }
                    } else {
                        if (e["type"] == "Text") {
                            if (e["operator"] == "ContainValues") {
                                filter += e["division"] + " Microsoft.Dynamics.CRM.ContainValues(PropertyName='" + e["column"] + "',PropertyValues=" + e["value"] + ")";
                            }
                            else if (e["operator"] == "contains")
                                filter += e["division"] + " contains(" + e["column"] + ",'" + encodeURIComponent(e["value"]) + "') ";
                            else
                                filter += e["division"] + " " + e["column"] + " " + e["operator"] + " '" + encodeURIComponent(e["value"]) + "' ";
                        } else if (["Boolean", "Number", "GUID", "Null"].includes(e["type"])) {
                            if (e["operator"] == "ContainValues") {
                                filter += e["division"] + " Microsoft.Dynamics.CRM.ContainValues(PropertyName='" + e["column"] + "',PropertyValues=" + e["value"] + ")";
                            } else if (e["operator"] == "contains")
                                filter += e["division"] + " contains(" + e["column"] + "," + encodeURIComponent(e["value"]) + ") ";
                            else
                                filter += e["division"] + " " + e["column"] + " " + e["operator"] + " " + encodeURIComponent(e["value"]) + " ";
                        }
                    }
                }
            });
        }

        if (filter.startsWith('and ')) {
            filter = filter.slice(4);
        }

        if (filter.startsWith('or ')) {
            filter = filter.slice(3);
        }

        url += filter;

        if (url.endsWith('$filter=')) {
            url = url.slice(0, -8);
        } else {
            if (orderbyParam) {
                orderby = "&";
            }
            if (topParam) {
                top = "&";
            }
            if (selectParam) {
                select = "&";
            }
        }

        if (orderbyParam) {
            orderby += "$orderby=";
            orderby += orderbyParam;
        }

        if (topParam) {
            top += "$top=";
            top += topParam;
        }

        if (selectParam) {
            select += "$select=";
            select += selectParam;
        }

        url += orderby;
        url += top;
        url += select;

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: url,
            beforeSend: function (request) {
                request.setRequestHeader("Accept", "application/json");
                request.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            },
            success: function (data) {
                if (data.error) {
                    reject(data)
                } else {
                    resolve(data.value);
                }
            },
            error: function (data) {
                console.log('error get all staff info');
                console.log(data);
                reject(data);
            }
        });
    });
}

const xhttp = new XMLHttpRequest(); 
let jsonArr = '';
let resultArr = '';
let tableAppend = '';
let data = '';

function startSearch(str){
    let id = document.getElementById("id").value;
    let url = '';
    if(str == 'all')
        url = "http://127.0.0.1:8081/api/marketInfo";
    else
        url = "http://127.0.0.1:8081/api/marketInfo?$filter=id [eq] " + id;

    xhttp.open("GET", url, true );
    xhttp.onreadystatechange = updatePage;
    xhttp.send();
}

function updatePage(){
    if(xhttp.readyState==4){
        if(xhttp.status==200){
            var data = xhttp.responseText;
            console.log(data);
            jsonArr = JSON.parse(data);
            let displayArea = document.getElementById('displayArea');
            

            tableAppend = '<table border= "1"> ';
            tableAppend += '<tr><th>ID</th><th>Region_e</th><th>Market_e</th><th>Address_e</th><th>Business_Hours_e</th><th>nos_stall</th></tr>';
            jsonArr.forEach(showRecord);
            //html += a;
            tableAppend += '</table>';
            displayArea.innerHTML = tableAppend;
        }
    }
}
function showRecord(record){
         tableAppend += '<tr>';
        tableAppend += '<td>' + record['id']+ '</td>' ; 
        tableAppend += '<td>' + record['new_Region_e']+ '</td>'; 
        tableAppend += '<td>' + record['new_Market_e']+ '</td>'; 
        tableAppend += '<td>' + record['new_Address_c']+ '</td>'; 
        tableAppend += '<td>' + record['new_Business_Hours_e']+ '</td>'; 
        tableAppend += '<td>' + record['new_nos_stall']+ '</td>'; 
        tableAppend += '<td>' + '<img src="../asset/edit.jpg" width=30 ';
        tableAppend += 'data-bs-toggle="modal" data-bs-target="#confirmEditModal"';
        tableAppend += ' onclick="setConfirmEditModal(' + "'" + record['id'] + "'" + ')">' + '</td>';

        tableAppend += '<td>' + '<img src="../asset/bin.jpg" width=30 ';
        tableAppend += 'data-bs-toggle="modal" data-bs-target="#confirmDeleteModal"';
        tableAppend += ' onclick="setConfirmDeleteModal(' + "'" + record['id'] + "'" + ')">' + '</td>';
        tableAppend += '</tr>';
                       
   // return html;                    
}

function setConfirmDeleteModal(mapID) {
    var element = document.getElementById('modalMapID');
    element.value = mapID;

    for (item of jsonArr) {
        if (item['id']==mapID) {
            district = item['new_Region_e'];
            type = item['new_Market_e'];
            name = item['new_Address_c'];
            break;
        }
    }
    document.getElementById('modalDistrict').value = district; 
    document.getElementById('modalType').value = type; 
    document.getElementById('modalName').value = name; 
    console.log('setConfirmDeleteModal');
}

function setConfirmEditModal(mapID) {
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
            document.getElementById("btnModalCancel2").click();

            let ele = document.getElementById("serverCode");
            resultArr = JSON.parse(serverData);
            let str = JSON.stringify(serverData);
            let status = resultArr[0];
            //let message = resultArray['message'];
            if (status=='success') {
                ele.innerHTML='<img src="greendot.jpg" width=15>' +`<t>${"if : "+str}</t>`;
            } else {
                ele.innerHTML='<img src="reddot.jpg" width=15>' +`<t>${"else : "+str}</t>`;
            }
            startSearch('all');
        }
    }
    console.log('showDeleteResult');
}
