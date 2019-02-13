import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  post:any={};
  postId:string;

  constructor(public activatedRoute : ActivatedRoute) { 
    let postId = this.activatedRoute.snapshot.paramMap.get('postId');
    this.postId = postId;
    firebase.firestore().collection('posts').doc(postId).get().then((docSnapshot)=>{
      this.post = docSnapshot.data();
      console.log(this.post);
    })
  }

  ngOnInit() {
  }

}
