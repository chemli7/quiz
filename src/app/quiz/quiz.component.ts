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
  disabled: boolean;
  answered: boolean[];
  constructor() { }

  // from db
  QList = ["What's the biggest animal in the world? \n  Give 3 animals How many minutes in a game of rugby league?","What does He stand for on the periodic table?","How many minutes in a game of rugby league?","Who did Anne Hathaway play in Les Miserables?"]
  QAnswers = [["They probably got my blood sample mixed up. I, uh, dropped your blood sample","They probably got my blood sample mixed up. I, uh, dropped your blood sample","They probably got my blood sample mixed up.","They probably got my blood sample mixed up. I, uh, dropped your blood sample","They probably got my blood sample mixed up."],["1","2","3","4","5"],["1","2","3","4","5"],["1","2","3","4","5"]]
  QDecision = [[2,3],[2,3,4],[1],[1],[1]]
  QSelected = [[],[],[],[],[]]
  
  Scoring() {

    if (this.selected[1] != "") return 1
    else return 0
  }

Back() {
  if (this.pointer !=0) {
  this.pointer = this.pointer - 1
  // if answered[pointer] block and show right answers and selected ones
  // else initate colors and selected
  if (this.answered[this.pointer]) {this.block(); this.showRightAnswers(); this.showSelectedAnswers()}
  else { this.newQuestion() } }
}
Next() {
  if (this.pointer + 1!=this.QAnswers.length) {
  this.pointer = this.pointer + 1
  if (this.answered[this.pointer]) {this.block(); this.showRightAnswers(); this.showSelectedAnswers()}
  else { this.newQuestion() } }
  else console.log(this.score)
}
Report() {

}
block(){
  this.disabled = true;
}
release(){
  this.disabled = false;
}

showRightAnswers(){
  // delete past colors
  for (let s of [0,1,2,3,4]) this.colors[s] = "primary"
  // fill right colors
  for ( let s of this.QDecision[this.pointer] ) { this.colors[s] = "success"; }
}

showSelectedAnswers() {
this.selected = this.QSelected[this.pointer]
}


newQuestion() {
  this.colors = ["primary","primary","primary","primary","primary"]
    this.selected= ["","","","",""]
        this.release()
}


  calculScore(){
      var s =0;
        //we assume that the length of QDecisions == QColors
        if (this.intruderExists(this.QDecision[this.pointer],this.selected)){
          return 0
        }else{
          //No intruder => score >= 0
          for ( let i=0;i<this.QDecision[this.pointer].length;i++){
            if( this.selected[this.QDecision[this.pointer][i]] == "blue"){
              s =s+ 1/this.QDecision[this.pointer].length;
            }
          }
        }
    
    console.log(s);
    return s;
  }

  intruderExists(decision:number[],colors:string[]): boolean{
    console.log(decision,colors)


    for (let i=0;i<colors.length;i++){
      if(colors[i]!="" && !decision.includes(i)){
        return true;
      }
    }
    return false;
  }


  go() {
    this.showRightAnswers()
    //this.block()
    // answered
    this.answered[this.pointer] = true;
    //scoring
    this.score = this.score + this.calculScore()
    // saving answers
    this.QSelected[this.pointer] = this.selected

  }

  selectAnswer(q:number) {
    if (this.selected[q] == "") this.selected[q] = "white"
    else if (this.selected[q] == "white") this.selected[q] = ""
    
  }

  ngOnInit() {
    this.pointer = 0
    this.score = 0
    this.colors = ["primary","primary","primary","primary","primary"]
    this.selected= ["","","","",""]
    this.answered = [false,false,false,false,false]
    this.disabled=false
    
  }

}
