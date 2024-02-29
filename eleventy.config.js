const fs = require( 'fs' );
const path = require( 'path' );
const postcss = require( 'postcss' );
const tailwindcss = require( 'tailwindcss' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( "cssnano" )

module.exports = function(eleventyConfig) {

    // Plain file copies
    eleventyConfig.addPassthroughCopy("src/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/**/*.png");
    eleventyConfig.addPassthroughCopy("src/**/*.svg");

    // Simple Library Import Ops //
    eleventyConfig.addShortcode("require", function(pkg) {
        const infoPath = path.join('node_modules', pkg, 'package.json')
        if( !fs.existsSync( infoPath ) ) {
            console.warn( `[11ty] Unable to find requested package '${pkg}' - maybe try $> npm install -D ${pkg}` );
            return "";
        }
        console.info( `[11ty] Importing '${pkg}' as a library...` );
        const info = JSON.parse( fs.readFileSync(infoPath, { encoding: 'utf-8' }) );
        
        let fragment = [];

        for( file of info.files ) {
            const src = path.join( 'node_modules', pkg, file );
            const lib = path.join( eleventyConfig.dir.output, 'lib', pkg );
            const dst = path.join( eleventyConfig.dir.output, 'lib', pkg, file );
            const web = path.join( 'lib', pkg, file );
            
            fs.mkdirSync( lib, { recursive: true } );
            fs.copyFileSync( src, dst );

            if( file.endsWith(".js") )
                fragment.push( `<script type="text/javascript" src="/${web}"></script>` );
            else if( file.endsWith(".css") )
                fragment.push( `<link rel="stylesheet" href="/${web}">` );
        }

        return fragment.join('\n');
    });

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