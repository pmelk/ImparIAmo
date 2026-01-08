# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ImparIAmo is an educational web application for children aged 4-10, featuring four interactive games: Math (Matematica Magica), Letters (Caccia alle Parole), Image Guess (Scopri la Parola), and Logic (Sfida di Logica). The application is a standalone HTML/CSS/JavaScript project with no build process or external dependencies.

## Running the Application

Simply open `index.html` in a modern web browser. No build step, server, or package installation required.

## Architecture

### File Structure

- **index.html** - Single HTML file containing all game screens and UI elements
- **styles.css** - All styling, animations, and responsive design
- **app.js** (~7600 lines) - Main application logic containing all three games
- **rounds.js** - Round management system (10 questions per round with progress bar)
- **temporal_sequence.js** - Data and logic for "Prima o Dopo" temporal sequence game
- **italian_words.js** - Italian word vocabulary data for the Letters game

### State Management

The application uses a global `GameState` object for managing:
- `users`: Array of user profiles stored in localStorage
- `currentUser`: Currently selected user ID
- `currentAge`: Selected age (4-10 years)
- `screens`: References to DOM elements for each screen

Each game (Math, Letters, ImageGuess, Logic) has its own state object:
- `MathGame` - tracks questions, streak, correct/wrong answers, session points
- `LettersGame` - tracks current word, available letters, constructed word, found words
- `ImageGuessGame` - tracks current word, emoji, available letters, constructed word, correct answers, session points, round progress
- `LogicGame` - tracks question type, correct answers, session points, game type

### Screen Flow

1. **User Selection Screen** - Select or create user profile
2. **Age Selection Screen** - Choose age (4-10 years)
3. **Subject Selection Screen** - Choose Math, Letters, ImageGuess, or Logic
4. **Game Screen** - Play the selected game
5. Navigation back uses `showScreen()` function

### Data Persistence

All user data is stored in browser localStorage under key `imapriamo_users`:
- User profiles with names and avatar associations
- Total points accumulated across all games
- No server-side storage or external APIs

### Round System (rounds.js)

Each game implements a 10-question round system:
- Progress bar advances 10% per correct answer
- Bonus points awarded on round completion (Round 1: +50, Round 2: +100, etc.)
- Functions: `updateRoundProgress()`, `showRoundComplete()`, `resetRound()`
- Each game has `roundNumber` and `roundProgress` properties

### Audio System

Custom Web Audio API implementation (`AudioSystem` object in app.js):
- `playCorrect()` - Ascending C major triad (C-E-G) using sine wave
- `playWrong()` - Descending glissando using sawtooth wave
- `playCelebration()` - 6-note festive sequence
- All sounds generated synthetically, no audio files needed

## Game Logic Details

### Math Game (Matematica Magica)

Located in app.js starting at line ~190. Key features:
- Age-adaptive difficulty (4-5: 0-10, 6-7: 0-20, 8-10: 0-100)
- Five operation types: addition, subtraction, multiplication (8+), division without remainder (8+), division with remainder (8+)
- Operations selected via checkbox panel at game start
- Streak bonus system: +5 points for consecutive correct answers
- Operation selection stored in `MathGame.selectedOperations` array

### Letters Game (Caccia alle Parole)

Located in app.js starting at line ~506. Key features:
- Word composition from provided letters
- Age-appropriate vocabulary from `italian_words.js`
- Extra "noise" letters added for challenge
- Points scale by word length (1 point for 3 letters, 2 for 4 letters, etc.)
- Uses Set to track `wordsFound` and prevent duplicates
- Celebration every 3 words completed

### ImageGuess Game (Scopri la Parola)

Located in app.js starting at line ~6787. Key features:
- User sees an emoji and must guess the word by selecting letters
- Age-appropriate emoji-word pairs organized by age groups with 50+ words each
- Available letters include all needed letters + 4-5 random "noise" letters
- Auto-submit when word length matches target (intelligent UX)
- Fixed 10 points per correct word
- Auto-advance to next image after 2.5 seconds on success
- Auto-clear wrong attempts after 1.5 seconds
- Integrates with round system (10 words per round)
- Emoji displayed at 120px with scale-in animation (`.emoji-display` class)

**Key Functions:**
- `initImageGuessGame()` - Initialize game state and first question
- `generateImageQuestion()` - Select random word/emoji for current age group, shuffle letters
- `displayImageQuestion()` - Render emoji and letter tiles
- `selectImageLetter(index)` - Add letter to construction, trigger auto-submit when complete
- `checkImageWord()` - Validate answer, award points, advance or clear
- `clearImageWord()` - Reset constructed word and letter selections
- `updateImageGuessStats()` - Update UI stats

**Data Structure:**
```javascript
imageWordsByAge = {
    ages_4_5: [{ word: 'CASA', emoji: '🏠' }, ...],  // 52 simple words (3-5 letters)
    ages_6_7: [{ word: 'SCUOLA', emoji: '🏫' }, ...],  // 52 medium words (5-7 letters)
    ages_8_10: [{ word: 'COMPUTER', emoji: '💻' }, ...]  // 55 complex words (7-12 letters)
}
```

**Age Mapping:**
- Ages 4-5: `ages_4_5` - Simple words like CASA, GATTO, SOLE, MELA
- Ages 6-7: `ages_6_7` - Medium words like SCUOLA, GELATO, TRENO, CHITARRA
- Ages 8-10: `ages_8_10` - Complex words like COMPUTER, DINOSAURO, ARCOBALENO, RINOCERONTE

### Logic Game (Sfida di Logica)

Located in app.js starting at line ~6317. Contains 11 different game types:
1. **sequence** - Number sequences (e.g., 2, 4, 6, ?)
2. **patterns** - Visual patterns with shapes
3. **comparison** - Greater/less than, double/half
4. **oddOneOut** - Find the different element (text-based)
5. **houseRiddle** - "Who lives where?" deductive puzzles (8-10 years)
6. **mysteryObject** - Guess object from progressive clues
7. **visualOddOut** - Find different element in emoji grid
8. **visualSequence** - Complete emoji pattern sequences
9. **associations** - Match logically related items (8-10 years)
10. **advancedOddOneOut** - Complex criteria-based odd-one-out (shapes, habitat, etc.)
11. **temporalSequence** - "Prima o Dopo" chronological ordering

Game type selection is age-dependent (see `generateLogicQuestion()` at line ~6332).

### Temporal Sequence Game

Defined in `temporal_sequence.js`. Three difficulty levels:
- Level 1 (4-6 years): Choose between 2 actions (what comes first?)
- Level 2 (6-8 years): Order 3 actions in sequence
- Level 3 (8-10 years): Order 4 actions in complete process

Uses interactive clicking system where user clicks actions in chronological order.

## Key Functions

### Navigation
- `showScreen(screenName)` - Switch between screens
- `startGame(subject)` - Initialize selected game ('math', 'letters', 'imageguess', 'logic')

### User Management
- `loadUsers()` / `saveUsers()` - localStorage persistence
- `getCurrentUser()` - Get current user object
- `updateUserPoints(points)` - Add points to current user
- `updatePointsDisplay()` - Refresh points in UI

### Game Initialization
- `initMathGame()` - Reset math game state
- `initLettersGame()` - Generate new word puzzle
- `initImageGuessGame()` - Initialize image guess game with first emoji/word
- `initLogicGame()` - Generate first logic question

### Feedback
- `playSound(type)` - Play 'correct', 'wrong', or 'celebration' sound
- `showCelebration(message)` - Display animated celebration overlay
- `getRandomPositiveFeedback()` - Return encouraging message

## Development Notes

### Adding New Logic Game Types
1. Add game type string to `gameTypes` array in `generateLogicQuestion()` (line ~6336)
2. Add corresponding case in switch statement (line ~6352)
3. Implement `generate[GameType]Game()` function
4. Update game type age restrictions as needed

### Modifying Age Difficulty
Age-specific logic is scattered throughout `generateLogicQuestion()` and individual game generators. Search for `GameState.currentAge` or `age <=` conditions.

### Styling
All CSS is in `styles.css` including:
- Responsive breakpoints for mobile/tablet
- Animation keyframes (@keyframes)
- Game-specific classes (`.math-game`, `.letters-game`, `.logic-game`)

### Browser Compatibility
Requires modern browser features:
- ES6 JavaScript (const, let, arrow functions, template literals)
- Web Audio API
- localStorage API
- CSS Grid and Flexbox
