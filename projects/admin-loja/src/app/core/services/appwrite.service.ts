import { Injectable } from '@angular/core';
import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppwriteService {
  private client: Client;
  public account: Account;
  public databases: Databases;
  public storage: Storage;

  public readonly databaseId = environment.appwriteDatabaseId;
  public readonly bucketId = environment.appwriteBucketId;

  // Collection IDs
  public readonly collections = {
    produtos: 'produtos',
    categorias: 'categorias',
    pedidos: 'pedidos',
    enderecos: 'enderecos',
    avaliacoes: 'avaliacoes'
  };

  constructor() {
    this.client = new Client()
      .setEndpoint(environment.appwriteEndpoint)
      .setProject(environment.appwriteProjectId);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Helper to get image URL from storage
  getFilePreview(fileId: string, width = 400, height = 500): string {
    return `${environment.appwriteEndpoint}/storage/buckets/${this.bucketId}/files/${fileId}/preview?width=${width}&height=${height}&project=${environment.appwriteProjectId}`;
  }

  getFileView(fileId: string): string {
    return `${environment.appwriteEndpoint}/storage/buckets/${this.bucketId}/files/${fileId}/view?project=${environment.appwriteProjectId}`;
  }
}
