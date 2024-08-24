function checkDateAndRemove() {
    // Define the cutoff date and time
    const cutoffDate = new Date('2024-08-16T00:00:00');
    const now = new Date();
    if (now >= cutoffDate) {
        const elements = document.querySelectorAll('.animationsec');
        elements.forEach(element => {
            element.remove();
        });

        const idElement = document.getElementById('confetti-canvas');
        if (idElement) {
            idElement.remove();
        }
    }
}

window.onload = checkDateAndRemove;