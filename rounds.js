// ===== SISTEMA A ROUND - ImparIAmo =====
// Gestisce round di 10 domande con barra di progresso per tutti i giochi

// Funzione per aggiornare la barra di progresso
function updateRoundProgress(gameType) {
    const game = gameType === 'math' ? MathGame :
                 gameType === 'tabelline' ? TabellineGame :
                 gameType === 'letters' ? LettersGame :
                 gameType === 'logic' ? LogicGame :
                 gameType === 'imageguess' ? ImageGuessGame :
                 gameType === 'english' ? EnglishGame : null;

    const progress = game.roundProgress || 0;
    const percentage = (progress / 10) * 100;

    // Aggiorna UI
    const currentEl = document.getElementById(`${gameType}-round-current`);
    const numberEl = document.getElementById(`${gameType}-round-number`);
    const progressFill = document.getElementById(`${gameType}-progress-fill`);

    if (currentEl) currentEl.textContent = progress;
    if (numberEl) numberEl.textContent = game.roundNumber || 1;

    if (progressFill) {
        progressFill.style.width = percentage + '%';

        // Animazione completamento
        if (progress === 10) {
            progressFill.classList.add('complete');
        } else {
            progressFill.classList.remove('complete');
        }
    }
}

// Funzione per mostrare premio round completato
function showRoundComplete(gameType) {
    const game = gameType === 'math' ? MathGame :
                 gameType === 'tabelline' ? TabellineGame :
                 gameType === 'letters' ? LettersGame :
                 gameType === 'logic' ? LogicGame :
                 gameType === 'imageguess' ? ImageGuessGame :
                 gameType === 'english' ? EnglishGame : null;

    const bonusPoints = game.roundNumber * 50;
    updateUserPoints(bonusPoints, gameType);

    const message = `
        🎉 ROUND ${game.roundNumber} COMPLETATO! 🎉
        <br><br>
        🏆 Bonus Round: +${bonusPoints} punti!
        <br><br>
        🌟 Inizia il Round ${game.roundNumber + 1}!
    `;

    showCelebration(message);

    // Avanza al prossimo round dopo 3 secondi
    setTimeout(() => {
        game.roundNumber++;
        game.roundProgress = 0;

        // Reset array domande già chieste per il nuovo round
        if (game.askedThisRound) {
            game.askedThisRound = [];
        }

        updateRoundProgress(gameType);

        // Nascondi celebration
        const celebration = document.getElementById(`${gameType}-celebration`);
        if (celebration) {
            celebration.classList.add('hidden');
        }
    }, 3000);
}

// Incrementa progresso per il gioco di Matematica
function incrementMathProgress() {
    if (!MathGame.roundProgress) MathGame.roundProgress = 0;
    if (MathGame.roundProgress < 10) {
        MathGame.roundProgress++;
        updateRoundProgress('math');

        if (MathGame.roundProgress === 10) {
            showRoundComplete('math');
        }
    }
}

// Incrementa progresso per il gioco Tabelline
function incrementTabellineProgress() {
    if (!TabellineGame.roundProgress) TabellineGame.roundProgress = 0;
    if (TabellineGame.roundProgress < 10) {
        TabellineGame.roundProgress++;
        updateRoundProgress('tabelline');

        // Reset della coda delle domande sbagliate e del contatore a ogni nuovo round
        if (TabellineGame.roundProgress === 1) {
            TabellineGame.questionsAsked = 0;
            TabellineGame.wrongQuestions = [];
        }

        if (TabellineGame.roundProgress === 10) {
            showRoundComplete('tabelline');
        }
    }
}

// Incrementa progresso per il gioco di Lettere
function incrementLettersProgress() {
    if (!LettersGame.roundProgress) LettersGame.roundProgress = 0;
    if (LettersGame.roundProgress < 10) {
        LettersGame.roundProgress++;
        updateRoundProgress('letters');

        if (LettersGame.roundProgress === 10) {
            showRoundComplete('letters');
        }
    }
}

// Incrementa progresso per il gioco di Logica
function incrementLogicProgress() {
    if (!LogicGame.roundProgress) LogicGame.roundProgress = 0;
    if (LogicGame.roundProgress < 10) {
        LogicGame.roundProgress++;
        updateRoundProgress('logic');

        if (LogicGame.roundProgress === 10) {
            showRoundComplete('logic');
        }
    }
}

// Incrementa progresso per il gioco Scopri la Parola
function incrementImageGuessProgress() {
    if (!ImageGuessGame.roundProgress) ImageGuessGame.roundProgress = 0;
    if (ImageGuessGame.roundProgress < 10) {
        ImageGuessGame.roundProgress++;
        updateRoundProgress('imageguess');

        if (ImageGuessGame.roundProgress === 10) {
            showRoundComplete('imageguess');
        }
    }
}

// Incrementa progresso per il gioco Inglese
function incrementEnglishProgress() {
    if (!EnglishGame.roundProgress) EnglishGame.roundProgress = 0;
    if (EnglishGame.roundProgress < 10) {
        EnglishGame.roundProgress++;
        updateRoundProgress('english');

        if (EnglishGame.roundProgress === 10) {
            showRoundComplete('english');
        }
    }
}

// Resetta round quando si inizia un nuovo gioco
function resetRound(gameType) {
    const game = gameType === 'math' ? MathGame :
                 gameType === 'tabelline' ? TabellineGame :
                 gameType === 'letters' ? LettersGame :
                 gameType === 'logic' ? LogicGame :
                 gameType === 'imageguess' ? ImageGuessGame :
                 gameType === 'english' ? EnglishGame : null;

    game.roundNumber = 1;
    game.roundProgress = 0;
    updateRoundProgress(gameType);
}

// Inizializza il sistema quando il DOM è pronto
window.addEventListener('DOMContentLoaded', function() {
    // Aggiungi proprietà round agli oggetti di gioco
    if (typeof MathGame !== 'undefined') {
        MathGame.roundNumber = 1;
        MathGame.roundProgress = 0;
    }

    if (typeof TabellineGame !== 'undefined') {
        TabellineGame.roundNumber = 1;
        TabellineGame.roundProgress = 0;
    }

    if (typeof LettersGame !== 'undefined') {
        LettersGame.roundNumber = 1;
        LettersGame.roundProgress = 0;
    }

    if (typeof LogicGame !== 'undefined') {
        LogicGame.roundNumber = 1;
        LogicGame.roundProgress = 0;
    }

    if (typeof ImageGuessGame !== 'undefined') {
        ImageGuessGame.roundNumber = 1;
        ImageGuessGame.roundProgress = 0;
    }

    if (typeof EnglishGame !== 'undefined') {
        EnglishGame.roundNumber = 1;
        EnglishGame.roundProgress = 0;
    }

    // Override funzioni init per resettare il round
    setTimeout(function() {
        if (typeof initMathGame !== 'undefined') {
            const originalInitMathGame = initMathGame;
            window.initMathGame = function() {
                originalInitMathGame();
                resetRound('math');
            };
        }

        if (typeof initTabellineGame !== 'undefined') {
            const originalInitTabellineGame = initTabellineGame;
            window.initTabellineGame = function() {
                originalInitTabellineGame();
                resetRound('tabelline');
            };
        }

        if (typeof initLettersGame !== 'undefined') {
            const originalInitLettersGame = initLettersGame;
            window.initLettersGame = function() {
                originalInitLettersGame();
                resetRound('letters');
            };
        }

        if (typeof initLogicGame !== 'undefined') {
            const originalInitLogicGame = initLogicGame;
            window.initLogicGame = function() {
                originalInitLogicGame();
                resetRound('logic');
            };
        }

        if (typeof initImageGuessGame !== 'undefined') {
            const originalInitImageGuessGame = initImageGuessGame;
            window.initImageGuessGame = function() {
                originalInitImageGuessGame();
                resetRound('imageguess');
            };
        }

        if (typeof initEnglishGame !== 'undefined') {
            const originalInitEnglishGame = initEnglishGame;
            window.initEnglishGame = function() {
                originalInitEnglishGame();
                resetRound('english');
            };
        }

        console.log('✅ Sistema a Round inizializzato');
    }, 100);
});
