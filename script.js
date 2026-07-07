// GLOBAL VARIABLE HOOKS FOR TIMERS AND SOUND LISTENER
let hintTimeoutId = null;
let micStream = null;
let audioContext = null;
let micAnalyser = null;
let isListeningToBlow = false;

// FUNCTION TO TRANSITION FROM SPLASH SCREEN TO MAIN CONTENT
function enterWebsite() {
    const music = document.getElementById("bgMusic");
    if (music) {
        music.volume = 0.4;
        music.play().catch(error => console.log("Audio block bypass failed:", error));
    }
    
    const splash = document.getElementById("splashScreen");
    const container = document.getElementById("mainContainer");
    
    if (splash) splash.classList.add("hidden");
    if (container) container.classList.remove("hidden");

    // Instantly begin streaming ambient dandelion seeds across background canvas
    setInterval(createSeedParticle, 550);
}

// SUCCESS FUNCTION ON UNLOCKING THE WINNING DANDELION EMOJI
function unlockFirstLetter() {
    const gameZone = document.getElementById("gameZone1");
    const secretContent = document.getElementById("secretContent1");
    
    if (gameZone) gameZone.classList.add("hidden"); 
    if (secretContent) {
        secretContent.classList.remove("hidden");
        
        // Trigger the birthday text header slide animation loop
        const birthdayText = secretContent.querySelector(".birthday-wish");
        if (birthdayText) {
            birthdayText.classList.remove("pop-up-animation");
            void birthdayText.offsetWidth; // Force CSS reflow pipeline reset
            birthdayText.classList.add("pop-up-animation");
        }

        // Initialize microphone validation for the dandelion blowing experience!
        initWishBlowingEngine();
    }
}

// MICROPHONE CAPTURE AUDIO ANALYSIS CONTROLLER
function initWishBlowingEngine() {
    if (isListeningToBlow) return;
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(function(stream) {
            micStream = stream;
            isListeningToBlow = true;
            
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(stream);
            micAnalyser = audioContext.createAnalyser();
            micAnalyser.fftSize = 256;
            source.connect(micAnalyser);
            
            checkMicBlowingLevel();
        })
        .catch(function(err) {
            console.log("Microphone access declined or unavailable. Falling back to tap reveal mode.", err);
            const card = document.getElementById("polaroidCard");
            if (card) {
                card.setAttribute("style", "--placeholder-text: 'Tap to break the seal! ✨'");
            }
        });
    }
}

// RECURSIVE FUNCTION TO MONITOR DECIBEL SPIKES (BLOWING AIR)
function checkMicBlowingLevel() {
    if (!isListeningToBlow) return;

    const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);
    micAnalyser.getByteFrequencyData(dataArray);

    let totalAmplitude = 0;
    for (let i = 0; i < dataArray.length; i++) {
        totalAmplitude += dataArray[i];
    }
    const averageVolume = totalAmplitude / dataArray.length;

    // Threshold Check: Decibels > 65 indicates a targeted blow of air on device mic
    if (averageVolume > 65) {
        revealRealPhoto();
    } else {
        requestAnimationFrame(checkMicBlowingLevel);
    }
}

// EXECUTES THE ACTUAL REVEAL AND SPAWNS A BURST OF DANDELION SEEDS
function revealRealPhoto() {
    const card = document.getElementById("polaroidCard");
    if (card && !card.classList.contains("revealed")) {
        card.classList.add("revealed");
        
        isListeningToBlow = false;
        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
        }
        if (audioContext) {
            audioContext.close();
        }

        // Spawn a celebration explosion layout of 20 fast-drifting seedheads!
        for (let i = 0; i < 25; i++) {
            setTimeout(createSeedParticle, i * 50);
        }
    }
}

function revealRealPhotoFallback() {
    revealRealPhoto();
}

// LOGIC FOR INCORRECT ITEM SELECTIONS
function wrongGarden(customHint) {
    const hintText = document.getElementById("gardenHint");
    if (!hintText) return;

    if (hintTimeoutId) {
        clearTimeout(hintTimeoutId);
    }

    hintText.innerText = customHint;
    
    hintTimeoutId = setTimeout(() => {
        if (hintText.innerText === customHint) {
            hintText.innerText = "";
        }
    }, 2000);
}

// DYNAMICALLY GENERATES SINGLE FLOATING SEED PARTICLES
function createSeedParticle() {
    const seed = document.createElement("div");
    seed.className = "dandelion-seed";
    
    // Array of whimsical scrapbooked seed/glitter items
    const seedGlyphs = ["🌾", "🍃", "📜", "*", "°"];
    seed.innerText = seedGlyphs[Math.floor(Math.random() * seedGlyphs.length)];
    
    seed.style.left = (Math.random() * 100) + "vw";
    seed.style.bottom = "-30px";
    
    const relativeSize = Math.random() * 0.4 + 0.6; 
    seed.style.transform = `scale(${relativeSize})`;
    
    const animationSpeed = Math.random() * 4 + 4.5; 
    seed.style.animationDuration = animationSpeed + "s";
    
    document.body.appendChild(seed);
    
    setTimeout(() => {
        seed.remove();
    }, animationSpeed * 1000);
}
