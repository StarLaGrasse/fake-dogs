<template>
    <div class="results-container">

    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default {
    name: 'ResultsPage',
    props: {
    },
    data: function () {
        return {
        };
    },
    mounted: async function()
    {
        this.$store.commit("setResultsOpen", true);
    },
    methods:{
        
    },
    computed: {
        ...mapGetters({
            colorScale: "getColorScale",
            desktop: "getDesktop"
        })
    }
}
</script>
<style scoped lang="scss">
    .results-container {
    }
</style>