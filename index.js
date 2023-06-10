currentServer = "NONE";
serverLastKilled = {
}

bossStrings = {"ASHFANG": "&8Ashfang", "BARBARIAN DUKE X": "&cBarbarian Duke X", "MAGMA BOSS": "&4Magma Boss", "MAGE OUTLAW": "&5Mage Outlaw", "BLADESOUL": "&8Bladesoul"}


register("chat", (spacer, boss) => {
  console.log("[DD] " + boss + " Boss Killed");
  if(!(boss in bossStrings)){
    return;
  }
  // Insert currentServer into serverLastKilled with boss and Date.now()
  if (currentServer in serverLastKilled){
    serverLastKilled[currentServer][boss] = Date.now();
  }
  else{
    serverLastKilled[currentServer] = {};
    serverLastKilled[currentServer][boss] = Date.now();
  }
  cleanDict();
}).setCriteria("&r&r&r${spacer}&r&6&l${boss} DOWN!&r");

register("chat", (serverId) => {
  console.log("[DD] Server ID: " + serverId);
  currentServer = serverId;
  if(serverId in serverLastKilled){
    for (key in serverLastKilled[serverId]) {
      console.log("[DD] " + key + " was killed " + (Date.now() - serverLastKilled[serverId][key]) + "ms ago");
      if(Date.now() - value < 121135){
        timeSince = Date.now() - serverLastKilled[serverId][key];
        remainingTime = 121135 - timeSince;
        timeLeft = Math.ceil(remainingTime / 1000);
        ChatLib.chat(bossStrings[key] + "&r&c dead in this lobby. Respawns in &e" + timeLeft + "&r&c seconds.");
      }
    }
  }
}).setCriteria("&7Sending to server ${serverId}...&r")

register("command", () => {
  ChatLib.chat("Current Server: " + currentServer);
  ChatLib.chat("Last Killed: " + JSON.stringify(serverLastKilled));
}).setName("dddebug");

function cleanDict(){
  for (const [key, value] of Object.entries(serverLastKilled)) {
    for (const [key2, value2] of Object.entries(value)) {
      if(Date.now() - value2 > 121135){
        delete serverLastKilled[key][key2];
      }
    }
    if(value.length == 0){
      delete serverLastKilled[key];
    }
  }
}