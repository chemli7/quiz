import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OtherComponent } from './other/other.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizComponent } from './quiz/quiz.component';
import { StatsComponent } from './stats/stats.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'quiz/:year/:course/:school',
    component: QuizComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'other/:score',
    component: OtherComponent
  
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
