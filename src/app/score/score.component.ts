import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  template: `<p>Your Score: {{ score }}</p>`,
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  @Input() score: number = 0;
}
