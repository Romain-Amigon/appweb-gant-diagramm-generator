// Code Apps Script (Code.gs)
function doGet() {
  var sheet = SpreadsheetApp.openById('EXCEL ID !!!!').getSheetByName('SHEET NAME !!!!');
  var data = sheet.getDataRange().getValues();
  
  
  var tasks = data.slice(1).map(function(row) {
    return {
      task: row[0],  // Nom de la tâche
      start: row[1], // Début
      end: row[2]    // Fin
    };
  });
  
  
  console.log(tasks)
  
  var template = HtmlService.createTemplateFromFile('gantt_inspire');
  
  template.tasks = JSON.stringify(tasks);
  

  return template.evaluate();
}



function saveImageToDrive(dataURL) {
  // Décoder la chaîne de données URL en données binaires
  const base64Data = dataURL.split(',')[1];
  const contentType = 'image/png';
  const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, 'gantt_chart.png');

  // Enregistrer le fichier sur Google Drive
  const file = DriveApp.createFile(blob);
  Logger.log('folder download : ' + file.getName());
}


