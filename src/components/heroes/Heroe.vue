<template>
  <div>
    <router-link class="text_avatar" :to="{ name: 'HeroeDetails', params: { id: heroe.id }}">
      <vs-list-item class="text_avatar" :title="heroe.name" vs-justify="left">
        <template slot="avatar">
          <!-- <vs-avatar size="90px" :src="heroe.thumbnail.path + '.' + heroe.thumbnail.extension"/> -->
          <img :src="heroe.thumbnail.path + '.' + heroe.thumbnail.extension" class="rounded-circle "
            />        
        </template>
      </vs-list-item>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Heroe.vue',
  props: {
    heroe: Object,
  },
};
</script>

<style scoped>

.text_avatar {
  text-decoration: none;
}

.rounded-circle{

  margin: 4px;

}

img{
  width:80px;
  height: 80px;
  margin: auto;
  display: block;
  margin-top: 5px;
  border-style: solid;
  border-color: rgb(238, 233, 233);
  
   }

</style scoped>
