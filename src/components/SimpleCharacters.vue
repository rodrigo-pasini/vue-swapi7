<template>
    <div>
        <b-table 
            striped 
            hover 
            :busy.sync='isbusy'
            :items="getChars"
            
        ></b-table>
    </div>




    <!-- <div class='row mt-4'>
        <b-col
            v-for="(char, index) in characters" v-bind:key=index
            style="min-width: 20%; max-width: 20%; margin-top: 15px;"
        >
            <b-card
                :title='char.name'
                img-top
                tag='article'
                style=" max-width: 100%;"
                class=""
            >
                <b-card-text>
                    <dl>
                    <dt>Idade</dt>
                    <dd>{{char}}</dd>
                    <dt>Sexo</dt>
                    <dd>{{char.gender}}</dd>
                    <dt>Planeta</dt>
                    <dd>{{char.homeworld}}</dd>
                    <dt>Altura e peso</dt>
                    <dd>{{char.height}}cm - {{char.mass}}kg</dd>
                    </dl>
                </b-card-text>
                <b-button href="#" variant="dark">Ver Detalhes</b-button>
            </b-card>
        </b-col>
    </div> -->
</template>
<script>
import axios from 'axios';

    export default {
        name: 'SimpleCharacters',
        mounted: function () {
            let its = this.getChars();
            console.log(its);
            // const proxy = 'http://cors-anywhere.herokuapp.com/';
            // this.characters.forEach(
            //     function (char){
            //         let url = char;
            //         this.$http.get(proxy + url).then(
            //             function (response) {
            //                 this.chars.append(response.data);
            //             },
            //         );
            //     },
            // );
        },
        data() {
            return {
                chars: [],
                proxy: 'http://cors-anywhere.herokuapp.com/',
                isbusy: false,
                fields: [
                    { key: 'name' },
                    { key: 'age' },
                    { key: 'gender' },
                ]
            };
        },
        props: {
            characters: { type: Array },
        },
        methods: {
            async getChars (ctx) {
                try {
                    self.chars = Promise.all(this.characters.map((url) => {
                        return axios.get(url)
                    }));
                    console.log('items: ' + self.chars);
                } catch (err) {
                    self.chars = [];
                    console.log(err);
                }
                
            }
        },
    };
</script>
