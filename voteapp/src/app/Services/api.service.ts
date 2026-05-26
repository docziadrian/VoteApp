import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost:3000';
  api = inject(HttpClient);

  getPolls() {
    return this.api.get(`${this.url}/polls/`);
  }

  getPoll(id: number) {
    return this.api.get(`${this.url}/polls/${id}`);
  }

  createPoll(data: any) {
    return this.api.post(`${this.url}/polls/`, data);
  }

  deletePoll(id: number) {
    return this.api.delete(`${this.url}/polls/${id}`);
  }

  // GET /POLLS/:ID/STATS
  getPollStats(id: number) {
    return this.api.get(`${this.url}/polls/${id}/stats`);
  }

  // POLLS VÉGE

  // OPTIONS

  // GET /polls/:id/options
  getPollOptions(id: number) {
    return this.api.get(`${this.url}/polls/${id}/options`);
  }

  createOption(data: any) {
    return this.api.post(`${this.url}/options/`, data);
  }

  deleteOption(id: number) {
    return this.api.delete(`${this.url}/options/${id}`);
  }

  // OPTIONS VÉGE

  // VOTES
  createVote(data: any) {
    return this.api.post(`${this.url}/votes/`, data);
  }

  constructor() {}
}
