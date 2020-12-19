import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
})
export class OtherComponent implements OnInit {
   score: number;
  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe( params => this.score = params["score"] );
  }

  quiz() {
    window.location.href = "/quiz"
  }

  ngOnInit() {}

}
