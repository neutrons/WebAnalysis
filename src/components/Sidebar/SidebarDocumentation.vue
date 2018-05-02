<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for='(chapter, chapterTitle) in tableOfContents' :key='chapterTitle'>
      <div slot='header'>
        <span>{{ chapterTitle }}</span>
      </div>

      <v-card>
        <v-list>
          <v-list-tile v-for='(section, sectionTitle) in chapter.sections' :key='sectionTitle' :href='`#${section}`'>
            <v-list-tile-action>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text='sectionTitle'></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>

    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'SidebarDocumentation',
  data() {
    return {
      tableOfContents: {
        Basics: {
          sections: {
            'App Layout': 'basics-app-layout',
            'Fetch Data': 'basics-fetch-data',
            'Upload Data': 'basics-upload-data',
            'Plot Files': 'basics-plotting-files',
            'Delete Points': 'basics-delete-points',
            'Change Scale': 'basics-change-scales',
            'Toggle Plot Elements': 'basics-toggle-plot-elements',
            'Edit Chart': 'basics-edit-chart',
            'Change Theme': 'basics-change-theme',
            'Unzoom Chart': 'basics-unzoom',
          },
        },
        'Browse Data': {
          sections: {
            Intro: 'browse-intro',
            'Tagging Files': 'browse-tagging-files',
          },
        },
        'Graph Data (Curve Fitting)': {
          sections: {
            Intro: 'fit-intro',
            'Fit Data': 'fit-data',
            'Fit Results': 'fit-results',
            'Select Fit Type': 'fit-select-type',
            'Edit Fit Equation': 'fit-edit-equation',
            'Point Pick': 'fit-point-pick',
            'Levenberg Settings': 'fit-levenberg-settings',
            'SANS Features': 'fit-sans',
            'TAS Features': 'fit-tas',
          },
        },
        'Combine/Normalize Data': {
          sections: {
            Intro: 'combine-intro',
            'Normalize Data': 'normalize-data',
            'Combine Data': 'combine-data',
            TAS: 'combine-tas',
            POWDER: 'combine-powder',
          },
        },
        'Stitch Data': {
          sections: {
            Intro: 'stitch-intro',
            'Stitching Curves': 'stitch-curves',
            'Remove Stitched Curve': 'stitch-remove',
            'Toggling Zoom and Selection': 'stitch-toggle-zoom',
            'Save Stitched Curve': 'stitch-save',
            'Draw Selections': 'stitch-draw-selections',
          },
        },
        SANS: {
          sections: {
            '2D Plots': 'sans-2d',
          },
        },
        TAS: {
          sections: {
            'Metadata Table': 'tas-metadata',
            'Combine Data': 'tas-combine',
          },
        },
        POWDER: {
          sections: {
            'Metadata Table': 'powder-metadata',
            'Normalize Data': 'powder-normalize',
          },
        },
      },
    };
  },
};
</script>
