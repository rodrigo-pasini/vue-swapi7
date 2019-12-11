<template>
    <div>

    
        <div class='row mt-4'>
            <b-col v-for="(film, index) in films" v-bind:key=index style="min-width: 33%; max-width: 33%; margin-top: 15px;">
                <b-card
                    :title='film.title'
                    :img-src='film.img'
                    :img-alt='film.title'
                    img-top
                    tag='article'
                    style=" max-width: 100%;"
                    class=""
                >
                    <b-card-text>
                        <dl>
                        <dt>Episódio</dt>
                        <dd>{{film.episode_id}}</dd>
                        <dt>Diretor</dt>
                        <dd>{{film.director}}</dd>
                        <dt>Data de Lançamento</dt>
                        <dd>{{film.release_date}}</dd>
                        </dl>
                    </b-card-text>
                    <b-button :to="{name: 'Film_detail', params:{film: film.url}}" variant="dark">Ver Detalhes</b-button>
                    
                </b-card>
            </b-col>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
import { async } from 'q';

    export default {
        name: 'Films',
        data(){
            return {
                films: [],
                proxy: 'http://cors-anywhere.herokuapp.com/',
                img: "https://cdn.pixabay.com/photo/2017/11/01/14/24/star-wars-2908139_960_720.jpg",
                alt: "Card Image",
                imgtitle: "Filmes Star Wars",
                imgsubtitle: "",
                text: "Swapi Star Wars API"
            }
        },
        created: async function() {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            // axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'access-control-allow-origin';
            try {
                const url = 'https://swapi.co/api/films/';
                const dataapi = await axios.get(url);
                this.films = dataapi.data.results;
                this.films.forEach(async function(element, index) {
                    let img = await this.getImage(element);
                    this.films[index].img = img;
                    await this.$forceUpdate();
                }.bind(this));
                

            } catch (e) {
                console.log(e);

            };

            

            
        },

        methods: {
            getImage: async function (film) {
                const imgurl = 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + film.title;
                try {
                    const responseimg = await axios.get(imgurl)
                    let poster =  responseimg.data.results[0].poster_path ;
                    let imagem = 'http://image.tmdb.org/t/p/w500' + poster;
                    return imagem;
                } catch (e) {
                    console.log(e);
                    return '';
                }
            },
        }
    };
</script>