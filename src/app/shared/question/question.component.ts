import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  order: any;
  previous: any;
  next: any;
  question: any;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.order = params['order'] ?? 1;
    });
  }
  check() {}
  ngOnInit(): void {}
  ngDoCheck() {
    const questions = [
      {
        _id: '612c8029415565e43028b2ed',
        question: 'How many people are there ?',

        answer1: 'I think !',
        answer2: 'Fighting !',
        answer3: "No, It isn't",
        answer4: 'There are 4 people.',
        correctanswer: 'There are 4 people.',
      },
      {
        _id: '612c8039415565e43028b2f0',
        question: 'What are you doing ?',
        answer1: 'I am going to FPT',
        answer2: 'Here !',
        answer3: 'Yes, I am',
        answer4: 'Say oh yeah !',
        correctanswer: 'I am going to FPT',
      },
      {
        _id: '612c808b415565e43028b2f5',
        question: 'What time is it???',
        answer1: "I don't know",
        answer2: 'Right !',
        answer3: "No, It isn't",
        answer4: '12:30',
        correctanswer: '12:30',
      },
      {
        _id: '612c80c2415565e43028b2fa',
        question: 'How are you ?',
        answer1: "I don't know",
        answer2: "I'm fine. Thank !",
        answer3: 'No problem ',
        answer4: 'Sure !',
        correctanswer: "I'm fine. Thank !",
      },
    ];
    this.next = { order: Number(this.order) + 1 };
    this.previous = { order: Number(this.order) - 1 };
    const index = Number(this.order) - 1; // cau hoi 1 nhung nam o vtri 0 cua mang
    this.question = questions[index];
    console.log(this.question);
  }
}
