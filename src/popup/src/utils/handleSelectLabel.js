export const handleSelectLabel = (label, isVoiceControlActive) => {
  switch (label) {
    case 'sight':
      if (!isVoiceControlActive) {
        return 'Deficiência Visual';
      } else {
        return (
          <p>
            Deficiência Visual
            <span style={{ fontWeight: 300, fontSize: 12 }}> (Não / Pouco / Bastante) </span>
          </p>
        );
      }
    case 'motor':
      if (!isVoiceControlActive) {
        return 'Deficiência Motora';
      } else {
        return (
          <p>
            Deficiência Motora
            <span style={{ fontWeight: 300, fontSize: 12 }}> (Não / Leve / Severa) </span>
          </p>
        );
      }
    case 'cognitive':
      if (!isVoiceControlActive) {
        return 'Deficiência Cognitiva (mão)';
      } else {
        return (
          <p>
            Deficiência Cognitiva
            <span style={{ fontWeight: 300, fontSize: 12 }}> (Não / Leve / Severa) </span>
          </p>
        );
      }
    case 'daltonism':
      if (!isVoiceControlActive) {
        return 'Daltonismo';
      } else {
        return (
          <p>
            Daltonismo
            <span style={{ fontWeight: 300, fontSize: 12 }}>
              (Protanopia/Deuteranopia/Tritanopia)
            </span>
          </p>
        );
      }
    case 'handedness':
      if (!isVoiceControlActive) {
        return 'Mão predominante';
      } else {
        return (
          <p>
            Mão Predominante
            <span style={{ fontWeight: 300, fontSize: 12 }}> (Direta / Esquerda) </span>
          </p>
        );
      }
    default:
      return 'Label';
  }
};
