
function _$(elID){
    return document.getElementById(elID)
}
function _v$(elID){
    console.log(elID)
    return document.getElementById(elID).value
}
function _i$(elID){
    return document.getElementById(elID).innerHTML
}

function httpgo(server, req, procedure){
    var httpGetJSON = new XMLHttpRequest;
    if (httpGetJSON.readyState == 4 || httpGetJSON.readyState == 0){
        httpGetJSON.open("GET", server + req, true);
        httpGetJSON.onreadystatechange = function(){
            if (httpGetJSON.readyState == 4)
            {
                if (httpGetJSON.status == 200)
                {
                    console.log("resultx: " + httpGetJSON.responseText);
                    procedure(httpGetJSON.responseText, {occure: false, content: "success"});
                } else {
                    procedure("error", {occure: true, content: "200"});
                }
            }  else {
                procedure("error",{occure: true, content: "4"} );
            }
        };
        httpGetJSON.send(null);
    } else {
        procedure("error", {occure: true, content: "connection"});
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

function getCookie(key){
    if(isCookieSet(key)){
        return loadCookies()[key];
    } else {
        return false;
    }
}

function distroyCookie(key){
    document.cookie = setCookie(key, "del");
}

function isCookieSet(key){
    cookies = loadCookies();
    if(cookies[key] != undefined && cookies[key] != "del"){
        console.log("trueee");
        return true;
    } else {
        console.log("falsee");
        return false;
    }
}


// logging

function isLoggedIn(call){
    if(isCookieSet("oeip_sessionIDx") && getCookie("oeip_sessionIDx") != "del"){
        httpgo("https://waseemssaeed.pythonanywhere.com/checksession/", getCookie("oeip_sessionIDx"), (result, error)=>{
            if(result != "null" && !error.occure){
                //feedback = result.split("_ok-")[1];
                feedback = result;
                feedback = JSON.parse(feedback);
                call({"status": true, "feedback": feedback});
            } else {
                call({"status": false, "feedback": error.content});
            }
        });
    } else {
        call({"status": false, "feedback": false});
    }
}

function logout(call){
    distroyCookie("oeip_sessionIDx");
    distroyCookie("oeip_sessionJSON");
    if(isCookieSet("oeip_sessionIDx") && getCookie("oeip_sessionIDx") != "del"){
        console.log("logout(): login detected");
        httpgo("https://waseemssaeed.pythonanywhere.com/deletesession/", getCookie("oeip_sessionIDx"), (result, error)=>{
            if(result != "null" && !error.occure){
                console.log("hehe");
                feedback = result.split("_ok-")[1];
                console.log(getCookie("oeip_sessionIDx"));
                if(feedback == "done"){
                    distroyCookie("oeip_sessionIDx");
                    distroyCookie("oeip_sessionJSON");
                    console.log("cookie: ");
                    call({"status": true, "feedback": feedback});
                    return {"status": true, "feedback": feedback}
                }
            } else {
                call({"status": false, "feedback": feedback});
                return {"status": false, "error": error.occure, "feedback": error.content};
            }
        });
    } else {
        console.log("logout(): no login detected");
        call({"status": false, "feedback": feedback});
        return {"status": false, "feedback": "not logged in"};
    }
}

function login(mail,key, call){
    //$useremail = "w.waseemsalem@gmail.com";
    //$userpassword = "w1996";
    $useremail = mail;
    $userpassword = key;
    if(!isCookieSet("oeip_sessionIDx") || getCookie("oeip_sessionIDx") == "del"){
        httpgo("https://waseemssaeed.pythonanywhere.com/registersession/-/", $useremail+"/"+$userpassword+"/-/-", (result, error)=>{
            if(result != "null" && !error.occure && result.split("_ok-").length >> 0 ){
                feedback = result.split("_ok-")[1];
                feedback = JSON.parse(feedback);
                setCookie("oeip_sessionIDx", feedback.id);
                setCookie("oeip_sessionJSON", JSON.stringify(feedback));
                call({"status": true, "feedback": feedback, "cookie": getCookie("oeip_sessionIDx")});
                return {"status": true, "feedback": feedback, "cookie": getCookie("oeip_sessionIDx")};
            } else {
                call({"status": false, "error": error.occure, "feedback": error.content});
                return {"status": false, "error": error.occure, "feedback": error.content};
            }
        });
    } else {
        call({"status": false, "feedback": "already logged in"});
        return {"status": false, "feedback": "already logged in"};
    }
}

//console.log(logout());
//console.log(login());


/*=======  LOCAL PAGE ==========*/
function pageLocalLoginFunction(){
    document.getElementById("loginbtn").innerHTML = "Loading...";
    console.log("called");
    uname = document.getElementById("uname").value;
    upass = document.getElementById("upassword").value;

    login(uname, upass, (result)=>{
        console.log(result);
        if(result.status){
            document.getElementById("loginbtn").innerHTML = "Redirecting...";
            location.reload();
        } else {
            document.getElementById("loginbtn").innerHTML = "Faild, Network Error";
        }
    });
}

function pageLocalLogoutFunction(){
    document.getElementById("usernav").innerHTML = loadtemplate("usernav", {"picname": "", "username": "Signing Out..."});
    logout((result)=>{
        if(result.status){
            location.reload();
        } else {
            location.reload();
            alert(JSON.stringify(result));
            document.getElementById("usernav").innerHTML = loadtemplate("usernav", {"picname": "", "username": "Network Error"});
        }
    });
}

function trylog(){
    done = false;
    if(isCookieSet("oeip_sessionJSON") && isCookieSet("oeip_sessionIDx")){
        console.log("logged in::: " + getCookie("oeip_sessionJSON"));
        document.getElementById("usernav").innerHTML = loadtemplate("usernav", {"picname": "", "username": "Loading..."});
        isLoggedIn((result) => {
            if(result.status){
                console.log(getCookie("oeip_sessionJSON"));
                userjson = JSON.parse(getCookie("oeip_sessionJSON"));
                document.getElementById("usernav").innerHTML = loadtemplate("usernav", {"picname": userjson.picname, "username": userjson.uname});
                done = true;
            } else {
                console.log("not loggedin");
                if(done != true){
                    document.getElementById("usernav").innerHTML =
                        loadtemplate("usernav", {"picname": "", "username": "<span style=\"background-color: inherit\" onclick=\"trylog()\">Network Error (Click to Retry)</span>"});
                    //document.getElementById("usernav").innerHTML = "";
                    document.getElementById("usercontrol").style.display = "none";
                }
            }
        });
    }
}

function menu(){
    document.getElementById("navbar").style.display = 
        document.getElementById("navbar").style.display == "block" ? "none" : "block";
}

nbtns = document.getElementsByClassName("nbtn");
for (let index = 0; index < nbtns.length; index++) {
    const element = nbtns[index];
    element.addEventListener("click", ()=>{
        if(screen.width < 600){
            menu();
        }
    }, false);
}

function traficReg(flag){
    mydate = new Date();
    $server = 'https://waseemssaeed.pythonanywhere.com/orderInFile/{"'+flag+'":"'+
        mydate.toUTCString()+'", "zone":"'+
        Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[0] + "-"
        + Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[1]
        +'"}/oeip-trafic.json';
    var httpGetJSON = new XMLHttpRequest;
    navigationMode = document.URL;
    navigationMode = navigationMode.split("navmode=")[1];
    navigationMode = navigationMode != undefined ? navigationMode.split("&")[0] : navigationMode;
    if(navigationMode != "developer"){
        if (httpGetJSON.readyState == 4 || httpGetJSON.readyState == 0){
            httpGetJSON.open("GET", $server, true);
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
}