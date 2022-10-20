
const api_key_hash = "ts=12&apikey=720dc2de76eeeb40bb918455f086c529&hash=21c35df56ffcda31bb6d192c14dde18f";
const MARVEL_API = "https://gateway.marvel.com/v1/public";


export default {

  async findCharacterBydetails(id_person, limit = 2 ){
    return fetch(`${MARVEL_API}/characters/${id_person}/comics?${api_key_hash.toString()}&limit=${limit}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
  },

   async findAllCharacters(offset = 0, limit = 10) {
    return fetch(`${MARVEL_API}/characters?${api_key_hash.toString()}&orderBy=name&offset=${offset}&limit=${limit}`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  },
  async findCharacterById(id) {
    return fetch(`${MARVEL_API}/characters/${id}?${api_key_hash.toString()}`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  },
  
  async findCharacterByName(name) {
    return fetch(`${MARVEL_API}/characters?${api_key_hash.toString()}&orderBy=name&nameStartsWith=${name}`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  },
  

};
