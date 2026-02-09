<script>
  (function() {
    // 1. URL DO SEU APPS SCRIPT
    var endpoint = "{{gsheets-URL}}";
    
    // -----------------------------------------------------------
    // FUNÇÕES AUXILIARES
    // -----------------------------------------------------------
    
    // Função 1: Limpeza de dados
    function cleanVal(val) {
      if (!val || val === "undefined" || val === "null") return "";
      try {
        var decoded = decodeURIComponent(val);
        decoded = decoded.replace(/\+/g, ' ');
        return decoded.trim();
      } catch (e) {
        return val;
      }
    }

    // Função 2: Envio para o Sheets
    function sendToSheets(finalPayload) {
      fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(finalPayload)
      }).then(function() {
        console.log("Lead enviado para Sheets (Back-end)");
        console.log(finalPayload);
      }).catch(function(err) {
        console.error("Erro fatal envio Sheets:", err);
      });
    }

    // -----------------------------------------------------------
    // 2. Lógica Principal
    // -----------------------------------------------------------
    var fName = cleanVal("{{cookie-LeadFirstName_Visual}}");
    var lName = cleanVal("{{cookie-LeadLastName_Visual}}");
    var rawEmail = "{{cookie-LeadEmail}}"; 
    var phone = "{{cookie-LeadPhone}}";

    // Só prossegue se tiver email ou telefone
    if ( (rawEmail && rawEmail !== "undefined") || (phone && phone !== "undefined") ) {
      
      var emailLimpo = cleanVal(rawEmail);

      // Objeto base com os dados do Lead
      // IMPORTANTE: Verifique se na planilha a coluna é "lastName" mesmo
      var payload = {
        firstName: fName,
        lastName: lName,   // CORRIGIDO (estava latName)
        phone: phone,
        email: emailLimpo,
        city: "",    
        state: ""     
      };

      // -----------------------------------------------------------
      // 3. Tenta pegar a localização e Envia
      // -----------------------------------------------------------
      fetch('https://ipapi.co/json/')
        .then(function(response) { return response.json(); })
        .then(function(data) {
          
          // SUCESSO: Preenche a localização
          // CORREÇÃO CRÍTICA AQUI (Adicionado aspas nas chaves)
          if(data.city) payload["city"] = data.city;
          if(data.region_code) payload["state"] = data.region_code;
          
          sendToSheets(payload); 
        })
        .catch(function(err) {
          // ERRO DE LOCALIZAÇÃO: Envia sem local
          console.warn("Não foi possível pegar localização. Enviando lead sem local.");
          sendToSheets(payload); 
        });
    }
  })();
</script>
