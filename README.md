# Hướng Dẫn Thiết Lập Dự Án IOT-BTL

## Tổng Quan Dự Án

## Các IDE Được Khuyến Nghị:
1. Frontend: VSCode
2. Backend: IntelliJ
3. Cơ Sở Dữ Liệu: MySQL

## Các Bước Thiết Lập Dự Án

1. Sao Chép Dự Án
```sh
git clone https://github.com/ShyYigII/BTL_IOT.git
```

2. Thiết Lập Cơ Sở Dữ Liệu
   - Truy cập thư mục Database
   - Chạy các tệp SQL theo thứ tự:
     a. CreateDatabase.sql
     b. CreateStoreProcedure.sql
     c. CreateData.sql

3. Cấu Hình Frontend
   - Vào thư mục FE
   - Cài đặt các phụ thuộc
   ```sh
   npm install
   ```
   - Chạy frontend
   ```sh
   npm run dev
   ```

4. Cấu Hình Backend
   - Mở thư mục BE bằng IntelliJ
   - Chờ IntelliJ cài đặt các phụ thuộc
   - Sửa đổi kết nối cơ sở dữ liệu trong `src/main/java/com.homeautomation/dao/DAO.java`:
     * Cập nhật cổng MySQL trong biến `dbUrl`
     * Cập nhật tên người dùng và mật khẩu MySQL trong `DriverManager.getConnection()`
   - Khởi chạy `Application.java` trong gói `com.homeautomation`

## Ghi Chú Bổ Sung
- Đảm bảo tất cả các phụ thuộc được cài đặt chính xác
- Kiểm tra chi tiết kết nối cơ sở dữ liệu trước khi chạy
- Khởi động lại ứng dụng nếu có bất kỳ thay đổi cấu hình nào
