import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-display.component.html',
  styleUrls: ['./score-display.component.css']
})
export class ScoreDisplayComponent implements OnChanges {
  @Input() playerChoice: string | undefined;
  @Input() computerChoice: string | undefined;
  @Output() resetValues: EventEmitter<boolean> = new EventEmitter<boolean>();


  playerScore = 0;
  computerScore = 0;
  winner: string = ''; // Assign an initial value to 'winner'

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playerChoice'] && changes['computerChoice']) {
      this.updateScores();
      this.checkForWinner();
    }
  }

  updateScores() {
    const result = this.determineWinner(this.playerChoice ?? '', this.computerChoice ?? '');
    if (result === 'You win!') {
      this.playerScore++;
    } else if (result === 'Computer wins!') {
      this.computerScore++;
    }
    localStorage.setItem('playerScore', this.playerScore.toString());
    localStorage.setItem('computerScore', this.computerScore.toString());
  }

  determineWinner(player: string, computer: string): string {
    if (player === computer) {
      return 'It\'s a tie!';
    } else if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'You win!';
    } else {
      return 'Computer wins!';
    }
  }

  checkForWinner() {
    if (this.playerScore >= 3) {
      this.winner = 'Player';
    } else if (this.computerScore >= 3) {
      this.winner = 'Computer';
    }
  }

  checkScores() {
    if (this.playerScore >= 3 || this.computerScore >= 3) {
      this.resetScores();
    }
  }

  resetScores() {
    this.playerScore = 0;
    this.computerScore = 0;
    localStorage.setItem('playerScore', '0');
    localStorage.setItem('computerScore', '0');
    this.winner = '';
    this.resetValues.emit(true);
}
    

  get savedPlayerScore(): number {
    const playerScore = localStorage.getItem('playerScore');
    return playerScore ? +playerScore : 0;
  }

  get savedComputerScore(): number {
    const computerScore = localStorage.getItem('computerScore');
    return computerScore !== null ? +computerScore : 0;
  }
}