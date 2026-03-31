import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  selectedCategory = signal('');
  sortBy = signal('recente');
  searchQuery = '';
  showMobileFilters = false;

  categories = [
    { nome: 'Camisetas', slug: 'camisetas', suit: '♠', suitColor: '' },
    { nome: 'Calças', slug: 'calcas', suit: '♥', suitColor: 'red' },
    { nome: 'Jaquetas', slug: 'jaquetas', suit: '♦', suitColor: 'red' },
    { nome: 'Acessórios', slug: 'acessorios', suit: '♣', suitColor: '' }
  ];

  allProducts = [
    { id: '1', nome: 'Camiseta Royal Flush', preco: 189.90, preco_promocional: 0, categoria: 'Camisetas', catSlug: 'camisetas', naipe: '♠', naipeCor: '', novo: true, promocao: false },
    { id: '2', nome: 'Jaqueta All-In', preco: 459.90, preco_promocional: 321.93, categoria: 'Jaquetas', catSlug: 'jaquetas', naipe: '♥', naipeCor: 'red', novo: false, promocao: true },
    { id: '3', nome: 'Calça Dealer', preco: 279.90, preco_promocional: 0, categoria: 'Calças', catSlug: 'calcas', naipe: '♦', naipeCor: 'red', novo: true, promocao: false },
    { id: '4', nome: 'Boné Lucky Strike', preco: 129.90, preco_promocional: 0, categoria: 'Acessórios', catSlug: 'acessorios', naipe: '♣', naipeCor: '', novo: false, promocao: false },
    { id: '5', nome: 'Moletom Jackpot', preco: 349.90, preco_promocional: 244.93, categoria: 'Camisetas', catSlug: 'camisetas', naipe: '♠', naipeCor: '', novo: false, promocao: true },
    { id: '6', nome: 'Bermuda High Roller', preco: 199.90, preco_promocional: 0, categoria: 'Calças', catSlug: 'calcas', naipe: '♥', naipeCor: 'red', novo: true, promocao: false },
    { id: '7', nome: 'Tênis Ace', preco: 599.90, preco_promocional: 0, categoria: 'Acessórios', catSlug: 'acessorios', naipe: '♦', naipeCor: 'red', novo: true, promocao: false },
    { id: '8', nome: 'Camisa Poker Face', preco: 229.90, preco_promocional: 160.93, categoria: 'Camisetas', catSlug: 'camisetas', naipe: '♣', naipeCor: '', novo: false, promocao: true },
    { id: '9', nome: 'Jaqueta Double Down', preco: 529.90, preco_promocional: 0, categoria: 'Jaquetas', catSlug: 'jaquetas', naipe: '♠', naipeCor: '', novo: true, promocao: false },
    { id: '10', nome: 'Calça Bluff', preco: 259.90, preco_promocional: 0, categoria: 'Calças', catSlug: 'calcas', naipe: '♣', naipeCor: '', novo: false, promocao: false },
    { id: '11', nome: 'Camiseta Wild Card', preco: 159.90, preco_promocional: 111.93, categoria: 'Camisetas', catSlug: 'camisetas', naipe: '♥', naipeCor: 'red', novo: false, promocao: true },
    { id: '12', nome: 'Relógio Croupier', preco: 899.90, preco_promocional: 0, categoria: 'Acessórios', catSlug: 'acessorios', naipe: '♦', naipeCor: 'red', novo: true, promocao: false },
  ];

  filteredProducts = signal(this.allProducts);

  constructor(
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    private carrinho: CarrinhoService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Catálogo — Lucky 021');
    this.meta.updateTag({ name: 'description', content: 'Explore o catálogo completo da Lucky 021.' });
    this.applyFilters();
  }

  setCategory(slug: string): void {
    this.selectedCategory.set(slug);
    this.applyFilters();
  }

  setSort(sort: string): void {
    this.sortBy.set(sort);
    this.applyFilters();
  }

  applyFilters(): void {
    let products = [...this.allProducts];
    if (this.selectedCategory()) {
      products = products.filter(p => p.catSlug === this.selectedCategory());
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      products = products.filter(p => p.nome.toLowerCase().includes(q));
    }
    switch (this.sortBy()) {
      case 'menor': products.sort((a, b) => a.preco - b.preco); break;
      case 'maior': products.sort((a, b) => b.preco - a.preco); break;
      case 'nome': products.sort((a, b) => a.nome.localeCompare(b.nome)); break;
    }
    this.filteredProducts.set(products);
  }

  addToCart(product: any): void {
    this.carrinho.addItem({
      produtoId: product.id, nome: product.nome,
      preco: product.promocao ? product.preco_promocional : product.preco,
      imagem: '', tamanho: 'M', cor: 'Padrão'
    });
    this.toast.sucesso(`🂡 ${product.nome} adicionado ao deck!`);
  }
}
