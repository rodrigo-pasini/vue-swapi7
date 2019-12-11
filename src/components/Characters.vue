<template>
    <div class='row mt-4'>
        <b-col
            v-for="(char, index) in chars" v-bind:key=index
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
                    <dd>{{char.birth_year}}</dd>
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
    name: 'Characters',

    beforeCreate: function () {
        const proxy = 'http://cors-anywhere.herokuapp.com/';
        const url = 'https://swapi.co/api/people';
        this.$http.get(proxy + url).then(
            function (response) {
                this.chars = response.body.results;
                console.log(this.chars);
            },
        );
    },
    data() {
        return {
            chars: [],
        };
    },
    methods: {
    },
};
</script>
