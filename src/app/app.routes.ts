import { Routes } from '@angular/router';
import { authGuard, adminGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalogo/catalogo.component').then(m => m.CatalogoComponent)
  },
  {
    path: 'produto/:id',
    loadComponent: () => import('./pages/produto/produto.component').then(m => m.ProdutoComponent)
  },
  {
    path: 'carrinho',
    loadComponent: () => import('./pages/carrinho/carrinho.component').then(m => m.CarrinhoComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.CadastroComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'minha-conta',
    loadComponent: () => import('./pages/minha-conta/minha-conta.component').then(m => m.MinhaContaComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'produtos',
        loadComponent: () => import('./admin/produtos/produtos.component').then(m => m.AdminProdutosComponent)
      },
      {
        path: 'categorias',
        loadComponent: () => import('./admin/categorias/categorias.component').then(m => m.AdminCategoriasComponent)
      },
      {
        path: 'pedidos',
        loadComponent: () => import('./admin/pedidos/pedidos.component').then(m => m.AdminPedidosComponent)
      },
      {
        path: 'clientes',
        loadComponent: () => import('./admin/clientes/clientes.component').then(m => m.AdminClientesComponent)
      },
      {
        path: 'estoque',
        loadComponent: () => import('./admin/estoque/estoque.component').then(m => m.AdminEstoqueComponent)
      },
      {
        path: 'relatorios',
        loadComponent: () => import('./admin/relatorios/relatorios.component').then(m => m.AdminRelatoriosComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
