var colRegion = 'new_Region_e';
var colDistrict = 'new_District_e';
var colMarket = 'new_Market_e';
var colType = 'new_Tenancy_Commodity_e';
var colAddress = 'new_Address_e';
var colBusinessHour= 'new_Business_Hours_e';

var displayRegion = 'Region';
var displayDistrict = 'District';
var displayMarket = 'Market';
var displayType = 'Type';
var displayAddress = 'Address';
var displayBusinessHour= 'Business Hour';

var displayContact1= 'Contact1';
var displayContact2= 'Contact2';
var displayStall= 'Stall';
var displayCoordinate = 'Coordinate';
//var barEl = document.getElementById("switchLanguageBar");

// function handleLanguage(event) {
//     var attr = event.target.getAttribute("language");
//     if (attr) {
//         getData(attr)
//     }
//  }
// barEl.addEventListener("click", handleLanguage);
//lanJson = JSON.parse(nameMap);
//alert(lanJson[0].Region);
var defaltLan = "eng";

function changeLan(curLangu){

    // let url = '';
    // let method = 'GET';
    // url = "/config/language_config.json";
    // console.log(method + ` initOptionData  ${url}`);
    // xhttp.open(method, url, true);
    // xhttp.onreadystatechange = () => {
    //     console.log(xhttp.responseText);
    //     var jsonLan = JSON.parse(xhttp.responseText);
    // };
    // xhttp.send();


    // console.log('lan chage', curLangu);
    // console.log('lan json', jsonLan);
    if(defaltLan !== curLangu){
        if(curLangu !== 'eng'){

            defaltLan = 'chi';

            colRegion = 'new_Region_c';
            colDistrict = 'new_District_c';
            colMarket = 'new_Market_c';
            colType = 'new_Tenancy_Commodity_c';
            colAddress = 'new_Address_c';
            colBusinessHour= 'new_Business_Hours_c';

            displayRegion = '區';
            displayDistrict = '地區';
            displayMarket = '市集';
            displayType = '類型';
            displayAddress = '地址';
            displayBusinessHour= '營業時間';

            displayContact1= '電話';
            displayContact2= '電話2';
            displayStall= '攤位數';
            displayCoordinate = '坐標';

            $("#filterRegion").text('區') ;
            $("#filterDistrict").text('地區') ;
            $("#filterType").text('類型') ;
            $("#filterStall").text('攤位數') ;
            $("#filterTo").text('至') ;
            $("#btn_search").html('<i class="fa fa-lg fa-search"></i> 查找') ;
            $("#btn_reset").html('<i class="fa fa-eraser"></i> 重設') ;
            $("#btn_print").html('<img src="/photo/nurse/white_printer.svg"> 列印') ;

            $("#btn_newRecord").html('<i class="fa-sharp fa-solid fa-pen"></i> 新增') ;
            $("#btn_copy").html(' <img src="/photo/nurse/white_copy.svg"> 複製') ;
            $("#btn_delete").html('<img src="/photo/nurse/white_cross.svg"> 刪除') ;

            $("#filterKeyword").text('地址關鍵字') ;

            $("#bnt_CHI").text('中') ;
            $("#bnt_ENG").text('英') ;

            $("#filterYear").text('街市列印') ;
            $("#staffDepartment").text('香港街市識訊管理系統') ;
    
        }
        else
        {

            defaltLan = 'eng';

            colRegion = 'new_Region_e';
            colDistrict = 'new_District_e';
            colMarket = 'new_Market_e';
            colType = 'new_Tenancy_Commodity_e';
            colAddress = 'new_Address_e';
            colBusinessHour= 'new_Business_Hours_e';

            displayRegion = 'Region';
            displayDistrict = 'District';
            displayMarket = 'Market';
            displayType = 'Type';
            displayAddress = 'Address';
            displayBusinessHour= 'Business Hour';

            displayContact1= 'Contact1';
            displayContact2= 'Contact2';
            displayStall= 'Stall';
            displayCoordinate = 'Coordinate';


            $("#filterRegion").text('Region') ;
            $("#filterDistrict").text('District') ;
            $("#filterType").text('Type') ;
            $("#filterStall").text('Stall') ;
            $("#filterTo").text('To') ;
            $("#btn_search").html('<i class="fa fa-lg fa-search"></i> Search') ;
            $("#btn_reset").html('<i class="fa fa-eraser"></i> Reset') ;
            $("#btn_print").html('<img src="/photo/nurse/white_printer.svg"> Print') ;

            $("#btn_newRecord").html('<i class="fa-sharp fa-solid fa-pen"></i> Create') ;
            $("#btn_copy").html(' <img src="/photo/nurse/white_copy.svg"> Copy') ;
            $("#btn_delete").html('<img src="/photo/nurse/white_cross.svg"> Delete') ;

            $("#filterKeyword").text('Address Keyword') ;

            $("#bnt_CHI").text('CH') ;
            $("#bnt_ENG").text('EN') ;

            $("#filterYear").text('Market List') ;
            $("#staffDepartment").text('Hongkong Market Infomation CMS') ;
        }
        startSearch('all');
        initOptionData();
    }
    //window.location.reload(); 
}