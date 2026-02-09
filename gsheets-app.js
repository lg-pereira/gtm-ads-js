function doPost(e) {
  // ABRE A PLANILHA PELO ID ESPECÍFICO QUE VOCÊ FORNECEU
  var idPlanilha = "ID da sua planilha";
  var ss = SpreadsheetApp.openById(idPlanilha);
  
  // Pega a primeira aba da planilha (índice 0)
  // Isso evita erros caso você mude o nome da aba de "Página1" para "Leads"
  var sheet = ss.getSheets()[0];
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Extraindo os dados
    var fName = data.firstName || "";
    var lName = data.lastName || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var city = data.city || "";
    var state = data.state || "";
    var timestamp = new Date();
    
    // ORDEM DAS COLUNAS (preencha os cabeçalhos conforme a sequencia):
    // 1. Data | 2. Nome | 3. Sobrenome | 4. Telefone | 5. Email | 6. Cidade | 7. Estado
    sheet.appendRow([timestamp, fName, lName, phone, email, city, state]);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
