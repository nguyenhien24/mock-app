import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from 'src/app/shared/question/question.component';
import { HomeComponent } from 'src/app/themes/home/home.component';
import { LoginComponent } from 'src/app/themes/login/login.component';
import { LogoutComponent } from 'src/app/themes/logout/logout.component';
import { RegisterComponent } from 'src/app/themes/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'question', component: QuestionComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
