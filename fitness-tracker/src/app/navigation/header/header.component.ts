import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
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

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.authChange.subscribe(authStatus => {
            this.isAuth = authStatus;
        });
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    onToggleSidenav() {
        this.sidenavToggle.emit();
    }
}
