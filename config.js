 module.exports = {
  token: process.env.TOKEN,
  prefix: "p!",
  server: "https://discord.gg/Ey6YfbcGzU",

  yes: "✅",
  no: "❌",

  owners: ["645667411609255948" , "704282858793205790", "492222399031410708"],

  special: ["645667411609255948" , "704282858793205790"],

 mongo_atlas: {
    username: process.env.username,
    password: process.env.password,
    cluster: process.env.cluster,
    shard: {
      one: process.env.shard1,
      two: process.env.shard2,
      three: process.env.shard3
    }
  },
  webhooks: {
    cmd: {
      ID: '980429229613273118',
      Token: '_jTWlJJspuly_GHqLoRgXCO4hH4eXTjqc--cx7luli2FxWbybtxkVgPoZHOGEalHGX09'
    },
    guild: {
      ID: '980427208004861962',
      Token: '_jTWlJJspuly_GHqLoRgXCO4hH4eXTjqc--cx7luli2FxWbybtxkVgPoZHOGEalHGX09'
    },
	vote: {
		ID: '',
		Token: ''
	}
  },
  cooldown: 3000,
  
  topgg: {
	  auth: "",
	  token: ""
  }
};

