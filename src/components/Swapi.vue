<template>
    <div class='row mt-4'>
        <b-col v-for="(film, index) in films" v-bind:key=index style="min-width: 33%; max-width: 33%; margin-top: 15px;">
            <b-card
                :title='film.title'
                img-src='http://image.tmdb.org/t/p/w500/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg'
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
                <b-button href="#" variant="dark">Ver Detalhes</b-button>
                
            </b-card>
        </b-col>
    </div>
    
</template>

<script>
    
    export default {
        name: 'Swapi',
        created: function() {
            var proxy = 'http://cors-anywhere.herokuapp.com/';
            var url = 'https://swapi.co/api/films';
            this.$http.get(proxy + url).then(
                function(response) {
                    this.films = response.body.results;
                    for (var film in this.films) {
                        
                        var title = this.films[film].title;
                        var imgurl = 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + title
                        this.$http.get(proxy + imgurl).then(
                            function(imgresponse) {
                                var imagem = 'http://image.tmdb.org/t/p/w500' + imgresponse.body.results[0].poster_path ;
                                this.$set(this.films[film], 'img', imagem)
                                
                            }
                        )
                        
                    }
                    console.log(this.films);
                }
            );

            
        },
        data(){
            return {
                films: []
            }
        },
        methods: {
            getImage: function(title) {
                if (title) {
                    var proxy = 'http://cors-anywhere.herokuapp.com/';
                    var imgurl = 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + title
                    this.$http.get(proxy + imgurl).then(
                        function(imgresponse) {
                            var imagem = 'http://image.tmdb.org/t/p/w500' + imgresponse.body.results[0].poster_path ;
                            console.log(imagem);
                            return  imagem
                            
                        }
                    )
                } else {
                    return 'Nada'
                }
                
            }
        }
    };
</script>