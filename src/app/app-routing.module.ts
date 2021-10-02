import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './shared/question/question.component';
import { RoutesRecognized } from '@angular/router';

 const routes: Routes = [
{path: 'question 1', component: QuestionComponent},
{path: 'question 2', component: QuestionComponent},
{path: 'question 3', component: QuestionComponent},
{path: 'question 4', component: QuestionComponent},

 ]
@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
