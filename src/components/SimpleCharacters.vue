<template>
    <div class='row mt-4'>
        
        <b-col v-for="(char, index) in characters" v-bind:key=index style="min-width: 20%; max-width: 20%; margin-top: 15px;">
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
    </div>
</template>

<script>
    
    export default {
        name: 'SimpleCharacters',
        
        mounted: function() {
            
            var proxy = 'http://cors-anywhere.herokuapp.com/';
            this.characters.forEach(
                function(char){
                  
                    var url = char;
                    this.$http.get(proxy + url).then(
                        function(response) {
                            this.chars.append(response.data);
                    
                        }
                    );
                }
            )
          
            
        },
        data(){
            return {
                chars: [] 
            }
        },
        props: {
            characters:{type: Array}
        },
        methods: {
            
        }
    };
</script>