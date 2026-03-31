import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { EnderecoService } from '../../core/services/endereco.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  Math = Math;
  step = signal(1);
  cep = ''; logradouro = ''; numero = ''; complemento = '';
  bairro = ''; cidade = ''; estado = '';
  pagamento = signal('pix');
  loading = signal(false);
  confirmed = signal(false);

  constructor(
    public carrinho: CarrinhoService,
    private enderecoService: EnderecoService,
    private toast: ToastService,
    private title: Title
  ) {
    this.title.setTitle('Checkout — Lucky 021');
  }

  async buscarCep(): Promise<void> {
    if (this.cep.replace(/\D/g, '').length < 8) return;
    const endereco = await this.enderecoService.buscarCep(this.cep);
    if (endereco) {
      this.logradouro = endereco.logradouro;
      this.bairro = endereco.bairro;
      this.cidade = endereco.localidade;
      this.estado = endereco.uf;
      this.toast.sucesso('🂡 Endereço encontrado!');
    } else {
      this.toast.erro('CEP não encontrado');
    }
  }

  nextStep(): void {
    if (this.step() < 3) this.step.set(this.step() + 1);
  }

  prevStep(): void {
    if (this.step() > 1) this.step.set(this.step() - 1);
  }

  async confirmarPedido(): Promise<void> {
    this.loading.set(true);
    // Simulate order creation
    setTimeout(() => {
      this.confirmed.set(true);
      this.loading.set(false);
      this.carrinho.clear();
      this.toast.sucesso('🎰 Pedido confirmado! Boa aposta!');
    }, 2000);
  }

  get total(): number {
    return this.carrinho.subtotal() + (this.carrinho.hasFreeShipping() ? 0 : 19.90);
  }
}
