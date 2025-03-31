document.addEventListener('DOMContentLoaded', function() {
    const barbourText = document.getElementById('barbour-text');
    const baracutaText = document.getElementById('baracuta-text');
    
    const barbourWord = "BARBOUR";
    const baracutaWord = "BARACUTA";
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    const cyclesPerLetter = 10;
    const cycleDelay = 50; 
    const letterDelay = 0;   
    const wordDelay = 250;   
    
    function animateText(element, word, onComplete) {
        let currentLetterIndex = 0;
        
        function animateLetter() {
            if (currentLetterIndex >= word.length) {
                if (onComplete) onComplete();
                return;
            }
            
            let cycleCount = 0;
            const correctLetter = word[currentLetterIndex];
            let displayedText = element.textContent;
            
            const interval = setInterval(() => {
                cycleCount++;
                
                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                
                if (cycleCount < cyclesPerLetter) {
                    element.textContent = displayedText + randomChar;
                } else {
                    element.textContent = displayedText + correctLetter;
                    clearInterval(interval);
                    
                    setTimeout(() => {
                        currentLetterIndex++;
                        animateLetter();
                    }, letterDelay);
                }
            }, cycleDelay);
        }
        
        animateLetter();
    }
    
    setTimeout(() => {
        animateText(barbourText, barbourWord, () => {
            setTimeout(() => {
                animateText(baracutaText, baracutaWord, null);
            }, wordDelay);
        });
    }, 500);
});