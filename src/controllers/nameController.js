/**
 * Module xử lý yêu cầu gửi tên từ client và trả lời với lời chào cùng danh sách tên hiện tại.
 *
 * Các chức năng chính:
 * - Nhận tên từ client thông qua `req.body.name`.
 * - Thêm tên vào danh sách lưu trữ trong `names` model.
 * - Trả về phản hồi JSON chứa lời chào và danh sách tên cập nhật.
 */

const names = require("../models/names");

/**
 * Hàm `submitName`
 *
 * Hàm này xử lý yêu cầu POST chứa một tên mới từ client, thêm tên đó vào danh sách tên,
 * và trả về một thông điệp chào mừng kèm danh sách tên hiện tại.
 *
 * @function submitName
 * @param {Object} req - Đối tượng request từ client, chứa tên trong `req.body.name`.
 * @param {Object} res - Đối tượng response để gửi phản hồi JSON về cho client.
 *
 * @example
 * // Yêu cầu từ client:
 * // POST /submit
 * // Body: { "name": "John" }
 *
 * // Phản hồi:
 * // {
 * //   "message": "Xin chào, John!",
 * //   "names": ["John", "Jane", "Doe"]
 * // }
 */
const submitName = (req, res) => {
  const name = req.body.name; // Lấy tên từ yêu cầu của client
  names.addName(name); // Thêm tên vào danh sách trong model names
  res.json({ message: `Xin chào, ${name}!`, names: names.getNames() }); // Trả về JSON với lời chào và danh sách tên
};

module.exports = { submitName };
