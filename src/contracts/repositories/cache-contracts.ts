import { Ok } from 'ioredis';

export interface CacheRepositoryInterface {
    set(key: string, value: any): Promise<Ok | null>
    setEx(key: string, value: any, ttl: number): Promise<Ok | null>
    get(key: string): Promise<any>
    del(key: string): Promise<boolean>
}