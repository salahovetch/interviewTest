import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.userServ.isLoading;

  constructor(private userServ: UserService) {
  }
}
