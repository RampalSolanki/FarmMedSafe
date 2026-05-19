import axios from 'axios';

const API_URL = 'http://localhost:5000';
let token = '';

async function test() {
  try {
    console.log('\n🧪 Testing Farm Management API\n');
    console.log('='.repeat(50));

    // 1. Health Check
    console.log('\n1️⃣  Testing Health Check...');
    const healthRes = await axios.get(`${API_URL}/health`);
    console.log('✅ Health Status:', healthRes.data.status);

    // 2. Get Medicine Catalog (Public)
    console.log('\n2️⃣  Testing Medicine Catalog (Public - No Auth)...');
    const catalogRes = await axios.get(`${API_URL}/api/medicines/catalog`);
    console.log('✅ Medicines available:', catalogRes.data.length);
    if (catalogRes.data.length > 0) {
      console.log('   Sample:', catalogRes.data[0].name);
    }

    // 3. Login
    console.log('\n3️⃣  Testing Login...');
    const loginRes = await axios.post(`${API_URL}/api/auth/login`, {
      email: 'farmer@demo.com',
      password: 'password123'
    });
    token = loginRes.data.token;
    console.log('✅ Login successful');
    console.log('   User:', loginRes.data.name);
    console.log('   Token:', token.substring(0, 20) + '...');

    // 4. Get Current User
    console.log('\n4️⃣  Testing Get Current User...');
    const meRes = await axios.get(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Current user:', meRes.data.name);
    console.log('   Role:', meRes.data.role);

    // 5. Get Animals
    console.log('\n5️⃣  Testing Get Animals...');
    const animalsRes = await axios.get(`${API_URL}/api/animals`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Animals count:', animalsRes.data.length);
    if (animalsRes.data.length > 0) {
      console.log('   Sample animal:', animalsRes.data[0].name, '(' + animalsRes.data[0].type + ')');
    }

    // 6. Create New Animal
    console.log('\n6️⃣  Testing Create Animal...');
    const newAnimalRes = await axios.post(`${API_URL}/api/animals`, {
      animalId: 'SHEEP20260424225836',
      name: 'Lambkin',
      type: 'sheep',
      breed: 'Dorper',
      age: { years: 1, months: 6 },
      weight: { value: 45, unit: 'kg' },
      gender: 'female'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Animal created:', newAnimalRes.data.name);
    console.log('   ID:', newAnimalRes.data._id);

    // 7. Search Medicines
    console.log('\n7️⃣  Testing Search Medicines (Public)...');
    const searchRes = await axios.get(`${API_URL}/api/medicines/search?q=Penicillin`);
    console.log('✅ Search results:', searchRes.data.length);
    if (searchRes.data.length > 0) {
      console.log('   Found:', searchRes.data[0].name);
    }

    // 8. Get Medicine History
    console.log('\n8️⃣  Testing Get Medicine History...');
    const historyRes = await axios.get(`${API_URL}/api/medicines/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Medicine entries:', historyRes.data.length);

    // 9. Admin Login
    console.log('\n9️⃣  Testing Admin Login...');
    const adminLoginRes = await axios.post(`${API_URL}/api/auth/login`, {
      email: 'admin@demo.com',
      password: 'admin123'
    });
    const adminToken = adminLoginRes.data.token;
    console.log('✅ Admin login successful');
    console.log('   Role:', adminLoginRes.data.role);

    // 10. Admin Dashboard Stats
    console.log('\n🔟 Testing Admin Dashboard Stats...');
    const statsRes = await axios.get(`${API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Dashboard Stats:');
    console.log('   Total Farmers:', statsRes.data.totalFarmers);
    console.log('   Total Animals:', statsRes.data.totalAnimals);
    console.log('   Total Medicine Entries:', statsRes.data.totalEntries);
    console.log('   Unsafe Entries:', statsRes.data.unsafeEntries);

    console.log('\n' + '='.repeat(50));
    console.log('\n✅ ALL TESTS PASSED! Backend is working perfectly!\n');

  } catch (error) {
    console.error('\n❌ Test Failed:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    process.exit(1);
  }
}

test();

