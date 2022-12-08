<?php


$xmlDoc = simplexml_load_file('https://www.fehd.gov.hk/english/pleasant_environment/tidy_market/marketInfo.xml');

if($xmlDoc === FALSE){
    echo "Error , cant parse XML!";
    exit;
}

$server = 'localhost';
$dbuser = 'root';
$dbpassword = 'new_password';
$dbname = 'marketInfoDB_v1';

$conn = new mysqli($server,$dbuser,$dbpassword,$dbname);
if($conn->connect_error){
    die('DB connection error...');
}
$id = 0;
$cnt = 0;
foreach($xmlDoc->Market as $item){
    $Region_e = relpaceQuo($item->Region_e);
    $Region_c = relpaceQuo($item->Region_c);
    $District_e = relpaceQuo($item->District_e);
    $District_c = relpaceQuo($item->District_c);
    $Market_e = relpaceQuo($item->Market_e);
    $Market_c = relpaceQuo($item->Market_c);
    $Address_e = relpaceQuo($item->Address_e);
    $Address_c = relpaceQuo($item->Address_c);
    $Business_Hours_e = relpaceQuo($item->Business_Hours_e);
    $Business_Hours_c = relpaceQuo($item->Business_Hours_c);
    $Coordinate = relpaceQuo($item->Coordinate);
    $Contact_1 = relpaceQuo($item->Contact_1);
    $Contact_2 = relpaceQuo($item->Contact_2);
    $Tenancy_Commodity_e = relpaceQuo($item->Tenancy_Commodity_e);
    $Tenancy_Commodity_c = relpaceQuo($item->Tenancy_Commodity_c);
    $nos_stall = $item->nos_stall;

    $sql = "insert into marketInfo values ( $id ,'$Region_e', '$Region_c','$District_e','$District_c','$Market_e',
                                    '$Market_c','$Address_e','$Address_c','$Business_Hours_e','$Business_Hours_c',
                                    '$Coordinate','$Contact_1','$Contact_2','$Tenancy_Commodity_e','$Tenancy_Commodity_c',$nos_stall)";

    echo 'debug cnt: '.$cnt.' '.$sql.'<end>'.PHP_EOL;

    $rs = $conn->query($sql);
    if($rs){
        echo "db result got.";
    }else{
        echo "Error , cant get db result!";
    }
    $cnt++;
}

$conn->close();

function relpaceQuo($string){
    return str_replace("'", "\'", $string);
}

?>