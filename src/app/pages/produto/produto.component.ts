import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent implements OnInit {
  Math = Math;
  product = signal<any>(null);
  selectedSize = signal('M');
  selectedColor = signal('Preto');
  quantity = signal(1);
  selectedImageIndex = signal(0);

  sizes = ['P', 'M', 'G', 'GG', 'XG'];
  colors = [
    { nome: 'Preto', hex: '#1A1A1A' },
    { nome: 'Branco', hex: '#F5F0E8' },
    { nome: 'Vermelho', hex: '#C0392B' },
    { nome: 'Dourado', hex: '#D4AF37' }
  ];

  relatedProducts = [
    { id: '2', nome: 'Jaqueta All-In', preco: 459.90, naipe: '♥', naipeCor: 'red', categoria: 'Jaquetas' },
    { id: '3', nome: 'Calça Dealer', preco: 279.90, naipe: '♦', naipeCor: 'red', categoria: 'Calças' },
    { id: '4', nome: 'Boné Lucky Strike', preco: 129.90, naipe: '♣', naipeCor: '', categoria: 'Acessórios' },
    { id: '5', nome: 'Moletom Jackpot', preco: 349.90, naipe: '♠', naipeCor: '', categoria: 'Camisetas' },
  ];

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private carrinho: CarrinhoService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product.set({
      id, nome: 'Camiseta Royal Flush', descricao: 'Camiseta premium 100% algodão egípcio com estampa exclusiva inspirada no universo do poker. Tecido macio e durável com caimento perfeito. Edição limitada da coleção Blackjack 2026.',
      preco: 189.90, preco_promocional: 0, categoria: 'Camisetas', naipe: '♠', naipeCor: '',
      avaliacoes: 4.8, numAvaliacoes: 127, estoque: 15
    });
    this.title.setTitle(`${this.product()?.nome} — Lucky 021`);
    this.meta.updateTag({ name: 'description', content: this.product()?.descricao });
  }

  selectSize(size: string): void { this.selectedSize.set(size); }
  selectColor(color: string): void { this.selectedColor.set(color); }

  incrementQty(): void { this.quantity.set(this.quantity() + 1); }
  decrementQty(): void { if (this.quantity() > 1) this.quantity.set(this.quantity() - 1); }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    this.carrinho.addItem({
      produtoId: p.id, nome: p.nome,
      preco: p.preco_promocional || p.preco,
      imagem: '', tamanho: this.selectedSize(), cor: this.selectedColor()
    }, this.quantity());
    this.toast.sucesso(`🂡 ${p.nome} (${this.selectedSize()}) adicionado ao deck!`);
  }

  buyNow(): void {
    this.addToCart();
    // Navigate to checkout would go here
  }
}
