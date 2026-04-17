// Para casos com Form estático e Form Pop-Up na mesma página

// Lead First Name
function formatFirstNameSetCookie() {
  var firstnameInput = null;
  // 1. Primeiro tenta pegar o input DENTRO do popup do Elementor
  var popupForm = document.querySelector('[data-elementor-type="popup"] form');
  if (popupForm) {
    firstnameInput = popupForm.querySelector('[name="names[first_name]"]');
  }
  // 2. Se não encontrou ou o campo está vazio, procura no form estático da página
  if (!firstnameInput || !firstnameInput.value.trim()) {
    firstnameInput = document.querySelector('[name="names[first_name]"]');
   
  }
  // Processa o valor se encontrou
  if (firstnameInput && firstnameInput.value && firstnameInput.value.trim() !== '') {
    var rawValue = firstnameInput.value.trim();
   
    var cleanValue = rawValue.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^a-zA-Z]/g, ""); // mantém apenas letras
    // Define o cookie primário
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    document.cookie = "LeadFirstName=" + encodeURIComponent(cleanValue) +
                      "; expires=" + expirationDate.toUTCString() +
                      "; path=/; SameSite=Lax";
    console.log('[GTM] LeadFirstName cookie definido com sucesso:', cleanValue,
                '- Origem:', firstnameInput.closest('[data-elementor-type="popup"]') ? 'Popup' : 'Form Estático');
    return cleanValue;
  }
  console.log('[GTM] Nenhum valor encontrado para names[first_name]');
  return undefined;
}

// Lead Last Name
function formatLastNameSetCookie() {
  var lastnameInput = null;

  // 1. Primeiro tenta pegar o input DENTRO do popup do Elementor
  var popupForm = document.querySelector('[data-elementor-type="popup"] form');
  if (popupForm) {
    lastnameInput = popupForm.querySelector('[name="names[last_name]"]');
  }

  // 2. Se não encontrou ou o campo está vazio, procura no form estático da página
  if (!lastnameInput || !lastnameInput.value.trim()) {
    lastnameInput = document.querySelector('[name="names[last_name]"]');
  }

  // Processa o valor se encontrou
  if (lastnameInput && lastnameInput.value && lastnameInput.value.trim() !== '') {
    var rawValue = lastnameInput.value.trim();
   
    var cleanValue = rawValue.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^a-zA-Z]/g, ""); // mantém apenas letras

    // Define a expiração do cookie para 30 dias a partir de agora
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    // Define o cookie como primário, válido para todo o site
    document.cookie = "LeadLastName=" + encodeURIComponent(cleanValue) +
                      "; expires=" + expirationDate.toUTCString() +
                      "; path=/; SameSite=Lax";

    console.log('[GTM] LeadLastName cookie definido com sucesso:', cleanValue,
                '- Origem:', lastnameInput.closest('[data-elementor-type="popup"]') ? 'Popup' : 'Form Estático');

    return cleanValue;
  }

  console.log('[GTM] Nenhum valor encontrado para names[last_name]');
  return undefined;
}


// Lead Email
function formatEmailSetCookie() {
  var emailInput = null;

  // 1. Primeiro tenta pegar o input DENTRO do popup do Elementor
  var popupForm = document.querySelector('[data-elementor-type="popup"] form');
  if (popupForm) {
    emailInput = popupForm.querySelector('[name="email"]');
  }

  // 2. Se não encontrou ou o campo está vazio, procura no form estático da página
  if (!emailInput || !emailInput.value.trim()) {
    emailInput = document.querySelector('[name="email"]');
  }

  // Processa o valor se encontrou
  if (emailInput && emailInput.value && emailInput.value.trim() !== '') {
    var rawValue = emailInput.value.trim();
   
    var cleanValue = rawValue.toLowerCase(); // Apenas converte para minúsculo (sem remover acentos ou caracteres especiais)

    // Define a expiração do cookie para 30 dias a partir de agora
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    // Define o cookie como primário, válido para todo o site
    document.cookie = "LeadEmail=" + encodeURIComponent(cleanValue) +
                      "; expires=" + expirationDate.toUTCString() +
                      "; path=/; SameSite=Lax";

    console.log('[GTM] LeadEmail cookie definido com sucesso:', cleanValue,
                '- Origem:', emailInput.closest('[data-elementor-type="popup"]') ? 'Popup' : 'Form Estático');

    return cleanValue;
  }

  console.log('[GTM] Nenhum valor encontrado para name="email"');
  return undefined;
}

// Lead Phone
function formatPhoneSetCookie() {
  var phoneInput = null;

  // 1. Primeiro tenta pegar o input DENTRO do popup do Elementor
  var popupForm = document.querySelector('[data-elementor-type="popup"] form');
  if (popupForm) {
    phoneInput = popupForm.querySelector('[name="phone"]');
  }

  // 2. Se não encontrou ou o campo está vazio, procura no form estático da página
  if (!phoneInput || !phoneInput.value.trim()) {
    phoneInput = document.querySelector('[name="phone"]');
  }

  // Processa o valor se encontrou
  if (phoneInput && phoneInput.value && phoneInput.value.trim() !== '') {
    var rawValue = phoneInput.value.trim();
   
    // Remove todos os caracteres não numéricos
    var numeroLimpo = rawValue.replace(/\D/g, '');

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
                      "; path=/; SameSite=Lax";

    console.log('[GTM] LeadPhone cookie definido com sucesso:', numeroLimpo,
                '- Origem:', phoneInput.closest('[data-elementor-type="popup"]') ? 'Popup' : 'Form Estático');

    return numeroLimpo;
  }

  console.log('[GTM] Nenhum valor encontrado para name="phone"');
  return undefined;
}
