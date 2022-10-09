<template>
    <div>
      <vs-row vs-align="flex-start"
              vs-type="flex" vs-justify="center" vs-w="12">
        <vs-col vs-lg="6" vs-sm="10" vs-xs="12">
  
          <vs-row vs-type="flex" vs-justify="space-between" vs-w="12" style="margin: 10px 0;">
            <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="4"><h1>My team</h1></vs-col>
            <vs-col vs-type="flex" vs-justify="flex-end" vs-w="8">
             
              <vs-button @click="popup5=true" style="margin: 0 5px" :disabled="characters.length===0">Delete</vs-button>
             
            </vs-col>
  
          </vs-row>
          <vs-card>
            <div>
              <vs-list>
                <heroe v-for="character in characters" :key="character.id" :heroe="character" :canBeDelete="true">
                </heroe>
              </vs-list>
            </div>
          </vs-card>
          <vs-popup classContent="popup-example" title="Delete the team team" :active.sync="popup5">
            <h2 style="margin-bottom: 10px;">Do you want to delete your team?</h2>
            <vs-button @click="deleteTeam" color="primary" type="filled" style="margin-right: 10px">Yes</vs-button>
            <vs-button @click="popup5=false" color="primary" type="filled">No</vs-button>
          </vs-popup>
          
        </vs-col>
      </vs-row>
    </div>
  </template>
  
  <script>
  import Heroe from '@/components/heroes/Heroe.vue';
  import MarvelApiService from '../services/MarvelApiService';
  
  export default {
    name: 'Team',
    data() {
      return {
        characters: [],
        teamName: '',
        popup: false,
        popup2: false,
        popup3: false,
        popup4: false,
        popup5: false,
        dangerInput: false,
        teams: [],
      };
    },
    components: {
      Heroe,
    },
    created() {
      this.fillCharacters();
      let { teams } = localStorage;
      if (typeof teams === 'undefined') {
        teams = {};
      } else {
        teams = JSON.parse(teams);
      }
      this.teams = teams;
    },
    methods: {
      fillCharactersArray(characters) {
        this.characters = [];
        characters.forEach((character) => {
          this.characters.push(character.data.results[0]);
        });
      },
      
      async fillCharacters() {
        const characters = [];
        const ids = this.$session.get('team');
        console.log(ids);
        if (typeof ids !== 'undefined') {
          for (const id of ids) {
            const heroe = await MarvelApiService.findCharacterById(id);
            console.log(heroe);
            characters.push(heroe);
           
          }
        }
        this.fillCharactersArray(characters);
      },
      
      deleteTeam() {
        this.$session.set('team', []);
        this.characters = [];
        this.popup2 = false;
        this.popup5 = false;
      },
      
      
    },
  };
  </script>