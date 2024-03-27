import Contrast from '../functions/color-contrast';

/// STYLESHEET MANIPULATION
// Create and append to document a new CSS stylesheet
export function createStylesheet() {
  var stylesheet = document.getElementById('boto_styles');
  if (!stylesheet) {
    stylesheet = document.createElement('style');
    stylesheet.type = 'text/css';
    stylesheet.id = 'boto_styles';
    document.getElementsByTagName('head')[0].appendChild(stylesheet);
  }
  return stylesheet;
}

// Append a style rule to a CSS stylesheet, removing the old one if passed as argument
export function addStyleRule(stylesheet, rule, oldRuleNode) {
  if (stylesheet) {
    if (oldRuleNode) removeStyleRuleNode(stylesheet, oldRuleNode);

    let ruleNode = document.createTextNode(rule);
    if (!stylesheet.contains(ruleNode)) stylesheet.appendChild(ruleNode);

    return ruleNode;
  }
  return null;
}

// Remove a style rule node from a CSS stylesheet
export function removeStyleRuleNode(stylesheet, ruleNode) {
  if (stylesheet && ruleNode && ruleNode.nodeName && stylesheet.contains(ruleNode)) {
    stylesheet.removeChild(ruleNode);
  }
}

/// ELEMENT MANIPULATION
// Hide the clicked element
export function hideClickedElement(e) {
  let element = e.target;
  element.style.visibility = 'hidden';
  return element;
}

// Hide all the the elements with the image tag
export function hideAllImageElements() {
  let imageElements = document.querySelectorAll('img');
  let hiddenImageElements = [];
  imageElements.forEach((imageElement) => {
    imageElement.style.visibility = 'hidden';
    hiddenImageElements.push(imageElement);
  });
  return hiddenImageElements;
}

// Show all elements in an array
export function showAllElements(elements) {
  elements.forEach((element) => (element.style.visibility = null));
}

/// ACCESSIBILITY ADAPTATIONS
// Checks the contrast ratio of all the elements and addapts the ones with bad contrast
export function domContrastFix() {
  let domCheck = Contrast.check();
  console.log('initial contrast check', domCheck);

  let fixedElements = [];
  if (domCheck && domCheck.errors)
    domCheck.errors.forEach((error) => {
      if (error.suggestedColor) {
        let elem = error.elem;
        let originalColor = elem.style.color;
        elem.style.color = error.suggestedColor;
        fixedElements.push({ elem, originalColor });
      }
    });

  console.log(
    'post fix contrast check (elements fixed = ' + fixedElements.length + ')',
    Contrast.check()
  );
  return fixedElements;
}

export function processColorLegend(event) {
  if (!document.getElementById('colorLegend')) generateFollowingDiv();
  const div = document.getElementById('colorLegend');
  const colorText = document.getElementById('colorText');
  const bgColorText = document.getElementById('bgColorText');

  const bgColorExample = document.getElementById('bgColorExample');
  let left = event.pageX;
  let top = event.pageY;

  div.style.left = window.innerWidth - left < 150 ? left - 150 + 'px' : left + 20 + 'px';
  div.style.top = window.innerHeight - top < 100 ? top - 100 + 'px' : top + 20 + 'px';
  div.style.display = 'block';

  if (event.target.style.color) {
    colorText.textContent = event.target.style.color;
  } else {
    let textColor = window.getComputedStyle(event.target).color;
    colorText.textContent = textColor;
  }

  if (event.target.style.backgroundColor) {
    bgColorText.textContent = event.target.style.backgroundColor;
  } else {
    let bgColor = window.getComputedStyle(event.target).backgroundColor;
    bgColorText.textContent = bgColor;
  }
}

function generateFollowingDiv() {
  let followingDiv = document.createElement('div');
  let colorTextDiv = document.createElement('div');
  let colorText = document.createElement('div');
  let bgColorDiv = document.createElement('div');
  let bgColorText = document.createElement('div');

  colorTextDiv.textContent = 'Cor do Texto:';
  colorTextDiv.style.marginRight = '8px';
  colorTextDiv.style.display = 'inline-flex';
  colorTextDiv.style.alignItems = 'center';
  bgColorDiv.textContent = 'Cor de Fundo:';
  bgColorDiv.style.marginRight = '8px';
  bgColorDiv.style.display = 'inline-flex';
  bgColorDiv.style.alignItems = 'center';
  bgColorDiv.style.justifyContent = 'flex-start';

  document.body.appendChild(followingDiv);
  followingDiv.appendChild(colorTextDiv);
  followingDiv.appendChild(colorText);
  followingDiv.appendChild(bgColorDiv);
  followingDiv.appendChild(bgColorText);
  followingDiv.setAttribute('id', 'colorLegend');
  colorText.setAttribute('id', 'colorText');
  bgColorText.setAttribute('id', 'bgColorText');

  followingDiv.style.position = 'absolute';
  followingDiv.style.padding = '5px 10px';
  followingDiv.style.display = 'none'; // Inicialmente oculto
  followingDiv.style.flexDirection = 'column';
  followingDiv.style.justifyContent = 'center';
  followingDiv.style.alignItems = 'center';
  followingDiv.style.background = 'white';
  followingDiv.style.color = 'black';
  followingDiv.style.zIndex = '999999';
  followingDiv.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
  followingDiv.style.borderRadius = '4px';
  followingDiv.style.border = '1px solid #ddd';
  followingDiv.style.fontFamily = 'Roboto, sans-serif';
}

export function onTypeChange(style) {
  const selectedType = style;
  processDaltonismType(selectedType);
}

export function processDaltonismType(type) {
  const types = type;

  switch (type) {
    case 2: // Protanopia
      console.log('case 2 - Protanopia');
      // Fundo e texto geral
      document.body.style.backgroundColor = '#0A284B'; // Azul escuro para o fundo
      document.body.style.color = '#E8F086'; // Verde-amarelo para o texto geral

      // Links
      document.querySelectorAll('a').forEach((a) => (a.style.color = '#235FA4')); // Azul médio para links

      // Botões
      document.querySelectorAll('.button').forEach((btn) => {
        btn.style.backgroundColor = '#6FDE6E'; // Verde claro para botões
        btn.style.color = '#0A284B'; // Azul escuro para o texto dos botões
      });

      // Cabeçalhos (h1, h2, h3, h4, h5, h6)
      document
        .querySelectorAll('h1, h2, h3, h4, h5, h6')
        .forEach((h) => (h.style.color = '#A691AE')); // Lilás para cabeçalhos

      // Bordas e linhas
      document.querySelectorAll('*').forEach((el) => (el.style.borderColor = '#235FA4')); // Azul médio para bordas

      // Inputs de formulário
      document.querySelectorAll('input, textarea, select').forEach((input) => {
        input.style.backgroundColor = '#E8F086'; // Verde-amarelo claro para o fundo dos inputs
        input.style.color = '#0A284B'; // Azul escuro para o texto dos inputs
      });

      // Tabelas
      document.querySelectorAll('table').forEach((table) => {
        table.style.borderColor = '#235FA4';
      });
      document.querySelectorAll('th, td').forEach((cell) => {
        cell.style.backgroundColor = '#E8F086';
        cell.style.color = '#0A284B';
      });

      // Listas
      document.querySelectorAll('ul, ol').forEach((list) => {
        list.style.backgroundColor = '#E8F086';
        list.style.color = '#0A284B';
      });

      // Citações
      document.querySelectorAll('blockquote').forEach((quote) => {
        quote.style.borderLeftColor = '#6FDE6E';
        quote.style.color = '#0A284B';
        quote.style.backgroundColor = '#E8F086';
      });

      // Items de navegação
      document.querySelectorAll('nav a').forEach((navLink) => {
        navLink.style.color = '#235FA4';
      });

      // Cards ou painéis
      document.querySelectorAll('.card, .panel').forEach((card) => {
        card.style.backgroundColor = '#E8F086';
        card.style.borderColor = '#235FA4';
      });

      // Rodapés
      document.querySelectorAll('footer').forEach((footer) => {
        footer.style.backgroundColor = '#0A284B';
        footer.style.color = '#E8F086';
      });

      // Alterando ícones para melhor visibilidade
      document.querySelectorAll('.icon').forEach((icon) => {
        icon.style.color = '#235FA4';
        icon.style.filter = 'brightness(0.9)';
      });

      // Modificando a aparência de elementos interativos como dropdowns
      document.querySelectorAll('.dropdown').forEach((dropdown) => {
        dropdown.style.backgroundColor = '#E8F086';
        dropdown.style.color = '#0A284B';
        dropdown.style.borderColor = '#235FA4';
      });

      // Melhorando a visibilidade de barras de progresso e sliders
      document.querySelectorAll('.progress, .slider').forEach((progress) => {
        progress.style.backgroundColor = '#6FDE6E';
        progress.style.borderColor = '#235FA4';
      });

      // Ajustando a visibilidade de badges e tags
      document.querySelectorAll('.badge, .tag').forEach((badge) => {
        badge.style.backgroundColor = '#6FDE6E';
        badge.style.color = '#0A284B';
      });

      // Estilizando caixas de alerta e mensagens de informação
      document.querySelectorAll('.alert, .message').forEach((alert) => {
        alert.style.backgroundColor = '#FF4242'; // Vermelho para alertas e mensagens de erro
        alert.style.color = '#0A284B';
        alert.style.borderColor = '#6FDE6E';
      });

      // Ajustes nos elementos de navegação como tabs e breadcrumbs
      document.querySelectorAll('.tab, .breadcrumb').forEach((tab) => {
        tab.style.backgroundColor = '#E8F086';
        tab.style.color = '#0A284B';
        tab.style.borderColor = '#235FA4';
      });

      // Estilização para componentes de acordeão
      document.querySelectorAll('.accordion').forEach((accordion) => {
        accordion.style.backgroundColor = '#E8F086';
        accordion.style.color = '#0A284B';
        accordion.style.borderColor = '#235FA4';
      });

      // Personalizando barras laterais e widgets
      document.querySelectorAll('.sidebar, .widget').forEach((sidebar) => {
        sidebar.style.backgroundColor = '#E8F086';
        sidebar.style.color = '#0A284B';
        sidebar.style.borderColor = '#235FA4';
      });

      // Para elementos de mídia, como áudio e vídeo players
      document.querySelectorAll('.audio-player, .video-player').forEach((player) => {
        player.style.backgroundColor = '#E8F086';
        player.style.borderColor = '#235FA4';
      });

      // Modificar a cor de fundo do cabeçalho
      document.querySelectorAll('.header').forEach((header) => {
        header.style.backgroundColor = '#0A284B';
        header.style.color = '#E8F086';
      });

      // Personalizar barras de ferramentas e cabeçalhos de seção
      document.querySelectorAll('.toolbar, .section-header').forEach((toolbar) => {
        toolbar.style.backgroundColor = '#E8F086';
        toolbar.style.color = '#0A284B';
        toolbar.style.borderColor = '#235FA4';
      });

      // Estilização para caixas de diálogo e modais
      document.querySelectorAll('.dialog, .modal').forEach((modal) => {
        modal.style.backgroundColor = '#E8F086';
        modal.style.color = '#0A284B';
        modal.style.borderColor = '#235FA4';
      });

      localStorage.removeItem('alreadyReloaded');
      break;
    case 1: // deuteranopia
      console.log('case 1 - deuteranopia');
      // Fundo e texto geral
      document.body.style.backgroundColor = '#2E4052'; // Azul escuro para o fundo
      document.body.style.color = '#929084'; // Cinza para o texto geral

      // Links
      document.querySelectorAll('a').forEach((a) => (a.style.color = '#FFC857')); // Amarelo para links

      // Botões
      document.querySelectorAll('button').forEach((btn) => {
        btn.style.backgroundColor = '#FFC857'; // Amarelo para botões
        btn.style.color = '#2E4052'; // Azul escuro para o texto dos botões
      });

      // Cabeçalhos (h1, h2, h3, h4, h5, h6)
      document
        .querySelectorAll('h1, h2, h3, h4, h5, h6')
        .forEach((h) => (h.style.color = '#A997DF')); // Lilás para cabeçalhos

      // Bordas e linhas
      document.querySelectorAll('*').forEach((el) => (el.style.borderColor = '#FFC857')); // Amarelo para bordas

      // Inputs de formulário
      document.querySelectorAll('input, textarea, select').forEach((input) => {
        input.style.backgroundColor = '#BDD9BF'; // Verde claro para o fundo dos inputs
        input.style.color = '#2E4052'; // Azul escuro para o texto dos inputs
      });

      // Tabelas
      document.querySelectorAll('table').forEach((table) => {
        table.style.borderColor = '#FFC857';
      });
      document.querySelectorAll('th, td').forEach((cell) => {
        cell.style.backgroundColor = '#BDD9BF';
        cell.style.color = '#2E4052';
      });

      // Listas
      document.querySelectorAll('ul, ol').forEach((list) => {
        list.style.backgroundColor = '#BDD9BF';
        list.style.color = '#2E4052';
      });

      // Citações
      document.querySelectorAll('blockquote').forEach((quote) => {
        quote.style.borderLeftColor = '#FFC857';
        quote.style.color = '#2E4052';
        quote.style.backgroundColor = '#BDD9BF';
      });

      // Items de navegação
      document.querySelectorAll('nav a').forEach((navLink) => {
        navLink.style.color = '#FFC857';
      });

      // Cards ou painéis
      document.querySelectorAll('.card, .panel').forEach((card) => {
        card.style.backgroundColor = '#BDD9BF';
        card.style.borderColor = '#FFC857';
      });

      // Rodapés
      document.querySelectorAll('footer').forEach((footer) => {
        footer.style.backgroundColor = '#2E4052';
        footer.style.color = '#BDD9BF';
      });

      // Alterando ícones para melhor visibilidade
      document.querySelectorAll('.icon').forEach((icon) => {
        icon.style.color = '#FFC857';
        icon.style.filter = 'brightness(0.9)';
      });

      // Modificando a aparência de elementos interativos como dropdowns
      document.querySelectorAll('.dropdown').forEach((dropdown) => {
        dropdown.style.backgroundColor = '#BDD9BF';
        dropdown.style.color = '#2E4052';
        dropdown.style.borderColor = '#FFC857';
      });

      // Melhorando a visibilidade de barras de progresso e sliders
      document.querySelectorAll('.progress, .slider').forEach((progress) => {
        progress.style.backgroundColor = '#FFC857';
        progress.style.borderColor = '#2E4052';
      });

      // Ajustando a visibilidade de badges e tags
      document.querySelectorAll('.badge, .tag').forEach((badge) => {
        badge.style.backgroundColor = '#FFC857';
        badge.style.color = '#2E4052';
      });

      // Estilizando caixas de alerta e mensagens de informação
      document.querySelectorAll('.alert, .message').forEach((alert) => {
        alert.style.backgroundColor = '#E5323B'; // Vermelho para alertas e mensagens de erro
        alert.style.color = '#BDD9BF';
        alert.style.borderColor = '#FFC857';
      });

      // Ajustes nos elementos de navegação como tabs e breadcrumbs
      document.querySelectorAll('.tab, .breadcrumb').forEach((tab) => {
        tab.style.backgroundColor = '#BDD9BF';
        tab.style.color = '#2E4052';
        tab.style.borderColor = '#FFC857';
      });

      // Estilização para componentes de acordeão
      document.querySelectorAll('.accordion').forEach((accordion) => {
        accordion.style.backgroundColor = '#BDD9BF';
        accordion.style.color = '#2E4052';
        accordion.style.borderColor = '#FFC857';
      });

      // Personalizando barras laterais e widgets
      document.querySelectorAll('.sidebar, .widget').forEach((sidebar) => {
        sidebar.style.backgroundColor = '#BDD9BF';
        sidebar.style.color = '#2E4052';
        sidebar.style.borderColor = '#FFC857';
      });

      // Para elementos de mídia, como áudio e vídeo players
      document.querySelectorAll('.audio-player, .video-player').forEach((player) => {
        player.style.backgroundColor = '#BDD9BF';
        player.style.borderColor = '#FFC857';
      });

      // Modificar a cor de fundo do cabeçalho
      document.querySelectorAll('.header').forEach((header) => {
        header.style.backgroundColor = '#2E4052';
        header.style.color = '#BDD9BF';
      });

      // Personalizar barras de ferramentas e cabeçalhos de seção
      document.querySelectorAll('.toolbar, .section-header').forEach((toolbar) => {
        toolbar.style.backgroundColor = '#BDD9BF';
        toolbar.style.color = '#2E4052';
        toolbar.style.borderColor = '#FFC857';
      });

      // Estilização para caixas de diálogo e modais
      document.querySelectorAll('.dialog, .modal').forEach((modal) => {
        modal.style.backgroundColor = '#BDD9BF';
        modal.style.color = '#2E4052';
        modal.style.borderColor = '#FFC857';
      });
      localStorage.removeItem('alreadyReloaded');
      break;
    case 3: // Tritanopia
      console.log('case 3 - Tritanopia');
      // Fundo e texto geral
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#0B3C5D';

      // Links
      document.querySelectorAll('a').forEach((a) => (a.style.color = '#1D7324'));

      // Botões
      document.querySelectorAll('button').forEach((btn) => {
        btn.style.backgroundColor = '#BF5700';
        btn.style.color = '#FFFFFF';
      });

      // Cabeçalhos (h1, h2, h3, h4, h5, h6)
      document
        .querySelectorAll('h1, h2, h3, h4, h5, h6')
        .forEach((h) => (h.style.color = '#7C1D6F'));

      // Bordas
      document.querySelectorAll('*').forEach((el) => (el.style.borderColor = '#5C5C5C'));

      // Inputs de formulário
      document.querySelectorAll('input, textarea, select').forEach((input) => {
        input.style.backgroundColor = '#DAA520';
        input.style.color = '#0B3C5D';
      });

      // Tabelas
      document.querySelectorAll('table').forEach((table) => {
        table.style.borderColor = '#5C5C5C';
      });
      document.querySelectorAll('th, td').forEach((cell) => {
        cell.style.backgroundColor = '#f2f2f2';
        cell.style.color = '#0B3C5D';
      });

      // Listas
      document.querySelectorAll('ul, ol').forEach((list) => {
        list.style.backgroundColor = '#eaeaea';
        list.style.color = '#0B3C5D';
      });

      // Citações
      document.querySelectorAll('blockquote').forEach((quote) => {
        quote.style.borderLeftColor = '#7C1D6F';
        quote.style.color = '#0B3C5D';
        quote.style.backgroundColor = '#f0f0f0';
      });

      // Items de navegação
      document.querySelectorAll('nav a').forEach((navLink) => {
        navLink.style.color = '#BF5700';
      });

      // Cards ou painéis
      document.querySelectorAll('.card, .panel').forEach((card) => {
        card.style.backgroundColor = '#f9f9f9';
        card.style.borderColor = '#5C5C5C';
      });

      // Rodapés
      document.querySelectorAll('footer').forEach((footer) => {
        footer.style.backgroundColor = '#0B3C5D';
        footer.style.color = '#FFFFFF';
      });
      localStorage.removeItem('alreadyReloaded');

      break;
    case 0:
      if (type === 0) {
        if (!localStorage.getItem('alreadyReloaded')) {
          localStorage.setItem('alreadyReloaded', 'true');
          window.location.reload();
        }
      } else {
        localStorage.removeItem('alreadyReloaded');
      }

      break;
  }

  if (performance.navigation.type === performance.navigation.TYPE_NAVIGATE) {
    localStorage.removeItem('alreadyReloaded');
  }
}
