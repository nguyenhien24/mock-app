import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  order: any;
  previous: any;
  next: any;
  questions: any;
  question: any;
  pecentCorrect: any;
  questionForm = new FormGroup({
    answer1: new FormControl(''),
    answer2: new FormControl(''),
    answer3: new FormControl(''),
    answer4: new FormControl(''),
  });
  results: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: APIService
  ) {
    this.apiService.getQuestions().subscribe((res: any) => {
      this.questions = res.sendQuestion;
    });

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
    this.next = { order: Number(this.order) + 1 };
    this.previous = { order: Number(this.order) - 1 };
    const index = Number(this.order) - 1; // cau hoi 1 nhung nam o vtri 0 cua mang
    this.question = this.questions ? this.questions[index] : null;
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
