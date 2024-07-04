function suggestionsSongList() {
    title = document.getElementById("song_name").value;
    const suggestionsField = document.getElementById("suggestionsSongListField");
    suggestionsField.innerHTML ='';
    console.log(title);

    fetch(`https://api.lyrics.ovh/suggest/${title}&limit=5`)
        .then(response => response.json())
        .then(res => {
            songdata = res.data;
            for (var i = 0; i < songdata.length; i++) 
                {
                suggestionsField.innerHTML += `<div class="col-md-9">
                         <h3 class="lyrics-name"> ${songdata[i].title} </h3>
                        <p class="author lead">Album by <span>${songdata[i].artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" onclick ="getFullLyrics('${songdata[i].artist.name}','${songdata[i].title}')" >Get Lyrics</button>
                    </div>`;
                }
        })
}

function getFullLyrics (artist,title) {
    console.log(artist, title);
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(res => {
        // console.log(res);
        document.getElementById("full_lyrics").innerHTML = res.lyrics;
    })
    .catch(err => console.error(err));
}