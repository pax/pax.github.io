// Global variables
var player;
var audioOverlays = [];
var youtubeVideoId = 'Ccpmr033xKc'; // Replace with your actual YouTube video ID

// Fetch audio overlay data
function fetchAudioOverlayData() {
    fetch('audio_overlays.csv')
        .then(response => response.text())
        .then(csvData => {
            audioOverlays = parseCSV(csvData);
            onYouTubeIframeAPIReady();
        })
        .catch(error => console.error('Error fetching audio overlay data:', error));
}

// Parse CSV data
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    return lines.slice(1).map(line => {  // Skip header row
        const [path, timestamp] = line.split(',');
        return { 
            path: path.trim(), 
            timestamp: convertTimestampToSeconds(timestamp.trim()),
            audio: null,
            played: false
        };
    });
}

// Convert timestamp to seconds
function convertTimestampToSeconds(timestamp) {
    const [minutes, seconds] = timestamp.split(':').map(Number);
    return minutes * 60 + seconds;
}

// Initialize YouTube player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: youtubeVideoId,
        playerVars: {
            autoplay: 0,
            modestbranding: 1,
            controls: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    setupAudioOverlays();
    updatePlayerInfo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        startAudioCheck();
    } else {
        stopAudioCheck();
    }
}

let audioCheckInterval;

function startAudioCheck() {
    stopAudioCheck(); // Clear any existing interval
    audioCheckInterval = setInterval(checkAudioOverlays, 100);
}

function stopAudioCheck() {
    if (audioCheckInterval) {
        clearInterval(audioCheckInterval);
    }
}

function updatePlayerInfo() {
    setInterval(function() {
        const currentTime = player.getCurrentTime();
        document.getElementById('current-time').textContent = currentTime.toFixed(1);
    }, 100);
}

// Set up audio elements for overlays
function setupAudioOverlays() {
    audioOverlays.forEach(overlay => {
        const audio = new Audio(overlay.path);
        audio.preload = 'auto';
        overlay.audio = audio;
    });
}

// Check and play audio overlays
function checkAudioOverlays() {
    const currentTime = player.getCurrentTime();
    audioOverlays.forEach(overlay => {
        if (Math.abs(currentTime - overlay.timestamp) < 0.1 && !overlay.played) {
            overlay.audio.play();
            overlay.played = true;
            console.log(`Played overlay: ${overlay.path} at ${currentTime}`);
        } else if (currentTime < overlay.timestamp) {
            overlay.played = false; // Reset if video is seeked backwards
        }
    });
}

// Start the process
fetchAudioOverlayData();