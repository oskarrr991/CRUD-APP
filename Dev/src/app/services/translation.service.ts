
import { Injectable } from '@angular/core';
import { en, lt } from '../../assets/locale';


@Injectable({
    providedIn: 'root'
  })
  export class TranslationService {

    lans = ['LT', 'EN'];
    selectedLang = 'LT';

    constructor() {}

    public get lang(): any {
        if (this.selectedLang === 'LT') {
            return lt;
        } else {
            return en;
        }
    }

    public set lang(lang: any) {
        this.selectedLang = lang;
        localStorage.setItem('codeBakers_lang', lang);
    }

    public getLocalStorageLang(): string {
        if (localStorage.getItem('codeBakers_lang') === 'LT' || localStorage.getItem('codeBakers_lang') === 'EN') {
            this.selectedLang = localStorage.getItem('codeBakers_lang');
            return this.selectedLang;
        }
        return '';
    }

  }
