import {NgModule} from '@angular/core';
import {UserPipe} from './user/user';
import {ThumbnailPipe} from './thumbnail/thumbnail';
import {ReversePipe} from './reverse/reverse';
import {TimePipe} from './time/time';

@NgModule({
  declarations: [
    UserPipe,
    ThumbnailPipe,
    ReversePipe,
    TimePipe],
  imports: [],
  exports: [
    UserPipe,
    ThumbnailPipe,
    ReversePipe,
    TimePipe],
})
export class PipesModule {
}
