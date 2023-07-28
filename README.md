# php-restful-server-hk-market-info

<img width="452" alt="5555515" src="https://github.com/TheInkSpots/php-restful-server-hk-market-info/assets/68689162/6ae4e338-0797-47c3-91ae-076853c9201e">
The web application is using various technologies for UI design, such as  Popperjs, Bootstrap, jQuery, fontawsome, CSS.
1.	Support rendering dynamic filter option according to real-time database data.
2.	Support edit and create record that validation input text.
3.	Support rendering google map with address in iframe
4.	Support multi-condition that filter records with Region, District, Type, and range of number of stall and Address keyword all together.
5.	Support Chinese and English languages interface.
6.	Support show how many records are currently rendered in the table. If no record, then it will be showed as “No Record”.

<img width="289" alt="6666616" src="https://github.com/TheInkSpots/php-restful-server-hk-market-info/assets/68689162/75611026-747e-4330-90ef-004d13b7d75f">

<img width="452" alt="77777717" src="https://github.com/TheInkSpots/php-restful-server-hk-market-info/assets/68689162/f583a302-f73b-40fd-866c-733cbe004880">

<img width="452" alt="88888818" src="https://github.com/TheInkSpots/php-restful-server-hk-market-info/assets/68689162/83a8eeda-7078-4b9e-b16d-0fc5ddee6510">
<img width="272" alt="9999919" src="https://github.com/TheInkSpots/php-restful-server-hk-market-info/assets/68689162/1d6994db-4e04-423f-ba42-8f8906088fc0">

API: GET METHOD
•	Support 3 types of GET request URL 
1.	get with ID
2.	get ALL
3.	get with filtering conditions
Retrieve with ID

Format one	http://{host name}/{service name}/{entity name}(ID)
Example	http://127.0.0.1:8081/api/marketInfo(3)

Request Body	none
Response(200)	
API: GET METHOD
•	Support 3 types of GET request URL 
1.	get with ID
2.	get ALL
3.	get with filtering conditions
Retrieve with ID

Format one	http://{host name}/{service name}/{entity name}(ID)
Example	http://127.0.0.1:8081/api/marketInfo(3)

Request Body	none
Response(200)	
```json
[
    {
        "id": "900",
        "new_Region_e": "Hong Kong & Islands",
        "new_Region_c": "香港及離島",
        "new_District_e": "Eastern",
        "new_District_c": "東區",
        "new_Market_e": "CHAI WAN MARKET",
        "new_Market_c": "柴灣街市",
        "new_Address_e": "CHAI WAN MUNICIPAL SERVICES BUILDING, 338 CHAI WAN ROAD, CHAI WAN, HK",
        "new_Address_c": "香港柴灣柴灣道338號柴灣市政大廈",
        "new_Business_Hours_e": "Market (6:00 a.m. to 8:00 p.m.) \r\nCooked Food Centre (6:00 a.m. to 2:00 a.m.)",
        "new_Business_Hours_c": "街市 (上午6時正至晚上8時正)\r\n熟食中心 (上午6時正至凌晨2時正)",
        "new_Coordinate": "22.26341,114.23996",
        "new_Contact_1": "28960064",
        "new_Contact_2": "25634340",
        "new_Tenancy_Commodity_e": "Non-Food Related Dry Goods",
        "new_Tenancy_Commodity_c": "非食物類乾貨",
        "new_nos_stall": "27"
    }
]
```

Retrieve All
Format three	http://{host name}/{service name}/{entity name}
Example	http://127.0.0.1:8081/api/marketInfo

Request Body	none
Response(200)
```json
[
    {
        "id": "850",
        "new_Region_e": "Hong Kong & Islands",
        "new_Region_c": "香港及離島",
        "new_District_e": "Eastern",
        "new_District_c": "東區",
        "new_Market_e": "SAI WAN HO MARKET",
        "new_Market_c": "西灣河街市",
        "new_Address_e": "SAI WAN HO MUNICIPAL SERVICES BUILDING, 12 TAI ON STREET, SHAU KEI WAN, HK",
        "new_Address_c": "香港筲箕灣太安街12號西灣河市政大廈",
        "new_Business_Hours_e": "Market (6:00 a.m. to 8:00 p.m.) \n  Cooked Food Centre (6:00 a.m. to 2:00 a.m.)",
        "new_Business_Hours_c": "街市 (上午6時正至晚上8時正)\r\n熟食中心 (上午6時正至凌晨2時正)",
        "new_Coordinate": "22.28251,114.22275",
        "new_Contact_1": "25684651",
        "new_Contact_2": "25634340",
        "new_Tenancy_Commodity_e": "Food Related Wet Goods ggg",
        "new_Tenancy_Commodity_c": "食物類濕貨",
        "new_nos_stall": "7"
    },
,{…}…..
]
```
In the example, all records in this table (entity) are return in JSON (around 655KB )
```json
[
    {
        "id": "900",
        "new_Region_e": "Hong Kong & Islands",
        "new_Region_c": "香港及離島",
        "new_District_e": "Eastern",
        "new_District_c": "東區",
        "new_Market_e": "CHAI WAN MARKET",
        "new_Market_c": "柴灣街市",
        "new_Address_e": "CHAI WAN MUNICIPAL SERVICES BUILDING, 338 CHAI WAN ROAD, CHAI WAN, HK",
        "new_Address_c": "香港柴灣柴灣道338號柴灣市政大廈",
        "new_Business_Hours_e": "Market (6:00 a.m. to 8:00 p.m.) \r\nCooked Food Centre (6:00 a.m. to 2:00 a.m.)",
        "new_Business_Hours_c": "街市 (上午6時正至晚上8時正)\r\n熟食中心 (上午6時正至凌晨2時正)",
        "new_Coordinate": "22.26341,114.23996",
        "new_Contact_1": "28960064",
        "new_Contact_2": "25634340",
        "new_Tenancy_Commodity_e": "Non-Food Related Dry Goods",
        "new_Tenancy_Commodity_c": "非食物類乾貨",
        "new_nos_stall": "27"
    }
]
```

Format 	http://{host name}/{service name}/{entity name}?$filter={condition}
Example URL	1.	http://127.0.0.1:8081/api/marketInfo?$filter=new_nos_stall [eq] 221
2.	http://127.0.0.1:8081/api/marketInfo?$filter=new_Market_e [eq] 'YUE KWONG ROAD MARKET'
3.	http://127.0.0.1:8081/api/marketInfo?$filter=new_Market_e [nq] 'YUE KWONG ROAD MARKET'
4.	http://127.0.0.1:8081/api/marketInfo?$filter=id [gt] 0 [and] new_District_e [eq] 'Central / Western'
Request Body	none
Response (200)	
```json
[
    {
        "id": "1030",
        "new_Region_e": "Hong Kong & Islands",
        "new_Region_c": "香港及離島",
        "new_District_e": "Central / Western",
        "new_District_c": "中西區",
        "new_Market_e": "QUEEN STREET COOKED FOOD MARKET",
        "new_Market_c": "皇后街熟食市場",
        "new_Address_e": "1/F., 38 DES VOEUX ROAD WEST, SHEUNG WAN, HK",
        "new_Address_c": "香港上環德輔道西38號1樓",
        "new_Business_Hours_e": "6:00 a.m. to 2:00 a.m.",
        "new_Business_Hours_c": "上午6時正至凌晨2時正",
        "new_Coordinate": "22.287250,114.147430",
        "new_Contact_1": "35425915",
        "new_Contact_2": "25450506",
        "new_Tenancy_Commodity_e": "Cooked Food",
        "new_Tenancy_Commodity_c": "熟食",
        "new_nos_stall": "11"
    }
]
```



API: POST METHOD
Format one	http://{host name}/{service name}/{entity name}
Example URL	http://127.0.0.1:8081/api/marketInfo

Request Body Example: JSON
```json
{
    “new_Region_e” :  “test new_Region_e”,
    “new_Region_c” : “test new_Region_c”,
    “new_District_e” : “test new_District_e”,
    “new_District_c” : “test new_District_c”,
    “new_Market_e” : “test new_Market_e”,
    “new_Market_c” : “test new_Market_c”,
    “new_Address_e” : “test new_Address_e”,
    “new_Address_c” : “test new_Address_c”,
    “new_Business_Hours_e” : “new_Business_Hours_e new_Region_e”,
    “new_Business_Hours_c” : “test new_Business_Hours_c”,
    “new_Coordinate” : “test new_Coordinate”,
    “new_Contact_1” : “test new_Contact_1”,
    “new_Contact_2” : “test new_Contact_2”,
    “new_Tenancy_Commodity_e” : “test new_Tenancy_Commodity_e”,
    “new_Tenancy_Commodity_c” : “test new_Tenancy_Commodity_c”,
    “new_nos_stall” : 123
}
 ```
Response (200)
```json
{
    "success": {
        "code": "200",
        "message": "row is inserted."
    }
}
```
API: PUT METHOD

•	Client must provide id of the record in URL to update record 
•	Columns in body can be partial
Format one	http://{host name}/{service name}/{entity name}(ID)
Example	http://127.0.0.1:8081/api/marketInfo(824)

Request Body Example 1 : JSON with all columns 
```json
{
    "new_Region_e" :  "test new_Region_e",
    "new_Region_c" : "test new_Region_c",
    "new_District_e" : "test new_District_e",
    "new_District_c" : "test new_District_c",
    "new_Market_e" : "test new_Market_e",
    "new_Market_c" : "test new_Market_c",
    "new_Address_e" : "test new_Address_e",
    "new_Address_c" : "test new_Address_c",
    "new_Business_Hours_e" : "new_Business_Hours_e new_Region_e",
    "new_Business_Hours_c" : "test new_Business_Hours_c",
    "new_Coordinate" : "test new_Coordinate",
    "new_Contact_1" : "test new_Contact_1",
    "new_Contact_2" : "test new_Contact_2",
    "new_Tenancy_Commodity_e" : "test new_Tenancy_Commodity_e",
    "new_Tenancy_Commodity_c" : "test new_Tenancy_Commodity_c",
    "new_nos_stall" : 123
}
 ```
Response (200)
```json
{
    "success": {
        "code": "200",
        "message": "GUID : '824' is updated."
    }
}
```


Request Body Example 2: JSON with partial columns
```json
{
    "new_Region_e" :  "test 123 new_Region_e",
    "new_Region_c" : "test 234 new_Region_c",
    "new_District_e" : "test  456 new_District_e",
    "new_District_c" : "test 678 new_District_c",
    "new_nos_stall" : 234
}
```
Response (200)
```json
{
    "success": {
        "code": "200",
        "message": "GUID : '824' is updated."
    }
}
```



API: DELETE METHOD

Format one	http://{host name}/{service name}/{entity name}(ID)
Example	http://127.0.0.1:8081/api/marketInfo(824)

Response (200)	
```json
{
    "success": {
        "code": "200",
        "message": "GUID : '824' is deleted."
    }
}
```
•	Client must provide id of the record to delete record 
