export default class GotService {
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}` +
				`, received ${res.status}`);
		}
		return await res.json();
	}

	getAllBooks = async () => {
		const res = await this.getResource(`/books/`);
		console.log('getAllBooks: ', res);
		return res.map(this._transformBook);
	}

	getBook = async (id) => {
		const book = await this.getResource(`/books/${id}`);
		console.log('getBook: ', book);
		return this._transformBook(book);
	}

	getAllCharacters = async () => {
		const res = await this.getResource(`/characters?page=5&pageSize=10`);
		return res.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const char = await this.getResource(`/characters/${id}`);
		return this._transformCharacter(char);
	}

	getAllHouses = async () => {
		const res = await this.getResource(`/houses/`);
		console.log('getAllHouses: ', res);
		return res.map(this._transformHouse);
	}

	getHouse = async (id) => {
		const house = await this.getResource(`/houses/${id}`);
		console.log('getHouse: ', house);
		return this._transformHouse(house);
	}

	_checkInfo = (info) => {
		if (!info) {
			return '/no info/';
		} else if (typeof info === 'object') {
			return !info[0] ? '/no info/' :
					Object.values(info).join('; ');
		} else {
			return info;
		}
	}

	_getCharId = (url) => {
		const arr = url.split('/');
		return arr[arr.length - 1];
	}

	_transformCharacter = (char) => {
		return {
			id: this._getCharId(char.url),
			name: this._checkInfo(char.name),
			gender: this._checkInfo(char.gender),
			born: this._checkInfo(char.born),
			died: this._checkInfo(char.died),
			culture: this._checkInfo(char.culture)
		}
	}

	_transformHouse = (house) => {
		return {
			id: this._getCharId(house.url),
			name: this._checkInfo(house.name),
			region: this._checkInfo(house.region),
			words: this._checkInfo(house.words),
			titles: this._checkInfo(house.titles),
			coatOfArms: this._checkInfo(house.coatOfArms),
			ancestralWeapons: this._checkInfo(house.ancestralWeapons)
		}
	}

	_transformBook = (book) => {
		return {
			id: this._getCharId(book.url),
			name: this._checkInfo(book.name),
			numberOfPages: this._checkInfo(book.numberOfPages),
			publisher: this._checkInfo(book.publisher),
			released: this._checkInfo(book.released)
		}
	}
}