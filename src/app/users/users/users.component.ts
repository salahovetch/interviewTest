import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataSource: any;
  displayedColumns: any;
  showDeleteSuccess = false;
  addMode = false;
  addUserForm: FormGroup;
  addSuccess = false;
  userToUpdate;
  updateUserForm: FormGroup;
  updateMode = false;
  updateSuccess = false;
  addedShoot;
  addedShootMode = false;
  updatedShoot;
  updateShootMode = false;
  constructor(private userServ: UserService, private route: Router) { }
  ngOnInit(): void {

    this.getAllUsers()
    this.addUserForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      gender: new FormControl('male'),
      status: new FormControl('active'),
    });

    this.updateUserForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      gender: new FormControl(null),
      status: new FormControl(null),
    });
  }


  getAllUsers() {
    this.userServ.getAllUsers().subscribe({
      next: (response) => {
        this.displayedColumns = ['name', 'email', 'gender', 'status', 'viewPosts', 'edit', 'delete'];
        this.dataSource = response;
      },
      error: (e) => {
        console.log('no users exist');
      }
    }

    )
  }


  delete(user) {
    this.userServ.deleteUser(user.id).subscribe({
      next: (response) => {
        this.showDeleteSuccess = true;

        setTimeout(() => {
          this.showDeleteSuccess = false;
          this.getAllUsers()
        }, 1500);

      },
      error: (e) => {
        console.log('error in delete');
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

  addUser() {
    this.userServ.addUser(this.addUserForm.value).subscribe({
      next: (response) => {
        this.addedShootMode = true;
        this.addedShoot = response;
        this.addSuccess = true;
        this.addUserForm.reset()
        setTimeout(() => {
          this.addMode = false;
          this.addedShootMode = false;
          this.addedShoot = null;
          this.addSuccess = false;
          this.getAllUsers()
        }, 3000);

      },
      error: (e) => {
        console.log('err');
      }
    }

    )


  }


  openUpdateDialog(user) {
    this.userToUpdate = user;
    this.updateMode = true;
    this.updateUserForm.get("id").setValue(this.userToUpdate.id)
    this.updateUserForm.get("name").setValue(this.userToUpdate.name)
    this.updateUserForm.get("email").setValue(this.userToUpdate.email)
    this.updateUserForm.get("gender").setValue(this.userToUpdate.gender)
    this.updateUserForm.get("status").setValue(this.userToUpdate.status)
  }
  closeUpdateDilog() {
    this.updateMode = false;
    this.userToUpdate = null
    this.updateSuccess = false;
  }

  updateUser() {
    this.userServ.editUser(this.updateUserForm.value, this.userToUpdate.id).subscribe({
      next: (response) => {
        this.updateShootMode = true;
        this.updatedShoot = response;
        this.updateSuccess = true;
        this.updateUserForm.reset()
        setTimeout(() => {
          this.updateMode = false
          this.updateShootMode = false;
          this.updateSuccess = false;
          this.updatedShoot = null;
          this.getAllUsers()
        }, 2000);

      },
      error: (e) => {
        console.log('err');
      }
    }

    )

  }

  openUserPosts(user) {
    this.route.navigate(["posts/" + user.id]);
  }


  
}
