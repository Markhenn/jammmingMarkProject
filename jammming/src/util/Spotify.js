/*
Spotify access
Client ID b301371f68f341c8b50a2262ef34a1a8
Client Secret 20c80ad5a49644199be078e759650ed7

GET
Track Search:
"https://api.spotify.com/v1/search?q=hulapalu&type=track"

Artist Search:
"https://api.spotify.com/v1/search?q=hulapalu&type=artist"

Artist Tracks:
https://api.spotify.com/v1/artists/{id}/top-tracks


Album Search: 
"https://api.spotify.com/v1/search?q=hulapalu&type=album"

Album Track Search
https://api.spotify.com/v1/albums/{id}/tracks


POST
*/

//Return title, artist, album and an id or url to find on spotify
import {Tracks} from '../Helpfiles/tracksearch';

export const Spotify = {

    search() {

        return Tracks.tracks.items.map(track => {
            return {
                album: track.album.name,
                artist: track.artists[0].name,
                id: track.id,
                track: track.name
            }
        })
    },

    save(name, playlist){

        

        if (!name) {
           return console.log('Please choose a playlist name!');
        }

        if (playlist.length === 0) {
            return console.log('Please add songs to playlist!');
        }

        console.log(playlist);
        console.log(`Saving Playlist: ${name} to Spotify!`);
    }
};
