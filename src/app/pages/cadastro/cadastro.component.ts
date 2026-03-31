import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <span class="auth-logo">🂡</span>
          <h1>Lucky <span class="text-gold">021</span></h1>
          <p class="text-muted">Crie sua conta e entre no jogo</p>
        </div>
        <form (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-group">
            <label class="form-label">Nome</label>
            <input class="form-input" type="text" [(ngModel)]="name" name="name" placeholder="Seu nome" required id="register-name">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input class="form-input" type="email" [(ngModel)]="email" name="email" placeholder="seu&#64;email.com" required id="register-email">
          </div>
          <div class="form-group">
            <label class="form-label">Senha</label>
            <input class="form-input" type="password" [(ngModel)]="password" name="password" placeholder="Mínimo 8 caracteres" required id="register-password">
          </div>
          @if (error()) {
            <div class="form-error">{{ error() }}</div>
          }
          <button type="submit" class="btn btn-primary btn-large" style="width:100%" [disabled]="loading()" id="register-submit">
            {{ loading() ? '🎲 Criando...' : 'CRIAR CONTA ♠' }}
          </button>
        </form>
        <div class="auth-footer">
          <p>Já tem conta? <a routerLink="/login" class="text-gold">Entrar</a></p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  name = ''; email = ''; password = '';
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router, private toast: ToastService, private title: Title) {
    this.title.setTitle('Cadastro — Lucky 021');
  }

  async onSubmit(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await this.auth.register(this.name, this.email, this.password);
      this.toast.sucesso('🂡 Conta criada! Bem-vindo ao jogo!');
      this.router.navigate(['/']);
    } catch (e: any) {
      this.error.set('Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      this.loading.set(false);
    }
  }
}
