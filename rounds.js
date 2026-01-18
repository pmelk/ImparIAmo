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

    // Per inglese usa roundTotalQuestions, per altri giochi usa 10
    const totalQuestions = (gameType === 'english' && game.roundTotalQuestions)
        ? game.roundTotalQuestions
        : 10;

    const percentage = (progress / totalQuestions) * 100;

    // Aggiorna UI
    const currentEl = document.getElementById(`${gameType}-round-current`);
    const numberEl = document.getElementById(`${gameType}-round-number`);
    const progressFill = document.getElementById(`${gameType}-progress-fill`);

    if (currentEl) currentEl.textContent = progress;
    if (numberEl) numberEl.textContent = game.roundNumber || 1;

    if (progressFill) {
        progressFill.style.width = percentage + '%';

        // Animazione completamento
        if (progress === totalQuestions) {
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
    const totalQuestions = EnglishGame.roundTotalQuestions || 10;

    if (EnglishGame.roundProgress < totalQuestions) {
        EnglishGame.roundProgress++;
        updateRoundProgress('english');

        if (EnglishGame.roundProgress === totalQuestions) {
            showEnglishRoundComplete();
        }
    }
}

// Mostra completamento round per gioco Inglese con statistiche
function showEnglishRoundComplete() {
    const correct = EnglishGame.roundCorrectAnswers;
    const wrong = EnglishGame.roundWrongAnswers;
    const total = correct + wrong;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Determina il messaggio in base alla percentuale
    let emoji = '';
    let title = '';
    let encouragement = '';
    let bonusPoints = 0;

    if (percentage === 100) {
        emoji = '🌟🎊🏆';
        title = 'PERFETTO!!!';
        encouragement = 'Hai risposto correttamente a TUTTE le domande!<br>Sei un vero campione di inglese! 🌟';
        bonusPoints = EnglishGame.roundNumber * 100; // Bonus extra per 100%
    } else if (percentage >= 90) {
        emoji = '🎉✨';
        title = 'ECCELLENTE!';
        encouragement = 'Quasi perfetto! Continua così!';
        bonusPoints = EnglishGame.roundNumber * 75;
    } else if (percentage >= 80) {
        emoji = '👏🌟';
        title = 'OTTIMO LAVORO!';
        encouragement = 'Hai fatto davvero bene!';
        bonusPoints = EnglishGame.roundNumber * 60;
    } else if (percentage >= 70) {
        emoji = '👍';
        title = 'BRAVO!';
        encouragement = 'Buon lavoro, continua a esercitarti!';
        bonusPoints = EnglishGame.roundNumber * 50;
    } else if (percentage >= 60) {
        emoji = '💪';
        title = 'BEN FATTO!';
        encouragement = 'Stai migliorando, continua così!';
        bonusPoints = EnglishGame.roundNumber * 40;
    } else {
        emoji = '📚';
        title = 'CONTINUA A PROVARE!';
        encouragement = 'Ogni errore è un\'opportunità per imparare!';
        bonusPoints = EnglishGame.roundNumber * 30;
    }

    updateUserPoints(bonusPoints, 'english');

    const message = `
        ${emoji}<br><br>
        <strong>${title}</strong><br><br>
        Round ${EnglishGame.roundNumber} Completato!<br><br>
        <div style="font-size: 3em; font-weight: bold; color: #ffd93d; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            ${percentage}%
        </div>
        <br>
        ${correct} corrette su ${total}<br><br>
        ${encouragement}<br><br>
        🏆 Bonus Round: +${bonusPoints} punti!<br><br>
        🌟 Inizia il Round ${EnglishGame.roundNumber + 1}!
    `;

    showCelebration(message);

    // Avanza al prossimo round dopo 4 secondi (più tempo per leggere)
    setTimeout(() => {
        EnglishGame.roundNumber++;
        EnglishGame.roundProgress = 0;
        EnglishGame.roundCorrectAnswers = 0;
        EnglishGame.roundWrongAnswers = 0;

        // Reset array domande già chieste per il nuovo round
        EnglishGame.askedThisRound = [];

        updateRoundProgress('english');

        // Nascondi celebration
        const celebration = document.getElementById('english-celebration');
        if (celebration) {
            celebration.classList.add('hidden');
        }

        // Torna alla selezione tema per scegliere di nuovo
        document.getElementById('english-game-area').classList.add('hidden');
        document.getElementById('english-topic-selector').classList.remove('hidden');
        EnglishGame.currentTopic = null;
    }, 4000);
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
