
$server = "";
$session = false;

function checkForLoginVerification(){
    if(isCookieSet("oeip-sessionID")){
        if(loadCookies()["oeip-sessionID"] != "false"){
            //httpgo($server, "/checkForSession/"+loadCookies()["oeip-sessionID"]);
            //do some server search to ensure login session is registered on server (not made up, not logged out)
            if("login session exists on server"){
                sessionUserData = {uname: "waseem", uemail: "w.waseemsalem@gmail.com"}; //from server
                $session = new oeip_session();
                $session.id = sessionID;
                $session.userData = sessionUserData;
                handleLogin();
                return true;
            } else {
                return false;
            }
        }
    }
}
function login(){
    sessionID = String(Math.random()).split(".")[1]; //this is server side
    setCookie("oeip-sessionID", sessionID);
    sessionUserData = {uname: "waseem", uemail: "w.waseemsalem@gmail.com"}; //from server
    $session = new oeip_session();
    $session.id = sessionID;
    $session.userData = sessionUserData;
    handleLogin();
}

function handleLogin(){
    //setup the html page based on user session data
}

function logout(){
    if(httpgo($server, "/destoySession/"+loadCookies()["oeip-sessionID"]) == "done"){
        $session = false;
        setCookie("oeip-session", "false");
        return true;
    } else {
        return false;
    }
}

function oeip_session(){
    this.id = "";
    this.userData = "";
    this.photo = "";
    this.mail = "";
}
