import React from 'react';

const VoiceInstructions = () => {
  const title = 'Funcionamento do comando de voz:';
  const tip1 =
    'Para usar o comando de voz você deve permitir acesso ao microfone quando solicitado.';
  const description1 =
    'Caso não apareça a solicitação acesse no Chrome: Configurações > Privacidade e Segurança > Configuração do site > Boto > Permitir microfone';

  const tip2 = 'Você poderá ativar e desativar o comando de voz clicando nos botões na interface ou pressionando a tecla Barra de Espaço'
  const description2 = 'Após ativar aguarde as instruções da tela para começar a falar.'

  const tip3 =
    'Para manipular as características da página fale: aumentar/diminuir + característica';
  const description3 = 'Por exemplo: "Aumentar contraste"';
  
  const tip4 =
    'O valor padrão para aumentar ou diminuir é de 10%. Se desejar, poderá informar um valor diverso';
  const description4 = 'Por exemplo: "Aumentar 20 de contraste"';

  return (
    <section className="voice-instructions">
      <scan className="voice-instructions-title"> {title} </scan>
      <scan className="voice-instructions-tip"> {tip1} </scan>
      <scan className="voice-instructions-description"> {description1} </scan>
      <scan className="voice-instructions-tip"> {tip2} </scan>
      <scan className="voice-instructions-description"> {description2} </scan>
      <scan className="voice-instructions-tip"> {tip3} </scan>
      <scan className="voice-instructions-description"> {description3} </scan>
      <scan className="voice-instructions-tip"> {tip4} </scan>
      <scan className="voice-instructions-description"> {description4} </scan>
    </section>
  );
};

export default VoiceInstructions;
