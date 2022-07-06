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

function getTrump() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/hal+json',
      'X-RapidAPI-Key': '87ea4d3321msh860880726043332p1db060jsnf40a386d1318',
      'X-RapidAPI-Host': 'matchilling-tronald-dump-v1.p.rapidapi.com'
    }
  };

  return fetch('https://matchilling-tronald-dump-v1.p.rapidapi.com/quote/%7Bid%7D', options)
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data.value + " - Donald J. Trump";
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
  
  if (msg.content === "$trump") {
    getTrump().then(trump => msg.channel.send(trump));
  }

  if (msg.content === "What do we have?") {
    msg.channel.send("UNITY!!!");
  }

  if (msg.content === "Recite the Jordan Standard.") {
    msg.channel.send("The confidence of the Founders of Sigma Chi was based on a belief that the principles which they professed and the ideal of the Fraternity which they sought were but imperfectly realized in the organizations by which they were surrounded.\n\nThe standard with which the Fraternity started was declared by Isaac M. Jordan to be that of admitting no man to membership in Sigma Chi who is not believed to be:\n\nA Man of Good Character \nA Student of Fair Ability\nWith Ambitious Purposes\nA Congenial Disposition\nPossessed of Good Morals\nHaving a High Sense of Honor and\nA Deep Sense of Personal Responsibility");
  }
})

client.login(process.env.TOKEN)
