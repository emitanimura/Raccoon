
        
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('game-over-screen').style.display = 'none';
});
document.addEventListener('DOMContentLoaded', () => {
    const raccoon = document.getElementById('raccoon');
    const trashBins = document.querySelectorAll('.trash-bin');
    const cityObjects = document.querySelectorAll('.city-object');
    const heartCount = document.getElementById('heart-count');
    const winMessage = document.getElementById('win-message');
    const gameOverScreen = document.getElementById('game-over-screen');
    const retryButton = document.getElementById('retry-button');  
    let hearts = 0;
    let position = { x: 750, y: 450 };
    let foodItems = ['🍎✨', '🍔✨', '🍟✨', '🍙✨', '🍉✨'];

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                position.y = Math.max(0, position.y - 10);
                break;
            case 'ArrowDown':
                position.y = Math.min(450, position.y + 10);
                break;
            case 'ArrowLeft':
                position.x = Math.max(0, position.x - 10);
                break;
            case 'ArrowRight':
                position.x = Math.min(750, position.x + 10);
                break;
        }
        raccoon.style.top = position.y + 'px';
        raccoon.style.left = position.x + 'px';

        checkCollisions();
    });

    function checkCollisions() {
        let raccoonRect = raccoon.getBoundingClientRect();

        trashBins.forEach((bin) => {
            let binRect = bin.getBoundingClientRect();
            if (
                raccoonRect.left < binRect.right &&
                raccoonRect.right > binRect.left &&
                raccoonRect.top < binRect.bottom &&
                raccoonRect.bottom > binRect.top &&
                !bin.dataset.collected
            ) {
                bin.dataset.collected = 'true';
                let index = [...trashBins].indexOf(bin);
                bin.innerHTML = foodItems[index]; 
                hearts++;
                heartCount.textContent = hearts;

                if (hearts === 5) {
                    winMessage.style.display = 'block';
                }
            }
        });

        cityObjects.forEach((obj) => {
let objRect = obj.getBoundingClientRect();

let margin = 19;

if (
    raccoonRect.left + margin < objRect.right &&
    raccoonRect.right - margin > objRect.left &&
    raccoonRect.top + margin < objRect.bottom &&
    raccoonRect.bottom - margin > objRect.top
            ) {
                gameOver();
            }
        });
    }

    function gameOver() {
        gameOverScreen.style.display = "flex";
    }

    retryButton.addEventListener("click", function () {
        gameOverScreen.style.display = "none";
        resetGame();
    });

    function resetGame() {
        hearts = 0;
        heartCount.textContent = hearts;
        winMessage.style.display = "none";
        position = { x: 750, y: 450 };
        raccoon.style.top = position.y + 'px';
        raccoon.style.left = position.x + 'px';

        trashBins.forEach(bin => {
            bin.innerHTML = '🗑️';
            delete bin.dataset.collected;
        });
    }
});
