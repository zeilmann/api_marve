<template>
  <div>
     <list-all-heroes />
  </div>
</template>

<script>
import RandomHeroes from '../components/heroes/RandomHeroes.vue';
import ListAllHeroes from '../components/heroes/ListAllHeroes.vue';

export default {
  name: 'Home',
  components: {
    RandomHeroes,
    ListAllHeroes
},
};
</script>
