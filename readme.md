This bot is made for kirka.io and has couple of functions:
- gets user profile through API 2.
- gets price of items.
- credits me for its creation.
- help command for the dumb people.

1. Getting your token(do not give anyone this as it contains personal info jwt.io if you want to decode it).
2. Downloading the bot and extracting the contents of it.
3. Putting the token inside the bot is quite simple just put it into token = '`put inside here'.
#### Getting your token

1. Open developer tools(ctrl+shift+i) then go into `storage -> local storage -> "refresh token"`(This is a onetime thing for getting the refresh token).
2. you have to paste this in power shell or find a way to refresh a token.
```zsh
curl -X POST \ [https://login.xsolla.com/api/oauth2/token](https://login.xsolla.com/api/oauth2/token "https://login.xsolla.com/api/oauth2/token") \ -H 'Content-Type: application/x-www-form-urlencoded' \ -d 'grant_type=refresh_token&refresh_token=<put here your refresh>&client_id=303'(noidea you have to decode your jwt)
```

`<put here your refresh>`: paste the inside of "refresh_token": "salkadj4452342f23f".

**DO NOT COPY "refresh_token" OR "", only copy the insides of "" after "refresh_token".**

3. paste everything you get from step 2 into here https://beautifier.io/
4. copy the access token as that is your **token**(they only last 24 hours so you have to either create a new account or refresh your token).

#### Downloading the bot.

1. you can use this command in power shell or you can manually extract your zip file.

```shell
git clone https://github.com/foolishaimsxd/publicfoolishbot.git
```

2. Open your IDE/Code editor of choice and find where you extracted the folder and choose it.
3. Then open a terminal and run the bot.
4. **key note you should have NodeJs installed beforehand.**

#### Running the bot:

- `npm i`(installed stuff you might not have or audit).
- `npm start`(starts the bot and runs it).

**.help**(shows commands)
**.whois** `#shortId`(gets user)
**.price**(item price),
**.credit**(who made me).

These are all the commands.

---
##### EXTRA

`optionally`:
Open developer tools(cntrl+shift+i) then go into `storage -> local storage -> "token"`(this is your current token but you have to wait till it refreshes automatically and also clear browser cookies to get a new one).

`Disclaimer`:
This code is **NOT** industry standard and was coded in less then a day. you **need** to follow all instructions very carefully; Have NodeJS installed and understand how to code in JS. keep_alive.js is not needed for general use so you can delete if you wish to do so, it is only needed for hosting.