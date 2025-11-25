import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAuthentificated$: Observable<boolean>;

  constructor(private sessionService: SessionService) {
    this.isAuthentificated$ = this.sessionService.isAuthenticated$;
  }

  ngOnInit(): void {}
}
