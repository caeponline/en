
$server = "http://localhost/oeip/";

function httpgo(req){
    var httpGetJSON = new XMLHttpRequest;
    if (httpGetJSON.readyState == 4 || httpGetJSON.readyState == 0){
        httpGetJSON.open("GET", $server + req, true);
        httpGetJSON.onreadystatechange = function(){
            if (httpGetJSON.readyState == 4)
            {
                if (httpGetJSON.status == 200)
                {
                    console.log(httpGetJSON.responseText);
                }
            }
        };
        httpGetJSON.send(null);
    }
}


// cookies

function loadCookies(){
    mycookies = document.cookie;
    $cookies = {};
    mycookies = mycookies.split(";");
    mycookies.forEach(cookie => {
        cKey = cookie.split("=")[0].replaceAll(" ","");
        cValue = cookie.split("=")[1];
        $cookies[cKey] = cValue;
    });
    return $cookies;
}

function setCookie(key, value){
    document.cookie = key + "=" + value;
}

function isCookieSet(key){
    cookies = loadCookies();
    if(cookies[key] != undefined){
        return true;
    } else {
        return false;
    }
}
