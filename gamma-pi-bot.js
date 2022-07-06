const { Client, Intents } = require('discord.js');
require('dotenv').config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const fetch = require("node-fetch");

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    });
}

function getJoke() {
  const url = 'https://dad-jokes.p.rapidapi.com/random/joke';

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '87ea4d3321msh860880726043332p1db060jsnf40a386d1318',
      'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
    }
  };

  return fetch(url, options)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data.body[0]["setup"] + " " + data.body[0]["punchline"];
    });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on("message", msg => {
  if (msg.author.bot) return;

  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote));
  }

  if (msg.content === "$joke") {
    getJoke().then(joke => msg.channel.send(joke));
  }


  if (msg.content === "What do we have?") {
    msg.channel.send("UNITY!!!");
  }

  if (msg.content === "Recite the Jordan Standard.") {
    msg.channel.send("The confidence of the Founders of Sigma Chi was based on a belief that the principles which they professed and the ideal of the Fraternity which they sought were but imperfectly realized in the organizations by which they were surrounded.\n\nThe standard with which the Fraternity started was declared by Isaac M. Jordan to be that of admitting no man to membership in Sigma Chi who is not believed to be:\n\nA Man of Good Character \nA Student of Fair Ability\nWith Ambitious Purposes\nA Congenial Disposition\nPossessed of Good Morals\nHaving a High Sense of Honor and\nA Deep Sense of Personal Responsibility");
  }
  
  if (msg.content === "Recite The Dedication.") {
    msg.channel.send("To the young man who stand on the threshold of that great experience which caused founder Isaac M. Jordan to remark, 'Sigma Chi was my first love; it shall be my last', this volume is dedicated.");
  }
  
  if (msg.content === "Recite The Sigma Chi Creed.") {
    msg.channel.send("I believe in fairness, decency, and good manners. I will endeavor to retain the spirit of youth. I will try to make my college, the Sigma Chi Fraternity, and my own chapter more honored by all men and women and more beloved and honestly respected by our own brothers. I say these words in all sincerity; That Sigma Chi has given me favor and distinction; that the bond of our fellowship is reciprocal, that I will endeavor to so build myself and so conduct myself that I will ever be a credit to our Fraternity.");
  }
  
  if (msg.content === "Recite My Badge.") {
    msg.channel.send("I might be forced to admit that there is some similarity between the ideals of Sigma Chi and those of other fraternities but- I will not share the beautiful and the symbolic supremacy of the White Cross of Sigma Chi with any other badge in the Greek world. The badge of my fraternity is a cross, a sign and a symbol known to all the world, uplifting him of whom our badge reminds us. It is not a shield of timid defense nor a drawn sword of oppressive aggression nor an arrow swift and sure on its mission of death. It is not a diamond so rich and so rare as to have no part in the common crowd nor a crescent pale and incomplete nor a star shining with a borrowed ray. It is not a lamp whose feeble flame is extinguished by the slightest gust of wind that blows; nor a simple monogram of mysterious Greek letters presuming to reveal some hidden meaning. But a cross with its base planted in the common clay of earth; its arms outstretched to all the world and its head lifted heavenward. It is a White Cross, suggesting purity. As any pure white surface reflects all the rays of light without the absorption of any, so the White Cross of Sigma Chi reflects its ideals unselfishly to all mankind.");
  }
  
})

client.login(process.env.TOKEN)
