<template>
    <v-select label='Fit' 
        :items='filesToFit'
        v-model='selected'
        chips
        deletable-chips
        hint='Pick a file to fit'
        light
        :disabled='filesToFit.length === 0'>
    </v-select>
</template>

<script>
export default {
  name: 'FitList',
};
</script>

<style lang='scss' scoped>
</style>
