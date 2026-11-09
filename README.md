# ⚡ WoL Microservice (Wake-on-LAN HTTP API)

Um microserviço simples e leve construído em **Node.js** e **Express** para enviar pacotes mágicos (*Magic Packets*) na rede local e ligar computadores remotamente através de requisições HTTP `POST`.

Projetado para rodar em um **Home Server** (via Docker) e ser facilmente integrado com **Cloudflare Tunnels**, **iOS Shortcuts** (Atalhos) ou **HTTP Request Shortcuts** (Android).

---

## 🚀 Funcionalidades

- **Endpoint HTTP POST:** Dispara o Magic Packet com uma simples chamada.
- **Pronto para Docker:** Imagem leve baseada em `node:18-alpine`.
- **Configuração via Variáveis de Ambiente:** Ajuste rápido de porta e MAC Address.
- **Sem dependência de compiladores:** Desenvolvido em JavaScript (Node.js nativo).

---

## 📋 Pré-requisitos

1. O computador de destino deve estar com o **Wake-on-LAN (WoL)** ativado na **BIOS/UEFI** e nas propriedades do **Adaptador de Rede** no sistema operacional.
2. O servidor/container precisa estar conectado à **mesma rede local (cabo Ethernet)** que a máquina a ser ligada.

---

## 🛠️ Variáveis de Ambiente

Você pode configurar o serviço através das seguintes variáveis de ambiente:

| Variável | Descrição | Valor Padrão |
| --- | --- | --- |
| `PORT` | Porta em que o servidor Express escutará | `3000` |
| `MAC_ADDRESS` | Endereço MAC da placa de rede da máquina a ser ligada | `00:1A:2B:3C:4D:5E` |

---

## 💻 Executando Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/alexandre-silva-0/MyWakeOnLan.git
   cd seu-repositorio
   ```

2. **Instale as dependências e inicie:**
   ```bash
   npm install
   npm start
   ```

---

## 🐳 Executando com Docker

> ⚠️ **Atenção:** É **obrigatório** utilizar `network_mode: "host"` para permitir o broadcast do pacote mágico na rede local.

### Docker Compose

```yaml
version: '3.8'

services:
  wol-service:
    build: .
    container_name: wol-service
    restart: unless-stopped
    network_mode: "host"
    environment:
      - PORT=3000
      - MAC_ADDRESS=00:1A:2B:3C:4D:5E
```

Execute o container:
```bash
docker compose up -d
```

---

## 🌐 Uso da API

Envie uma requisição **POST** para a rota da API:

```bash
curl -X POST http://192.168.1.150:3000/api/wake
```

**Resposta de Sucesso (`200 OK`):**

```json
{
  "success": true,
  "message": "Magic Packet disparado na rede local."
}
```
