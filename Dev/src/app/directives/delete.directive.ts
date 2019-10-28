import { Observable, Subject, interval } from 'rxjs';
import { Directive, HostListener, EventEmitter, Output } from '@angular/core';
import { takeUntil, tap, filter } from 'rxjs/operators';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  @Output() holdTime: EventEmitter<number> = new EventEmitter();

  state: Subject<string> = new Subject();

  cancel: Observable<string>;

  constructor() {
    this.cancel = this.state.pipe(
      filter(v => v === 'cancel'),
      tap(v => {
        console.log('stopped hold');
        this.holdTime.emit(0);
      })
    );
   }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel');
  }

  @HostListener('mousedown', ['$event'])
  onHold() {
    console.log('Started hold');

    this.state.next('start');

    const n = 100;

    interval(n).pipe(
      takeUntil(this.cancel),
      tap(v => {
        this.holdTime.emit(v * n);
      })
    )
    .subscribe();

  }

}
