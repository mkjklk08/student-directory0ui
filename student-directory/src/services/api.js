import axios from 'axios';

const API_URL = 'https://69030e04d0f10a340b2265e8.mockapi.io/api/v1/students-directory';

const clampAge = (age) => {
	const n = Number(age);
	if (Number.isNaN(n)) return undefined;
	return Math.max(14, Math.min(25, Math.round(n)));
};

const normalizeStudent = (s) => {
	if (!s || typeof s !== 'object') return s;
	const age = clampAge(s.age);
	return age === undefined ? s : { ...s, age };
};

export async function getStudents() {
	// Fetch newest first so recently added appear at the top
	const res = await axios.get(`${API_URL}?sortBy=createdAt&order=desc`);
	const data = Array.isArray(res.data) ? res.data : [];
	return data
		.map(normalizeStudent)
		.filter((s) => s.age === undefined || (s.age >= 14 && s.age <= 25));
}

export async function addStudent(payload) {
	const age = payload.age !== undefined ? clampAge(payload.age) : Math.floor(14 + Math.random() * 12);
	const res = await axios.post(API_URL, { ...payload, age });
	return normalizeStudent(res.data);
}

export async function updateStudent(id, updates) {
	const age = updates.age !== undefined ? clampAge(updates.age) : undefined;
	const body = age === undefined ? updates : { ...updates, age };
	const res = await axios.put(`${API_URL}/${id}`, body);
	return normalizeStudent(res.data);
}

export async function deleteStudent(id) {
	await axios.delete(`${API_URL}/${id}`);
	return true;
}