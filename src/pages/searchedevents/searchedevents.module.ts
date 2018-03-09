import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchedeventsPage } from './searchedevents';

@NgModule({
  declarations: [
    SearchedeventsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchedeventsPage),
  ],
})
export class SearchedeventsPageModule {}
