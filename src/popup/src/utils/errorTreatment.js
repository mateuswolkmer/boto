export const errorTreatment = (errorMsg) => {
  switch (errorMsg) {
    case 'no-speech':
      return 'Nenhuma fala detectada.';
    case 'aborted':
      return 'Captura de áudio reiniciada.';
    case 'network':
      return 'Conexão falhou.';
    case 'not-allowed':
      return 'Falha de permissão. Você deve permitir o acesso do Boto ao microfone.';
    case 'service-not-allowed':
      return 'Falha de permissão. Você deve permitir o acesso do Boto ao microfone.';
    default:
      return 'Erro desconhecido';
  }
};
