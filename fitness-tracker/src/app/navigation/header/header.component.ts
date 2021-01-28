import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../auth/Auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() sidenavToggle = new EventEmitter<void>();
    isAuth = false;
    authSubscription = new Subscription();

    constructor(private authService: AuthService) {

    }

    ngOnInit(): void {
        this.authSubscription = this.authService.authChange.subscribe(authStatus => {
            this.isAuth = authStatus;
        });
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    onToggleSidenav() {
        this.sidenavToggle.emit();
    }
}
