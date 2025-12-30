
// ===== PRIMA O DOPO - Sequenze Temporali =====
// Gioco per comprendere l'ordine cronologico delle azioni

const temporalSequenceData = [
    // ===== LIVELLO 1: Sequenze Semplici 2 Azioni (4-6 anni) =====
    {
        level: 1,
        type: 'twoChoices',
        question: 'Cosa fai PRIMA?',
        action1: { emoji: '😴', text: 'Dormire' },
        action2: { emoji: '🌅', text: 'Svegliarsi' },
        correctFirst: 0,
        explanation: 'Prima DORMI, poi ti SVEGLI!'
    },
    {
        level: 1,
        type: 'twoChoices',
        question: 'Cosa fai PRIMA?',
        action1: { emoji: '🍽️', text: 'Mangiare' },
        action2: { emoji: '🍳', text: 'Cucinare' },
        correctFirst: 1,
        explanation: 'Prima CUCINI, poi MANGI!'
    },
    {
        level: 1,
        type: 'twoChoices',
        question: 'Cosa fai PRIMA?',
        action1: { emoji: '🌱', text: 'Cresce la pianta' },
        action2: { emoji: '🌾', text: 'Seminare' },
        correctFirst: 1,
        explanation: 'Prima SEMINI, poi la pianta CRESCE!'
    },
    {
        level: 1,
        type: 'twoChoices',
        question: 'Cosa fai PRIMA?',
        action1: { emoji: '👕', text: 'Vestirsi' },
        action2: { emoji: '🛁', text: 'Fare il bagno' },
        correctFirst: 1,
        explanation: 'Prima fai IL BAGNO, poi ti VESTI!'
    },
    {
        level: 1,
        type: 'twoChoices',
        question: 'Cosa fai PRIMA?',
        action1: { emoji: '🏃', text: 'Correre' },
        action2: { emoji: '👟', text: 'Mettere le scarpe' },
        correctFirst: 1,
        explanation: 'Prima METTI LE SCARPE, poi puoi CORRERE!'
    },
    {
        level: 1,
        type: 'twoChoices',
        question: 'Cosa succede PRIMA?',
        action1: { emoji: '🌧️', text: 'Piove' },
        action2: { emoji: '🌈', text: 'Arcobaleno' },
        correctFirst: 0,
        explanation: 'Prima PIOVE, poi esce l\'ARCOBALENO!'
    },

    // ===== LIVELLO 2: Sequenze di 3 Azioni (6-8 anni) =====
    {
        level: 2,
        type: 'threeSequence',
        question: 'Metti in ordine queste azioni:',
        actions: [
            { emoji: '🥐', text: 'Fare colazione', order: 2 },
            { emoji: '🌅', text: 'Svegliarsi', order: 1 },
            { emoji: '🏫', text: 'Andare a scuola', order: 3 }
        ],
        explanation: 'Prima ti SVEGLI, poi fai COLAZIONE, infine vai a SCUOLA!'
    },
    {
        level: 2,
        type: 'threeSequence',
        question: 'Metti in ordine queste azioni:',
        actions: [
            { emoji: '🍕', text: 'Mangiare la pizza', order: 3 },
            { emoji: '🍅', text: 'Raccogliere pomodori', order: 1 },
            { emoji: '👨‍🍳', text: 'Preparare la pizza', order: 2 }
        ],
        explanation: 'Prima RACCOLGI i pomodori, poi PREPARI la pizza, infine la MANGI!'
    },
    {
        level: 2,
        type: 'threeSequence',
        question: 'Metti in ordine queste azioni:',
        actions: [
            { emoji: '🦋', text: 'Diventa farfalla', order: 3 },
            { emoji: '🥚', text: 'Uovo', order: 1 },
            { emoji: '🐛', text: 'Bruco', order: 2 }
        ],
        explanation: 'Prima c\'è l\'UOVO, poi diventa BRUCO, infine FARFALLA!'
    },
    {
        level: 2,
        type: 'threeSequence',
        question: 'Metti in ordine queste azioni:',
        actions: [
            { emoji: '📖', text: 'Leggere il libro', order: 2 },
            { emoji: '📚', text: 'Prendere il libro', order: 1 },
            { emoji: '😴', text: 'Andare a dormire', order: 3 }
        ],
        explanation: 'Prima PRENDI il libro, poi lo LEGGI, infine vai a DORMIRE!'
    },
    {
        level: 2,
        type: 'threeSequence',
        question: 'Metti in ordine queste azioni:',
        actions: [
            { emoji: '🌳', text: 'Albero grande', order: 3 },
            { emoji: '🌱', text: 'Germoglio', order: 1 },
            { emoji: '🌿', text: 'Piantina', order: 2 }
        ],
        explanation: 'Prima spunta il GERMOGLIO, poi cresce la PIANTINA, infine diventa ALBERO!'
    },

    // ===== LIVELLO 3: Sequenze di 4 Azioni (8-10 anni) =====
    {
        level: 3,
        type: 'fourSequence',
        question: 'Metti in ordine l\'intera sequenza:',
        actions: [
            { emoji: '🌅', text: 'Svegliarsi', order: 1 },
            { emoji: '🥐', text: 'Fare colazione', order: 2 },
            { emoji: '🏫', text: 'Andare a scuola', order: 3 },
            { emoji: '🏠', text: 'Tornare a casa', order: 4 }
        ],
        explanation: 'La giornata: SVEGLIARSI → COLAZIONE → SCUOLA → CASA!'
    },
    {
        level: 3,
        type: 'fourSequence',
        question: 'Metti in ordine l\'intera sequenza:',
        actions: [
            { emoji: '🌾', text: 'Mietere il grano', order: 3 },
            { emoji: '🍞', text: 'Mangiare il pane', order: 4 },
            { emoji: '🌱', text: 'Seminare', order: 1 },
            { emoji: '🌿', text: 'Crescita', order: 2 }
        ],
        explanation: 'Dal seme al pane: SEMINARE → CRESCITA → MIETERE → MANGIARE!'
    },
    {
        level: 3,
        type: 'fourSequence',
        question: 'Metti in ordine l\'intera sequenza:',
        actions: [
            { emoji: '🥚', text: 'Uovo', order: 1 },
            { emoji: '🐣', text: 'Pulcino', order: 2 },
            { emoji: '🐔', text: 'Gallina', order: 3 },
            { emoji: '🥚', text: 'Fa l\'uovo', order: 4 }
        ],
        explanation: 'Il ciclo della vita: UOVO → PULCINO → GALLINA → FA L\'UOVO!'
    },
    {
        level: 3,
        type: 'fourSequence',
        question: 'Metti in ordine l\'intera sequenza:',
        actions: [
            { emoji: '☁️', text: 'Nuvole', order: 1 },
            { emoji: '🌧️', text: 'Pioggia', order: 2 },
            { emoji: '💧', text: 'Pozzanghere', order: 3 },
            { emoji: '☀️', text: 'Sole asciuga', order: 4 }
        ],
        explanation: 'Il ciclo della pioggia: NUVOLE → PIOGGIA → POZZANGHERE → SOLE!'
    },
    {
        level: 3,
        type: 'fourSequence',
        question: 'Metti in ordine l\'intera sequenza:',
        actions: [
            { emoji: '🍎', text: 'Raccogliere mele', order: 2 },
            { emoji: '🌸', text: 'Fioritura', order: 1 },
            { emoji: '🥧', text: 'Fare la torta', order: 3 },
            { emoji: '😋', text: 'Mangiare', order: 4 }
        ],
        explanation: 'Dalla fioritura alla torta: FIORITURA → RACCOLTA → CUCINARE → MANGIARE!'
    },

    // ===== Sequenze Quotidiane Aggiuntive =====
    {
        level: 2,
        type: 'threeSequence',
        question: 'Metti in ordine queste azioni:',
        actions: [
            { emoji: '🪥', text: 'Lavare i denti', order: 2 },
            { emoji: '🥐', text: 'Fare colazione', order: 1 },
            { emoji: '🎒', text: 'Prendere lo zaino', order: 3 }
        ],
        explanation: 'Prima COLAZIONE, poi LAVI I DENTI, infine prendi lo ZAINO!'
    },
    {
        level: 2,
        type: 'threeSequence',
        question: 'Metti in ordine queste azioni:',
        actions: [
            { emoji: '🎨', text: 'Dipingere', order: 2 },
            { emoji: '🖌️', text: 'Prendere i pennelli', order: 1 },
            { emoji: '🖼️', text: 'Appendere il quadro', order: 3 }
        ],
        explanation: 'Prima PRENDI i pennelli, poi DIPINGI, infine APPENDI il quadro!'
    }
];

// Funzione per generare gioco "Prima o Dopo"
function generateTemporalSequenceGame() {
    const age = GameState.currentAge;

    // Filtra sequenze in base all'età
    let availableSequences;
    if (age <= 6) {
        availableSequences = temporalSequenceData.filter(s => s.level === 1);
    } else if (age <= 8) {
        availableSequences = temporalSequenceData.filter(s => s.level <= 2);
    } else {
        availableSequences = temporalSequenceData;
    }

    // Seleziona sequenza casuale
    const sequence = availableSequences[Math.floor(Math.random() * availableSequences.length)];

    // Salva dati correnti
    LogicGame.currentSequence = sequence;
    LogicGame.userSequence = [];

    // Crea UI basata sul tipo
    const questionBox = document.querySelector('#logic-question .question-text');
    const interactiveArea = document.getElementById('logic-interactive');

    if (sequence.type === 'twoChoices') {
        generateTwoChoicesUI(sequence, questionBox, interactiveArea);
    } else if (sequence.type === 'threeSequence') {
        generateSequenceUI(sequence, questionBox, interactiveArea, 3);
    } else if (sequence.type === 'fourSequence') {
        generateSequenceUI(sequence, questionBox, interactiveArea, 4);
    }
}

// UI per scelta tra 2 azioni
function generateTwoChoicesUI(sequence, questionBox, interactiveArea) {
    questionBox.innerHTML = '<strong>⏰ ' + sequence.question + '</strong><br>' +
        '<span style="font-size: 16px; color: #666;">Clicca sull\'azione che viene PRIMA</span>';

    interactiveArea.innerHTML = '<div class="temporal-two-choices"></div>';
    const container = interactiveArea.querySelector('.temporal-two-choices');

    [sequence.action1, sequence.action2].forEach((action, index) => {
        const actionDiv = document.createElement('div');
        actionDiv.className = 'temporal-action-card';
        actionDiv.innerHTML = '<div class="temporal-emoji">' + action.emoji + '</div>' +
            '<div class="temporal-text">' + action.text + '</div>';
        actionDiv.onclick = () => checkTwoChoices(index);
        container.appendChild(actionDiv);
    });
}

// UI per sequenze di 3 o 4 azioni
function generateSequenceUI(sequence, questionBox, interactiveArea, count) {
    const instructionText = count === 4 ?
        'Clicca nell\'ordine corretto (1° → 2° → 3° → 4°)' :
        'Clicca nell\'ordine corretto (1° → 2° → 3°)';

    questionBox.innerHTML = '<strong>⏰ ' + sequence.question + '</strong><br>' +
        '<span style="font-size: 16px; color: #666;">' + instructionText + '</span>';

    interactiveArea.innerHTML = '<div class="temporal-sequence-area">' +
        '<div class="temporal-selected-sequence"></div>' +
        '<div class="temporal-available-actions"></div>' +
        '<button id="reset-sequence-btn" class="btn btn-secondary" style="margin-top: 15px;">🔄 Ricomincia</button>' +
        '<button id="check-sequence-btn" class="btn btn-success" style="margin-top: 15px; display: none;">✓ Controlla Sequenza</button>' +
        '</div>';

    const availableContainer = interactiveArea.querySelector('.temporal-available-actions');

    // Mescola le azioni
    const shuffled = [...sequence.actions].sort(() => Math.random() - 0.5);

    shuffled.forEach((action, index) => {
        const actionDiv = document.createElement('div');
        actionDiv.className = 'temporal-action-card draggable';
        actionDiv.dataset.actionIndex = sequence.actions.indexOf(action);
        actionDiv.innerHTML = '<div class="temporal-emoji">' + action.emoji + '</div>' +
            '<div class="temporal-text">' + action.text + '</div>';
        actionDiv.onclick = () => selectSequenceAction(actionDiv, action);
        availableContainer.appendChild(actionDiv);
    });

    // Reset button
    document.getElementById('reset-sequence-btn').onclick = resetSequence;
    document.getElementById('check-sequence-btn').onclick = checkSequence;
}

// Seleziona azione per sequenza
function selectSequenceAction(actionDiv, action) {
    if (actionDiv.classList.contains('used')) return;

    const selectedContainer = document.querySelector('.temporal-selected-sequence');
    const sequence = LogicGame.currentSequence;

    // Aggiungi alla sequenza utente
    LogicGame.userSequence.push(action);

    // Crea card nella zona selezionata
    const selectedCard = document.createElement('div');
    selectedCard.className = 'temporal-action-card selected';
    selectedCard.innerHTML = '<div class="temporal-order-badge">' + LogicGame.userSequence.length + '</div>' +
        '<div class="temporal-emoji">' + action.emoji + '</div>' +
        '<div class="temporal-text">' + action.text + '</div>';
    selectedContainer.appendChild(selectedCard);

    // Marca come usata
    actionDiv.classList.add('used');

    // Mostra bottone controlla se completato
    if (LogicGame.userSequence.length === sequence.actions.length) {
        document.getElementById('check-sequence-btn').style.display = 'inline-block';
    }
}

// Reset sequenza
function resetSequence() {
    LogicGame.userSequence = [];
    document.querySelector('.temporal-selected-sequence').innerHTML = '';
    document.querySelectorAll('.temporal-action-card.draggable').forEach(card => {
        card.classList.remove('used');
    });
    document.getElementById('check-sequence-btn').style.display = 'none';
}

// Controlla scelta tra 2 azioni
function checkTwoChoices(selectedIndex) {
    const sequence = LogicGame.currentSequence;
    const feedbackDiv = document.getElementById('logic-feedback');
    const isCorrect = selectedIndex === sequence.correctFirst;

    if (isCorrect) {
        LogicGame.correctAnswers++;
        if (typeof incrementLogicProgress === 'function') incrementLogicProgress();

        feedbackDiv.className = 'feedback success';
        feedbackDiv.innerHTML = '✅ <strong>Esatto!</strong><br>' +
            '<span style="font-size: 14px;">' + sequence.explanation + '</span>';

        updateUserPoints(20);
        updateLogicStats();

        setTimeout(() => {
            feedbackDiv.classList.add('hidden');
            generateLogicQuestion();
        }, 3500);

    } else {
        LogicGame.wrongAnswers++;

        feedbackDiv.className = 'feedback error';
        feedbackDiv.innerHTML = '❌ <strong>Riprova!</strong><br>' +
            '<span style="font-size: 14px;">Pensa: cosa succede per primo?</span>';

        updateLogicStats();

        setTimeout(() => {
            feedbackDiv.classList.add('hidden');
        }, 2000);
    }

    feedbackDiv.classList.remove('hidden');
}

// Controlla sequenza di 3-4 azioni
function checkSequence() {
    const sequence = LogicGame.currentSequence;
    const userSequence = LogicGame.userSequence;
    const feedbackDiv = document.getElementById('logic-feedback');

    // Controlla se l'ordine è corretto
    let isCorrect = true;
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i].order !== i + 1) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        LogicGame.correctAnswers++;
        if (typeof incrementLogicProgress === 'function') incrementLogicProgress();

        feedbackDiv.className = 'feedback success';
        feedbackDiv.innerHTML = '✅ <strong>Perfetto!</strong><br>' +
            '<span style="font-size: 14px;">' + sequence.explanation + '</span>';

        updateUserPoints(20);
        updateLogicStats();

        setTimeout(() => {
            feedbackDiv.classList.add('hidden');
            generateLogicQuestion();
        }, 4000);

    } else {
        LogicGame.wrongAnswers++;

        feedbackDiv.className = 'feedback error';
        feedbackDiv.innerHTML = '❌ <strong>L\'ordine non è corretto!</strong><br>' +
            '<span style="font-size: 14px;">Prova a pensare cosa succede per primo, secondo, terzo...</span>';

        updateLogicStats();

        setTimeout(() => {
            feedbackDiv.classList.add('hidden');
            resetSequence();
        }, 2500);
    }

    feedbackDiv.classList.remove('hidden');
}
