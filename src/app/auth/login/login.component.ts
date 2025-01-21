import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './login.component.html',
    styleUrl: '../auth-form.scss',
    animations: [
        trigger('errorAnimation', [
            transition(':enter', [
                style({ height: '0', opacity: 0, overflow: 'hidden' }),
                animate('300ms ease-out', style({ height: '*', opacity: 1 }))
            ]),
            transition(':leave', [animate('300ms ease-in', style({ height: '0', opacity: 0, overflow: 'hidden' }))])
        ])
    ]
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;
    showPassword: boolean = false;

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required])
        });
    }

    public togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    public onSubmit(): void {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            console.log('Logging in with:', { email, password });
            // Dodaj logikę logowania
        }
    }
}
