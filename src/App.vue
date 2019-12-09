<template>
  <div id="app">
    <navbar></navbar>
    <b-container>
      
      <router-view />
    </b-container>
  </div>
</template>

<script>
import navbar from '@/components/NavBar'
import title from '@/components/CardTitle';
export default {
  name: "App",
  data: function() {
    return {
      img: "https://cdn.pixabay.com/photo/2017/11/01/14/24/star-wars-2908139_960_720.jpg",
      alt: "Card Image",
      imgtitle: "Filmes Star Wars",
      imgsubtitle: "",
      text: "Swapi Star Wars API"
    }
  },
  components: {
    'rtitle': title,
    'navbar': navbar
  }
  
};
</script>
