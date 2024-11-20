import { Injectable } from '@angular/core';
import { WORDS } from '../data/word-list';

@Injectable({
  providedIn: 'root',
})

export class GameService {
  private words = [...WORDS];
  private currentWordIndex = 0;

  getRandomWord(): { scrambled: string; original: string; hint: string } {
    if (!this.words.length) {
      throw new Error('No words available.');
    }

    const wordData = this.words[this.currentWordIndex];
    const scrambled = wordData.word.split('').sort(() => Math.random() - 0.5).join('');
    
    return {
      scrambled,
      original: wordData.word,
      hint: wordData.hint,
    };
  }

  validateGuess(guess: string, original: string): boolean {
    return guess.trim().toLowerCase() === original.toLowerCase();
  }

  moveToNextWord(): boolean {
    if (this.currentWordIndex + 1 < this.words.length) {
      this.currentWordIndex++;
      return true;
    }
    return false; 
  }
}
