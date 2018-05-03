<template>
<v-toolbar-items >
  <v-btn flat to='/HomePage' exact :active-class='activeClass' class='hidden-sm-and-down'>Home</v-btn>
</v-toolbar-items>
</template>

<script>
import activeClass from './activeClassMixin';

export default {
  name: 'DocumentationNavMenu',
  mixins: [
    activeClass,
  ],
};

</script>