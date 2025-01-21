import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgIf],
    templateUrl: './register.component.html',
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
export class RegisterComponent implements OnInit {
    public signupForm!: FormGroup;

    showPassword: boolean = false;
    showConfirmPassword: boolean = false;

    ngOnInit(): void {
        this.signupForm = new FormGroup(
            {
                username: new FormControl(null, [Validators.required]),
                email: new FormControl(null, [Validators.required, Validators.email]),
                password: new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator]),
                'password-repeat': new FormControl(null, [Validators.required])
            },
            { validators: this.passwordsMatchValidator }
        );
    }

    passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const password = control.value;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[\W_]/.test(password);

        if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
            return { invalidPassword: true };
        }
        return null;
    }

    passwordsMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
        const password = group.get('password')?.value;
        const passwordRepeat = group.get('password-repeat')?.value; // Corrected here

        if (password !== passwordRepeat) {
            return { passwordsMismatch: true };
        }
        return null;
    }

    public togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    public toggleConfirmPasswordVisibility(): void {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
}
