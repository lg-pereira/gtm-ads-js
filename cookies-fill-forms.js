<script>
  (function() {
    // -----------------------------------------------------------
    // CONFIGURAÇÃO: Seletores dos campos (Mantenha os que você já pegou)
    // -----------------------------------------------------------
    var inputNomeSelector      = '#form-field-name'; 
    var inputSobrenomeSelector = '#form-field-lastname';  
    var inputEmailSelector     = '#form-field-email';     
    var inputTelefoneSelector  = '#form-field-phone';     

    // -----------------------------------------------------------
    // 1. Pega e Limpa os Cookies
    // -----------------------------------------------------------
    function cleanVal(val) {
      if (!val || val === "undefined" || val === "null") return "";
      try { return decodeURIComponent(val).replace(/\+/g, ' '); } catch (e) { return val; }
    }

    var nome      = cleanVal("{{cookie-LeadFirstName}}");
    var sobrenome = cleanVal("{{cookie-LeadLastName}}");
    var email     = cleanVal("{{cookie-LeadEmail}}");
    var phone     = cleanVal("{{cookie-LeadPhone}}");

    // -----------------------------------------------------------
    // 2. A Lógica de "Tentativa Recorrente" (Polling)
    // -----------------------------------------------------------
    var tentativas = 0;
    var maxTentativas = 8; // Tenta 8 vezes (8 * 500ms = 4 segundos)
    
    var intervalo = setInterval(function() {
      tentativas++;
      
      // Tenta encontrar o campo de email como referência
      var campoEmail = document.querySelector(inputEmailSelector);
      
      // SE o campo foi encontrado (o pop-up abriu):
      if (campoEmail) {
        console.log("GTM: Pop-up detectado na tentativa " + tentativas + ". Preenchendo...");
        
        // Executa o preenchimento
        fillField(inputNomeSelector, nome);
        fillField(inputSobrenomeSelector, sobrenome);
        fillField(inputEmailSelector, email);
        fillField(inputTelefoneSelector, phone);
        
        // MATA o intervalo (para de procurar)
        clearInterval(intervalo);
      } 
      
      // SE atingiu o limite de tentativas e não achou nada:
      if (tentativas >= maxTentativas) {
        console.log("GTM: Pop-up não encontrado após 4 segundos. Parando.");
        clearInterval(intervalo);
      }
      
    }, 500); // Roda a cada 500 milissegundos

    // -----------------------------------------------------------
    // 3. Função de Preenchimento (Idêntica à anterior)
    // -----------------------------------------------------------
    function fillField(selector, value) {
      if (!value) return;
      var field = document.querySelector(selector);
      if (field) {
        field.value = value;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        field.dispatchEvent(new Event('blur', { bubbles: true }));
      }
    }

  })();
</script>
