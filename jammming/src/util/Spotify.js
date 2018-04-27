const clientId = "b301371f68f341c8b50a2262ef34a1a8"; // Insert client ID here.
//const redirectUri = window.location.href;

const redirectUri = "http://localhost:3000"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
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
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.

      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectUri}`;
    }
  },

  search(searchWord) {
    this.getAccessToken();

    const urlToFetchTracks = `https://api.spotify.com/v1/search?q=${searchWord}&type=track&limit=20`;

    return fetch(urlToFetchTracks, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => {
          return {
            album: track.album.name,
            artist: track.artists[0].name,
            id: track.id,
            name: track.name,
            uri: track.uri
          };
        });
      });
  },

  save(name, trackUris) {
    if (trackUris.length === 0) {
      return console.log("Please add songs to playlist!");
    }

    const urlToGetId = "https://api.spotify.com/v1/me";
    let userId = "";
    let playlistId = "";
    let headers = { Authorization: `Bearer ${accessToken}` };

    return fetch(urlToGetId, {
      headers: headers
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        userId = jsonResponse.id;
      })
      .then(() => {
        const urlToCreatePL = `https://api.spotify.com/v1/users/${userId}/playlists`;
        return fetch(urlToCreatePL, {
          method: "POST",
          body: JSON.stringify({
            name: name,
            public: false
          }),
          headers: {
            "Content-type": "application/json",
            Accept: "application / json",
            Authorization: `Bearer ${accessToken}`
          }
        });
      })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        playlistId = jsonResponse.id;
      })
      .then(() => {
        const urlToAddTracks = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
        return fetch(urlToAddTracks, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            uris: trackUris
          })
        });
      })
      .then(response => console.log(response));
  }
};
