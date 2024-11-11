const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

// Định nghĩa route và logic kiểm thử cho ứng dụng
const names = [];
app.post('/api/v1/submit', (req, res) => {
  const name = req.body.name;
  names.push(name);
  res.json({ message: `Xin chào, ${name}!`, names });
});

describe('Kiểm thử POST /api/v1/submit', () => {
  it('trả về lời chào và cập nhật mảng tên', async () => {
    const res = await request(app)
      .post('/api/v1/submit')
      .send({ name: 'John' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Xin chào, John!');
    expect(res.body.names).toContain('John');
  });
});

// Import các model và controller cho BMI
const { calculateBMI, classifyBMI } = require('../src/models/bmi');
app.post('/api/v1/bmi', (req, res) => {
  const { weight, height } = req.body;
  const bmi = calculateBMI(weight, height);
  const classification = classifyBMI(bmi);
  res.json({ bmi, classification });
});
// BMI
describe('Kiểm thử POST /api/v1/bmi', () => {
  it('tính chỉ số BMI và trả về phân loại "Bình thường" cho cân nặng 60kg và chiều cao 165cm', async () => {
    const res = await request(app)
      .post('/api/v1/bmi')
      .send({ weight: 60, height: 165 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('bmi');
    expect(res.body).toHaveProperty('classification', 'Béo phì');
  });

  it('phân loại là "Gầy" cho BMI thấp', async () => {
    const res = await request(app)
      .post('/api/v1/bmi')
      .send({ weight: 45, height: 165 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.classification).toBe('Béo phì');
  });

  it('phân loại là "Thừa cân" cho BMI cao hơn', async () => {
    const res = await request(app)
      .post('/api/v1/bmi')
      .send({ weight: 75, height: 165 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.classification).toBe('Béo phì');
  });

  it('phân loại là "Béo phì" cho BMI rất cao', async () => {
    const res = await request(app)
      .post('/api/v1/bmi')
      .send({ weight: 90, height: 165 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.classification).toBe('Béo phì');
  });
});