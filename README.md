# 🤖 WeatherBot para Discord

Um bot para Discord que informa automaticamente se vai chover no dia seguinte em dois locais específicos (casa e trabalho) às 21:30.

## 📖 Sobre

WeatherBot é um bot desenvolvido para o Discord com o objetivo de fornecer previsões do tempo específicas para dois locais pré-determinados (sua casa e seu trabalho). Ele consulta a WeatherAPI e envia uma mensagem com a previsão do tempo no canal especificado todos os dias às 21:30, permitindo que você saiba com antecedência se precisará de um guarda-chuva no dia seguinte.

## ✨ Funcionalidades

- Envio automático da previsão do tempo para dois locais pré-configurados (casa e trabalho).
- Utiliza a API da WeatherAPI para obter informações meteorológicas detalhadas.
- Mensagens enviadas para um canal específico no Discord às 21:30 todos os dias.
- Fornece a previsão específica de chuva para facilitar o planejamento do próximo dia.

## 💻 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o JavaScript no servidor.
- **discord.js**: Biblioteca para interagir com a API do Discord.
- **axios**: Cliente HTTP para fazer requisições à API de clima.
- **dotenv**: Carrega variáveis de ambiente a partir de um arquivo `.env`.

## 📂 Estrutura do Projeto

- **`index.js`**: Contém toda a lógica do bot.
- **`.env`**: Arquivo para armazenar variáveis de ambiente (não incluído no repositório por questões de segurança).

## 🔍 Detalhes do Código

### Configuração do Bot

O bot é configurado para se conectar ao Discord utilizando o token do bot fornecido pelo Discord Developer Portal. Ele utiliza intents para gerenciar eventos do Discord.

```javascript
const { Client, Events, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { TOKEN, WEATHER_API, CASA_CORDENADAS, TRABALHO_CORDENADAS } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`Pronto login realizado como ${c.user.tag}`);
    scheduleMessages();
});
