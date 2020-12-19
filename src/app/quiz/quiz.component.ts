import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
   pointer: number;
   score: number;
  colors: string[];
  selected: string[];
  constructor() { }

  // from db
  QList = ["What's the biggest animal in the world? \n  Give 3 animals How many minutes in a game of rugby league?","What does He stand for on the periodic table?","How many minutes in a game of rugby league?","Who did Anne Hathaway play in Les Miserables?"]
  QAnswers = [["They probably got my blood sample mixed up. I, uh, dropped your blood sample","They probably got my blood sample mixed up. I, uh, dropped your blood sample","They probably got my blood sample mixed up.","They probably got my blood sample mixed up. I, uh, dropped your blood sample","They probably got my blood sample mixed up."],["1","2","3","4","5"],["1","2","3","4","5"],["1","2","3","4","5"]]
  QDecision = [[2],[2],[1],[1],[1]]
  
  Scoring() {

    if (this.selected[1] != "") return 1
    else return 0
  }


  go() {
    // animation
    this.colors = ["","","","",""] 
    for ( let s of this.QDecision[this.pointer] ) { this.colors[s] = "success"; }
    
    // after 1 second
    setTimeout(() => 
{
  for ( let s of this.QDecision[this.pointer] ) { this.colors[s] = ""; }
  this.score = this.score + this.Scoring()
  
  if(this.pointer+1 < this.QList.length)  {
    // initialize for next question
    this.colors = ["","","","",""]
    this.selected= ["","","","",""]
    this.pointer = this.pointer + 1 
  }
  else {
    window.location.href = "/other/" + this.score.toString();
  }
},
1500);
    
  
  }

  selectAnswer(q:number) {
    if (this.selected[q] == "") this.selected[q] = "blue"
    else if (this.selected[q] == "blue") this.selected[q] = ""
  }

  ngOnInit() {
    this.pointer = 0
    this.score = 0
    this.colors = ["","","","",""]
    this.selected= ["","","","",""]
    
  }

}
