import { mockData } from '../data/mock.js';

const DB_KEY = 'impulsa_joven_db_v7';
const USER_KEY = 'impulsa_joven_user';

export const storage = {
  initDb() {
    if (!localStorage.getItem(DB_KEY)) {
      localStorage.setItem(DB_KEY, JSON.stringify(mockData));
    }
  },
  
  getDb() {
    this.initDb();
    return JSON.parse(localStorage.getItem(DB_KEY));
  },
  
  saveDb(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  /* User Management */
  registerUser(name, email) {
    const user = { name, email, registeredAt: new Date().toISOString() };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.logImpact('users_registered');
    return user;
  },

  getUser() {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  logoutUser() {
    localStorage.removeItem(USER_KEY);
  },

  /* Impact Analytics */
  logImpact(metricKey) {
    const db = this.getDb();
    if (db.impact[metricKey] !== undefined) {
      db.impact[metricKey] += 1;
      this.saveDb(db);
    }
  },

  getImpact() {
    return this.getDb().impact;
  },

  /* Fetch Data */
  getScholarships() { return this.getDb().scholarships; },
  getCourses() { return this.getDb().courses; },
  getJobs() { return this.getDb().jobs; },
  getVolunteering() { return this.getDb().volunteering; },
  getTestimonials() { return this.getDb().testimonials; },

  /* CRUD examples (for admin prep) */
  addScholarship(item) {
    const db = this.getDb();
    item.id = 'b' + Date.now();
    item.views = 0;
    db.scholarships.push(item);
    this.saveDb(db);
  }
};
