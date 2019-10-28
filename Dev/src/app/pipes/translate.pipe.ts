import { TranslationService } from './../services/translation.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate',
        pure: false })

export class TranslatePipe implements PipeTransform {

    constructor(public _trans: TranslationService) { }

    transform(el: string): any {
        const transArray = Object.keys(this._trans.lang);
        const valueArray = Object.values(this._trans.lang);
        const positionOfElement = transArray.indexOf(el);
        return valueArray[positionOfElement];
    }
}