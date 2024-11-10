// Import các hàm calculateBMI và classifyBMI từ bmi.js

// Hàm getBMI xử lý yêu cầu từ client
// Trả về JSON chứa bmi và classification

// Xuất hàm getBMI

// Lưu ý: Tham khảo mã trong tệp nameController.js
const bmiModel = require('../models/bmi');

const calculateBMI = (req, res) => {
    const { height, weight } = req.body;
    const bmi = bmiModel.calculateBMI(height, weight);
    const category = bmiModel.classifyBMI(bmi);
    res.json({ bmi, category });
};

module.exports = { calculateBMI };