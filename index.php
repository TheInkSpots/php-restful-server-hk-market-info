<?php

 class Controller { // console : { php -s 0.0.0.0:8081 index.php } to open loacal server.
    private $pathInfo;
    private $urlSegments;

    function echoError($code, $message){
        $output = array();
        $innerSmg = array();
        $innerSmg['code'] = $code;
        $innerSmg['message'] = $message;
        $output['error'] = $innerSmg;
        echo json_encode($output);
        exit;
    }

    function __construct() {
       // var_dump($_SERVER); die;
        if (!isset($_SERVER['PATH_INFO'])) {
            echo '{"Usage": "http://127.0.0.1:8081/{resource name}"}';
         //   exit;
        }
        $this->pathInfo = $_SERVER['PATH_INFO']; //get after .com/ (parameter)
        $this->urlSegments = explode('/', $this->pathInfo); //split w/ '/'
        array_shift($this->urlSegments); // [0] = null, poped it.
        $service = array_shift($this->urlSegments); // get 1st segment
        $service = lcfirst($service);  // replace substring[0] to lowercase (useless)
        // var_dump($service); die;
        // $service2 = array_shift($this->urlSegments); 
        // var_dump($service2);
        // die;
        // $allowed_path = ['js', 'images', '', ''];
        // $allowed_type = ['js', 'jpg', 'png'];

        // $path_route = [
        //     'js' => 'javascript',
        //     'img' => 'images',
        // ];

        // $is_valid = false;
        // for ($j=0; j<$allowed_path.length; j++) {
        //     if ($allowed_path[$j] === $service) {
        //         $is_valid = true;
        //     }
        // }

        // if (!$is_valid) 
        //     exit;

        // for ($i=0; i<$allowed_type.length; i++) {
        //     if ($service === $allowed_type) {
        //         $resourseName = array_shift($this->urlSegments);
        //         echo file_get_contents(__DIR__."".$service.$resourseName.$allowed_type[i]);
        //         exit;
        //     }
        // }

        if($service === 'js'){
            $resourseName = array_shift($this->urlSegments);
            echo file_get_contents(__DIR__."/javascript/$resourseName".'.js');
        }
        else if($service === 'phot'){
            $resourseName = array_shift($this->urlSegments);
            echo file_get_contents(__DIR__."/photo/$resourseName".'.jpg');
        }
        else
        if ($service === 'api'){
            $serviceClassName = ucfirst($service);  // replace substring[0] to uppercase (class name)
            $serviceFileName = $service.'_service'.'.php';  // append '_service' to prevent heack information;
            if (file_exists($serviceFileName)) {
                require_once $serviceFileName; // include api_service.php here
                $provider = new $serviceClassName; // new a Class of .php (Api myClass = new Api;)
                $httpMETHOD = $_SERVER['REQUEST_METHOD']; // get what is the CURD in the header of request 
                $provider->$httpMETHOD($this->urlSegments); // = call Api.GET(<segment.after./api/>)
            } else {    
                $this->echoError('404',"Sites '$service' not found");
                exit;
            }
        }else{ // for web html
            $CurSites = $service;
            //require_once $CurSites.'.html';
            //return \File::get(public_path() . "web/$CurSites.html");       
            echo file_get_contents(__DIR__."/web/$CurSites.html");
            
        } 
    }
 }

 $controller = new Controller();