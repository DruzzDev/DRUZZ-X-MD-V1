async function command(sock, from, msg, isAdmin, botData, saveBotData, args) {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '*❌ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ғᴏʀ ɢʀᴏᴜᴘs.*' }, { quoted: msg });
    if (!isAdmin) return sock.sendMessage(from, { text: '*❌ ᴏɴʟʏ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴs ᴄᴀɴ ᴜsᴇ ᴛʜɪs.*' }, { quoted: msg });
    const action = String(args[0] || '').toLowerCase();
    if (!['on','off'].includes(action)) return sock.sendMessage(from, { text: '*❌ ᴜsᴀɢᴇ: .goodbye on/off*' }, { quoted: msg });
    if (action === 'on') botData.goodbyeGroups[from] = true;
    else delete botData.goodbyeGroups[from];
    saveBotData();
    await sock.sendMessage(from, { text: `*$ɢᴏᴏᴅʙʏᴇ ${action === 'on' ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪsᴀʙʟᴇᴅ'} ✅*` }, { quoted: msg });
}
module.exports = command;
