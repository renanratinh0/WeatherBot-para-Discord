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

async function scheduleMessages() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours === 22 && minutes === 20) {
        sendWeatherMessage(CASA_CORDENADAS, 'Casa');
        sendWeatherMessage(TRABALHO_CORDENADAS, 'Trabalho');
    }

    const tomorrowNineThirtyPM = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    tomorrowNineThirtyPM.setHours(21, 30, 0, 0);
    const timeUntilTomorrowNineThirtyPM = tomorrowNineThirtyPM - now;
    setTimeout(scheduleMessages, timeUntilTomorrowNineThirtyPM);
}

async function sendWeatherMessage(location, locationName) {
    try {
        const weatherConditions = await getWeather(location);

        const channel = client.channels.cache.get('1082465455240925216'); // Substitua pelo ID do canal onde deseja enviar a mensagem

        if (channel) {
            const message = `Previsão do tempo às 21:30 em ${locationName}:\n${formatWeatherConditions(weatherConditions)}`;
            channel.send(message);
        }
    } catch (error) {
        console.error('Erro ao obter informações do clima:', error.message);
    }
}

async function getWeather(location) {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API}&q=${location}&hours=12`);
        const weatherData = response.data.forecast.forecastday[0].hour;

        const weatherConditions = weatherData.map(hour => {
            return {
                time: hour.time,
                condition: hour.condition.text
            };
        });

        return weatherConditions;
    } catch (error) {
        throw new Error('Erro ao obter informações do clima.');
    }
}

function formatWeatherConditions(conditions) {
    return conditions.map(condition => {
        return `${condition.time}: ${condition.condition}`;
    }).join('\n');
}

client.login(TOKEN);