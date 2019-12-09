<template>
    <div>

    
        <div class='row mt-4'>
            <b-col style="min-width: 100%; max-width: 100%; margin-top: 15px;">
                <b-card
                    :title='film.title'
                    
                    :img-src='film.img'
                    :img-alt='film.title'
                    img-left
                    tag='article'
                    style=" max-width: 100%;"
                    class=""
                >
                    <b-card-text>
                        <div class="row" style="margin:4px;">
                            <div class="text-muted">Episódio {{film.episode_id}}</div>
                        </div>
                        <div class="row" style="margin:5px">
                            {{film.opening_crawl}}
                        </div>
                        <dl style="margin:4px;">
                            <dt>Data de Lançamento</dt>
                            <dd>{{film.release_date}}</dd>
                            <dt>Diretor</dt>
                            <dd>{{film.director}}</dd>
                            <dt>Produtor(es)</dt>
                            <dd>{{film.producer}}</dd>
                        </dl>
                    </b-card-text>
                    <div class="row">
                        <simplechar :characters=film.characters></simplechar>
                    </div>
                    <b-button :to="{name: 'Films'}" variant="dark">Voltar</b-button>
                    
                </b-card>
            </b-col>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import simplechar from '@/components/SimpleCharacters'
    export default {
        name: 'FilmDetail',
        components: {
            simplechar,
        },
        
    
        beforeMount: async function() {
            var proxy = 'http://cors-anywhere.herokuapp.com/';

            var url = this.$route.params['film'];

            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, false);
            xhttp.send();
            this.film = JSON.parse(xhttp.responseText);
            console.log(JSON.parse(xhttp.responseText));

            // this.$http.get(proxy + url).then(
            //     async function(response) {
                    
            //         this.film = response.body;
                    
            //     }
            // );

            
        },

        data(){
            return {
                film: [],
                img: "https://cdn.pixabay.com/photo/2017/11/01/14/24/star-wars-2908139_960_720.jpg",
                alt: "Card Image",
                imgtitle: "Filmes Star Wars",
                imgsubtitle: "",
                text: "Swapi Star Wars API"
            }
        },
        methods: {
            
        }
    };
</script>