const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// --- Express server ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Discord bot is running.');
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

// --- Discord client ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error('Error: DISCORD_TOKEN environment variable is not set.');
  process.exit(1);
}

client.login(token).catch((err) => {
  console.error('Failed to log in to Discord:', err.message);
  process.exit(1);
});
