import {Subject} from "rxjs/Subject";
import {User} from "./user.model";
import {AuthData} from "./auth-data.model";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {TrainingService} from "../training/training.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UIService} from "../shared/ui.service";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    private user: User | null | undefined;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private snackbar: MatSnackBar,
                private uiService: UIService) {}


    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.authChange.next(true);
                this.isAuthenticated = true;
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.user = null;
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);

        this.afAuth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                this.uiService.loadingStateChanged.next(false);
            })
            .catch((error) => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackbar(error.message, null, 3000);
            });
    }

    login(authData: AuthData) {
        //loading login
        this.uiService.loadingStateChanged.next(true);
        this.afAuth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                this.authChange.next(true)
                this.uiService.loadingStateChanged.next(false);
            })
            .catch((error) => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackbar(error.message, null, 3000);
            });
    }

    logout() {
        this.trainingService.cancelSubscriptions();
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
        this.afAuth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}
