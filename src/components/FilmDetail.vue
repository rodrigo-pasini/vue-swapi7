<template>
    <div>
        <div class='row mt-4'>
            <b-col style="min-width: 100%; max-width: 100%; margin-top: 15px;">
                <b-card
                    :title='film.title'
                    :img-src='poster'
                    :img-alt='film.title'
                    img-right
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
                        <div>
                            <b-tabs content-class="mt-3">
                                <b-tab title="Personagens" active>
                                    <b-table 
                                        striped 
                                        hover
                                        small
                                        :busy.sync='isbusy'
                                        :items='chars'
                                        :fields='fields'
                                        
                                    ></b-table>
                                </b-tab>
                                <b-tab title="Naves">
                                    <b-table 
                                        striped 
                                        hover 
                                        :busy.sync='isbusy'
                                        :items='starships'
                                        :fields='ssfields'
                                        
                                    ></b-table>
                                </b-tab>
                                <b-tab title="Veículos">
                                    <b-table 
                                        striped 
                                        hover 
                                        :busy.sync='isbusy'
                                        :items='chars'
                                        :fields='fields'
                                        
                                    ></b-table>
                                </b-tab>
                            </b-tabs>
                        </div>
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
import { async, reject } from 'q';

    export default {
        name: 'FilmDetail',
        data(){
            return {
                film: [],
                img: "https://cdn.pixabay.com/photo/2017/11/01/14/24/star-wars-2908139_960_720.jpg",
                alt: "Card Image",
                imgtitle: "Filmes Star Wars",
                imgsubtitle: "",
                text: "Swapi Star Wars API",
                poster: '',
                proxy: '',
                isbusy: true,
                fields: [{key:'name', label:'Nome'}],
                ssfields:[{key:'name', label:'Nome'}, {key:'model', label:'Modelo'}],
                items: [],
                chars: [],
                starships: [],
            }
        },
        components: {
        },
        created: async function() {
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'access-control-allow-origin';
            const url = this.$route.params['film'];
            try {
                const dataapi = await axios.get(url)
                this.film = dataapi.data;
                await this.getImage(this.film.title);
                this.film.characters.forEach(async element => {
                    await this.getChar(element);
                });
                this.film.starships.forEach(async element => {
                    await this.getStarships(element);
                });
            } catch (e){
                console.log(e);
            }            
        },
        methods: {
            
            getImage: async function (film) {
                const imgurl = 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + film;
                try {
                    const responseimg = await axios.get(imgurl)
                    let poster =  responseimg.data.results[0].poster_path ;
                    let imagem = 'http://image.tmdb.org/t/p/w500' + poster;
                    this.poster = imagem;
                } catch (e) {
                    console.log(e);
                }
            },
            getChar: async function (char) {
                try {
                    const dataapi = await axios.get(char)
                    this.chars.push(dataapi.data);
                } catch (e){
                    console.log(e);
                }
                
            },
            getStarships: async function (ss) {
                try {
                    const dataapi = await axios.get(ss)
                    this.starships.push(dataapi.data);
                } catch (e){
                    console.log(e);
                }
                
            }
        },
    };
</script>