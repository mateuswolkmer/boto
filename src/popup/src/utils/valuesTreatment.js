import * as constant from '../utils/Constants'

export const valuesTreatment = (string) => {
  const command = string.toLowerCase();
  let type = '';
  let element = '';
  let value = 10;
  const regex = /\d+/g;

  if (command.includes('aumentar')) type = 'aumentar';
  if (command.includes('diminuir')) type = 'diminuir';
  if (command.includes('trocar')) type = 'mudar';
  if (command.includes('mudar')) type = 'mudar';
  if (command.includes('restaurar')) type = 'restaurar';
  if (command.includes('esconder')) type = 'esconder';
  if (command.includes('mostrar')) type = 'mostrar';
  if (command.includes('marcar')) type = 'marcar';
  if (command.includes('desmarcar')) type = 'desmarcar';
  if (command.includes('idade')) type = 'idade';
  if (command.includes('deficiência visual')) type = 'deficiência visual';
  if (command.includes('deficiência motora')) type = 'deficiência motora';
  if (command.includes('deficiência cognitiva')) type = 'deficiência cognitiva';
  if (command.includes('mão predominante')) type = 'mão predominante';

  if (command.includes('brilho')) element = 'brilho';
  if (command.includes('contraste')) element = 'contraste';
  if (command.includes('zoom')) element = 'zoom';
  if (command.includes('espaçamento')) element = 'espaçamento';
  if (command.includes('seleção')) element = 'seleção';
  if (command.includes('interface')) element = 'interface';
  if (command.includes('perfil')) element = 'perfil';
  if (command.includes('extras')) element = 'extras';
  if (command.includes('voz')) element = 'voz';
  if (command.includes('imagens')) element = 'imagens';
  if (command.includes('propagandas')) element = 'propagandas';
  if (command.includes('perfil')) element = 'perfil';
  if (command.includes('extras')) element = 'extras';
  if (command.includes('interfaces')) element = 'interfaces';
  if (command.includes('opção')) element = 'opção';
  if (command.includes('primeira opção')) element = 'primeira opção';
  if (command.includes('segunda opção')) element = 'segunda opção';
  if (command.includes('terceira opção')) element = 'terceira opção';
  if (command.includes('quarta')) element = 'quarta opção';
  if (command.includes('não')) element = 'Não';
  if (command.includes('pouco')) element = 'Um pouco';
  if (command.includes('bastante')) element = 'Bastante';
  if (command.includes('leve')) element = 'Leve';
  if (command.includes('severa')) element = 'Severa';
  if (command.includes('direita')) element = 'Direita (destro)';
  if (command.includes('destro')) element = 'Direita (destro)';
  if (command.includes('esquerda')) element = 'Esquerda (canhoto)';
  if (command.includes('canhoto')) element = 'Esquerda (canhoto)';

  if (command.includes('nome')) {
    type = 'nome';
    element = command.replace('nome', '');
    element.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  value = command.match(regex) ? command.match(regex) : 10;

  return { type: type, element: element, value: value };
};
