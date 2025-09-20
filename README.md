
# 🤖 Gerador de Histórias Infantis com IA

## 📖 Sobre o Projeto
Este é um projeto **Full Stack** que utiliza o poder da **API do Google Gemini** para criar histórias infantis curtas e criativas a partir de uma simples ideia.  
O utilizador insere um tema ou uma pequena descrição, e a aplicação gera uma história única em segundos.

O objetivo é demonstrar a integração entre um backend moderno em **Python (FastAPI)** e um frontend reativo em **Next.js/React**, consumindo um serviço de **IA generativa** de ponta.

---

## ✨ Funcionalidades
- **Interface Intuitiva**: Um design limpo e amigável para inserir a ideia da história.  
- **Geração por IA**: Conecta-se diretamente com a API do Google Gemini para criar conteúdo original.  
- **Feedback Visual**: Exibe um estado de carregamento enquanto a história está a ser gerada.  
- **Tratamento de Erros**: Apresenta mensagens claras caso ocorra um problema na comunicação com o backend.  
- **Layout Responsivo**: Funciona bem em desktops e dispositivos móveis.  

---

## 🛠️ Tecnologias Utilizadas
### Backend (Servidor)
- Python 3.10+  
- FastAPI  
- Uvicorn  
- Google Generative AI SDK  
- Pydantic  
- python-dotenv  

### Frontend (Cliente)
- Next.js  
- React  
- Tailwind CSS  

---

## 🏗️ Arquitetura e Decisão Local vs Externa
- **Frontend (Next.js/React)** roda localmente em `http://localhost:3000`.  
- **Backend (FastAPI)** roda localmente em `http://localhost:8000`.  
- A **IA escolhida** (Google Gemini) é **externa**, acessada via API com chave privada.  
- Decisão: manter backend e frontend **locais** para controle de fluxo e segurança, delegando apenas a geração de histórias ao serviço externo do Google.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)  
- **Python** (versão 3.8 ou superior)  
- Uma **Chave de API do Google Gemini** (obtenha no Google AI Studio)  

---

### 🔹 1. Configuração do Backend
```bash
# Navegue para a pasta do backend
cd backend/

# Crie e ative um ambiente virtual
python -m venv venv
# No Windows:
venv\Scripts\activate
# No macOS/Linux:
source venv/bin/activate

# Instale as dependências
pip install fastapi uvicorn "google-generativeai" python-dotenv

# Crie um arquivo .env na pasta backend/ e adicione:
API_KEY="SUA_CHAVE_DA_API_DO_GOOGLE_GEMINI_AQUI"
GENERATION_MODEL="gemini-1.5-flash"

# Inicie o servidor backend
uvicorn main:app --reload
````

➡ O backend estará rodando em: [http://localhost:8000](http://localhost:8000)

---

### 🔹 2. Configuração do Frontend

```bash
# Navegue para a pasta do frontend
cd Front-End\meu-app-de-historias

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

➡ O frontend estará acessível em: [http://localhost:3000](http://localhost:3000)

Abra o navegador e comece a criar histórias! 🎉

---

## ⚙️ Endpoint da API

**URL:** `/api/v1/analyze`
**Método:** `POST`

### Corpo da Requisição (JSON)

```json
{
  "prompt": "Um dragão que tinha medo de altura."
}
```

### Resposta de Sucesso (JSON)

```json
{
  "response": "Era uma vez um jovem dragão chamado Faísca..."
}
```

---

## 📌 Exemplos de Requisição via Terminal

### Usando `curl`

```bash
curl -X POST http://localhost:8000/api/v1/analyze \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Um dragão que tinha medo de altura."}'
```

### Usando `HTTPie`

```bash
http POST http://localhost:8000/api/v1/analyze prompt="Um dragão que tinha medo de altura."
```

### Usando Postman

* Método: **POST**
* URL: `http://localhost:8000/api/v1/analyze`
* Body → Raw → JSON:

```json
{
  "prompt": "Um dragão que tinha medo de altura."
}
```

---

## 👤 Autor

* Desenvolvido  com amor e dedicação por  [Elynne Lima](https://github.com/ElynneLima)
