<?php

class Api {
    function echoRespone($status, $code, $message){
        $output = array();
        $innerSmg = array();
        $innerSmg['code'] = $code;
        $innerSmg['message'] = $message;
        $output[$status] = $innerSmg;
        echo nl2br(json_encode($output));
        exit;
    }
    function relpaceQuo($string){
        return str_replace("'", "\'", $string);
    }
    
    function DELETE($parameters) {
        $this->sqlManage($parameters,'delete');
    }
    
    function GET($parameters) {
        $tableName = $parameters[0];
        if(isset($_GET['$filter']))
            $filter = $_GET['$filter'];
        else
            $filter = null;
        $rs = $this->sqlQuery($tableName, $filter);
        echo $rs;
    }

    function PUT($parameters) {//update with guid, get body with json , insert ('key ') (value)
        $this->sqlManage($parameters,'update');
    }

    function POST($parameters) {//insert get body with json , insert ('key ') (value)
        require_once 'db.php';
        $tableName = $parameters[0];
        $data = json_decode(file_get_contents('php://input'), true);
        $sqlPartial = ' 0 ,';
        foreach($data as $key => $val) {
            $val = $this->relpaceQuo($val);
            $sqlPartial = $sqlPartial."'".$val."'" . ",";
        }
        $sqlPartial = rtrim($sqlPartial, ",");

        $sql = "INSERT INTO $tableName  VALUES  ( $sqlPartial) ";
        //echo $sql;
        try {
            $conn->query($sql);
            $this->echoRespone('success','200',"row is inserted.");
            exit;
        } 
        catch (Exception $e) {
            $this->echoRespone('error','809',',SQL insert failed. exception  > '.$e->getMessage());
        }
    }

    function sqlQuery($tableName, $filter){
        require_once 'db.php';
        $code;
        $msg;
        if($filter != null){

            $only1Sql = explode('；',$filter);
            $filter = $only1Sql[0];

            $filterValue = explode(']',$filter);
            $ColumnValue = explode('[',$filter);
            $filter = str_replace("[eq]", "=", $filter);
            $filter = str_replace("[ne]", "!=", $filter);
            $filter = str_replace("[gt]", ">", $filter);
            $filter = str_replace("[ge]", ">=", $filter);
            $filter = str_replace("[lt]", "<", $filter);
            $filter = str_replace("[le]", "<=", $filter);
            $filter = str_replace("[like]", "LIKE", $filter);
            $filter = str_replace("[and]", "AND", $filter);
            $filter = str_replace("[or]", "OR", $filter);
            $filter = str_replace("%20", " ", $filter);
            $filter = str_replace("%27", "'", $filter);
        }
        if(str_contains($tableName,'(')){
            $tableAndId = explode('(', $tableName);
            $tableName = $tableAndId[0];
            $guid = str_replace(')','', $tableAndId[1]);
            $guid = str_replace(' ','', $guid);// handle data injection of > OR 1=1 , to delete all rows.
            $sql = "SELECT * FROM $tableName WHERE id = $guid ";
            $rs = $conn->query($sql); // got it
            $output = array();
            while ($row = $rs->fetch_assoc()) {
                $output[] = $row;
            }
            return json_encode($output);
        }
        if($filter == null){
            $sql = "SELECT * FROM $tableName ";
        }elseif($tableName == null){ //"SELECT * FROM $tableName WHERE $filter "
            $this->echoRespone('error','801','Entity Name missing...');
            exit;
        }elseif(empty($filterValue[1]) ){ 
            $this->echoRespone('error','802','Column '.$ColumnValue[0]." vaule is missing...");
            exit;
        }elseif($filter != null){
            $sql = "SELECT * FROM $tableName WHERE $filter ";
        }
        try {
            //echo nl2br($sql);
            $rs = $conn->query($sql); // got it
            $output = array();
            while ($row = $rs->fetch_assoc()) {
                $output[] = $row;
            }
            if($output==null) 
                echo nl2br('No Result');
            return json_encode($output);
        } 
        catch (Exception $e) {
            $this->echoRespone('error','800','syntex error, Getting SQL result failed. \r\n SQL exception  > '.$e->getMessage());
            exit;
        }
    }

    function sqlManage($parameters, $method){
        require_once 'db.php';

        if(str_contains($parameters[0],'(')){
            $tableAndId = explode('(', $parameters[0]);
            $tableName = $tableAndId[0];
            $guid = str_replace(')','', $tableAndId[1]);
            $guid = str_replace(' ','', $guid);// handle data injection of > OR 1=1 , to delete all rows.
            if($tableName == null){
                $this->echoRespone('error','801','SQL error Entity Name missing...');
                exit;
            }elseif(empty($guid)){
                $this->echoRespone('error','806','SQL error , GUID is missing... 123');
                exit;
            }

            if($method === 'delete'){
                $sql = "DELETE FROM $tableName WHERE id = '$guid' ";
                try {
                    $conn->query($sql);
                    $this->echoRespone('success','200',"GUID : '$guid' is deleted.");
                    exit;
                } 
                catch (Exception $e) {
                    $this->echoRespone('error','804',',SQL failed. exception  > '.$e->getMessage());
                }
            }elseif($method === 'update'){
                $data = json_decode(file_get_contents('php://input'), true);
                foreach($data as $key => $val) {
                    $val = $this->relpaceQuo($val);
                    $sql = "UPDATE $tableName SET $key = '$val' WHERE id = $guid";
                    try {
                        $conn->query($sql);
                    } 
                    catch (Exception $e) {
                        $this->echoRespone('error','804',',SQL failed. exception  > '.$e->getMessage());
                        exit;
                    }   
                }
                $this->echoRespone('success','200',"GUID : '$guid' is updated.");
                exit;
            }
        }else{
            $this->echoRespone('error','806','SQL error , GUID is missing... '. $parameters[0]);
            exit;
        }
    } 
}