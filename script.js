let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let songProgress = document.getElementById("songprogress");
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let songPlaybackTimes = new Array(songItems.length).fill(0); // Array to store playback times

// Define songs array
let songs = [
    { songName: "Heeriye", filePath: "songs/1.mp3", coverPath: "template/1.jpg" },
    { songName: "Zihaal e Miskin", filePath: "songs/2.mp3", coverPath: "template/2.jpg" },
    { songName: "Rabba Janda", filePath: "songs/3.mp3", coverPath: "template/3.jpg" },
    { songName: "Humnava Mere", filePath: "songs/4.mp3", coverPath: "template/4.jfif" },
    { songName: "Vaaste", filePath: "songs/5.mp3", coverPath: "template/5.avif" },
    { songName: "Chak De India", filePath: "songs/6.mp3", coverPath: "template/6.jfif" },
    { songName: "Kar Har Maidaan Fateh", filePath: "songs/7.mp3", coverPath: "template/7.jpg" },
    { songName: "Saina: Parinda", filePath: "songs/8.mp3", coverPath: "template/8.jfif" },
    { songName: "Arambh Hai Prachand", filePath: "songs/9.mp3", coverPath: "template/9.jfif" },
    { songName: "Bandeya", filePath: "songs/10.mp3", coverPath: "template/10.jpg" },

    { songName: "Chal Wahan Jaate Hain", filePath: "songs/11.mp3", coverPath: "template/11.jpg" },
    { songName: "Sanu Ek Pal Chain", filePath: "songs/12.mp3", coverPath: "template/12.jfif" },
    { songName: "Tumhe Apna Banane Ka", filePath: "songs/13.mp3", coverPath: "template/13.jpg" },
    { songName: "Ishq Mubarak", filePath: "songs/14.mp3", coverPath: "template/14.jpg" },
    { songName: "Jitni Dafa", filePath: "songs/15.mp3", coverPath: "template/15.jpg" },
    { songName: "Lo Maan Liya", filePath: "songs/16.mp3", coverPath: "template/16.jpg" },
    { songName: "Maheroo Maheroo", filePath: "songs/17.mp3", coverPath: "template/17.jpg" },
    { songName: "Mujhko Barsaat Bana Lo", filePath: "songs/18.mp3", coverPath: "template/18.jpg" },
    { songName: "Toota Jo Kabhi Taara", filePath: "songs/19.mp3", coverPath: "template/19.jpg" },
    { songName: "Hua Hain Aaj Pehli Baar", filePath: "songs/20.mp3", coverPath: "template/20.jfif" },

    { songName: "Heeriye", filePath: "songs/1.mp3", coverPath: "template/1.jpg" },
    { songName: "Zihaal e Miskin", filePath: "songs/2.mp3", coverPath: "template/2.jpg" },
    { songName: "Rabba Janda", filePath: "songs/3.mp3", coverPath: "template/3.jpg" },
    { songName: "Humnava Mere", filePath: "songs/4.mp3", coverPath: "template/4.jfif" },
    { songName: "Vaaste", filePath: "songs/5.mp3", coverPath: "template/5.avif" }
];

// Initialize song list
function initializeSongList() {
    songItems.forEach((element, i) => {
        element.getElementsByTagName('img')[0].src = songs[i].coverPath;
        element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
        element.getElementsByClassName('songItemPlay')[0].id = i;
    });
}

// Function to play selected song
function playSong(index) {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = songPlaybackTimes[index]; // Set current time
    audioElement.play();

    // Update play/pause icons
    songItems.forEach((el) => {
        el.getElementsByClassName('songItemPlay')[0].classList.remove('fa-pause-circle');
        el.getElementsByClassName('songItemPlay')[0].classList.add('fa-play-circle');
    });
    songItems[index].getElementsByClassName('songItemPlay')[0].classList.remove('fa-play-circle');
    songItems[index].getElementsByClassName('songItemPlay')[0].classList.add('fa-pause-circle');

    // Update master play icon
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update GIF visibility
    gif.style.opacity = 1;
}

// Initialize song list
initializeSongList();

// Event listener for master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        songPlaybackTimes[songIndex] = audioElement.currentTime; // Store current time
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        songItems[songIndex].getElementsByClassName('songItemPlay')[0].classList.remove('fa-pause-circle');
        songItems[songIndex].getElementsByClassName('songItemPlay')[0].classList.add('fa-play-circle');
    }
});

// Event listener for song items
songItems.forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);
        if (clickedIndex === songIndex && !audioElement.paused) {
            songPlaybackTimes[songIndex] = audioElement.currentTime; // Store current time
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
        } else {
            songIndex = clickedIndex;
            playSong(songIndex);
        }
    });
});

// Event listener for next button
document.getElementById('next').addEventListener('click', () => {
    songPlaybackTimes[songIndex] = audioElement.currentTime; // Store current time
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Event listener for previous button
document.getElementById('previous').addEventListener('click', () => {
    songPlaybackTimes[songIndex] = audioElement.currentTime; // Store current time
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Event listener for audio progress
audioElement.addEventListener('timeupdate', () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    songProgress.value = progress;
});

// Event listener for song progress slider
songProgress.addEventListener('change', () => {
    audioElement.currentTime = (songProgress.value * audioElement.duration) / 100;
});

// Event listener for song end
audioElement.addEventListener('ended', () => {
    songPlaybackTimes[songIndex] = 0; // Reset playback time
    songIndex = (songIndex + 1) % songs.length; // Move to next song
    playSong(songIndex); // Play next song
});
