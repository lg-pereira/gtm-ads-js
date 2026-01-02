<script>
  (function() {
    // 1. COLE AQUI A URL DO SEU APPS SCRIPT ATUALIZADO
    var endpoint = "{{gsheets-URL}}";
    
    // 2. Captura os valores das variáveis do GTM
    var fName = "{{cookie-LeadFirstName}}";
    var lName = "{{cookie-LeadLastName}}";
    var rawEmail = "{{cookie-LeadEmail}}"; // Vem como luiz%40teste.com
    var phone = "{{cookie-LeadPhone}}";

    // 3. Verifica se pelo menos o email ou telefone existem para não enviar lixo
    if ( (rawEmail && rawEmail !== "undefined") || (phone && phone !== "undefined") ) {
      
      // TRATAMENTO DE DADOS:
      // Decodifica o email (transforma %40 em @)
      var cleanEmail = decodeURIComponent(rawEmail);

      var payload = {
        firstName: fName,
        lastName: lName,
        email: cleanEmail,
        phone: phone
      };

      // 4. Envia para o Sheets
      fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8" // text/plain evita preflight check do navegador
        },
        body: JSON.stringify(payload)
      }).then(function() {
        console.log("Lead enviado para o Sheets: " + cleanEmail);
      }).catch(function(error) {
        console.error("Erro no envio GTM->Sheets: ", error);
      });
    }
  })();
</script>
