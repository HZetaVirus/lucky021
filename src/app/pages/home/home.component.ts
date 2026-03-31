import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { ToastService } from '../../core/services/toast.service';

interface MockProduct {
  id: string;
  nome: string;
  preco: number;
  preco_promocional: number;
  imagem: string;
  categoria: string;
  naipe: string;
  naipeCor: string;
  novo: boolean;
  promocao: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-bg-elements" aria-hidden="true">
        <div class="floating-card animate-float">🂡</div>
        <div class="floating-card card-2 animate-float" style="animation-delay: -2s;">🂫</div>
        <div class="floating-dice animate-dice">🎲</div>
        <div class="floating-dice dice-2 animate-dice" style="animation-delay: -1.5s;">🎲</div>
        <div class="hero-suits">
          <span>♠</span><span class="red">♥</span><span class="red">♦</span><span>♣</span>
        </div>
      </div>

      <div class="hero-content container">
        <div class="hero-badge">
          <span class="chip chip-gold">♠ Nova Coleção 2026 ♠</span>
        </div>
        <h1 class="hero-title">
          APOSTE NO <span class="text-gold">ESTILO</span>
        </h1>
        <p class="hero-subtitle">
          ♠ Roupas premium para quem joga alto ♠
        </p>
        <div class="hero-actions">
          <a routerLink="/catalogo" class="btn btn-primary btn-large" id="hero-cta">VER COLEÇÃO</a>
          <a routerLink="/catalogo" [queryParams]="{filtro:'novidades'}" class="btn btn-secondary btn-large" id="hero-cta-secondary">NOVIDADES</a>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">500+</span>
            <span class="stat-label">Peças</span>
          </div>
          <div class="stat-divider">♦</div>
          <div class="stat-item">
            <span class="stat-number">50k+</span>
            <span class="stat-label">Clientes</span>
          </div>
          <div class="stat-divider">♦</div>
          <div class="stat-item">
            <span class="stat-number">4.9★</span>
            <span class="stat-label">Avaliação</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="categories-section section">
      <div class="container">
        <div class="section-header">
          <div class="suit-separator">♠ ♥ ♦ ♣</div>
          <h2>Categorias</h2>
          <p class="section-subtitle">Escolha seu naipe favorito</p>
        </div>
        <div class="categories-grid">
          @for (cat of categories; track cat.slug) {
            <a [routerLink]="['/catalogo']" [queryParams]="{categoria: cat.slug}" class="category-card">
              <span class="category-suit" [class]="cat.suitColor">{{ cat.suit }}</span>
              <span class="category-name">{{ cat.nome }}</span>
              <span class="category-arrow">→</span>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="featured-section section">
      <div class="container">
        <div class="section-header">
          <div class="suit-separator">♠ ♥ ♦ ♣</div>
          <h2>Peças em <span class="text-gold">Destaque</span></h2>
          <p class="section-subtitle">As cartas mais cobiçadas do deck</p>
        </div>

        <div class="products-grid">
          @for (product of featuredProducts(); track product.id; let i = $index) {
            <div class="product-card playing-card" [style.animation-delay]="(i * 0.1) + 's'">
              <!-- Suit corners -->
              <span class="card-suit-tl" [class]="product.naipeCor">{{ product.naipe }}</span>
              <span class="card-suit-br" [class]="product.naipeCor">{{ product.naipe }}</span>

              <!-- Badges -->
              @if (product.novo) {
                <span class="product-badge badge-new">NOVO</span>
              }
              @if (product.promocao) {
                <span class="product-badge badge-promo">-30%</span>
              }

              <!-- Image -->
              <div class="product-image">
                <div class="product-image-placeholder">
                  <span class="placeholder-suit" [class]="product.naipeCor">{{ product.naipe }}</span>
                  <span class="placeholder-text">{{ product.nome }}</span>
                </div>
              </div>

              <!-- Info -->
              <div class="product-info">
                <span class="product-category">{{ product.categoria }}</span>
                <h3 class="product-name">{{ product.nome }}</h3>
                <div class="product-price">
                  @if (product.promocao) {
                    <span class="price-old">R$ {{ product.preco.toFixed(2) }}</span>
                    <span class="price-current text-red">R$ {{ product.preco_promocional.toFixed(2) }}</span>
                  } @else {
                    <span class="price-current">R$ {{ product.preco.toFixed(2) }}</span>
                  }
                </div>
                <div class="product-actions">
                  <button class="btn btn-primary btn-small" (click)="addToCart(product)">
                    COMPRAR
                  </button>
                  <a [routerLink]="['/produto', product.id]" class="btn btn-secondary btn-small">
                    VER
                  </a>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="section-cta">
          <a routerLink="/catalogo" class="btn btn-secondary btn-large">VER CATÁLOGO COMPLETO</a>
        </div>
      </div>
    </section>

    <!-- PROMO BANNER -->
    <section class="promo-banner">
      <div class="container promo-content">
        <div class="promo-text">
          <span class="promo-icon animate-dice">🎲</span>
          <h2>Frete Grátis</h2>
          <p>Em compras acima de <strong class="text-gold">R$ 299,00</strong></p>
          <a routerLink="/catalogo" class="btn btn-primary">APROVEITAR AGORA</a>
        </div>
        <div class="promo-decoration" aria-hidden="true">
          <span class="big-suit animate-float">♠</span>
          <span class="big-suit red animate-float" style="animation-delay: -3s;">♥</span>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="features-section section">
      <div class="container">
        <div class="features-grid">
          <div class="feature-item">
            <span class="feature-icon">🃏</span>
            <h4>Peças Exclusivas</h4>
            <p>Coleções limitadas que você não encontra em outro lugar</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🚀</span>
            <h4>Envio Rápido</h4>
            <p>Entrega para todo o Brasil em até 5 dias úteis</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔄</span>
            <h4>Troca Fácil</h4>
            <p>30 dias para trocar, sem perguntas</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔒</span>
            <h4>Pagamento Seguro</h4>
            <p>PIX, cartão e boleto com total segurança</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ---- HERO (Mobile-First) ---- */
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background:
        radial-gradient(ellipse at 30% 50%, rgba(192, 57, 43, 0.15) 0%, transparent 60%),
        radial-gradient(ellipse at 70% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
        linear-gradient(180deg, var(--color-black-deep) 0%, var(--color-black) 100%);
    }

    .hero-bg-elements {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .floating-card {
      position: absolute;
      font-size: 3.5rem;
      opacity: 0.06;
      top: 15%;
      right: 5%;
    }

    .floating-card.card-2 {
      top: 55%;
      left: 5%;
      font-size: 3rem;
    }

    .floating-dice {
      position: absolute;
      font-size: 2rem;
      opacity: 0.08;
      bottom: 15%;
      right: 10%;
    }

    .floating-dice.dice-2 {
      top: 25%;
      left: 12%;
      font-size: 1.8rem;
    }

    @media (min-width: 768px) {
      .floating-card { font-size: 6rem; opacity: 0.08; right: 10%; }
      .floating-card.card-2 { font-size: 5rem; left: 8%; }
      .floating-dice { font-size: 3rem; opacity: 0.1; right: 15%; }
      .floating-dice.dice-2 { font-size: 2.5rem; left: 18%; }
    }

    .hero-suits {
      position: absolute;
      bottom: 5%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 1.5rem;
      font-size: 1.2rem;
      opacity: 0.06;
    }

    @media (min-width: 768px) {
      .hero-suits { gap: 3rem; font-size: 2rem; }
    }

    .hero-suits .red {
      color: var(--color-red-bright);
    }

    .hero-content {
      text-align: center;
      position: relative;
      z-index: 1;
      padding-top: 5rem;
      padding-bottom: 2rem;
    }

    .hero-badge {
      margin-bottom: 1.25rem;
      animation: fadeInUp 0.6s ease 0.2s both;
    }

    @media (min-width: 768px) { .hero-badge { margin-bottom: 2rem; } }

    .hero-title {
      font-size: clamp(2.2rem, 8vw, 6rem);
      font-weight: 900;
      letter-spacing: 3px;
      line-height: 1.1;
      margin-bottom: 1rem;
      animation: fadeInUp 0.6s ease 0.4s both;
    }

    @media (min-width: 768px) { .hero-title { letter-spacing: 6px; margin-bottom: 1.5rem; } }

    .hero-subtitle {
      font-size: clamp(0.85rem, 2vw, 1.3rem);
      color: var(--color-text-muted);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 2rem;
      animation: fadeInUp 0.6s ease 0.6s both;
    }

    @media (min-width: 768px) { .hero-subtitle { letter-spacing: 4px; margin-bottom: 3rem; } }

    .hero-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 2.5rem;
      animation: fadeInUp 0.6s ease 0.8s both;
    }

    .hero-actions .btn-large { padding: 0.85rem 1.5rem; font-size: 0.85rem; }

    @media (min-width: 768px) {
      .hero-actions { gap: 1.5rem; margin-bottom: 4rem; }
      .hero-actions .btn-large { padding: 1rem 2.5rem; font-size: 1rem; }
    }

    .hero-stats {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      animation: fadeInUp 0.6s ease 1s both;
    }

    @media (min-width: 768px) { .hero-stats { gap: 2rem; } }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-number {
      font-family: var(--font-display);
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--color-gold);
    }

    @media (min-width: 768px) { .stat-number { font-size: 1.5rem; } }

    .stat-label {
      font-size: 0.7rem;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    @media (min-width: 768px) { .stat-label { font-size: 0.8rem; } }

    .stat-divider {
      color: var(--color-red-bright);
      opacity: 0.3;
      font-size: 0.8rem;
    }

    /* ---- SECTION HEADER ---- */
    .section-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    @media (min-width: 768px) { .section-header { margin-bottom: 3rem; } }

    .section-subtitle {
      color: var(--color-text-muted);
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    @media (min-width: 768px) { .section-subtitle { font-size: 1rem; margin-top: 0.75rem; } }

    .section-cta {
      text-align: center;
      margin-top: 2rem;
    }

    @media (min-width: 768px) { .section-cta { margin-top: 3rem; } }

    /* ---- CATEGORIES (Mobile-First) ---- */
    .categories-section {
      background: var(--color-black);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    @media (min-width: 480px) { .categories-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; } }
    @media (min-width: 1024px) { .categories-grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; } }

    .category-card {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.15rem;
      background: var(--color-black-deep);
      border: 1px solid rgba(212, 175, 55, 0.15);
      border-radius: var(--radius-lg);
      transition: all 0.3s ease;
      cursor: pointer;
      text-decoration: none;
      color: var(--color-text-light);
    }

    @media (min-width: 768px) { .category-card { padding: 1.5rem; gap: 1rem; } }

    .category-card:hover {
      border-color: var(--color-gold);
      transform: translateY(-4px);
      box-shadow: var(--shadow-gold);
    }

    .category-suit {
      font-size: 1.5rem;
      color: var(--color-gold);
    }

    @media (min-width: 768px) { .category-suit { font-size: 2rem; } }

    .category-suit.red {
      color: var(--color-red-bright);
    }

    .category-name {
      flex: 1;
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    @media (min-width: 768px) { .category-name { font-size: 1rem; } }

    .category-arrow {
      color: var(--color-gold);
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.3s ease;
    }

    .category-card:hover .category-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    /* ---- PRODUCTS GRID (Mobile-First: 1 col → 2 → 3 → 4) ---- */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    @media (min-width: 600px) { .products-grid { gap: 1rem; } }
    @media (min-width: 768px) { .products-grid { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; } }
    @media (min-width: 1024px) { .products-grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; } }

    .product-card {
      display: flex;
      flex-direction: column;
      animation: fadeInUp 0.6s ease both;
    }

    .product-badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 2;
      padding: 0.2rem 0.6rem;
      font-size: 0.6rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: var(--radius-full);
    }

    @media (min-width: 768px) {
      .product-badge { top: 0.75rem; right: 0.75rem; padding: 0.3rem 0.75rem; font-size: 0.7rem; }
    }

    .badge-new {
      background: var(--color-gold);
      color: var(--color-black);
    }

    .badge-promo {
      background: var(--color-red);
      color: white;
    }

    .product-image {
      position: relative;
      width: 100%;
      padding-bottom: 130%;
      overflow: hidden;
      border-radius: var(--radius-card) var(--radius-card) 0 0;
      background: linear-gradient(145deg, #1a1a1a, #2c2c2c);
    }

    .product-image-placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    @media (min-width: 768px) { .product-image-placeholder { gap: 1rem; } }

    .placeholder-suit {
      font-size: 2.5rem;
      opacity: 0.15;
      color: var(--color-gold);
    }

    @media (min-width: 768px) { .placeholder-suit { font-size: 4rem; } }

    .placeholder-suit.red {
      color: var(--color-red-bright);
    }

    .placeholder-text {
      font-family: var(--font-display);
      font-size: 0.65rem;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
      text-align: center;
      padding: 0 0.5rem;
    }

    @media (min-width: 768px) { .placeholder-text { font-size: 0.9rem; letter-spacing: 2px; } }

    .product-info {
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    @media (min-width: 768px) { .product-info { padding: 1.25rem; gap: 0.5rem; } }

    .product-category {
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--color-gold);
      font-weight: 600;
    }

    @media (min-width: 768px) { .product-category { font-size: 0.7rem; letter-spacing: 2px; } }

    .product-name {
      font-family: var(--font-display);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text-light);
      line-height: 1.3;
    }

    @media (min-width: 768px) { .product-name { font-size: 1rem; } }

    .product-price {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.15rem;
    }

    @media (min-width: 768px) { .product-price { gap: 0.75rem; margin-top: 0.25rem; } }

    .price-old {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      text-decoration: line-through;
    }

    @media (min-width: 768px) { .price-old { font-size: 0.85rem; } }

    .price-current {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-light);
    }

    @media (min-width: 768px) { .price-current { font-size: 1.1rem; } }

    .product-actions {
      display: flex;
      gap: 0.4rem;
      margin-top: 0.5rem;
    }

    @media (min-width: 768px) {
      .product-actions { gap: 0.5rem; margin-top: 0.75rem; }
    }

    .product-actions .btn {
      flex: 1;
      font-size: 0.65rem;
      padding: 0.5rem 0.25rem;
    }

    @media (min-width: 768px) {
      .product-actions .btn { font-size: 0.75rem; padding: 0.6rem; }
    }

    /* ---- PROMO BANNER (Mobile-First) ---- */
    .promo-banner {
      background:
        radial-gradient(ellipse at 20% 50%, rgba(192, 57, 43, 0.2) 0%, transparent 50%),
        var(--color-black-deep);
      padding: 2.5rem 0;
      overflow: hidden;
      position: relative;
    }

    @media (min-width: 768px) { .promo-banner { padding: 4rem 0; } }

    .promo-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
    }

    @media (min-width: 768px) {
      .promo-content {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        text-align: left;
      }
    }

    .promo-text {
      max-width: 500px;
    }

    .promo-icon {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 0.75rem;
    }

    @media (min-width: 768px) { .promo-icon { font-size: 3rem; margin-bottom: 1rem; } }

    .promo-text h2 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }

    @media (min-width: 768px) { .promo-text h2 { font-size: 2.5rem; margin-bottom: 0.75rem; } }

    .promo-text p {
      color: var(--color-text-muted);
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }

    @media (min-width: 768px) { .promo-text p { font-size: 1.1rem; margin-bottom: 2rem; } }

    .promo-decoration {
      display: none;
      position: relative;
    }

    @media (min-width: 768px) { .promo-decoration { display: block; } }

    .big-suit {
      font-size: 8rem;
      color: var(--color-gold);
      opacity: 0.1;
    }

    .big-suit.red {
      color: var(--color-red-bright);
      position: absolute;
      top: -2rem;
      left: -3rem;
    }

    /* ---- FEATURES (Mobile-First: 1 col → 2 → 4) ---- */
    .features-section {
      background: var(--color-black);
    }

    .features-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media (min-width: 480px) { .features-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; } }
    @media (min-width: 1024px) { .features-grid { grid-template-columns: repeat(4, 1fr); gap: 2rem; } }

    .feature-item {
      text-align: center;
      padding: 1.5rem 1rem;
      border: 1px solid rgba(212, 175, 55, 0.1);
      border-radius: var(--radius-lg);
      transition: all 0.3s ease;
    }

    @media (min-width: 768px) { .feature-item { padding: 2rem 1.5rem; } }

    .feature-item:hover {
      border-color: rgba(212, 175, 55, 0.3);
      transform: translateY(-4px);
    }

    .feature-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: 0.75rem;
    }

    @media (min-width: 768px) { .feature-icon { font-size: 2.5rem; margin-bottom: 1rem; } }

    .feature-item h4 {
      font-size: 0.9rem;
      margin-bottom: 0.4rem;
      color: var(--color-gold);
    }

    @media (min-width: 768px) { .feature-item h4 { font-size: 1rem; margin-bottom: 0.5rem; } }

    .feature-item p {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }

    @media (min-width: 768px) { .feature-item p { font-size: 0.85rem; } }
  `]
})
export class HomeComponent implements OnInit {
  categories = [
    { nome: 'Camisetas', slug: 'camisetas', suit: '♠', suitColor: '' },
    { nome: 'Calças', slug: 'calcas', suit: '♥', suitColor: 'red' },
    { nome: 'Jaquetas', slug: 'jaquetas', suit: '♦', suitColor: 'red' },
    { nome: 'Acessórios', slug: 'acessorios', suit: '♣', suitColor: '' }
  ];

  featuredProducts = signal<MockProduct[]>([
    { id: '1', nome: 'Camiseta Royal Flush', preco: 189.90, preco_promocional: 0, imagem: '', categoria: 'Camisetas', naipe: '♠', naipeCor: '', novo: true, promocao: false },
    { id: '2', nome: 'Jaqueta All-In', preco: 459.90, preco_promocional: 321.93, imagem: '', categoria: 'Jaquetas', naipe: '♥', naipeCor: 'red', novo: false, promocao: true },
    { id: '3', nome: 'Calça Dealer', preco: 279.90, preco_promocional: 0, imagem: '', categoria: 'Calças', naipe: '♦', naipeCor: 'red', novo: true, promocao: false },
    { id: '4', nome: 'Boné Lucky Strike', preco: 129.90, preco_promocional: 0, imagem: '', categoria: 'Acessórios', naipe: '♣', naipeCor: '', novo: false, promocao: false },
    { id: '5', nome: 'Moletom Jackpot', preco: 349.90, preco_promocional: 244.93, imagem: '', categoria: 'Camisetas', naipe: '♠', naipeCor: '', novo: false, promocao: true },
    { id: '6', nome: 'Bermuda High Roller', preco: 199.90, preco_promocional: 0, imagem: '', categoria: 'Calças', naipe: '♥', naipeCor: 'red', novo: true, promocao: false },
    { id: '7', nome: 'Tênis Ace', preco: 599.90, preco_promocional: 0, imagem: '', categoria: 'Acessórios', naipe: '♦', naipeCor: 'red', novo: true, promocao: false },
    { id: '8', nome: 'Camisa Poker Face', preco: 229.90, preco_promocional: 160.93, imagem: '', categoria: 'Camisetas', naipe: '♣', naipeCor: '', novo: false, promocao: true },
  ]);

  constructor(
    private title: Title,
    private meta: Meta,
    private carrinho: CarrinhoService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Lucky 021 — Aposte no Estilo');
    this.meta.updateTag({ name: 'description', content: 'Lucky 021 — Loja de roupas premium com estilo cassino. Aposte no estilo com peças exclusivas e coleções limitadas.' });
  }

  addToCart(product: MockProduct): void {
    this.carrinho.addItem({
      produtoId: product.id,
      nome: product.nome,
      preco: product.promocao ? product.preco_promocional : product.preco,
      imagem: product.imagem,
      tamanho: 'M',
      cor: 'Padrão'
    });
    this.toast.sucesso(`🂡 ${product.nome} adicionado ao deck!`);
  }
}
