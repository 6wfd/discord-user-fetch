require('events').EventEmitter.defaultMaxListeners = 300;

const fetch = require('node-fetch');
const axios = require("axios");



function fetchUser(userId) {
  if(!userId || isNaN(userId)) return console.error(
			`[INVAILD_USER_ID] You must put a user ID.`
		);
	
		fetch(`https://discord.com/api/v8/users/${userId}`,
          {headers:{ "Authorization": `Bot ODkyODczMzU3ODk5NDcyODk3.YVTPHQ.tV4SxU1X9lNVlP5pl_BQsaPgMiY` } 
          }).then(async res => res.json()).then(async user => {
  if(user.username) {
	const query = `?size=1024`;
	const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;
  const baseAvatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}`;
  if(user.banner) {
		const { headers } = await axios.head(baseUrl);
		if (headers && headers.hasOwnProperty('content-type')) {
		  user.bannerURL = (
				baseUrl +
				(headers['content-type'] == 'image/gif'
					? '.gif'
					: `.png`) +
				query
			);
		}
		user.bannerURL = baseUrl + `.png` + query;
	}
    if(user.avatar) {
		const { headers } = await axios.head(baseAvatarUrl);
		if (headers && headers.hasOwnProperty('content-type')) {
		  user.avatarURL = (
				baseAvatarUrl +
				(headers['content-type'] == 'image/gif'
					? '.gif'
					: `.png`) +
				query
			);
		}
		user.avatarURL = baseAvatarUrl + `.png` + query;
	}
  	
    let apiUser = user;
    
	  return apiUser;
    
    } else {
       return console.error(`Cannot found information for (${userId})`)
    }
		}).catch(async err => {
		  return console.error(`Cannot found information for (${userId})`)
		})
}
