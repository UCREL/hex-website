const fs = require( 'fs' );
const path = require( 'path' );
const postcss = require( 'postcss' );
const tailwindcss = require( 'tailwindcss' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( "cssnano" );

module.exports = function(eleventyConfig) {

    // Plugins :)
    eleventyConfig.addPlugin( require("@11ty/eleventy-plugin-syntaxhighlight") );

    // Plain File Copies
    eleventyConfig.addPassthroughCopy("src/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/**/*.png");
    eleventyConfig.addPassthroughCopy("src/**/*.svg");

    // Filters
    require( './src/_11ty/filters/is_array.js' )( eleventyConfig );

    // Shortcodes
    require( './src/_11ty/shortcodes/gravatar.js' )( eleventyConfig );
    require( './src/_11ty/shortcodes/require.js' )( eleventyConfig );
    require( './src/_11ty/shortcodes/mermaid.js' )( eleventyConfig );
    require( './src/_11ty/shortcodes/figures.js' )( eleventyConfig );

    // Data Formats
    require( './src/_11ty/data/bibtex.js' )( eleventyConfig );
    require( './src/_11ty/data/yaml.js' )( eleventyConfig );

    // Manual ignores
    eleventyConfig.ignores.add( "README.md" );
    eleventyConfig.ignores.add( "_11ty" );

    // Sorting order for Articles and Guides
    function sortByTitle(a,b) {
        return ('' + a.data.title).localeCompare(b.data.title);
    }

    eleventyConfig.addCollection( "article", (collectionApi) => collectionApi.getFilteredByTag("article").sort( sortByTitle ) );
    eleventyConfig.addCollection( "guide", (collectionApi) => collectionApi.getFilteredByTag("guide").sort( sortByTitle ) );

    // PostCSS transform + dumb reload mechanism
    eleventyConfig.on( 'eleventy.before', async ({ dir, runMode, outputMode }) => {
        const cssRoot = path.join( dir.output, 'assets', 'css' );
        if( fs.existsSync(cssRoot) )
            fs.rmdirSync( cssRoot, { recursive: true, force: true } );
    } );

    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", {
        outputFileExtension: "css",
        
        compile: async function (content, inputPath) {
            let parsed = path.parse(inputPath);
            if (parsed && parsed.ext.endsWith('.css')) {
                const minified = await postcss([tailwindcss(require( './tailwind.config.js' )), autoprefixer(), cssnano()])
                                        .process(content, { from: undefined });
                
                return () => minified.css;
            }
            return () => "BAD_DATA " +parsed.name;
        }
    })

    return {
        templateFormats:        ['md', 'njk'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine:     'njk',

        dir: {
            input:    'src',
            output:   'dist',
            includes: '_includes',
            layouts:  '_includes/layouts'
        }
    }
};