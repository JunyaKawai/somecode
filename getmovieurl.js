function PlayList() {
//シート
var ss = SpreadsheetApp.getActiveSpreadsheet()
var sheetName1 = "sheetname";//URLを書き込むシートのシート名を入力
var srcSheet = ss.getSheetByName(sheetName1);
srcSheet.clear();

//チャンネルID位置定義
var channelID = "UCTNHFpn61hs-qdHKDGPhxBQ";
var ACESS_TOKEN = getToken();


//アクセストークン使用(mine=trueじゃないとエラー出る）
var dataURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&forMine=true&type=video&maxResults=49&access_token=" + ACESS_TOKEN ;
//レスポンス値にjson形式で挿入
var response = UrlFetchApp.fetch(dataURL);

//json形式分解
var list_totalResults= 300;                    //自分で設定する 総数/49*100   
var list_resultsPerPage = JSON.parse(response.getContentText()).pageInfo.resultsPerPage;                  
var list_nextpageID = JSON.parse(response.getContentText()).nextPageToken;                                


for(var int = 0; int < list_resultsPerPage; int++){

list_all = JSON.parse(response.getContentText()).items[int].snippet.title;　　　　　　　　　　　　　　　　　　//リストタイトル
list_jpeg = "2";               //リストjpegを置いていた列　定数に置き換えた
listID_all = JSON.parse(response.getContentText()).items[int].id;                                       //リストI
list_date = JSON.parse(response.getContentText()).items[int].snippet.publishedAt;                     //リスト作成日時


srcSheet.getRange(int+1, 1).setValue(list_all);
srcSheet.getRange(int+1, 2).setValue(list_jpeg);
srcSheet.getRange(int+1, 3).setValue(listID_all);
srcSheet.getRange(int+1, 4).setValue(list_date);

}

//次ページのトークン挿入
dataURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&forMine=true&type=video&maxResults=49&access_token=" + ACESS_TOKEN + "&pageToken=" + list_nextpageID;

var i = list_resultsPerPage
while(i<300){//i配列内のデータを検索し、セルに挿入
                 for(var int = 0; int < list_resultsPerPage; int++){//i配列内のデータを検索し、セルに挿入
                   list_all = JSON.parse(response.getContentText()).items[int].snippet.title;　　　　　　　　　　　　　　　　　　//リストタイトル
                   list_jpeg = "2";               //リストjpeg
                   listID_all = JSON.parse(response.getContentText()).items[int].id;                                       //リストI
                   list_date = JSON.parse(response.getContentText()).items[int].snippet.publishedAt;                     //リスト作成日時                                  //リストI
             
             
                   srcSheet.getRange(i + int + 1, 1).setValue(list_all);
                   srcSheet.getRange(i + int + 1, 2).setValue(list_jpeg);
                   srcSheet.getRange(i + int + 1, 3).setValue(listID_all);
                   srcSheet.getRange(i + int + 1, 4).setValue(list_date);
                 }
                 
         var list_nextpageID = JSON.parse(response.getContentText()).nextPageToken;                                //次ページのトークンID          
         dataURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&forMine=true&type=video&maxResults=49&access_token=" + ACESS_TOKEN + "&pageToken=" + list_nextpageID;
         //レスポンス値にjson形式で挿入
         var response = UrlFetchApp.fetch(dataURL);
         //Logger.log(dataURL);
         i =  i + list_resultsPerPage
}

}

function getToken() {
    var refreshToken = "refresh_token"; //リフレッシュトークンを入力
    var clientId = "clientID";　//clientIDを入力
    var clientSecret = "oQ_ROtkC-SqRkHLao5TAKi5L";
 
    var url = "https://www.googleapis.com/oauth2/v4/token";
    var data = "refresh_token=" + refreshToken + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&grant_type=refresh_token";
    var options = {
        "method": "post",
        "payload": data,
    }
 
    var resultRaw = UrlFetchApp.fetch(url, options).getContentText();
    var resultJson = JSON.parse(resultRaw);
 
    return resultJson.access_token;
}