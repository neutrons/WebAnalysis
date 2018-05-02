<template>
<v-container pa-3 pl-5>
  <v-layout row wrap mb-5 v-for='(chapter, chapterTitle) in guide' :key='chapterTitle'>
    <v-flex xs12 mb-2>
      <h1 class='mb-2'>{{ chapterTitle }}</h1>
    </v-flex>

    <v-flex xs12 offset-sm1 v-for='(section, sectionTitle) in chapter.sections' :key='section.id'>
      <h3>{{ sectionTitle }}</h3>

      <div v-html='section.content' class='mb-3'></div>
      <span :id='section.id'></span>
    </v-flex>

    <v-flex xs12>
      <v-divider :id='chapterTitle'></v-divider>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Documentation',
  data() {
    return {
      title: 'Welcome to documentation!',
      guide: {
        Basics: {
          sections: {
            'App Layout': {
              id: 'basics-app-layout',
              content: `
                </div>
                  <figure>
                    <image alt='Plot Layout Image' src=''>
                    <figcaption>
                      <p><sup><b>(1)</b></sup> Left side of the page is the control panel. You can select files to plot, fit, or combine. You can change plot scales, tag files, along with other controls specific to feature.</p>
                      <p><sup><b>(2)</b></sup> Middle of page is the plot view. For the top half, users can view the plot or a table of the data being plotted. Immediately below the chart is a toolbar of tools to alter and edit the plot. The bottom half contains additional information related to plot features, such as fit results, file metadata, etc.</p>
                      <p><sup><b>(3)</b></sup> Top page of the page users can Fetch and Upload data, as well as navigate between plot features Browse, Graph, and etc..</p>
                      <p><sup><b>(4)</b></sup> Bottom of page holds the footer which you can change colors themes of the application.</p>
                    </figcaption>
                  </figure>
                <div>
                `,
            },
            'Fetch Data': {
              id: 'basics-fetch-data',
              content: `
                <div>
                  <figure>
                    <image alt='Fetch Data Image' src=''>
                    <figcaption>Click to fetch data from server</figcaption>
                  </figure>
                </div>`,
            },
            'Upload Data': {
              id: 'basics-upload-data',
              content: `
                <div>
                  <figure>
                    <image alt='Click to Upload Image' src=''>
                    <figcaption>Click to upload a file</figcaption>
                  </figure>
                  <br>
                  <p><b>OR</b></p>
                  <br>
                  <figure>
                    <image alt='Drag and Drop Image' src=''>
                    <figcaption>Drag and drop files to upload</figcaption>
                  </figure>
                </div>`,
            },
            'Plot Files': {
              id: 'basics-plot-files',
              content: `
                <div>
                  <p>
                    Use the Files panel in the left sidebar to select files to plot.
                  </p>

                  <image alt='Plot Files Image' src=''>
                </div>`,
            },
            'Change Scale': {
              id: 'basics-change-scales',
              content: `
                <div>
                  <p>
                    Use the Scales panel in the left sidebar to change the current plot's scales...gif goes here.
                  </p>

                  <image alt='Change Plot Scales Image' src=''>
                </div>`,
            },
            'Delete Points': {
              id: 'basics-delete-points',
              content: `
                <div>
                  <p>
                    If you identify an outlier in the plot, simply click the point to delete it. A prompt will be displayed to confirm.
                  </p>

                  <image alt='Delete Points Image' src=''>
                </div>`,
            },
            'Toggle Plot Elements': {
              id: 'basics-toggle-plot-elements',
              content: `
                <div>
                  <p>
                    If you don't need scatter lines, error bars, points, or legends for a given plot, simply toggle the elements off with the button labeled 'Toggle Plot Elements' below the plot view. If you notice the plot is sluggish while zooming and panning, one culprit is too many svg elements on the plot; toggling off plot elements can help improve slow zooming.
                  </p>
                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Edit Chart': {
              id: 'basics-edit-chart',
              content: `
                <div>
                  <p>If you want to edit the current plot, click the 'Edit Chart Button' below the plot. This will take you to a new page where you can customize the appearance of the plot using the Plotly package.</p>

                  <image alt='Edit Plot Image' src=''>
                </div>`,
            },
            'Change Theme': {
              id: 'basics-change-theme',
              content: `
                <div>
                  <p>
                    If you want to change the color of the app's appearance, click one of the three options at the bottom right of the page.
                  </p>

                  <image alt='Change Color Theme Image' src=''>
                </div>`,
            },
            'Unzoom Chart': {
              id: 'basics-unzoom-chart',
              content: `
                <div>
                  <p>
                    If you have zoomed or panned a plot and would like to go to its default state, simply click the 'Unzoom Plot' button below the plot view.
                  </p>

                  <image alt='Unzoom Plot Image' src=''>
                </div>`,
            },
          },
        },
        'Browse Data': {
          sections: {
            Intro: {
              id: 'browse-intro',
              content: `
                <div>
                  <p>
                    The Browse tab is used to quickly navigate through the files by plotting one curve at a time. Users can either click the arrows surrounding the file name at the left side panel or user the left and right arrow keys to plot data. The other feature in browse is the ability to tag files with unique names so that users can filter for specific files when fitting or combining data.
                  </p>
                </div>`,
            },
            'Tagging Files': {
              id: 'browse-tagging-files',
              content: `
                <div>
                  <p>
                    To tag a file use the tag panel to in the left sidebar.
                  </p>

                  <image alt='Tagging Files Image' src=''>
                </div>`,
            },
          },
        },
        'Graph Data (Curve Fitting)': {
          sections: {
            Intro: {
              id: 'fit-intro',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Fit Data': {
              id: 'fit-data',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Fit Results': {
              id: 'fit-results',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Select Fit Type': {
              id: 'fit-select-type',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Edit Fit Equation': {
              id: 'fit-edit-equation',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Point Pick': {
              id: 'fit-point-pick',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Levenberg Settings': {
              id: 'fit-levenberg-settings',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'SANS Features': {
              id: 'fit-sans',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'TAS Features': {
              id: 'fit-tas',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
          },
        },
        'Combine/Normalize Data': {
          sections: {
            Intro: {
              id: 'combine-intro',
              content: `
                <div>
                  <p>
                    Some content for combine's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Normalize Data': {
              id: 'normalize-data',
              content: `
                <div>
                  <p>
                    Some content for combine's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Combine Data': {
              id: 'combine-data',
              content: `
                <div>
                  <p>
                    Some content for combine's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            TAS: {
              id: 'combine-tas',
              content: `
                <div>
                  <p>
                    Some content for combine's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            POWDER: {
              id: 'combine-powder',
              content: `
                <div>
                  <p>
                    Some content for combine's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
          },
        },
        'Stitch Data': {
          sections: {
            Intro: {
              id: 'stitch-intro',
              content: `
                <div>
                  <p>
                    Content for stitch data's
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Stitching Curves': {
              id: 'stitch-curves',
              content: `
                <div>
                  <p>
                    Content for stitch data's
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Remove Stitched Curve': {
              id: 'stitch-remove',
              content: `
                <div>
                  <p>
                    Content for stitch data's
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Toggling Zoom and Selection': {
              id: 'stitch-toggle-zoom',
              content: `
                <div>
                  <p>
                    Content for stitch data's
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Save Stitched Curve': {
              id: 'stitch-save',
              content: `
                <div>
                  <p>
                    Content for stitch data's
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Draw Selections': {
              id: 'stitch-draw-selections',
              content: `
                <div>
                  <p>
                    Content for stitch data's
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
          },
        },
        SANS: {
          sections: {
            '2D Plots': {
              id: 'sans-2d',
              content: `
                <div>
                  <p>
                    Content for 2d's plot
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
          },
        },
        TAS: {
          sections: {
            'Metadata Table': {
              id: 'tas-metadata',
              content: `
                <div>
                  <p>
                    Content for TAS's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Combine Data': {
              id: 'tas-combine',
              content: `
                <div>
                  <p>
                    Content for TAS's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
          },
        },
        POWDER: {
          sections: {
            'Metadata Table': {
              id: 'powder-metadata',
              content: `
                <div>
                  <p>
                    Some content for Powder's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
            'Normalize Data': {
              id: 'powder-normalize',
              content: `
                <div>
                  <p>
                    Some content for Powder's data
                  </p>

                  <image alt='Toggle Plot Elements Image' src=''>
                </div>`,
            },
          },
        },
      },
    };
  },
};
</script>