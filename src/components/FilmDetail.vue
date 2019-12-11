<template>
    <div>
        <div class='row mt-4'>
            <b-col style="min-width: 100%; max-width: 100%; margin-top: 15px;">
                <b-card
                    :title='film.title'
                    :sub-title="'Episódio: ' + film.episode_id"
                    :img-alt='film.title'
                    img-top
                    tag='article'
                    style=" max-width: 100%;"
                    class=""
                >
                    <b-card-text>
                        
                        <div class="row" style="margin:0px;">
                            <div class="col-md-8">
                                {{film.opening_crawl}}
                            </div>
                            <div class="col-md-4">
                                <b-img-lazy v-bind="mainProps" :src="poster" alt="Image 1"></b-img-lazy>
                            </div>
                        </div>
                        <div class="row" style="margin:5px">
                            
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
                            <b-tabs content-class="mt-6">
                                <b-tab title="Personagens" active>
                                    <b-table 
                                        striped 
                                        responsive="sm"
                                        hover
                                        small
                                        :busy.sync='isbusy'
                                        :items='chars'
                                        :fields='fields'
                                        
                                    >
                                    <template v-slot:cell(show_details)="row">
                                        <b-button size="sm" @click="row.toggleDetails" class="btn-sm btn-success mr-2">
                                        {{ row.detailsShowing ? 'Esconder' : 'Mostrar'}} Detalhes
                                        </b-button>
                                    </template>
                                    <template v-slot:row-details="row">
                                        <b-card>
                                        <b-row class="mb-2">
                                            <b-col sm="6" class="text-sm-right"><b>Nascimento:</b></b-col>
                                            <b-col>{{ row.item.birth_year }}</b-col>
                                        </b-row>
                                        <b-row class="mb-2">
                                            <b-col sm="6" class="text-sm-right"><b>Sexo:</b></b-col>
                                            <b-col>{{ row.item.gender }}</b-col>
                                        </b-row>
                                        <b-row class="mb-2">
                                            <b-col sm="6" class="text-sm-right"><b>Cor dos olhos:</b></b-col>
                                            <b-col>{{ row.item.eye_color }}</b-col>
                                        </b-row>
                                        <b-row class="mb-2">
                                            <b-col sm="6" class="text-sm-right"><b>Cor do cabelo:</b></b-col>
                                            <b-col>{{ row.item.hair_color }}</b-col>
                                        </b-row>
                                        <b-row class="mb-2">
                                            <b-col sm="6" class="text-sm-right"><b>Altura:</b></b-col>
                                            <b-col>{{ row.item.height }} cm</b-col>
                                        </b-row>
                                        <b-row class="mb-2">
                                            <b-col sm="6" class="text-sm-right"><b>Peso:</b></b-col>
                                            <b-col>{{ row.item.mass }} Kg</b-col>
                                        </b-row>
                                        <b-row class="mb-2">
                                            <b-col sm="6" class="text-sm-right"><b>Cor da Pele:</b></b-col>
                                            <b-col>{{ row.item.skin_color }}</b-col>
                                        </b-row>
                                        <b-row class="mb-2">
                                            <b-col sm="6" class="text-sm-right"><b>Planeta:</b></b-col>
                                            <b-col>{{ row.item.world }}</b-col>
                                        </b-row>

                                        <b-button size="sm" @click="row.toggleDetails">Esconder</b-button>
                                        </b-card>
                                    </template>
                                    
                                    </b-table>
                                </b-tab>
                                <b-tab title="Naves">
                                    <b-table 
                                        striped 
                                        hover 
                                        :busy.sync='isbusy'
                                        :items='starships'
                                        :fields='ssfields'
                                    >
                                    <template v-slot:cell(show_details)="row">
                                        <b-button size="sm" @click="row.toggleDetails" class="btn-sm btn-success mr-2">
                                        {{ row.detailsShowing ? 'Esconder' : 'Mostrar'}} Detalhes
                                        </b-button>
                                    </template>
                                    <template v-slot:row-details="row">
                                        <b-card>
                                        <b-row class="mb-2">
                                            <b-col sm="6" class="text-sm-right"><b>Classe:</b></b-col>
                                            <b-col>{{ row.item.starship_class }}</b-col>
                                        </b-row>
                                        <b-row class="mb-2">
                                            <b-col sm="6" class="text-sm-right"><b>Custo:</b></b-col>
                                            <b-col>{{ row.item.cost_in_credits }}</b-col>
                                        </b-row>
                                        <b-button size="sm" @click="row.toggleDetails">Esconder</b-button>
                                        </b-card>
                                    </template>
                                    </b-table>
                                </b-tab>
                                <b-tab title="Veículos">
                                    <b-table 
                                        striped 
                                        hover 
                                        :busy.sync='isbusy'
                                        :items='vehicles'
                                        :fields='vehiclesfields'
                                        
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
                episode: '',
                mainProps: {
                    center: true,
                    fluid: true,
                    blank: true,
                    thumbnail: true,
                    blankColor: '#bbb',
                    width: 600,
                    height: 400,
                    class: 'w-25'
                },
                proxy: '',
                isbusy: true,
                fields: [{key:'name', label:'Nome'}, {key:'show_details', label:' '}],
                ssfields:[{key:'name', label:'Nome'}, {key:'model', label:'Modelo'}, {key:'manufacturer', label:'Fabricante'}, {key:'show_details', label:' '}],
                vehiclesfields: [{key: 'name', label: 'Nome'}, {key:'model', label:'Modelo'}, {key:'manufacturer', label:'Fabricante'}, {key:'show_details', label:' '}],
                items: [],
                chars: [],
                starships: [],
                vehicles: [],
            }
        },
        components: {
        },
        created: async function() {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            // axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'access-control-allow-origin';
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
                this.film.vehicles.forEach(async element => {
                    await this.getVehicles(element);
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
                    const dataapiw = await axios.get(dataapi.data.homeworld);
                    dataapi.data.world = dataapiw.data.name;
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
                
            },
            getVehicles: async function (vehicles) {
                try {
                    const dataapi = await axios.get(vehicles)
                    this.vehicles.push(dataapi.data);
                } catch (e){
                    console.log(e);
                }
                
            },
            
        },
    };
</script>