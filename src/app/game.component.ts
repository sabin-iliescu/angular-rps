import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreDisplayComponent } from './score-display.component';

@Component({
  selector: 'game-component',
  templateUrl: './game.component.html',
  imports: [CommonModule, ScoreDisplayComponent],
  standalone: true,
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  choices = ['Rock', 'Paper', 'Scissors'];
  playerChoice: string | undefined;
  computerChoice: string | undefined;
  result: string | undefined;

  play(choice: string): void {
    this.playerChoice = choice;
    this.computerChoice = this.getRandomChoice();
    this.result = this.determineWinner(this.playerChoice, this.computerChoice);
  }

  getRandomChoice(): string {
    const randomIndex = Math.floor(Math.random() * this.choices.length);
    return this.choices[randomIndex];
  }

  determineWinner(player: string, computer: string): string {
    if (player === computer) return "It's a draw!";
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'You win!';
    } else {
      return 'You lose!';
    }
  }

  resetGame(): void {
    this.playerChoice = undefined;
    this.computerChoice = undefined;
    this.result = undefined;
  }

  handleResetValues(event: boolean) {
    if (event) {
      this.resetGame();
    }
  }
}
