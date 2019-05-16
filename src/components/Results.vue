<template>
    <div id="resultContainer">
        <b-button>Refresh results</b-button>
        <p>Results will be here</p>
    </div>
</template>

<script>
import Axios from 'axios'

export default {
    name: 'Results',
    data () {
        return {
            results: ''
        }
    },
    mounted: function () {

    }
}

</script>

<style lang="scss">
</style>
