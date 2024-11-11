import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { WEATHER_DOMAIN } from '@/utils/utils'
class weatherService {
  private service: AxiosInstance

  constructor() {
    this.service = axios.create({
      baseURL: WEATHER_DOMAIN
    })
  }

  async get<T>(url: string, params: Record<string, any>): Promise<AxiosResponse<T>> {
    return this.service.get(url, { params })
  }
}

export default new weatherService()
