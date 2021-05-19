const playlistID = "37i9dQZF1DX0SM0LYsmbMT"

export default async function getTrackURIs(spotifyAccessToken) {
    let trackURIs = [];
    await fetch("https://api.spotify.com/v1/playlists/" + playlistID, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${spotifyAccessToken}`
        }
    }).then(response => response.json()
    ).then(data => {
        console.log(data.tracks.items);
        let tracks = data.tracks.items.map( t => t.track.uri);
        trackURIs.push(tracks)
    });
    console.log("trackURIs", trackURIs[0]);
    return trackURIs[0];
}