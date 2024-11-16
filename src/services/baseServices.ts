import { DOMAIN } from '@/utils/utils'
import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

class BaseService {
  private service: AxiosInstance

  constructor() {
    this.service = axios.create({
      // baseURL: 'http://localhost:3000', // Chỉ định baseURL ở đây
      // baseURL: 'http://192.168.186.145:8083',
      baseURL: 'http://192.168.1.238:8083',
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN` // Cập nhật token nếu cần
      }
    })
  }

  // Phương thức GET để lấy dữ liệu
  public async getData(endpoint: string): Promise<AxiosResponse> {
    try {
      const response = await this.service.get(endpoint)
      return response
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  // Phương thức POST để gửi dữ liệu
  public async postData(endpoint: string, data: any): Promise<AxiosResponse> {
    try {
      const response = await this.service.post(endpoint, data)
      return response
    } catch (error) {
      console.error('Error sending data:', error)
      throw error
    }
  }

  // Phương thức PUT để cập nhật dữ liệu
  public async putData(endpoint: string, data: any): Promise<AxiosResponse> {
    try {
      const response = await this.service.put(endpoint, data)
      return response
    } catch (error) {
      console.error('Error updating data:', error)
      throw error
    }
  }
}

export const service = new BaseService()
