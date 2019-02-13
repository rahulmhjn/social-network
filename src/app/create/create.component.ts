import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  editorConfig:any;
  title:string;
  Content:string;
  @Output('postCreated') postCreated = new EventEmitter();

  constructor() { 
    this.editorConfig={
      "editable": true,
      "spellcheck": true,
      "height": "auto",
      "minHeight": "10",
      "width": "auto",
      "minWidth": "0",
      "translate": "yes",
      "enableToolbar": true,
      "showToolbar": true,
      "placeholder": "Enter text here...",
      "imageEndPoint": "",
      "toolbar": [
          ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
          ["fontName", "fontSize", "color"],
          ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
          ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
          ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
          ["link", "unlink", "image", "video"]
      ]
    }
  }

  ngOnInit() {
  }

  createPost(){

    firebase.firestore().settings({
      timestampsInSnapshots:true
    });

    firebase.firestore().collection("posts").add({
      title: this.title,
      Content: this.Content,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: firebase.auth().currentUser.uid, 
    }).then((data)=>{
      console.log(data);
      this.postCreated.emit();
    }).catch((error)=>{
      console.log(error);
    })
  }

}
