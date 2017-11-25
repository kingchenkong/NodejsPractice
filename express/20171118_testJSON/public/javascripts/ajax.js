var url_localhost = 'http://localhost:3000';

function Req_ajax(info, type, acc, pwd) {
    $.ajax({
        data: { info: info, type: type, account: acc, password: pwd },
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
            /*
            // json package
            var jsonPackage = {
                req_status: 200,
                req_info: info,
                req_type: type,
                acc: account,
                pwd: password,
                acc_info: [{ color: 'black', height: 180 }],
                contact: [{ type: 'cell', val: '0912-345-678' }, { type: 'home', val: '01-2345678' }, { type: 'email', val: 'acc@mail.com' }]
            };
            */
            // 直接用 點語法 抓取key's valus.
            if (res.req_status == 200) {

                // - res 內容
                document.getElementById('outputJSON').innerHTML = "<p style='color:green; font-weight:bold;'>Sever sendback Msg: " + JSON.stringify(res) + "</p>";
                // ### result
                // Sever sendback Msg: {"req_status":200,"req_info":"form submit","req_type":"post","acc":"aaa","pwd":"zzz","acc_info":[{"color":"black","height":180}],"contact":[{"type":"cell","val":"0912-345-678"},{"type":"home","val":"01-2345678"},{"type":"email","val":"acc@mail.com"}]}
                // ###

                // - p id => p json list       
                document.getElementById('pjl0').innerHTML = '<p id="pjl0">' + res.req_status + '</p>';
                // ### result
                // 200
                // ###

                // - JSON.stringify() - 物件序列化成 JSON 字串         
                document.getElementById('pjl1').innerHTML = '<p id="pjl1">' + JSON.stringify(res, ["req_info", "req_type"]) + '</p>';
                // ### result
                // {"req_info":"form submit","req_type":"post"}
                // ###
                document.getElementById('pjl2').innerHTML = '<p id="pjl2">' + JSON.stringify(res, ['acc', 'pwd']) + '</p>';
                // ### result
                // {"acc":"aaa","pwd":"zzz"}
                // ###

                // -- 使用第二個參數 function 方式，排除 acc, pwd 特性不被序列為 JSON 字串
                document.getElementById('pjl3').innerHTML = '<p id="pjl3">' + JSON.stringify(res, function (key, value) {
                    if (key == "acc" || key == "pwd")
                        return undefined;
                    return value
                }) + '</p>';
                // ### result
                // {"req_status":200,"req_info":"form submit","req_type":"post","acc_info":[{"color":"black","height":180}],"contact":[{"type":"cell","val":"0912-345-678"},{"type":"home","val":"01-2345678"},{"type":"email","val":"acc@mail.com"}]}
                // ###

                // - JSON.parse() - JSON 字串解析成 JavaScript 物件
                var jsonObj = JSON.parse(JSON.stringify(res));
                document.getElementById('pjl4').innerHTML = '<p id="pjl4">' + jsonObj.acc + '</p>';
                // ### result
                // aaa
                // ###

                // - eval() - JavaScript 代碼字串求值成特定的物件
                // -- 使用 eval() 將字串求值成特定的物件（字串前後須加上刮號，用來告知這不是要執行的 statement），這樣就可使用 JavaScript 進行操作了
                // ------ WARM: eval() 函式可執行字串中的 Javascript 程式碼，所以容易有 XSS 攻擊的危險，因此較不建議使用
                var jsonEval = eval('(' + JSON.stringify(res) + ')');
                document.getElementById('pjl5').innerHTML = '<p id="pjl5">' + jsonEval.contact[0].type + '</p>';
                // ### result
                // cell
                // ###

                // ---- hint:  以下必須載入 jQuery ----
                // - 使用 JavaScript 的 for()
                var forTable = $(".for-table tbody");
                for (var i = 0; i < res.acc_info.length; i++) {
                    forTable.append("<tr>" +
                        "<td> " + res.acc_info[i].color + " </td>" +
                        "<td> " + res.acc_info[i].height + " </td>" +
                        "</tr>");
                }
                // ### result
                //black	180
                // black	180
                // ###

                // - 使用 jQuery 的 each()
                var eachTable = $(".each-table tbody");
                $.each(res.contact, function (index, element) {
                    eachTable.append("<tr>" +
                        "<td>" + element.type + "</td>" +
                        "<td>" + element.val + "</td>" +
                        "</tr>");
                });
                // ### result
                //  cell    0912-345-678
                //  home    01-2345678
                //  email   acc@mail.com
                // ###

            } else {
                document.getElementById('outputJSON').innerHTML = "<p style='color:red; font-weight:bold;'>Sever sendback fail. " + JSON.stringify(res) + "</p>";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // - 資料傳送失敗後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            console.log('Msg: ajax.js - error');
            document.getElementById("status").innerHTML += "<p style='color:#C00000; font-weight:bold;'>连接不到服务器，请检查网络！</p>";
        }
    });
}