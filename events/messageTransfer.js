const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        // Remplacez 'ID_DU_SALON_SOURCE' et 'ID_DU_SALON_DESTINATION' par les IDs réels de vos salons
        const salonSourceId = 'ID_DU_SALON_SOURCE';
        const salonDestinationId = 'ID_DU_SALON_DESTINATION';

        // Vérifiez si le message provient du salon source
        if (message.channel.id === salonSourceId) {
            // Récupérez le salon de destination
            const salonDestination = await client.channels.fetch(salonDestinationId);

            // Vérifiez si le salon de destination existe
            if (salonDestination) {
                // Créez un nouvel embed avec le contenu du message
                const embed = {
                    color: 0x0099ff, // Remplacez par la couleur de votre choix
                    description: message.content,
                    timestamp: new Date(),
                    footer: {
                        text: `Message transféré de ${message.author.username}`,
                    },
                };

                // Envoyez l'embed dans le salon de destination
                await salonDestination.send({ embeds: [embed] });

                // Supprimez le message original
                await message.delete();
            } else {
                console.error('Le salon de destination n\'existe pas.');
            }
        }
    },
};