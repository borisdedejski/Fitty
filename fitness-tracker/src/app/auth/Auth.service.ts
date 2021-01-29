import { Subject } from "rxjs/Subject";
import {User} from "./user.model";
import {AuthData} from "./auth-data.model";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    private user: User | null | undefined;

    constructor(private router: Router, private afAuth: AngularFireAuth) {}

    registerUser(authData: AuthData){
        // @ts-ignore
        this.afAuth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then((result)=>{
                console.log(result);
                this.authSuccessfully();
            })
            .catch((error)=> {
                console.log(error)
            })
    }

    login(authData: AuthData) {
        this.afAuth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then((result)=>{
                this.authSuccessfully();
                this.authChange.next(true)
            })
            .catch((error)=> {
                console.log(error)
            })

    }

    logout() {
        this.user = null;
        this.authChange.next();
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }


    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccessfully(){
        this.isAuthenticated = true;
        this.router.navigate(['/training']);
    }
}
