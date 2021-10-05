import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  pecentCorrect: any;
  questionForm = new FormGroup({
    answer1: new FormControl(''),
    answer2: new FormControl(''),
    answer3: new FormControl(''),
    answer4: new FormControl(''),
  });
  results: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.order = params['order'] ?? 1;
      this.questionForm.reset();
      if (this.order == 5) {
        this.showResults();
      }
    });
  }
  ngOnInit(): void {}

  ngDoCheck() {
    // console.log(localStorage.getItem('token'));]
   
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
    // console.log(this.results?.[2]);
  }

  onSubmit() {
    let answers = [];
    for (let key in this.questionForm.value) {
      if (this.questionForm.value[key] === true) {
        answers.push(this.question[key]);
      }
    }
    if (answers.length === 1) {
      let isCorrect = answers[0] === this.question.correctanswer;
      this.results[this.order] = {
        isCorrect,
        answer: answers[0],
        correctAnswer: this.question.correctanswer,
      };
    }
    this.router.navigate(['/question'], { queryParams: this.next });
  }

  showResults() {
    let totalCorrect = 0;
    for (var result of this.results) {
      if (result && result.isCorrect === true) {
        totalCorrect++;
      }
    }

    this.pecentCorrect = (totalCorrect / 4) * 100;
  }
}
