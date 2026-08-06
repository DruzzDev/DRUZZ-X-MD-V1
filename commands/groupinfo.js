async function groupInfoCommand(sock, chatId, msg) {
    if (!chatId.endsWith('@g.us')) {
        await sock.sendMessage(chatId, { text: 'This ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs.' });
        return;
    }

    try {
        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants;
        const groupAdmins = participants.filter(p => p.admin);
        const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
        
        // Fix owner logic
        const owner = groupMetadata.owner || groupMetadata.subjectOwner || (participants.find(p => p.admin === 'superadmin')?.id) || 'Not found';
        const ownerDisplay = owner !== 'Not found' ? `@${owner.split('@')[0]}` : 'Not found';

        let pp;
        try {
            pp = await sock.profilePictureUrl(chatId, 'image');
        } catch {
            pp = 'https://i.imgur.com/2wzGhpF.jpeg';
        }

        const text = `
*╭━━━ ɪɴғᴏ ɢʀᴏᴜᴘ ━━━*
*║德 ♻️ ɪᴅ:*
*║ • ${groupMetadata.id}
*║德 🔖 ɴᴀᴍᴇ:* 
*║ • ${groupMetadata.subject}
*║德 👥 ᴍᴇᴍʙᴇʀs:*
*║• ${participants.length}
*║德 🤿ɢʀᴏᴜᴘ ᴏᴡɴᴇʀ:*
*║• ${ownerDisplay}
*║德 🕵🏻‍♂️ᴀᴅᴍɪɴs:*
*║${listAdmin}
*║
*║德 📌 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:*
*║ • ${groupMetadata.desc?.toString() || 'ɴᴏ ᴅᴇsᴄʀɪᴘᴛɪᴏɴ'}
*╰━━━━━━━━━━━━━━━*
`.trim();

        const mentions = groupAdmins.map(v => v.id);
        if (owner !== 'Not found') mentions.push(owner);

        await sock.sendMessage(chatId, {
            image: { url: pp },
            caption: text,
            mentions: mentions
        });

    } catch (error) {
        console.error('Error in groupinfo command:', error);
        await sock.sendMessage(chatId, { text: '*❌ ғᴀɪʟᴇᴅ ᴛᴏ ɢᴇᴛ ɢʀᴏᴜᴘ ɪɴғᴏ! ᴍᴀᴋᴇ sᴜʀᴇ ɪ ᴀᴍ ᴀɴ ᴀᴅᴍɪɴ.*' });
    }
}

module.exports = groupInfoCommand;
