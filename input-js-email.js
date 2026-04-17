//Para casos com Form estático e Form Pop-Up na mesma página

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
