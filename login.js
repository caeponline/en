$server = 'http://127.0.0.1:2000';
$username = document.getElementById("uname");
$userlastname = document.getElementById("ulastname");
$useremail = document.getElementById("uemail");
$userhear = document.getElementById("uhear");
$userexpect = document.getElementById("uexpect");
$userwhyyou = document.getElementById("uwhyyou");
$userwhyus = document.getElementById("uwhyus");
$userdep = document.getElementById("udep");
$uservsstart = document.getElementById("uvsstart");

function signup(){
    data = {
        username: $username.value,
        email: $useremail.value,
        lastname: $userlastname.value,
        howhear: $userhear.value,
        expect: $userexpect.value,
        whyhim: $userwhyyou.value,
        whyus: $userwhyus.value,
        dep: $userdep.value,
        startVirtualSemester: $uservsstart.value
    };
    loading('block');
    var janeHTTP = new XMLHttpRequest;
    if(janeHTTP.readyState == 0 || janeHTTP.readyState == 4){
        janeHTTP.open("GET", $server + "/orderInFile/"+ JSON.stringify(data) +"/jane.json", true);
        janeHTTP.onreadystatechange = function(){
            if (janeHTTP.readyState == 4)
            {
                if (janeHTTP.status == 200)
                {
                    loading('none');
                    alert("done!");
                    $username.value = '';
                    $useremail.value = '';
                    $userlastname.value = '';
                    $userhear.value = '';
                    $userexpect.innerHTML = '';
                    $userwhyyou.innerHTML = '';
                    $userdep.value = '';
                    $uservsstart.value = '';
                }
            }
        };
        janeHTTP.send(null);
    }
}

loading('none');
function loading(statuser){
    document.getElementById("signupLoading").style.display = statuser;
}