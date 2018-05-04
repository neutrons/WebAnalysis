<template>
<v-container pa-3 pl-5>
  <v-layout row wrap mb-5 v-for='(chapter, chapterTitle) in guide' :key='chapterTitle'>
    <v-flex xs12 mb-2>
      <h1 class='mb-2 secondary--text'>{{ chapterTitle }}</h1>
    </v-flex>

    <v-flex xs12 v-for='(section, sectionTitle) in chapter.sections' :key='section.id'>
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
                    <img alt='Plot Layout Image' src='../../static/AppLayout.png'>
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
                    <img alt='Fetch Data Image' src='../../static/FetchData.gif'>
                    <figcaption>Click to fetch data from server</figcaption>
                  </figure>
                </div>`,
            },
            'Upload Data': {
              id: 'basics-upload-data',
              content: `
                <div>
                  <figure>
                    <img alt='Click to Upload Image' src='../../static/UploadFile.gif'>
                    <figcaption>Click to upload a file</figcaption>
                  </figure>
                  <br>
                  <p style='text-align: center;'><b>OR</b></p>
                  <br>
                  <figure>
                    <img alt='Drag and Drop Image' src='../../static/DragDrop.gif'>
                    <figcaption>Drag and drop files to upload</figcaption>
                  </figure>
                </div>`,
            },
            'Change Scale': {
              id: 'basics-change-scales',
              content: `
                <div>
                  <p>
                    Use the Scales panel in the left sidebar to change the current plot's scales...gif goes here.
                  </p>

                  <img alt='Change Plot Scales Image' src='../../static/ChangeScales.gif'>
                </div>`,
            },
            'Delete Points': {
              id: 'basics-delete-points',
              content: `
                <div>
                  <p>
                    If you identify an outlier in the plot, simply click the point to delete it. A prompt will be displayed to confirm.
                  </p>

                  <img alt='Delete Points Image' src='../../static/DeletePoint.gif'>
                </div>`,
            },
            'Toggle Plot Elements': {
              id: 'basics-toggle-plot-elements',
              content: `
                <div>
                  <p>
                    If you don't need scatter lines, error bars, points, or legends for a given plot, simply toggle the elements off with the button labeled 'Toggle Plot Elements' below the plot view. If you notice the plot is sluggish while zooming and panning, one culprit is too many svg elements on the plot; toggling off plot elements can help improve slow zooming.
                  </p>
                  <img alt='Toggle Plot Elements Image' src='../../static/TogglingElements.gif'>
                </div>`,
            },
            'Edit Chart': {
              id: 'basics-edit-chart',
              content: `
                <div>
                  <p>If you want to edit the current plot, click the 'Edit Chart Button' below the plot. This will take you to a new page where you can customize the appearance of the plot using the Plotly package.</p>

                  <img alt='Edit Plot Image' src='../../static/EditChart.gif'>
                </div>`,
            },
            'Change Theme': {
              id: 'basics-change-theme',
              content: `
                <div>
                  <p>
                    If you want to change the color of the app's appearance, click one of the three options at the bottom right of the page.
                  </p>

                  <img alt='Change Color Theme Image' src='../../static/ChangeTheme.gif'>
                </div>`,
            },
            'Unzoom Chart': {
              id: 'basics-unzoom-chart',
              content: `
                <div>
                  <p>
                    If you have zoomed or panned a plot and would like to go to its default state, simply click the 'Unzoom Plot' button below the plot view.
                  </p>

                  <img alt='Unzoom Plot Image' src='../../static/UnzoomPlot.gif'>
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

                  <img alt='Tagging Files Image' src='../../static/TaggingFile.gif'>
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
                    The Graph Tab allows users to plot multiple files, as well as perform various types of curve fittings.
                  </p>
                </div>`,
            },
            'Fit Data': {
              id: 'fit-data',
              content: `
                <div>
                  <p>
                    The controls for fitting data are found in the left sidebar panel.
                  </p>

                  <img alt='Fit Data Gif' src='../../static/FitData.gif'>
                </div>`,
            },
            'Fit Results': {
              id: 'fit-results',
              content: `
                <div>
                  <p>
                    The results for fitting a curve will be displayed below the plot view.
                  </p>

                  <img alt='Fit Results Gif' src='../../static/FitResults.gif'>
                </div>`,
            },
            'Edit Fit Equation': {
              id: 'fit-edit-equation',
              content: `
                <div>
                  <p>
                    Users can edit the original fit equation by changing the equation itself or altering the intial coefficient values. Coefficient values can be toggled constant if desired.
                  </p>

                  <img alt='Fit Equation Gif' src='../../static/FitEquation.gif'>
                </div>`,
            },
            'Point Pick': {
              id: 'fit-point-pick',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <img alt='Point Pick Gif' src='../../static/PickPoints.gif'>
                </div>`,
            },
            'Levenberg Settings': {
              id: 'fit-levenberg-settings',
              content: `
                <div>
                  <p>
                    Some content in graph's data
                  </p>

                  <img alt='Levenberg Settings Gif' src='../../static/LevenbergSettings.gif'>
                </div>`,
            },
          },
        },
        'Combine / Normalize Data': {
          sections: {
            Intro: {
              id: 'combine-intro',
              content: `
                <div>
                  <p>
                    Some content for combine's data
                  </p>

                  <img alt='Combine Data Gif' src='../../static/CombineData.gif'>
                </div>`,
            },
            'Store Combined': {
              id: 'combine-stroe',
              content: `
                <div>
                  <p>
                    Users can store combined data and plot then plot it in the graph tab.
                  </p>

                  <img alt='Store Combined Gif' src='../../static/StoreCombined.gif'>
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

                  <img alt='Stitch Data Gif' src='../../static/StitchData.gif'>
                </div>`,
            },
          },
        },
        'Runs Table': {
          sections: {
            Intro: {
              id: 'runs-intro',
              content: `
                <div>
                  <p>
                    Content for runs table
                  </p>

                  <img alt='Runs Table Demo Gif' src='../../static/RunsTable.gif'>
                </div>
              `,
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

                  <img alt='SANS 2D Gif' src='../../static/SANS2D.gif'>
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

                  <img alt='Metadata Table Gif' src='../../static/MetadataTable.gif'>
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
                    Same as <a href='#tas-metadata'>TAS Metadata</a>.
                  </p>
                </div>`,
            },
          },
        },
      },
    };
  },
};
</script>

<style>
img {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

figcaption {
  text-align: center;
}
</style>