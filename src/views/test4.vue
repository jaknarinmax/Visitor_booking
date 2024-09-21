<template>
  <div class="container">
    <h1 class="title">ระบบค้นหาการจองตั๋ว</h1>
    
    <!-- Search functionality -->
    <div class="search-container">
      <input v-model="referenceCode" placeholder="กรอกรหัสอ้างอิง" class="search-input" />
      <button @click="searchBooking" class="search-button">ค้นหา</button>
    </div>

    <!-- Show searched booking details if a booking is found -->
    <div v-if="booking" class="booking-details">
      <h2>รายละเอียดการจอง</h2>
      <div class="detail-card">
        <p><strong>รหัสอ้างอิง:</strong> {{ booking.referenceCode }}</p>
        <p><strong>รหัสผู้ใช้:</strong> {{ booking.userId._id }}</p>
        <p><strong>วันที่เข้าชม:</strong> {{ new Date(booking.visitdate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
        <p><strong>จำนวนผู้เข้าชม:</strong> {{ booking.numberofpeople }} คน</p>
        <p><strong>วัตถุประสงค์การเข้าชม:</strong> {{ booking.Purposeofvisit }}</p>
        <h3>รายชื่อผู้เข้าร่วม:</h3>
        <ul class="participants-list">
          <li v-for="participant in booking.participants" :key="participant._id">
            {{ participant.name }} -  {{ participant.surname }}  - {{ participant.email }}
          </li>
        </ul>
        <!-- Add QR Code display -->
        <div v-if="booking.qrCode" style="display: flex; justify-content: center;   text-align: center;">
          <div>
            <h3>QR Code</h3>
            <img :src="booking.qrCode" alt="QR Code" style="max-width: 150px; height: auto;">
          </div>
        </div>
        
      </div>
    </div>

    <!-- Show error message if booking not found -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>

    <!-- Booking success list -->
    <div v-if="bookings.length > 0" class="bookings-table">
      <h2>รายการการจองทั้งหมด</h2>
      <table>
        <thead>
          <tr>
            <th>รหัสอ้างอิง</th>
            <th>รหัสผู้ใช้</th>
            <th>วันที่เข้าชม</th>
            <th>จำนวนผู้เข้าชม</th>
            <th>รายชื่อผู้เข้าร่วม</th>
            <th>วัตถุประสงค์การเข้าชม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in bookings" :key="booking._id">
            <td>{{ booking.referenceCode }}</td>
            <td>{{ booking.userId._id }}</td>
            <td>{{ new Date(booking.visitdate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) }}</td>
            <td>{{ booking.numberofpeople }} คน</td>
            <td>
              <ul class="participants-list">
                <li v-for="participant in booking.participants" :key="participant._id">
                  {{ participant.name }} -  {{ participant.surname }}             
                </li>
              </ul>
            </td>
            <td>{{ booking.Purposeofvisit }}</td>
          
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      bookings: [],
      referenceCode: '',
      booking: null,
      error: ''
    };
  },
  async created() {
    try {
      const response = await axios.get('http://LOCALHOST:9992/ticketsuccess');
      this.bookings = response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  },
  methods: {
    async searchBooking() {
      try {
        this.error = '';
        const response = await axios.get(`http://LOCALHOST:9992/viewbooking/${this.referenceCode}`);
        this.booking = response.data;
      } catch (error) {
        this.booking = null;
        this.error = 'ไม่พบข้อมูลการจอง หรือเกิดข้อผิดพลาดในการค้นหา';
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Kanit', sans-serif;
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.search-input {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #3498db;
  border-radius: 5px 0 0 5px;
}

.search-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #2980b9;
}

.booking-details, .bookings-list {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.detail-card, .booking-card {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.participants-list {
  list-style-type: none;
  padding: 0;
}

.participants-list li {
  margin-bottom: 5px;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 20px;
}

h2, h3, h4 {
  color: #2c3e50;
}

p {
  margin: 10px 0;
}

@media (max-width: 600px) {
  .search-container {
    flex-direction: column;
    align-items: center;
  }

  .search-input, .search-button {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
  }
}

.bookings-table {
  width: 150%;
  border-collapse: collapse;
  margin: 40px 0;
  font-size: 16px;
}

.bookings-table h2 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border: 2px solid #ddd;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

td ul.participants-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

td ul.participants-list li {
  margin-bottom: 4px;
}

.qr-code {
  text-align: center;
  margin-top: 20px;
}

.qr-code img {
  max-width: 200px;
  height: auto;
}

.table-qr-code {
  max-width: 100px;
  height: auto;
}
</style>