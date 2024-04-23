import { toast } from 'react-toastify'
import { axiosInstance } from './axios'
import { AxiosResponse } from 'axios'

const filterParamsObj = {
	search: null,
	sort: null,
	order: null,
	page: null,
	limit: null,
	filter: null,
}
//Books =================================================>
export async function getAllBooks(filterParams = { ...filterParamsObj }) {
	try {
		let params = new URLSearchParams(filterParams).toString()
		const books = await axiosInstance.get(`/books?${params}`)
		return books
	} catch (error) {
		console.error(error)
		return error
	}
}

export async function getBookById(id) {
	try {
		const book = await axiosInstance.get('/books/' + id)
		return book
	} catch (error) {
		console.error(error)
		return error
	}
}

export async function createBook(book) {
	try {
		const books = await axiosInstance.post('/books', book)
		toast.success(`Книгу успішно створено!`)
		return books
	} catch (error) {
		console.error(error)
		toast.error(`При створенні книги сталася помилка!`)
		return error
	}
}
export async function updateBook(id, book) {
	try {
		const books = await axiosInstance.put('/books/' + id, book)
		toast.success(`Книгу успішно оновлено!`)
		return books
	} catch (error) {
		console.error(error)
		toast.error(`При оновленні книги сталася помилка!`)
		return error
	}
}
export async function deleteBook(id) {
	try {
		const book = await axiosInstance.delete('/books/' + id)
		toast.success(`Книгу з успішно видалено!`)
		return book
	} catch (error) {
		console.error(error)
		toast.error(`При видаленні книги сталася помилка!`)
		return error
	}
}

//Users =================================================>
export async function getAllUsers(filterParams = { ...filterParamsObj }) {
	try {
		let params = new URLSearchParams(filterParams).toString()
		const users = await axiosInstance.get(`/users?${params}`)
		return users
	} catch (error) {
		console.error(error)
		return error
	}
}
export async function getUserById(id) {
	try {
		const user = await axiosInstance.get('/users/' + id)
		return user
	} catch (error) {
		console.error(error)
		return error
	}
}
export async function createUser(data) {
	try {
		const user = await axiosInstance.post('/users', data)
		toast.success(`Користувача успішно створено!`)
		return user
	} catch (error) {
		console.error(error)
		toast.error('Користувач з такою поштою вже існує')
		return error
	}
}
export async function updateUser(id, data) {
	try {
		const user = await axiosInstance.put('/users/' + id, data)
		toast.success(`Користувача з ID ${id} успішно оновлено!`)
		return user
	} catch (error) {
		console.error(error)
		toast.error('Користувач з такою поштою вже існує')
		return error
	}
}
export async function deleteUser(id) {
	try {
		const user = await axiosInstance.delete('/users/' + id)
		toast.success(`Користувача з ID ${id} успішно видалено!`)
		return user
	} catch (error) {
		console.error(error)
		toast.error(`При видаленні користувача з ID ${id} сталася помилка!`)
		return error
	}
}
export async function getUserBooks(id) {
	try {
		const books = await axiosInstance.get(`/users/${id}/books`)
		return books
	} catch (error) {
		console.error(error)
		return error
	}
}

//Authors =================================================>
export async function getAllAuthors(filterParams = { ...filterParamsObj }) {
	try {
		let params = new URLSearchParams(filterParams).toString()
		const authors = await axiosInstance.get(`/author?${params}`)
		return authors
	} catch (error) {
		console.error(error)
		return error
	}
}
export async function deleteAuthor(id) {
	try {
		const authors = await axiosInstance.delete('/author/' + id)
		toast.success(`Автора з ID ${id} успішно видалено!`)
		return authors
	} catch (error) {
		console.error(error)
		toast.error(`При видаленні автора з ID ${id} сталася помилка!`)
		return error
	}
}
export async function updateAuthor(id, data) {
	try {
		const authors = await axiosInstance.put('/author/' + id, data)
		toast.success(`Автора з ID ${id} успішно оновлено!`)
		return authors
	} catch (error) {
		console.error(error)
		toast.error(`При оновленні автора з ID ${id} сталася помилка!`)
		return error
	}
}
export async function createAuthor(data) {
	try {
		const authors = await axiosInstance.post('/author', data)
		toast.success(`Автора успішно створено!`)
		return authors
	} catch (error) {
		console.error(error)
		toast.error(`При створенні автора сталася помилка!`)
		return error
	}
}

//============================================================

export async function addImg(formData) {
	try {
		const response = await axiosInstance.post('/uploads', formData)
		toast.success(`Зображення успішно додано!`)
		return response.data // Повертаємо дані, які повернув сервер
	} catch (error) {
		console.error(error)
		toast.error(`Помилка додавання зображення!`)
		throw error // Згенеруємо помилку, щоб її обробити у викликаючому коді
	}
}

export async function getAllGenres(filterParams = { ...filterParamsObj }) {
	try {
		let params = new URLSearchParams(filterParams).toString()
		const genres = await axiosInstance.get(`/genre?${params}`)
		return genres
	} catch (error) {
		console.error(error)
		return error
	}
}
export async function updateGenre(id, data) {
	try {
		const genre = await axiosInstance.put('/genre/' + id, data)
		toast.success(`Жанр з ID ${id} успішно оновлено!`)
		return genre
	} catch (error) {
		console.error(error)
		if (error.response.status < 500) {
			toast.error('Жанр з такою назвою, вже існує!')
		} else {
			toast.error('Помилка оновлення')
		}
		return error
	}
}
export async function deleteGenre(id) {
	try {
		const genre = await axiosInstance.delete('/genre/' + id)
		toast.success(`Жанр з ID ${id} успішно видалено!`)
		return genre
	} catch (error) {
		console.error(error)
		toast.error(`При видаленні жанру з ID ${id} сталася помилка!`)
		return error
	}
}
export async function createGenre(data) {
	try {
		const genres = await axiosInstance.post('/genre', data)
		toast.success(`Жанр успішно створено!`)
		return genres
	} catch (error) {
		console.error(error)
		if (error.response.status < 500) {
			toast.error('Жанр з такою назвою, вже існує!')
		} else {
			toast.error('Помилка створення')
		}
		return error
	}
}

//=============================================================================
export async function getAllBookCopies(filterParams = { ...filterParamsObj }) {
	try {
		let params = new URLSearchParams(filterParams).toString()
		const bookCopies = await axiosInstance.get(`/bookCopies?${params}`)
		return bookCopies
	} catch (error) {
		console.error(error)
		return error
	}
}
export async function createBookCopy(data) {
	try {
		const bookCopy = await axiosInstance.post('/bookCopies', data)
		toast.success(`Копію книги успішно створено!`)
		return bookCopy
	} catch (error) {
		console.error(error)
		if (error.response.status < 500) {
			toast.error('Копія книги з таким кодом книги, вже існує!')
		} else {
			toast.error('Помилка створення')
		}
		return error
	}
}
export async function updateBookCopy(id, data) {
	try {
		const bookCopy = await axiosInstance.put('/bookCopies/' + id, data)
		toast.success(`Копію книги з ID ${id} успішно оновлено!`)
		return bookCopy
	} catch (error) {
		console.error(error)
		if (error.response.status < 500) {
			toast.error('Копія книги з таким кодом книги, вже існує!')
		} else {
			toast.error('Помилка оновлення')
		}
		return error
	}
}
export async function deleteBookCopy(id) {
	try {
		const bookCopy = await axiosInstance.delete('/bookCopies/' + id)
		toast.success(`Копію книги з ID ${id} успішно видалено!`)
		return bookCopy
	} catch (error) {
		console.error(error)
		toast.error(`При видаленні копії книги з ID ${id} сталася помилка!`)
		return error
	}
}
