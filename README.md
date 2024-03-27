# boto
Um adaptador de interfaces web, melhorando a usabilidade de páginas à partir de limitações e gostos do usuário

### Como rodar o projeto:
- Abra o terminal dentro da pasta do projeto e rode os seguintes comandos:
    - npm install
    - npm run build
- Após rodar o comando ‘npm run build’, uma pasta chamada ‘dist’ será criada dentro do diretório do projeto (ela contém todo o código para que a extensão funcione no navegador).
- Para instalar a extensão no navegador, abra a página de gerenciamento de extensões no Google Chrome (chrome://extensions/), ative o modo desenvolvedor e carregue a pasta ‘dist’.

### Estrutura do projeto (principais arquivos):
- src/popup/popup.js (contém o código da interface da extensão, utiliza ReactJS e o Design System Bold para sua construção, além de Sass para a estilização)
- src/contentscript/contentscript.js (contém todo o código que serve para realizar a interação com o site)
- src/background/background.js (serve para salvar os dados e realizar a comunicação entre o contentscript e o popup)

Para mais informações sobre a estrutura de uma extensão, visite a página da Google Developers, que fala sobre extensões (https://developer.chrome.com/docs/extensions/).
Site do Bold: https://bold.bridge.ufsc.br/pt/
