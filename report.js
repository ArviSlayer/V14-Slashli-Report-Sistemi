require("dotenv").config();
const { addAttachment } = require("../../../modules/misc/report_attachment");
const { ContextMenuInteraction, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, TextInputBuilder, ModalBuilder } = require("discord.js");

module.exports = {
    name: "report",
    description: "Üyeyi Bildir",
    access: '', 
    cooldown: 60,
    type: ApplicationCommandType.ChatInput,
    usage: `/report [@username] [reason] (imageURL)`,
    options: [
        {
            name: "proof",
            description: "Lütfen Raporunuza Kanıt Sunun",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],
    
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    
    async execute(interaction) {
        const { options } = interaction;

        const attachment = options.getAttachment('proof')

        addAttachment(1, attachment.url);

        const modal = new ModalBuilder()
            .setTitle('Şikayet Formu')
            .setCustomId('report-modal')

        const arvis1 = new TextInputBuilder()
            .setCustomId('arvis1')
            .setLabel('Kullanıcı Adı / Kimliği')
            .setStyle(1)
            .setPlaceholder('Kullanıcı Adı Veya ID (Örnk: ArviS#0011')
            .setMinLength(1)
            .setMaxLength(54)
            .setRequired(true)

        const arvis2 = new TextInputBuilder()
            .setCustomId('arvis2')
            .setLabel('Reason')
            .setStyle(2)
            .setPlaceholder('Neyden Şikayetçisin?')
            .setMinLength(1)
            .setMaxLength(1024)
            .setRequired(true)

        const arviss1 = new ActionRowBuilder().addComponents([arvis1]);
        const arviss2 = new ActionRowBuilder().addComponents([arvis2]);

        modal.addComponents(arviss1, arviss2);

        await interaction.showModal(modal);
    }
};










//ArviS#0011
