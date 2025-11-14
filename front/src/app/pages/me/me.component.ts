import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import passwordValidator from 'src/utils/password-validator';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  meForm!: FormGroup;

  ngOnInit(): void {
    this.meForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: ['', [Validators.required, passwordValidator]],
    });
  }
}
