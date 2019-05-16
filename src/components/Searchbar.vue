<template>
    <div id="wrapper">
        <label for="input-with-list">Enter a country</label>
        <div id="searchBarDiv">
            <b-form-input list="input-list" id="input-with-list" v-model="countryInput" placeholder="Enter country to get population for"></b-form-input>
            <b-form-datalist id="input-list" :options="countries.countries"></b-form-datalist>
            <b-button id="submitbutton" @click="getPopulationByCountry(); getEmissionByCountry()" class="inline-button">Search</b-button>
        </div>
        <div v-if="isVisible" class="tableContainer">
            <b-table class="tableInnerContainer" :items="results[0]" :fields="fields">
            </b-table>
        </div>
        <!--<div v-if="results.length != 0">
            <div v-for="item in results">
                <p>{{ item }}</p>
            </div>
        </div>-->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import JQuery from 'jquery'

let $ = JQuery

$(function () {
    $('#input-with-list').keypress(function (e) {
        var key = e.which
        if(key === 13) {
            $('#submitbutton').click()
        }
    })
    $('#input-list').keypress(function (e) {
        var key = e.which
        if(key === 13) {
            $('#submitbuttin').click()
        }
    })
})

export default {
    name: 'Searchbar',
    data () {
        return {
            fields: ['year', 'population', 'emissions'],
            countryInput: '',
            items: [],
            isVisible: false
        }
    },
    methods: {
        getAll: function () {
            this.$store.dispatch('getResults')
        },
        getPopulationByCountry: function () {
            let items = this.items
            this.$store.dispatch('getPopulationByCountry', this.countryInput).then((response) => {
                for(let i = 0; i <= this.results[0].data.populationByYear.population.length; i++) {
                    let object = this.items[i]
                    if(typeof object === 'undefined') {
                        continue
                    }
                    if(this.results[0].data.populationByYear.population[i] === '') {
                        object['population'] = 'N/A'
                    } else {
                        object['population'] = this.results[0].data.populationByYear.population[i]
                    }
                    this.items[i] = object
                }
                this.$store.commit('SET_RESULT', { results: this.items })
            })
            this.isVisible = true
        },
        getEmissionByCountry: function () {
            let items = this.items
            this.$store.dispatch('getEmissionByCountry', this.countryInput).then((response) => {
                for(let i = 0; i <= this.results[0].data.emissionsByYear.emissions.length; i++) {
                    let object = this.items[i]
                    if(typeof object === 'undefined') {
                        continue
                    }
                    if(this.results[0].data.emissionsByYear.emissions[i] === '') {
                        object['emissions'] = 'N/A'
                    } else {
                        object['emissions'] = this.results[0].data.emissionsByYear.emissions[i]
                    }
                    this.items[i] = object
                }
                this.$store.commit('SET_RESULT', { results: this.items })
            })
        }
    },
    computed: {
        ...mapGetters(['results', 'countries'])
    },
    mounted: function () {
        this.$store.dispatch('getCountries')
        let index = 1960
        while(index <= 2018) {
            this.items.push({'year': index})
            index++
        }
    }
}
</script>

<style lang="scss">

#searchBarDiv {
    width: 30em;
    margin: 0 auto;
    display: flex;
}

.tableContainer {
    max-width: 50%;
    margin: 0 auto;
    margin-top: 1rem;
}
</style>
