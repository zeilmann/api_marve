<template>
    <div class="all_body">
      <vs-row vs-align="flex-start"
              vs-type="flex" vs-justify="center" vs-w="12">
        <vs-col vs-lg="6" vs-sm="10" vs-xs="12">
  
          <vs-row vs-type="flex" vs-justify="space-between" vs-w="12" style="margin: 10px 0;">
            <vs-col v-if="teste.length === 0" vs-type="flex" vs-justify="left" vs-align="center" vs-w="4"><h1>No team to show.</h1></vs-col>
            <vs-col v-else vs-type="flex" vs-justify="left" vs-align="center" vs-w="4"><h1>My team</h1></vs-col>
            <vs-col vs-type="flex" vs-justify="flex-end" vs-w="8">
              
             
              <vs-button @click="popup5=true" style="margin: 0 5px" :disabled="teste.length===0">Delete all Team</vs-button>

              
              
            </vs-col>
  
          </vs-row>
          <vs-card>
            <div class="container">
             <div class="row d-flex justify-content-center">

              <div v-for="index in teste" class="card" style="width: 18rem;">
                <router-link :to="{ name: 'HeroeDetails', params: { id: index.id }}">

                
                <img v-if="index.thumbnail.extension === ''" :src="index.thumbnail.path">
                <img v-else :src="index.thumbnail.path + '.' + index.thumbnail.extension">
              </router-link>
                <div class="card-body">
                  <vs-button @click="popupActivo1 = true, id_var = index.id" color="success" type="flat" icon="edit"></vs-button>
                  <h5 class="card-title">{{index.name}}</h5>
                  
                  <p v-if="index.description" class="card-text">{{index.description}}</p>
                  <p v-else class="card-text">Sorry, no description!</p>

                  <div class="row align-items-end">
                    
                
                </div>
                
               </div>
               <ul class="list-group list-group-flush">
                <button @click="popupActivo=true, id_var = index.id" type="button" class="btn btn-danger">Delete</button>
                <input class="form-control" type="file" id="formFile" @click=" id_var = index.id" @change="readFile">
              </ul>
               </div>
             </div>
            </div>

                                    
              
          </vs-card>
          <div class="centerx">
           
            <vs-popup class="holamundo"  title="Delete! Are you sure?" :active.sync="popupActivo">
              <p>
                <vs-button @click="deleteCharacter(id_var)" color="primary" type="filled" style="margin-right: 10px">Yes</vs-button>
                <vs-button @click="popup5=false" color="primary" type="filled">No</vs-button>
              </p>
            </vs-popup>

            <vs-popup class="holamundo"  title="Set new name!" :active.sync="popupActivo1">
              <p>
                <vs-input icon-after="true" icon="mode_edit" v-model="value2"/>
                <br>
                <vs-button @click="changeCharacterName(id_var, value2), popupActivo1 = false" color="success" type="filled">Change Name Now!</vs-button>
              </p>
            </vs-popup>
          </div>
          <vs-popup classContent="popup-example" title="Delete the team " :active.sync="popup5">
            <h2 style="margin-bottom: 10px;">Do you want to delete your team?</h2>
            <vs-button @click="deleteTeam" color="primary" type="filled" style="margin-right: 10px">Yes</vs-button>
            <vs-button @click="popup5=false" color="primary" type="filled">No</vs-button>
          </vs-popup>


          <vs-popup classContent="popup-example" title="Upload this image?" :active.sync="popup7">
            <h2 style="margin-bottom: 10px;">Upload this image?</h2>

            <img :src="this.teste2">
                 
            <vs-button @click="changeCharacterPhoto(id_var), popup7 = false" color="primary" type="filled" style="margin-right: 10px">Yes</vs-button>
            <vs-button @click="popup7=false" color="primary" type="filled">No</vs-button>
          </vs-popup>

          
        </vs-col>
      </vs-row>
    </div>
  </template>
  
  <script>
  import Heroe from '@/components/heroes/Heroe.vue';
  import { readFile } from 'fs';
  //import MarvelApiService from '../services/MarvelApiService';

  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap"




  
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
        popup7: false,
        popupActivo:false,
        popupActivo1:false,
        dangerInput: false,
        teams: [],
        teste: [],
        id_var : 0,
        value2 : "",
        teste1 : "",
        teste2 : "",
        selectedFile : "", 
        FR : new FileReader(),
      };
    },
    components: {
      Heroe,
    },
    created() {
    
    this.listarHerois();  
    this.deleteCharacter()
    },

    teste() {
      this.listarHerois();
      
    },
    methods: {
           
      async listarHerois () {

       const ids = this.$session.get('team');
        if (ids === undefined){
          ids = [];
        }else{
           this.teste = ids;
        }
      },

       deleteTeam() {
        this.$session.set('team', []);
        this.characters = [];
        this.popup2 = false;
        this.popup5 = false;
      },

      deleteCharacter(valor_button){
       
        var filtrado = this.teste.filter(function(obj) { return obj.id != valor_button; });
        
        if ( filtrado.length === 0 ){

        this.$session.set('team', []);

        this.teste = [];
        this.popupActivo = false;

        }else{
     
        this.teste = filtrado;
        this.$session.set('team', this.teste);
        this.popupActivo = false;

        };

      },

      
      changeCharacterName(id, value_Name){

        var filtrado = this.teste.filter(function(obj) { return obj.id === id; });
        if ( value_Name === "") {alert('Please set name!');}
        else {
          filtrado[0].name = value_Name;
          this.$session.set('team', this.teste);
           }

       

    },


    changeCharacterPhoto(id){
      alert(id);

      var filtrado = this.teste.filter(function(obj) { return obj.id === id; });
     
              filtrado[0].thumbnail.path = this.teste2;
              filtrado[0].thumbnail.extension = "";
              this.$session.set('team', this.teste);
              this.selectedFile = "";

                  },



  readFile(e) {


            const FR = new FileReader();
             console.log("alouu");
              
            FR.addEventListener("load", (evt) => {
             localStorage.setItem('minha-imagem', "");
             localStorage.setItem('minha-imagem', evt.target.result);
             this.teste2 = evt.target.result;  
            
             console.log(this.teste2);   
             this.popup7 = true;
             

            }); 
          FR.readAsDataURL(e.target.files[0]);
            
                     
           

           
          
            
            
            },


              printEventType() {
             
                               },



    

    },

   
  };
  </script>

  <style scoped>

 img{
  width:30%;
  margin: auto;
  display: block;
  margin-top: 5px;
 
 };

 h3 {
  border-radius: 1px;
  border: 10px;
 }

 .seletor_1 {
  float: left;
 }

 .seletor_1 {
  display: inline-block !;
  border-radius: 1px;
 }

 .card {
  margin: 2px;
 }

 .col {
  border-style: solid;
 }

 .list-group {
  margin: 5px 20px;
 }

 @media screen and (max-width: 600px) {

  .list-group {
    margin: 1px;
  }

  img{
    width:50%;
    margin: auto;
    display: block;
    margin-top: 5px;
     };

    };

    .all_body {

      background-color: #8BC6EC;
      background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);

    }

    .vs-card--content {
      padding: 10px;
      font-size: .8rem;
      margin-bottom: 15px;
      background-color: #8BC6EC;
      background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
  }

  
 </style scoped>