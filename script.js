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
}

// SUCCESS FUNCTION ON UNLOCKING THE WINNING KEY EMOJI
function unlockFirstLetter() {
    const gameZone = document.getElementById("gameZone1");
    const secretContent = document.getElementById("secretContent1");
    
    if (gameZone) gameZone.classList.add("hidden"); 
    if (secretContent) secretContent.classList.remove("hidden");
}

// VARIABLE TO TRACK THE RUNNING HINT TIMER
let hintTimeoutId = null;
// SUCCESS FUNCTION ON UNLOCKING THE WINNING KEY EMOJI
function unlockFirstLetter() {
    const gameZone = document.getElementById("gameZone1");
    const secretContent = document.getElementById("secretContent1");
    
    if (gameZone) gameZone.classList.add("hidden"); 
    if (secretContent) {
        secretContent.classList.remove("hidden");
        
        // Find the birthday text header inside the layout
        const birthdayText = secretContent.querySelector(".birthday-wish");
        if (birthdayText) {
            // Remove the class first, trigger reflow, then add it to force the animation to fire!
            birthdayText.classList.remove("pop-up-animation");
            void birthdayText.offsetWidth; // The magic line that forces the reset
            birthdayText.classList.add("pop-up-animation");
        }
    }
}
// INTERACTIVE PICTURE CLICK TOGGLE FUNCTION
function revealRealPhoto() {
    const card = document.getElementById("polaroidCard");
    if (card) {
        card.classList.add("revealed");
    }
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
        if(hintText.innerText === customHint) hintText.innerText = "";
    }, 2000);
}