import { Subject } from "rxjs";

export interface IAuthService {

}

export abstract class AuthService<T> extends Subject<T> {

    protected abstract onToken(res: any, err: any): void;

    protected addScript(id: string, src: string, onload?: () => void) {
        var js, fjs = document.getElementsByTagName('script')[0];
        if (document.getElementById(id)) return;
        js = document.createElement('script');
        js.id = id;
        js.src = src;
        js.async = true;
        js.defer = true;
        if (onload) js.onload = onload;
        fjs?.parentNode?.insertBefore(js, fjs);
    }
}