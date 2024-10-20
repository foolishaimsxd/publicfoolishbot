const keep_alive = require("./keep_alive.js");
const WebSocket = require("ws")
const KirkaJSModule = require("kirkajs");
const KirkaJS = new KirkaJSModule();

const token = '';
console.log('before login');
const ws = new WebSocket(`wss://chat.kirka.io/`, token);
console.log('after login');

ws.onopen = () => {
    console.log('Connected to Kirka.io WebSocket');
    sendMessage('foolishbot is online!');
};

const messageHistory = [];

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const updateMessageHistory = (msg) => {
        messageHistory.push(msg);
        if (messageHistory.length > 3) {
            messageHistory.shift();
        };
    };
    if (message.type === 3) {
        message.messages.forEach(msg => {
            if (msg.user && msg.message) {
                updateMessageHistory(msg.message);
                if (msg.message.startsWith('.whois')) {
                    const username = msg.message.split(' ')[1];
                    if (username) {
                        handleUser(username);
                    };
                } else if (msg.message === '.help') {
                    sendMessage('**.help**(shows commands), **.whois** #shortId(gets user), **.price**(item price), **.credit**(who made me).');
                } else if (msg.message === '.credit') {
                    sendMessage('**discord**: foolishaims, **shortId**:#TWNLK2');
                } else if (msg.message.startsWith('.price [')) {
                    const skinName = msg.message.split('[')[1]?.split(']')[0];
                    if (skinName) {
                        console.log(skinName);
                        const skinNames = skinName.split(/[\|\|]/).map(name => name.trim());
                        Promise.all([
                            getSkinBvlPrice(skinNames[0]), 
                            getSkinYzzPrice(skinNames[0])
                        ])
                        .then(prices => {
                            const bvl = prices[0];
                            const yzz = prices[1];
                            const allPrices = `[${bvl.name}] price ${bvl.price}(BROS Value list), ${yzz.price}(YZZ Value list)`;
                            sendMessage(allPrices);
                        })
                        .catch(error => {
                            console.error('Error fetching prices:', error);
                        });
                    };
                };
            };
        });
    } else if (message.type === 2) {
        if (message.user && message.message) {
            updateMessageHistory(message.message);
            if (message.message.startsWith('.whois')) {
                const username = message.message.split(' ')[1];
                if (username) {
                    handleUser(username);
                };
            } else if (message.message === '.help') {
                sendMessage('**.help**(shows commands), **.whois** #shortId(gets user), **.price**(item price), **.credit**(who made me).');
            } else if (message.message === '.credit') {
                sendMessage('**discord**: foolishaims, **shortId**:#TWNLK2');
            } else if (message.message.startsWith('.price [')) {
                const skinName = message.message.split('[')[1]?.split(']')[0];
                if (skinName) {
                    console.log(skinName);
                    const skinNames = skinName.split(/[\|\|]/).map(name => name.trim());
                    Promise.all([
                        getSkinBvlPrice(skinNames[0]), 
                        getSkinYzzPrice(skinNames[0])
                    ])
                    .then(prices => {
                        const bvl = prices[0];
                        const yzz = prices[1];
                        const allPrices = `[${bvl.name}] price ${bvl.price}(BROS Value list), ${yzz.price}(YZZ Value list)`;
                        sendMessage(allPrices);
                    })
                    .catch(error => {
                        console.error('Error fetching prices:', error);
                    });
                };
            };
        };
    };
};

function sendMessage(text) {
    console.log('before send');
    if (ws && ws.readyState === WebSocket.OPEN) {
        try {
            const message = {
                type: 3, 
                chat: text
            };
            ws.send(message.chat);
            console.log('Message sent:', text);
        } catch (error) {
            console.error('Error sending message:', error);
        };
    } else {
        console.log('WebSocket unavailable');
    };
    console.log('after send');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = (event) => {
    console.log(`WebSocket closed: ${event.code}`);
};

function getUserStats(username) {
    return KirkaJS.getStats(username).then(user => {
        const winrate = ((user.stats.wins / user.stats.gamesPlayed) * 100).toFixed(2);
        const headshotRate = ((user.stats.headshots / user.stats.kills) * 100).toFixed(2);
        const killsDeathRatio = (user.stats.kills / user.stats.deaths).toFixed(2).toLocaleString();
        const killsPerGame = (user.stats.kills / user.stats.gamesPlayed).toFixed(2).toLocaleString();
        return `${user.name}#${user.shortId}(${user.clan}) • lvl${user.level}     ${user.oldKLO}(oldKLO) • ${user.rankedKLO}(rankedKLO) • ${user.stats.gamesPlayed}games(${winrate}%) • ${user.stats.headshots}headshots(${headshotRate}%) • ${user.stats.kills}kills(${killsDeathRatio}KDR)(${killsPerGame}KPG) • Weapon [${user.activeWeaponSkin.itemName}] • Character [${user.activeCharacter.itemName}]`;
    });
};

function handleUser(username) {
    getUserStats(username).then(stats => {
        sendMessage(stats);
    }).catch(error => {
        console.error('Error fetching user stats:', error);
        sendMessage('Error fetching user stats');
    });
};

// function handleUser(username) {
//     getUserStats(username).then(stats => {
//         console.log(stats);
//     }).catch(error => {
//         console.error('Error fetching user stats:', error);
//         console.log('Error fetching user stats');
//     });
// };

//handleUser("TWNLK2");

function getSkinBvlPrice(skinName) {
    return KirkaJS.pricebvl(skinName).then(skin => {
        //console.log(skin);
        return skin;
    });
};

//getSkinBvlPrice("LOL");

function getSkinYzzPrice(skinName) {
    return KirkaJS.priceyzzzmtz(skinName).then(skin => {
        //console.log(skin);
        return skin;
    });
};

//getSkinYzzPrice("LOL");
