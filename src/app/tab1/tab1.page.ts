import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

const laundryServicesCol = collection(db, 'laundryServices');

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  newService = {
    serviceName: '',
    price: '',
    category: '',
    duration: '',
    status: ''
  };

  async addUser() {
    const service = {
      serviceName: String(this.newService.serviceName).trim(),
      price: String(this.newService.price).trim(),
      category: String(this.newService.category).trim(),
      duration: String(this.newService.duration).trim(),
      status: String(this.newService.status).trim()
    };

    if (!service.serviceName || !service.price || !service.category || !service.duration || !service.status) {
      alert('Please fill all fields');
      return;
    }

    try {
      await addDoc(laundryServicesCol, service);

      alert('Service added successfully');

      this.newService = {
        serviceName: '',
        price: '',
        category: '',
        duration: '',
        status: ''
      };
    } catch (error: unknown) {
      console.error('Could not add laundry service:', error);
      const code = error && typeof error === 'object' && 'code' in error
        ? String(error.code)
        : 'unknown-error';
      alert(`Could not add service (${code}). Check Firestore rules.`);
    }
  }
}