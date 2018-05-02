const clientId = "b301371f68f341c8b50a2262ef34a1a8"; // Insert client ID here.
const redirectUri = "http://localhost:3000"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;
let userId;

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
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-private%20playlist-read-private&redirect_uri=${redirectUri}`;
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

  save(name, trackUris, playlistId) {
    if (trackUris.length === 0) {
      return console.log("Please add songs to playlist!");
    }

    if (playlistId) {
      const urlToUpdatePL = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`;

      fetch(urlToUpdatePL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          name: name
        })
      })
        .then(() => {
          const urlToAddTracks = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          return fetch(urlToAddTracks, {
            method: "PUT",
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
    } else {
      const userPromise = this.getCurrentUserId();
      console.log(userId);

      userPromise
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
  },

  getUserPlaylists() {
    this.getAccessToken();

    const userPromise = this.getCurrentUserId();

    return userPromise.then(() => {
      const urlToGetPlaylists = `https://api.spotify.com/v1/users/${userId}/playlists`;

      return fetch(urlToGetPlaylists, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          return jsonResponse.items
            .filter(playlist => {
              return playlist.owner.id === userId;
            })
            .map(playlist => {
              return { name: playlist.name, id: playlist.id };
            });
        });
    });
  },

  getPlaylistTracks(id) {
    this.getAccessToken();

    const urlToGetPL = `https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`;

    return fetch(urlToGetPL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
        if (!jsonResponse.items) {
          return [];
        }
        return jsonResponse.items.map(plTrack => {
          return {
            album: plTrack.track.album.name,
            artist: plTrack.track.artists[0].name,
            id: plTrack.track.id,
            name: plTrack.track.name,
            uri: plTrack.track.uri
          };
        });
      });
  },

  getCurrentUserId() {
    if (userId) {
      const test = Promise.resolve(userId);
      console.log(test);
      return test;
    }
    const urlToGetId = "https://api.spotify.com/v1/me";

    return fetch(urlToGetId, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        return (userId = jsonResponse.id);
      });
  }
};
