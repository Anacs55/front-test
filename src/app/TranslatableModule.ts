import { TranslateService } from "@ngx-translate/core";

export class TranslatableModule {
    constructor(
        private readonly translate: TranslateService,
    ) {
        this.translate.addLangs(['en', 'es']);
        this.translate.setDefaultLang('es');
        this.translate.use(this.translate.getBrowserLang() || this.translate.defaultLang);
    }
}