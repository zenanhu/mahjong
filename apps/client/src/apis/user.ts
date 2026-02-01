import { User } from '@libs/shared/models';
import { IUserRepository } from '@libs/shared/interfaces';


// 1. 模拟一个 Repository (浏览器版)
const browserRepo: IUserRepository = {
	async findById(id: string): Promise<User | null> {
		try {
			const raw = localStorage.getItem('user_' + id);
			if (!raw) return null;
			const parsed = JSON.parse(raw);
			return parsed ?? null;
		} catch (e) {
			// JSON parse error or other storage error
			return null;
		}
	},
	async save(user: User): Promise<User> {
		const toSave = { ...user };
		if (!toSave.id) {
			// 简单生成 id：时间戳 + 随机数
			toSave.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
		}
		try {
			localStorage.setItem('user_' + toSave.id, JSON.stringify(toSave));
		} catch (e) {
			// 如果 storage 写入失败，可以抛出以便调用方处理
			throw e;
		}
		return toSave;
	}
};

// 导出实现以遵循 IUserRepository
export const userRepository: IUserRepository = browserRepo;

// 导出简单的 API 接口（使用已实现的 repository）
export async function getUser(id: string): Promise<User | null> {
	return userRepository.findById(id);
}

export async function saveUser(user: User): Promise<User> {
	return userRepository.save(user);
}
