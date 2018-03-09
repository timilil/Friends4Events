import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {Comment} from '../../interfaces/comment';
import {ViewprofilePage} from '../viewprofile/viewprofile';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  fileID: number;
  commentsArray: any;
  userName: any;
  userID: number;

  comment: Comment = {
    file_id: null,
    comment: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
    this.fileID = this.navParams.get('file_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
    this.comment.file_id = this.fileID;
    console.log(this.fileID);
    this.getCommentsByFileId();
  }

  getCommentsByFileId () {
    this.mediaProvider.getCommentsByFileId(this.fileID).subscribe(response => {
      console.log(response);
      this.commentsArray = response;
      this.commentsArray.map(comment => {
        const userID = comment.user_id;
        console.log(userID);
        //this.allUserIds.push(userID);
        this.mediaProvider.getUsernameByUserId(userID).subscribe(response => {
          console.log(response);
          comment.user = response;
        });
      }/*,
        error => {
          console.log(error);
        },
        () => {
          console.log(this.commentsArray[0].user);
        }*/);
      console.log(this.commentsArray);
    });
  }

  postNewComment(){
    this.mediaProvider.commentEvent(this.comment).subscribe(response => {
      console.log(response);
      this.navCtrl.pop();

      this.navCtrl.push(CommentsPage, {

        file_id: this.fileID
      });
    });
  }

  redirectToUserThatPosted(event, userName, email, userid) {
    this.navCtrl.push(ViewprofilePage, {
      username: userName,
      user_id: userid,
      email: email,
    });
  }

}
