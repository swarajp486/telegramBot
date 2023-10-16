// admin.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  private apiKey = '30bdccaa12a2e935a2d00d8fe4df9632'; // Initial weather API key
  private users: string[] = []; // Store user data here

  getApiKey(): string {
    return this.apiKey;
  }

  setApiKey(key: string): string {
    this.apiKey = key;
    return 'API key updated successfully';
  }

  getUsers(): string[] {
    return this.users;
  }
}
