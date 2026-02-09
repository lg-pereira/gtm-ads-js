<script>
  (function() {
    // 1. URL DO SEU APPS SCRIPT
    var endpoint = "{{gsheets-URL}}";
    
    // -----------------------------------------------------------
    // FUNÇÃO DE LIMPEZA (O Segredo dos Espaços)
    // -----------------------------------------------------------
    function cleanVal(val) {
      if (!val || val === "undefined" || val === "null") return "";
      try {
        // 1. Decodifica caracteres de URL (%20 viram espaço, %C3%A3 vira ã)
        var decoded = decodeURIComponent(val);
        
        // 2. Substitui o símbolo de soma (+) por espaço real
        // (Isso resolve o problema de "Luiz+Gustavo" virar "LuizGustavo")
        decoded = decoded.replace(/\+/g, ' ');
        
        // 3. Remove espaços extras no início/fim
        return decoded.trim();
      } catch (e) {
        return val;
      }
    }

    // -----------------------------------------------------------
    // 2. Captura e LIMPA os valores
    // -----------------------------------------------------------
    // Note que estou aplicando o cleanVal() aqui mesmo
    var fName = cleanVal("{{cookie-LeadFirstName_Visual}}");
    var lName = cleanVal("{{cookie-LeadLastName_Visual}}"); 
    
    var rawEmail = "{{cookie-LeadEmail}}"; 
    var phone = "{{cookie-LeadPhone}}";

    // -----------------------------------------------------------
    // 3. Validação e Envio
    // -----------------------------------------------------------
    if ( (rawEmail && rawEmail !== "undefined") || (phone && phone !== "undefined") ) {
      
      var emailLimpo = cleanVal(rawEmail); // Limpa o email também (@ em vez de %40)

      var payload = {
        firstName: fName,  // Vai enviar "Luiz Gustavo"
        lastName: lName,   // Vai enviar "Pereira da Silva"
        email: emailLimpo,
        phone: phone       // Envia o telefone como está (ou adicione lógica para tirar o 55 se quiser)
      };

      // 4. Envia para o Sheets
      fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      }).then(function() {
        console.log("Lead enviado para o Sheets: " + emailLimpo);
      }).catch(function(error) {
        console.error("Erro no envio GTM->Sheets: ", error);
      });
    }
  })();
</script>
