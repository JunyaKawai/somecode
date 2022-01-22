function insertrow(){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName1 = "動画書き込み先シート名;
    var srcSheet = ss.getSheetByName(sheetName1);
    srcSheet.insertRows(1,100);//100行挿入
    var sheetName2 = "動画取得元シート名";
    var srcSheet2 = ss.getSheetByName(sheetName2);

    for(var i=1;i<=100;i++)
  　{
     for(var j=1;j<=3;j++)                                 //動画取得のデータからコピー
    　{
      var copyValue=srcSheet2.getRange(i,j).getValue();
      srcSheet.getRange(i,j).setValue(copyValue);   
    　}
  　}
    srcSheet.getRange("A:C").removeDuplicates([2]); //B列の重複を削除（将来的にはこれを軽くしないときつい）
}

