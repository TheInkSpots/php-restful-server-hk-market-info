CREATE DATABASE marketInfoDB_v1;

USE marketInfoDB_v1;

CREATE TABLE marketInfo
(
    id              INT unsigned NOT NULL AUTO_INCREMENT,
    new_Region_e           VARCHAR(150), 
    new_Region_c           VARCHAR(150),
    new_District_e           VARCHAR(150),    
    new_District_c           VARCHAR(150),    
    new_Market_e           VARCHAR(150),    
    new_Market_c           VARCHAR(150),    
    new_Address_e           VARCHAR(150),    
    new_Address_c           VARCHAR(150),    
    new_Business_Hours_e           VARCHAR(150),    
    new_Business_Hours_c           VARCHAR(150),    
    new_Coordinate           VARCHAR(150),    
    new_Contact_1           VARCHAR(150),    
    new_Contact_2           VARCHAR(150),    
    new_Tenancy_Commodity_e           VARCHAR(150),   
    new_Tenancy_Commodity_c           VARCHAR(150),   
    new_nos_stall               INT(3),                     
    PRIMARY KEY     (id)                                 
);

-- $sql = "INSERT INTO $tableName ('id',
--         'new_Region_e',
--         'new_Region_c',
--         'new_District_e',
--         'new_District_c',
--         'new_Market_e',
--         'new_Market_c',
--         'new_Address_e',
--         'new_Address_c',
--         'new_Business_Hours_e',
--         'new_Business_Hours_c',
--         'new_Coordinate',
--         'new_Contact_1',
--         'new_Contact_2',
--         'new_Tenancy_Commodity_e',
--         'new_Tenancy_Commodity_c',
--         'new_nos_stall' ) 
--         VALUES
--         ( 0 ,'$Region_e', '$Region_c','$District_e','$District_c','$Market_e',
--     '$Market_c','$Address_e','$Address_c','$Business_Hours_e','$Business_Hours_c',
--     '$Coordinate','$Contact_1','$Contact_2','$Tenancy_Commodity_e','$Tenancy_Commodity_c',$nos_stall)
--         ";


-- $Region_e = relpaceQuo($data['new_Region_e']);
-- $Region_c = relpaceQuo($data['new_Region_c']);
-- $District_e = relpaceQuo($data['new_District_e']);
-- $District_c = relpaceQuo($data['new_District_c']);
-- $Market_e = relpaceQuo($data['new_Market_e']);
-- $Market_c = relpaceQuo($data['new_Market_c']);
-- $Address_e = relpaceQuo($data['new_Address_e']);
-- $Address_c = relpaceQuo($data['new_Address_c']);
-- $Business_Hours_e = relpaceQuo($data['new_Business_Hours_e']);
-- $Business_Hours_c = relpaceQuo($data['new_Business_Hours_c']);
-- $Coordinate = relpaceQuo($data['new_Coordinate']);
-- $Contact_1 = relpaceQuo($data['new_Contact_1']);
-- $Contact_2 = relpaceQuo($data['new_Contact_2']);
-- $Tenancy_Commodity_e = relpaceQuo($data['new_Tenancy_Commodity_e']);
-- $Tenancy_Commodity_c = relpaceQuo($data['new_Tenancy_Commodity_c']);
-- $nos_stall = $data['new_nos_stall'];     
-- $sql = "UPDATE $tableName SET 
--             'new_Region_e' =  $Region_e,
--             'new_Region_c' = $Region_c,
--             'new_District_e' = $District_e,
--             'new_District_c' = $District_c,
--             'new_Market_e' = $Market_e,
--             'new_Market_c' = $Market_c,
--             'new_Address_e' = $Address_e,
--             'new_Address_c' = $Address_c,
--             'new_Business_Hours_e' = $Business_Hours_e,
--             'new_Business_Hours_c' = $Business_Hours_c,
--             'new_Coordinate' = $Coordinate,
--             'new_Contact_1' = $Contact_1,
--             'new_Contact_2' = $Contact_2,
--             'new_Tenancy_Commodity_e' = $Tenancy_Commodity_e,
--             'new_Tenancy_Commodity_c' = $Tenancy_Commodity_c,
--             'new_nos_stall = $nos_stall'

-- WHERE id = '$guid' ";

-- "new_Region_e" :  "test new_Region_e",
-- "new_Region_c" : "test new_Region_c",
-- "new_District_e" : "test new_District_e",
-- "new_District_c" : "test new_District_c",
-- "new_Market_e" : "test new_Market_e",
-- "new_Market_c" : "test new_Market_c",
-- "new_Address_e" : "test new_Address_e",
-- "new_Address_c" : "test new_Address_c",
-- "new_Business_Hours_e" : "new_Business_Hours_e new_Region_e",
-- "new_Business_Hours_c" : "test new_Business_Hours_c",
-- "new_Coordinate" : "test new_Coordinate",
-- "new_Contact_1" : "test new_Contact_1",
-- "new_Contact_2" : "test new_Contact_2",
-- "new_Tenancy_Commodity_e" : "test new_Tenancy_Commodity_e",
-- "new_Tenancy_Commodity_c" : "test new_Tenancy_Commodity_c",
-- "new_nos_stall" : 123