// FUNCTION TO TRANSTION FROM SPLASH SCREEN TO MAIN CONTENT
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
    if (secretContent) {
        secretContent.classList.remove("hidden");
        
        // Find the birthday text header inside the letter container
        const birthdayText = secretContent.querySelector(".birthday-wish");
        if (birthdayText) {
            // Remove the class first if it exists, then force a reflow and add it
            birthdayText.classList.remove("pop-up-animation");
            void birthdayText.offsetWidth; // Trigger magic reflow to reset animation
            birthdayText.classList.add("pop-up-animation");
        }
    }
}
// LOGIC TO EXECUTE ON WRONG ITEM CLICKS WITHIN THE GRID ZONE
function wrongGarden(customHint) {
    const hintText = document.getElementById("gardenHint");
    if (!hintText) return;

    // Reset running instance of window timer strings
    if (hintTimeoutId) {
        clearTimeout(hintTimeoutId);
    }

    hintText.innerText = customHint;
    
    hintTimeoutId = setTimeout(() => {
        if(hintText.innerText === customHint) hintText.innerText = "";
    }, 2000);
}