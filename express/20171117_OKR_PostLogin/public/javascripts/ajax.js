// varables
var url_localhost = 'http://localhost:3000';
var xml_http = null;

// functions
function Req_ajax(info, type) {
    $.ajax({
        data: { info: info, type: type },
        // - 需要傳送的資料
        url: url_localhost + '/req_ajax',
        // - 告訴程式表單要傳送到哪裡 
        type: type,
        dataType: 'json',
        cache: false,
        timeout: 5000,
        success: function (feedback) {
            // - 資料傳送成功後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            console.log('Msg: ajax.js - sucess');
            var res = feedback;
            if (res[0] == 'success') {
                document.getElementById("status").innerHTML += "<p style='color:green; font-weight:bold;'>Sever sendback Msg: " + res[1] + "</p>";
            } else {
                document.getElementById("status").innerHTML += "<p style='color:#2289DB; font-weight:bold;'>Sever sendback fail. " + res[1] + "</p>";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // - 資料傳送失敗後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            console.log('Msg: ajax.js - error');
            document.getElementById("status").innerHTML += "<p style='color:#C00000; font-weight:bold;'>连接不到服务器，请检查网络！</p>";
        }
    });
}

function Check_acc_pwd(req_type, account, password) {
    $.ajax({
        data: { type: req_type, acc: account, pwd: password },
        // - 需要傳送的資料
        url: url_localhost + '/req_ajax_check_acc_pwd',
        // - 告訴程式表單要傳送到哪裡 
        type: req_type,
        dataType: 'json',
        cache: false,
        timeout: 5000,
        success: function (data) {
            // - 資料傳送成功後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            console.log('# ./javascript/ajax.js: Check_acc_pwd(): ajax.js - sucess');
            var res = data;
            if (res[0] == 'success') {
                console.log('# ./javascript/ajax.js: Check_acc_pwd(): Sever sendback Msg: ' + res[1]);
                // document.getElementById("status").innerHTML += "<p style='color:green; font-weight:bold;'>Sever sendback Msg: " + res[1] + "</p>";
                if (res[1] == 'data dismatch') {
                    alert('data dismatch.');
                } else {
                    window.location.href = '/profile/check-ok';
                }
            } else {
                console.log('#-- Error: ./javascript/ajax.js: Check_acc_pwd():  Sever sendback fail. Msg: ' + res[1]);
                // document.getElementById("status").innerHTML += "<p style='color:#2289DB; font-weight:bold;'>Sever sendback fail. " + res[1] + "</p>";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // - 資料傳送失敗後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            console.log('#-- Error: ./javascript/ajax.js: Check_acc_pwd(): Msg: ajax.js - error');
            // document.getElementById("status").innerHTML += "<p style='color:#C00000; font-weight:bold;'>连接不到服务器，请检查网络！</p>";

        }
    });
}

