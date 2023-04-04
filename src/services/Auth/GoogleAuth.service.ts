import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthType } from "src/app/auth-providers/AuthType";
import { environment } from "src/environments/environment";
import { AuthService } from "./IAuth";

@Injectable({ providedIn: 'root' })
export class GoogleAuth extends AuthService<string> {
    constructor(
        private translateService: TranslateService,
    ) {
        super();
        // @ts-ignore
        window.googleLogin = this.onToken.bind(this);
    }

    load(element: HTMLElement, authType: AuthType) {
        if (!element) return;
        element.innerHTML = '';

        const dataText: IGogleAuthType = authType === 'login' ? 'signin_with' : 'signup_with';
        const context: IGoogleContext = authType === 'login' ? 'signin' : 'signup';
        const theme: IGoogleTheme = 'filled_blue';
        const size: IGoogleSize = 'medium';
        const locale = this.translateService.currentLang;

        const winRef = window as any;
        if (winRef.google) {
            winRef.google.accounts.id.initialize({
                client_id: environment.googleClientId,
                context,
                ux_mode: 'popup',
                auto_prompt: false,
                locale,
                callback: this.onToken.bind(this),
            });
            winRef.google.accounts.id.renderButton(element, {
                type: 'standard',
                theme: theme,
                size,
                text: dataText,
                shape: 'rectangular',
                logo_alignment: 'left',
                locale,
            });
            return;
        }

        const googleDiv = document.createElement('div');
        googleDiv.id = 'g_id_onload';
        googleDiv.setAttribute('data-client_id', environment.googleClientId);
        googleDiv.setAttribute('data-context', context);
        googleDiv.setAttribute('data-ux_mode', 'popup');
        googleDiv.setAttribute('data-callback', 'googleLogin');
        googleDiv.setAttribute('data-auto_prompt', 'false');
        googleDiv.setAttribute('data-locale', locale);

        const googleLoginDiv = document.createElement('div');
        googleLoginDiv.className = 'g_id_signin';
        googleLoginDiv.setAttribute('data-type', 'standard');
        googleLoginDiv.setAttribute('data-shape', 'rectangular');
        googleLoginDiv.setAttribute('data-theme', theme);
        googleLoginDiv.setAttribute('data-text', dataText);
        googleLoginDiv.setAttribute('data-size', size);
        googleLoginDiv.setAttribute('data-logo_aligment', 'left');
        googleLoginDiv.setAttribute('data-locale', locale);

        element.appendChild(googleDiv);
        element.appendChild(googleLoginDiv);

        this.addScript("googleLogin", "https://accounts.google.com/gsi/client");
    }

    remove(element: HTMLElement) {
        if (!element) return;
        element.innerHTML = '';
    }

    onToken(res: any, err: any) {
        if (err) {
            this.error(err);
            return;
        }
        this.next(res.credential);
    }
}

type IGoogleSize = 'small' | 'medium' | 'large';
type IGoogleTheme = 'outline' | 'filled_blue' | 'filled_black';
type IGogleAuthType = 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
type IGoogleContext = 'signin' | 'signup' | 'use';