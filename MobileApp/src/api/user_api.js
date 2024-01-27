import ApiManager from "./ApiManager";

export const user_login = async data => {
    try {
      const result = await ApiManager("/login",{
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        data: data
      });
  
      // Kiểm tra xem phản hồi có dữ liệu hay không
      if (result && result.data) {
        return result.data;
      } else {
        // Trả về một đối tượng rỗng nếu không có dữ liệu hoặc không chứa thuộc tính "data"
        return {};
      }
    } catch (error) {
      // Xử lý lỗi nếu có lỗi từ phía server
      console.log('Đăng nhập thất bại:', error);
      return { error: "Đăng nhập thất bại" };
    }
  }