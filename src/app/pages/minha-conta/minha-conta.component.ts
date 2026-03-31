import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-minha-conta',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="account-page page-enter">
      <div class="container">
        <div class="account-header">
          <div class="avatar-frame">
            <span class="avatar-icon">🂡</span>
          </div>
          <h1>{{ auth.userName() || 'Jogador' }}</h1>
          <p class="text-muted">Membro desde 2026</p>
        </div>

        <div class="tabs">
          <button class="tab" [class.active]="activeTab() === 'pedidos'" (click)="activeTab.set('pedidos')">Meus Pedidos</button>
          <button class="tab" [class.active]="activeTab() === 'enderecos'" (click)="activeTab.set('enderecos')">Endereços</button>
          <button class="tab" [class.active]="activeTab() === 'dados'" (click)="activeTab.set('dados')">Dados Pessoais</button>
        </div>

        @if (activeTab() === 'pedidos') {
          <div class="tab-content">
            @for (order of mockOrders; track order.id) {
            <div class="order-card playing-card gold-border">
              <div class="order-header">
                <div>
                  <span class="order-id">Pedido #{{ order.id }}</span>
                  <span class="order-date text-muted">{{ order.date }}</span>
                </div>
                <span class="chip" [class]="'chip-' + order.chipColor">{{ order.status }}</span>
              </div>
              <div class="order-items">
                <p>{{ order.items }} iten(s) — <strong class="text-gold">R$ {{ order.total.toFixed(2) }}</strong></p>
              </div>
              <div class="order-timeline">
                @for (step of order.timeline; track $index) {
                  <div class="timeline-step" [class.active]="step.active" [class.completed]="step.completed">
                    <span class="timeline-dot">{{ step.icon }}</span>
                    <span class="timeline-label">{{ step.label }}</span>
                  </div>
                }
              </div>
            </div>
            }
          </div>
        }

        @if (activeTab() === 'enderecos') {
          <div class="tab-content">
            <div class="address-card playing-card">
              <h4>📍 Casa</h4>
              <p class="text-muted">Rua Exemplo, 123 — Centro<br>Rio de Janeiro/RJ — 20000-000</p>
              <span class="chip chip-gold">Principal</span>
            </div>
            <button class="btn btn-secondary" style="margin-top:1rem;">+ Adicionar Endereço</button>
          </div>
        }

        @if (activeTab() === 'dados') {
          <div class="tab-content">
            <div class="data-card playing-card" style="padding:2rem;">
              <div class="form-group">
                <label class="form-label">Nome</label>
                <input class="form-input" [value]="auth.userName()" readonly>
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input class="form-input" [value]="auth.user()?.email || ''" readonly>
              </div>
              <button class="btn btn-secondary" style="margin-right:1rem;">Editar</button>
              <button class="btn btn-primary" (click)="auth.logout()">Sair da Conta</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './minha-conta.component.css'
})
export class MinhaContaComponent {
  activeTab = signal('pedidos');

  mockOrders = [
    {
      id: '78421', date: '28/03/2026', items: 3, total: 498.70, status: 'Enviado', chipColor: 'gold',
      timeline: [
        { icon: '♠', label: 'Pedido', active: false, completed: true },
        { icon: '♥', label: 'Confirmado', active: false, completed: true },
        { icon: '♦', label: 'Enviado', active: true, completed: false },
        { icon: '♣', label: 'Entregue', active: false, completed: false },
      ]
    },
    {
      id: '78205', date: '15/03/2026', items: 1, total: 189.90, status: 'Entregue', chipColor: 'green',
      timeline: [
        { icon: '♠', label: 'Pedido', active: false, completed: true },
        { icon: '♥', label: 'Confirmado', active: false, completed: true },
        { icon: '♦', label: 'Enviado', active: false, completed: true },
        { icon: '♣', label: 'Entregue', active: true, completed: false },
      ]
    }
  ];

  constructor(public auth: AuthService, private title: Title) {
    this.title.setTitle('Minha Conta — Lucky 021');
  }
}
