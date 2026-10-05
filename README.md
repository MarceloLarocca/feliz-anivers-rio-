# Feliz aniversário, Livia Azambuja · 5 de outubro

Tema de vôlei, com abertura animada, envelope e saque dos desejos.

Site estático e responsivo, sem login, backend ou instalação de dependências.

## Atualizar seu GitHub Pages

1. Extraia este ZIP no computador ou celular.
2. Abra o mesmo repositório onde publicou a versão anterior.
3. Em **Add file > Upload files**, envie `index.html`, `style.css`, `script.js`, `README.md` e `.nojekyll` para a raiz do repositório. Se o aparelho não mostrar `.nojekyll`, os demais arquivos são suficientes para este site.
4. Confirme em **Commit changes**. Substitua o `index.html` anterior quando solicitado. Envie os arquivos extraídos, não o ZIP ou a pasta inteira.
5. Se o GitHub Pages já está ativo, aguarde a nova publicação. O endereço continua o mesmo.
6. Se ainda não ativou, em **Settings > Pages**, use **Deploy from a branch**, branch `main`, pasta **/ (root)** e **Save**.
7. Abra o endereço do site. Se aparecer a versão antiga, atualize a página ou teste em uma janela anônima.

## Funcionamento

- A abertura aparece na primeira visita da sessão. Ao entrar, ela fica dispensada mesmo após recarregar a mesma aba, quando o navegador permite sessionStorage.
- Use **Rever a abertura** no rodapé para vê-la novamente.
- A carta abre e fecha. O botão **Fazer meu pedido** revela uma mensagem.
- A data é sempre 5 de outubro, sem contador nem bloqueio por data.
- Todas as animações respeitam a preferência de movimento reduzido.
- Os arquivos locais usam caminhos relativos. Pode hospedar o site na raiz ou em um subdiretório.

## Música pelo Spotify

Happier, de Marshmello e Bastille, usa o player oficial do Spotify. Toque no play para ouvir. Há um link alternativo para abrir a faixa. A reprodução depende da conexão e das condições do Spotify. Esta versão não inclui MP3 nem precisa da pasta assets.

As fontes usam Google Fonts, com substitutas locais se não carregarem.

## Personalizar

Textos e player estão em `index.html`; cores e aparência em `style.css`; abertura e interações em `script.js`.

Para ver no computador antes de publicar, abra `index.html` com os outros arquivos na mesma pasta. Em celular, publicar no GitHub Pages costuma ser a opção mais simples.

Os desenhos de bolas, rede e quadra usam CSS local. Não dependem de imagens externas. Ao atualizar, envie os três arquivos index.html, style.css e script.js juntos.

## Paleta roxa
Esta versão usa roxo, lavanda e branco. Para atualizar, substitua index.html, style.css e script.js juntos no repositório.

## Uma noite de celebração
Abertura e encerramento em roxo profundo, carta em lavanda, vela que apaga e acende, saque e fogos breves. Sem microfone, sem sons de explosão e sem login. Os fogos têm no máximo 64 partículas; cada novo clique substitui o efeito anterior. A preferência de movimento reduzido desativa as animações.

Trilha atual: Happier — Marshmello e Bastille.

## Correção mobile
Atualize index.html, style.css e script.js juntos. As animações de saque e fogos usam transformações por quadro e reiniciam a cada toque. Quando o aparelho pede movimento reduzido, aparece uma opção perto do saque para ativar esses dois efeitos voluntariamente.
