async function command(sock, from, msg, isAdmin) {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '*❌ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ғᴏʀ ɢʀᴏᴜᴘs.*' }, { quoted: msg });
    if (!isAdmin) return sock.sendMessage(from, { text: '*❌ ᴏɴʟʏ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴs ᴄᴀɴ ᴜsᴇ ᴛʜɪs.*' }, { quoted: msg });
    try {
        await sock.groupSettingUpdate(from, 'announcement');
        await sock.sendMessage(from, { text: '*✅ ɢʀᴏᴜᴘ ᴍᴜᴛᴇ ᴅᴇɴ.*' }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(from, { text: '*❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴜᴘᴅᴀᴛᴇ ɢʀᴏᴜᴘ sᴇᴛᴛɪɴɢ. ᴍᴀᴋᴇ sᴜʀᴇ ᴛʜᴇ ʙᴏᴛ ɪs ᴀɴ ᴀᴅᴍɪɴ.*' }, { quoted: msg });
    }
}
module.exports = command;
