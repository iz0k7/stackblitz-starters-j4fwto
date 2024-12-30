function doPost(e) {
    var sheet = SpreadsheetApp.openById('1rKMqG-MVHeOC_rAuO1GA8MU2eLjn-8m4gZKXG2wyGWY').getActiveSheet();
    var userName = e.parameter.username;
    var email = e.parameter.email;
    var password = e.parameter.password;

    // 檢查是否為註冊請求
    if (e.parameter.action === 'register') {
        // 檢查是否已經存在相同的用戶名
        var data = sheet.getDataRange().getValues();
        for (var i = 1; i < data.length; i++) { // 跳過標題行
            if (data[i][0] === userName) {
                return ContentService.createTextOutput('用戶名已存在');
            }
        }
        // 註冊用戶
        sheet.appendRow([userName, email, password]);
        return ContentService.createTextOutput('註冊成功');
    }



    // 登入邏輯
    if (e.parameter.action === 'login') {
        var data = sheet.getDataRange().getValues();
        var isValidUser = false;

        // 檢查用戶名和密碼
        for (var i = 1; i < data.length; i++) { // 跳過標題行
            if (data[i][0] == userName && data[i][2] == password) { // 假設用戶名在第一列，密碼在第三列
                isValidUser = true;
                break;
            }
        }

        if (isValidUser) {
            return ContentService.createTextOutput('登入成功');
        } else {
            return ContentService.createTextOutput('登入失敗');
        }
    }



    return ContentService.createTextOutput('無效的請求');
}

