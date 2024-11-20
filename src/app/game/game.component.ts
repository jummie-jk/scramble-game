import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  scrambledWord: string = '';
  hint: string = '';
  userGuess: string = '';
  feedback: string = '';
  score: number = 0;
  timer: number = 60; 
  interval: any;
  showHint: boolean = false;
  originalWord: string = ''; 
  
  constructor(private gameService: GameService) {
    this.loadNewWord();
  }

  ngOnInit(): void {

  }

  loadNewWord(): void {
    try {
      const wordData = this.gameService.getRandomWord();
      this.scrambledWord = wordData.scrambled;
      this.originalWord = wordData.original; 
      this.hint = wordData.hint;
      this.userGuess = '';
      this.feedback = '';
    } catch (error) {
      this.feedback = 'No more words available!';
    }
    this.startTimer();
  }


  checkGuess(): void {
    if (!this.userGuess.trim()) {
      this.feedback = 'Please enter a valid guess!';
      return;
    }
    const isCorrect = this.gameService.validateGuess(this.userGuess.trim(), this.originalWord);

    if (isCorrect) {
      this.startTimer()
      this.score++;
      this.feedback = 'Correct! Loading next word...';
      if (!this.gameService.moveToNextWord()) {
        this.feedback = 'You completed the game!';
      } else {
        setTimeout(() => this.loadNewWord(), 1000);
      }
    } else {
      this.feedback = 'Incorrect! Try again.';
    }
  }
  checkGuesss(): void {
    if (!this.userGuess.trim()) {
      this.feedback = 'Please enter a valid guess!';
      return;
    }
  
    const originalWord = this.scrambledWord; 
    const isCorrect = this.gameService.validateGuess(this.userGuess.trim(), originalWord);
    
    if (isCorrect) {
      this.score++;
      this.feedback = 'Correct! Loading next word...';
      if (!this.gameService.moveToNextWord()) {
        this.feedback = 'You completed the game!';
      } else {
        setTimeout(() => this.loadNewWord(), 1000);
      }
    } else {
      this.feedback = 'Incorrect! Try again.';
    }
  }

  validateGuess(guess: string, original: string): boolean {
    return guess.toLowerCase() === original.toLowerCase();
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
        this.feedback = 'Time is up!';
      }
    }, 1000);
  }


}
