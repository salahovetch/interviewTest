import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  userIdShoot:any;
  displayedColumns;
  dataSource;
  showDeleteSuccess = false;
  showDeleteFail = false;
  addMode = false;
  addPostForm: FormGroup;
  addSuccess = false;
  addedShoot;
  addedShootMode = false;
  addMultiPostForm: FormGroup;
  constructor( private actroute: ActivatedRoute,private userServ: UserService,private fb:FormBuilder) { }
  ngOnInit(): void {
    this.userIdShoot = this.actroute.snapshot.params["id"];
    this.addPostForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
    });
    
    this.getPosts()

    this.addMultiPostForm = this.fb.group({
        posts: this.fb.array([
        this.fb.group({
          title: new FormControl(null,[Validators.required]),
          body:new FormControl(null,[Validators.required]),
        }),
      ]) ,
    })
    
  }


  Posts(): FormArray {
    return this.addMultiPostForm.get("posts") as FormArray
  }

  newPost(): FormGroup {
    return this.fb.group({
      title: new FormControl(null,[Validators.required]),
      body: new FormControl(null,[Validators.required]),
 
    })
  }
  addNewPost() {
    this.Posts().push(this.newPost());
  }

  removePost(index:number) {
    this.Posts().removeAt(index);
  }


  addPOsts(){
    console.log(this.addMultiPostForm.value);
    
  }

  getPosts() {
    this.userServ.getUserPosts(this.userIdShoot).subscribe({
      next: (response) => {
        this.displayedColumns = ['title', 'body','delete'];
        this.dataSource = response;
      },
      error: (e) => {
        console.log('no users exist');
      }
    }

    )
  }


  deletePost(PostId) {
    this.showDeleteFail = false;
    this.userServ.deleteUserPost(this.userIdShoot,PostId).subscribe({
      next: (response) => {
        this.showDeleteSuccess = true;

        setTimeout(() => {
          this.showDeleteSuccess = false;
          this.getPosts()
        }, 1500);

      },
      error: (e) => {
        this.showDeleteFail = true;
      }


    }

    )

  }


  showAddForm() {
    this.addMode = true;
  }
  closeAddForm() {
    this.addMode = false;
  }

  addPost() {
    this.userServ.addUserPost(this.userIdShoot,this.addPostForm.value).subscribe({
      next: (response) => {
        this.addedShootMode = true;
        this.addedShoot = response;
        this.addSuccess = true;
        this.addPostForm.reset()
        setTimeout(() => {
          this.addMode = false;
          this.addedShootMode = false;
          this.addedShoot = null;
          this.addSuccess = false;
          this.getPosts()
        }, 3000);

      },
      error: (e) => {
        console.log('err');
      }
    }

    )


  }
  closeDeleteFailDilog(){
    this.showDeleteFail = false;
  }
  
}
