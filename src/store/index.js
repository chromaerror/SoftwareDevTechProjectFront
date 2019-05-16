import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const SET_RESULT = 'SET_RESULT'
const SET_COUNTRIES = 'SET_COUNTRIES'
const SET_ERRORSTATE = 'SET_ERRORSTATE'

const store = {
    state: function () {
        let baseState = {
            results: [],
            countries: [],
            errorstate: false
        }

        return baseState
    },

    mutations: {
        [SET_RESULT]: (state, { results }) => {
            state.results = [results]
        },
        [SET_COUNTRIES]: (state, { countries }) => {
            state.countries = countries
        },
        [SET_ERRORSTATE]: (state, { errorstate }) => {
            state.errorstate = errorstate
        }
    },

    actions: {
        getResults ({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('http://localhost:5000/getPopulation')
                .then((response) => {
                    commit(SET_RESULT, { results: response.data })
                    resolve()
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        getPopulationByCountry ({ commit }, country) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:5000/getPopulationByCountry', {'selected_country': country})
                .then((response) => {
                    commit(SET_RESULT, { results: response.data })
                    resolve()
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        getEmissionByCountry ({ commit }, country) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:5000/getEmissionByCountry', {'selected_country': country})
                .then((response) => {
                    commit(SET_RESULT, { results: response.data })
                    resolve()
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        getCountries ({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('http://localhost:5000/getCountries')
                .then((response) => {
                    commit(SET_COUNTRIES, { countries: response.data })
                    resolve()
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    },

    getters: {
        results: state => state.results,
        countries: state => state.countries,
        errorstate: state => state.errorstate
    }
}

export default new Vuex.Store(store)
