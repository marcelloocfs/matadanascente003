# Guia passo a passo: Mata da Nascente

Este guia leva o projeto do seu computador até um site no ar, com:
- **Cesium**: a Terra real com imagem de satélite na abertura;
- **Supabase**: banco de dados e login dos corretores com e-mail e senha;
- **GitHub + Vercel**: código guardado e site publicado;
- **GLB**: casas em 3D profissional.

Faça as etapas na ordem. Cada uma termina com um **"Pronto quando"**.
Nunca mande senhas nem a chave `service_role` do Supabase para ninguém, nem para o Claude.

---

## Etapa 0: Ver o site funcionando no seu computador

O site já funciona sem nenhuma conta, em **modo demonstração** (dados ficam só no navegador).

1. Abra o **Prompt de Comando** (tecla Windows → digite `cmd` → Enter).
2. Entre na pasta do projeto:
   ```
   cd "%USERPROFILE%\Desktop\CONDOMINIOS PRO=JETO"
   ```
3. Inicie um servidor local (o Node.js já está instalado no seu computador):
   ```
   npx serve .
   ```
   Na primeira vez ele pergunta se pode instalar o `serve`: digite `y` e Enter.
4. Abra no navegador o endereço que aparecer (normalmente **http://localhost:3000**).
5. Para parar o servidor: `Ctrl + C` no Prompt de Comando.

> Por que não dá para só dar dois cliques no `index.html`? O navegador bloqueia o carregamento das casas em GLB quando a página é aberta direto do arquivo. Com o servidor local, tudo funciona igual ao site publicado.

✅ **Pronto quando:** a tela com a Terra aparecer em `localhost:3000`.

---

## Etapa 1: Cesium (Terra real na abertura)

1. Acesse **https://ion.cesium.com** → **Sign up** (pode entrar com a conta Google). O plano **Community** é gratuito para testes.
2. No menu, abra **Asset Depot**, procure **Google Photorealistic 3D Tiles** e clique em **+ Add to my assets**.
   (Os ativos "Cesium World Terrain" e "Bing Maps Aerial" já vêm na conta.)
3. Abra **Access Tokens** → **Create token**:
   - **Name:** `Mata da Nascente`
   - **Scopes:** deixe só `assets:read`
   - **Resources:** selecione os ativos *Cesium World Terrain*, *Bing Maps Aerial* e *Google Photorealistic 3D Tiles*
   - **Allowed URLs:** adicione `http://localhost:3000` agora; depois da Etapa 4, adicione também o endereço do site (ex.: `https://mata-da-nascente.vercel.app`)
4. Copie o token (começa com `eyJ...`).
5. Abra o arquivo **`config.js`** no Bloco de Notas e cole entre as aspas:
   ```js
   cesiumToken: 'eyJ...seu token...',
   ```
6. Salve, recarregue `localhost:3000`.

O que muda: a abertura passa a mostrar a Terra real. Ao escolher cliente ou corretor, a câmera voa até o ponto em `location` no `config.js` e, perto do chão, aparecem os prédios e o relevo fotorrealistas do Google. Depois entra o mapa do condomínio.

**Trocar o ponto de chegada:** no Google Maps, clique com o botão direito no lugar → copie os números (ex.: `-23.3330, -47.3880`) → em `config.js`, `lat` é o primeiro número e `lon` o segundo.

✅ **Pronto quando:** a abertura mostrar a Terra com imagem de satélite e o voo chegar no ponto escolhido.

---

## Etapa 2: Supabase (banco de dados e login)

### 2.1 Criar o projeto
1. Acesse **https://supabase.com** → **Start your project** → entre com GitHub ou e-mail.
2. **New project**:
   - **Name:** `mata-da-nascente`
   - **Database Password:** clique em *Generate* e guarde num gerenciador de senhas (você quase nunca vai usar)
   - **Region:** `South America (São Paulo)`
3. Aguarde uns 2 minutos até o projeto ficar pronto.

### 2.2 Criar as tabelas e as regras de acesso
1. No menu lateral, **SQL Editor** → **New query**.
2. Abra o arquivo **`supabase/schema.sql`** do projeto, copie tudo, cole e clique em **Run**.
3. Deve aparecer *Success. No rows returned*.

As regras criadas:
| Quem | Pode |
|---|---|
| Cliente (sem login) | ver lotes, status e condições de pagamento |
| Corretor | tudo do cliente + reservar e vender lotes, ver a equipe, editar a própria meta e anotações |
| Gestor | tudo do corretor + alterar condições de pagamento e metas de qualquer corretor |

As anotações de cada corretor só ele vê, nem o gestor.

### 2.3 Fechar o cadastro público
Ninguém de fora deve conseguir criar conta sozinho.
1. **Authentication** → **Sign In / Providers** (ou *Providers*) → **Email**.
2. Desligue **Allow new users to sign up**. Mantenha o login por e-mail ligado.

### 2.4 Criar os corretores e o gestor
1. **Authentication** → **Users** → **Add user** → **Create new user**.
2. Preencha e-mail e uma senha provisória, marque **Auto Confirm User** e crie.
3. Repita para cada corretor.
4. Para tornar alguém **gestor**: **Table Editor** → tabela **profiles** → na linha da pessoa, mude `role` de `corretor` para `gestor`. Ali também dá para ajustar o `name` que aparece no painel.

### 2.5 Ligar o site ao Supabase
1. **Project Settings** (engrenagem) → **API** (ou *Data API*).
2. Copie **Project URL** e a chave **anon public** (não a `service_role`).
3. Cole no `config.js`:
   ```js
   supabaseUrl: 'https://xxxxx.supabase.co',
   supabaseAnonKey: 'eyJ...',
   ```
4. Salve e recarregue. Clique em **Sou corretor**: agora aparece login com e-mail e senha.

> A chave `anon` pode ficar no site: ela só consegue o que as regras da etapa 2.2 permitem.

✅ **Pronto quando:** um corretor conseguir entrar, marcar um lote como vendido, e o lote aparecer vendido ao abrir o site em outra aba, como cliente.

---

## Etapa 3: GitHub (guardar o código)

1. Crie a conta em **https://github.com**.
2. Instale o **GitHub Desktop**: **https://desktop.github.com** (já inclui o Git; não precisa usar linha de comando).
3. Abra o GitHub Desktop → entre com sua conta.
4. **File → Add local repository** → escolha a pasta `CONDOMINIOS PRO=JETO`.
   Ele vai dizer que não é um repositório: clique em **create a repository**.
   - **Name:** `mata-da-nascente`
   - deixe o resto como está → **Create repository**
5. Clique em **Publish repository**.
   - Deixe marcado **Keep this code private**.
6. A cada mudança futura: escreva um resumo no campo *Summary* (canto inferior esquerdo) → **Commit to main** → **Push origin**.

✅ **Pronto quando:** o repositório aparecer em github.com, na sua conta, como privado.

---

## Etapa 4: Vercel (colocar o site no ar)

1. Acesse **https://vercel.com** → **Sign Up** → **Continue with GitHub**. O plano **Hobby** é gratuito.
2. **Add New… → Project** → escolha o repositório `mata-da-nascente` → **Import**.
3. Em **Framework Preset** deixe **Other**. Não precisa preencher Build Command.
4. **Deploy**. Em menos de um minuto o site estará em algo como `https://mata-da-nascente.vercel.app`.
5. Volte ao **Cesium ion → Access Tokens** e adicione esse endereço em **Allowed URLs**.
6. A partir daqui, todo **Push** no GitHub Desktop publica o site sozinho.

**Domínio próprio (opcional):** registre em **https://registro.br** (ex.: `matadanascente.com.br`) → na Vercel, **Project → Settings → Domains → Add** → siga as instruções de DNS que ela mostrar.

✅ **Pronto quando:** o site abrir no endereço da Vercel, no computador e no celular.

---

## Etapa 5: Casas em GLB (3D profissional)

Veja os detalhes técnicos em **`models/LEIA-ME.md`**. Resumo:

1. Contrate um modelador 3D (99Freelas, Workana, Upwork, ArtStation) com o texto do `models/LEIA-ME.md`.
2. Coloque os arquivos recebidos na pasta **`models/`** com os nomes `ipe.glb`, `jatoba.glb`, `aroeira.glb`.
3. No `config.js`, tire as barras `//` das linhas dos modelos:
   ```js
   models: {
     ipe:     { url: 'models/ipe.glb' },
     jatoba:  { url: 'models/jatoba.glb' },
     aroeira: { url: 'models/aroeira.glb' }
   }
   ```
4. Recarregue. As casas, as miniaturas da janela do lote e as casas dos lotes vendidos passam a usar os modelos.
5. Se a casa aparecer virada, ajuste `rotateY: 180` (ou `90`, `-90`). Se aparecer gigante ou minúscula, o modelo foi exportado em centímetros: use `scale: 0.01`.

O site calcula sozinho o tamanho de cada modelo e só oferece a casa nos lotes onde ela cabe com os recuos.

✅ **Pronto quando:** as três casas aparecerem corretas no lote, viradas para a rua.

---

## Problemas comuns

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Abertura continua com a Terra desenhada | Token do Cesium vazio ou endereço não liberado | Confira `cesiumToken` e as *Allowed URLs* no Cesium ion |
| Voo chega mas sem prédios do Google | Ativo do Google não adicionado | Etapa 1, passo 2 |
| "E-mail ou senha incorretos" | Usuário não criado ou não confirmado | Etapa 2.4, marque *Auto Confirm User* |
| "Esta conta ainda não tem perfil" | Usuário criado antes de rodar o `schema.sql` | Rode o `schema.sql` de novo e, na tabela `profiles`, adicione a linha com o `id` do usuário |
| Lotes não mudam em outras abas | Tempo real desligado | Rode o `schema.sql` de novo (ele liga o tempo real) |
| Casa GLB não aparece | Nome ou caminho errado | Abra o console do navegador (F12) e veja o aviso "Modelo … não carregou" |
