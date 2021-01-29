import {Subject} from "rxjs/Subject";
import {User} from "./user.model";
import {AuthData} from "./auth-data.model";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {TrainingService} from "../training/training.service";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    private user: User | null | undefined;

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {
    }

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
        // @ts-ignore
        this.afAuth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    login(authData: AuthData) {
        this.afAuth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                this.authChange.next(true)
            })
            .catch((error) => {
                console.log(error)
            })

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
