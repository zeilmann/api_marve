<template>
  <div>
    <div v-if="!loading">
      <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12" style="margin-top: 20px">
        <vs-col vs-lg="6" vs-sm="10" vs-xs="12">
          <vs-card class="cardx" fixedHeight>
            <div slot="header">
              <h3>{{ character.name }}</h3>
              <vs-button v-if="!inMyTeam" color="primary" type="filled"
              v-on:click="addInMyTeam" style="margin-top: 10px">Add in my team
            </vs-button>
            <vs-button v-else @click="deleteFromMyTeam" color="primary" type="filled" style="margin-top: 10px">Delete
            </vs-button>
            </div>
            <div slot="media" class="teste">
             
           <img id="image" :src="character.thumbnail.path + '.' + character.thumbnail.extension" >
           <h2>Some Comics</h2>
           <p v-for="comic_detais in comics_1" >
            
          {{comic_detais.title}}
           
           </p>
               
            </div>
            
            <div>
              <h4>Description</h4>
              <p v-if="character.description">{{ character.description }}</p>
              <p v-else>Sorry, no description available.</p>
         
            </div>
           
          </vs-card>
          <vs-popup class="holamundo" title="Heroe added to your team!" :active.sync="popup">
            <p>
              The heroe {{ character.name }} has been succesfully added to your team!
            </p>
          </vs-popup>
          <vs-popup class="holamundo" title="Heroe deleted!" :active.sync="popup2">
            <p>
              This heroe ha been succesfully deleted from your team!
            </p>
          </vs-popup>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import MarvelApiService from '@/services/MarvelApiService';

export default {
  name: 'HeroeDetails',
  data() {
    return {
      loading: true,
      character: null,
      firstComic: null,
      lastComic: null,
      popup: false,
      popup2: false,
      team: null,
      isInMyTeam: false,
      comics_ :[],
      comics_1 :[]
    };
  },
  created() {
    this.$vs.loading();
    this.fillCharacter(this.$route.params.id);
    this.team = this.$session.get('team');
    if (typeof this.team === 'undefined') {
      this.team = [];
    }
    
  },

  
  computed: {
    thumbnailCharacter() {
      if (!this.loading) {
        return '';
      }
      return `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`;
    },
    inMyTeam() {
      return this.isInMyTeam;
    },
  },
  methods: {
    
    async fillCharacter(id) {
      const character = await MarvelApiService.findCharacterById(id);
      this.character = character.data.results[0];
      const comics_ = await MarvelApiService.findCharacterBydetails(id);
      console.log(comics_);

      comics_.data.results.forEach((item) => {
       
         this.comics_1.push(item);    
                                            })
     
      this.$vs.loading.close();
      this.loading = false;

      this.isInMyTeam = this.team.includes(this.character.id);
    },
    
    addInMyTeam() {
      if (!this.team.includes(this.character.id)) {
        this.team.push(this.character);
        this.popup = true;
      }
      this.$session.set('team', this.team);
      this.isInMyTeam = true;
      console.log(this.team);
    },
    
    deleteFromMyTeam() {
      if (this.team.includes(this.character.id)) {
        this.team.splice(this.team.indexOf(this.character.id), 1);
        this.popup2 = true;
        this.$session.set('team', this.team);
        this.isInMyTeam = false;
      }
      this.$session.set('team', this.team);
    },
  },
};
</script>



<style scoped>

.teste {
  
  margin: 15px;
       }

img #img{
  width:100%;
  max-width:800px;
  margin: auto;
  display: block;
  
}

</style scoped>