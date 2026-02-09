//user-input-email 
function formatEmailSetCookie() {
  // Substitua pela variável do seu formulário
  var email = document.querySelector('[id="3 / null"]');

  // Verifica se o email não é nulo, indefinido e se contém um valor não vazio
  if (email && email.value.trim() !== '') {
    var emailValue = email.value.trim().toLowerCase(); // Converte para letras minúsculas e remove espaços extras

    // Define a expiração do cookie para 30 dias a partir da data atual
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    // Define o cookie no domínio atual, sem atributos que forcem HTTPS ou restrições cross-site
    document.cookie = "LeadEmail=" + encodeURIComponent(emailValue) + 
                      "; expires=" + expirationDate.toUTCString() + 
                      "; path=/";

    return emailValue;
  }

  return undefined;
}

//user-input-firstname
function formatFirstNameSetCookie() {
  var firstnameInput = document.querySelector('[id="0 / null"]');

  if (firstnameInput && firstnameInput.value.trim() !== '') {
    // 1. Pega o valor original (ex: "Luiz Gustavo")
    var rawValue = firstnameInput.value.trim();

    // 2. Prepara a versão "FEIA" (Para Tráfego/Pixels)
    // Mantém sua lógica atual: minúsculo, sem acento, sem espaço
    var trafficValue = rawValue.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z]/g, ""); 

    // 3. Prepara a versão "BONITA" (Para Planilha/Formulário)
    // Apenas removemos acentos para evitar erros de codificação, mas mantemos espaços e maiúsculas
    // Se quiser permitir acentos na planilha, remova o .normalize/...
    var visualValue = rawValue; 

    // Configura validade
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    // --- SALVA O COOKIE 1 (TRÁFEGO - O que você já usa) ---
    document.cookie = "LeadFirstName=" + trafficValue + 
                      "; expires=" + expirationDate.toUTCString() + 
                      "; path=/";

    // --- SALVA O COOKIE 2 (VISUAL - Novo) ---
    // Usamos encodeURIComponent para garantir que o espaço seja salvo corretamente (%20)
    document.cookie = "LeadFirstName_Visual=" + encodeURIComponent(visualValue) + 
                      "; expires=" + expirationDate.toUTCString() + 
                      "; path=/";

    return trafficValue;
  }
  return undefined;
}

//user-input-lastname
function formatLastNameSetCookie() {
  // Seleciona o campo pelo ID
  var lastnameInput = document.querySelector('[id="1 / null"]');

  if (lastnameInput && lastnameInput.value.trim() !== '') {
    // 1. Pega o valor original (ex: "Luiz Gustavo")
    var rawValue = lastnameInput.value.trim();

    // 2. Prepara a versão "FEIA" (Para Tráfego/Pixels)
    // Mantém sua lógica atual: minúsculo, sem acento, sem espaço
    var trafficValue = rawValue.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z]/g, ""); 

    // 3. Prepara a versão "BONITA" (Para Planilha/Formulário)
    // Apenas removemos acentos para evitar erros de codificação, mas mantemos espaços e maiúsculas
    // Se quiser permitir acentos na planilha, remova o .normalize/...
    var visualValue = rawValue; 

    // Configura validade
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    // --- SALVA O COOKIE 1 (TRÁFEGO - O que você já usa) ---
    document.cookie = "LeadLastName=" + trafficValue + 
                      "; expires=" + expirationDate.toUTCString() + 
                      "; path=/";

    // --- SALVA O COOKIE 2 (VISUAL - Novo) ---
    // Usamos encodeURIComponent para garantir que o espaço seja salvo corretamente (%20)
    document.cookie = "LeadLastName_Visual=" + encodeURIComponent(visualValue) + 
                      "; expires=" + expirationDate.toUTCString() + 
                      "; path=/";

    return trafficValue;
  }
  return undefined;
}

//user-input-phone
function formatPhoneSetCookie() {
  // Seleciona o campo pelo ID
  var phoneInput = document.querySelector('[id="2 / null"]');

  // Verifica se o campo existe e contém um valor
  if (phoneInput && phoneInput.value.trim() !== '') {
    var phoneValue = phoneInput.value.trim();

    // Remove todos os caracteres não numéricos
    var numeroLimpo = phoneValue.replace(/\D/g, '');

    // Adiciona o código do país 55 (Brasil) se o número não iniciar com 55
    if (!numeroLimpo.startsWith('55')) {
      numeroLimpo = '55' + numeroLimpo;
    }

    // Define a expiração do cookie para 30 dias a partir de agora
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    // Define o cookie como primário, válido para todo o site
    document.cookie = "LeadPhone=" + encodeURIComponent(numeroLimpo) + 
                      "; expires=" + expirationDate.toUTCString() + 
                      "; path=/";

    return numeroLimpo;
  }

  return undefined;
}
