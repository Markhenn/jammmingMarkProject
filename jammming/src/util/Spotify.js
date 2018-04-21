const clientId = 'b301371f68f341c8b50a2262ef34a1a8'; // Insert client ID here.
const redirectUri = 'http://localhost:3000'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

export const Spotify = {
        getAccessToken() {
            if (accessToken) {
                return accessToken;
            }

            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
            if (accessTokenMatch && expiresInMatch) {
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.

                return accessToken;
            } else {

            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            }
        },


    search(searchWord) {

        this.getAccessToken();

        const urlToFetchTracks = `https://api.spotify.com/v1/search?q=${searchWord}&type=track&limit=20`;

        return fetch(urlToFetchTracks, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse =>{
            if (jsonResponse.tracks.items.length !== 0) {
               return jsonResponse.tracks.items.map(track => {
                    return {
                        album: track.album.name,
                        artist: track.artists[0].name,
                        id: track.id,
                        track: track.name,
                        uri: track.uri
                    };
                })
            } else {
                return [];
            }
            
        });

    },

    save(name, trackUri){

        if (!name) {
           return console.log('Please choose a playlist name!');
        }

        if (trackUri.length === 0) {
            return console.log('Please add songs to playlist!');
        }

        const urlToGetId = 'https://api.spotify.com/v1/me';
        
        return fetch(urlToGetId, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse.id);
            return jsonResponse.id;
        }).then(userId => {
            const urlToCreatePL = `https://api.spotify.com/v1/users/${userId}/playlists`;
            return fetch(urlToCreatePL, {
                method: 'POST',
                body: JSON.stringify({
                    "name": name,
                    "description": `Playlist created by ${this.userID}`,
                    "public": false
                }),
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);
        })

       
     
    }
};
