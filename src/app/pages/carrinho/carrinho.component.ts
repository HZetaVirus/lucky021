import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CarrinhoService } from '../../core/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  constructor(public carrinho: CarrinhoService, private title: Title) {
    this.title.setTitle('Carrinho — Lucky 021');
  }

  get freeShippingPercent(): number {
    const threshold = this.carrinho.getShippingThreshold();
    return Math.min((this.carrinho.subtotal() / threshold) * 100, 100);
  }

  get shippingCost(): number {
    return this.carrinho.hasFreeShipping() ? 0 : 19.90;
  }

  get total(): number {
    return this.carrinho.subtotal() + this.shippingCost;
  }
}
