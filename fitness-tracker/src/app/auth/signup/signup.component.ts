import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from "../auth.service";
import {UIService} from "../../shared/ui.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date | undefined;
  isLoading = false;
  private loadingSubs: Subscription = new Subscription();

  constructor(private authService: AuthService, private uiService: UIService) {
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading=>{
      this.isLoading = isLoading
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnDestroy() {
    //For all subs
    if(this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
