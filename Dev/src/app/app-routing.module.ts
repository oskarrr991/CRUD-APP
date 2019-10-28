import { MainComponent } from './views/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopicsComponent } from './views/topics/topics.component';
import { TopicComponent } from './views/topic/topic.component';
import { LogoComponent } from './views/logo/logo.component';

const appRoutes: Routes = [
  { path: ':doctagTitle', component: MainComponent},
  { path: ':doctagTitle/:topicId', component: TopicComponent},
  { path: '', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
