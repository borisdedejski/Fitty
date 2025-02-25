import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
    @Output() closeSidenav = new EventEmitter();
    isAuth = false;
    authSubscription = new Subscription();
    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
            this.isAuth = authStatus;
        });
    }

    onLogout() {
        this.authService.logout();
        this.onClose();
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    onClose() {
        this.closeSidenav.emit();
    }
}
