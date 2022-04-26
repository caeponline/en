
host = "http://localhost/oeip/github"

templates = {
    header: "<h1>{$username$}</h1> <br> <h2>{$lastname$} is his lastname</h2>",
    tophead: '<div class="tophead">\
                <img src="{$logo$}" style="height: 1in; margin-top: 0.1in; margin-left: 0.1in; float: left;" alt="">\
                <span class="h1">\
                    {$title$}\
                </span>\
            </div>',
    usernav: '<style>#usernav{display:block}#sc1{display: none;}#headingo{}#headingo--{font-size: 20px}</style>\
                <a href="./portfolio/user.htm"><div class="img-div">\
                    <img src="'+host+'/portfolio/img/{$picname$}" alt="">\
                </div></a>\
                <div class="user-name">\
                    <a href="'+host+'/portfolio/user.htm">{$username$}</a>\
                    <div style="margin-left: 10px; display: inline-block" id="usercontrol">\
                        <button onclick="logout()" class="notifs"></button>\
                        <button onclick="pageLocalLogoutFunction()" id="logoutbtn" class="logout"></button>\
                        <button onclick="menu()" class="menu desktop-hide"></button>\
                    </div>\
                </div>'
};

function loadtemplate(template, parameters){
    round1 = templates[template];
    begin = "{$"; end = "$}";
    
    for (const key in parameters) {
        if (Object.hasOwnProperty.call(parameters, key)) {
            const parameterNewValue = parameters[key];
            round1 = round1.replaceAll(begin+key+end, parameterNewValue);
        }
    }
    return round1;
}

