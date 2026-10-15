const fs = require( 'fs' );
const path = require( 'path' );
const postcss = require( 'postcss' );
const tailwindcss = require( '@tailwindcss/postcss' );
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const slugify = require("slugify");

module.exports = function(eleventyConfig) {
    
    // Plugins :)
    eleventyConfig.addPlugin( require("@11ty/eleventy-plugin-syntaxhighlight") );
    
    // Plain File Copies
    eleventyConfig.addPassthroughCopy("src/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/**/*.png");
    eleventyConfig.addPassthroughCopy("src/**/*.svg");
    
    // Filters
    require( './src/_11ty/filters/is_array.js' )( eleventyConfig );

    // Builds the 'On this page' list from the rendered h2/h3 headings
    eleventyConfig.addFilter( "toc", function( html ) {
        const headings = [];
        const re = /<h([23])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
        let match;
        while( (match = re.exec( html || "" )) !== null ) {
            const text = match[3]
                .replace( /<a class="anchor"[\s\S]*?<\/a>/g, "" )
                .replace( /<[^>]+>/g, "" )
                .trim();
            if( text )
                headings.push( { level: parseInt( match[1] ), id: match[2], text } );
        }
        return headings;
    } );

    eleventyConfig.addFilter( "readingTime", function( html ) {
        const words = (html || "").replace( /<[^>]+>/g, " " ).split( /\s+/ ).filter( Boolean ).length;
        return Math.max( 1, Math.round( words / 220 ) );
    } );

    // Finds the navigation section (and item) that contains the given URL
    eleventyConfig.addFilter( "navLocate", function( nav, url ) {
        for( const section of nav || [] )
            for( const item of section.items || [] )
                if( item.url === url )
                    return { section, item };
        return null;
    } );

    eleventyConfig.addFilter( "hasAnyTag", function( tags, wanted ) {
        return Array.isArray( tags ) && Array.isArray( wanted ) && wanted.some( tag => tags.includes( tag ) );
    } );

    // Terminal output: {% terminal "name", "command" %} renders src/_includes/terminal/name.ansi,
    // converting ANSI colour codes into styled spans (see .terminal in main.css)
    const escapeHtml = (text) => text.replace( /&/g, "&amp;" ).replace( /</g, "&lt;" ).replace( />/g, "&gt;" );

    function ansiToHtml( text ) {
        const state = { bold: false, dim: false, italic: false, underline: false, strike: false, fg: null };
        let html = "";
        let open = false;

        for( const part of text.split( /(\x1b\[[0-9;]*m)/ ) ) {
            const sgr = part.match( /^\x1b\[([0-9;]*)m$/ );
            if( !sgr ) {
                html += escapeHtml( part );
                continue;
            }
            for( const code of (sgr[1] || "0").split( ";" ).map( Number ) ) {
                if( code === 0 ) Object.assign( state, { bold: false, dim: false, italic: false, underline: false, strike: false, fg: null } );
                else if( code === 1 ) state.bold = true;
                else if( code === 2 ) state.dim = true;
                else if( code === 3 ) state.italic = true;
                else if( code === 4 ) state.underline = true;
                else if( code === 9 ) state.strike = true;
                else if( code === 22 ) state.bold = state.dim = false;
                else if( code === 39 ) state.fg = null;
                else if( (code >= 30 && code <= 37) || (code >= 90 && code <= 97) ) state.fg = code;
            }
            const classes = [ "bold", "dim", "italic", "underline", "strike" ].filter( key => state[key] ).map( key => `ansi-${key}` );
            if( state.fg !== null )
                classes.push( `ansi-fg-${state.fg}` );
            if( open )
                html += "</span>";
            open = classes.length > 0;
            if( open )
                html += `<span class="${classes.join( " " )}">`;
        }
        return html + (open ? "</span>" : "");
    }

    eleventyConfig.addShortcode( "terminal", function( name, command ) {
        const file = path.join( __dirname, "src", "_includes", "terminal", `${name}.ansi` );
        const output = fs.readFileSync( file, "utf-8" ).replace( /^\n+/, "" ).trimEnd();
        const prompt = command ? `<span class="term-prompt">$</span> <span class="term-command">${escapeHtml( command )}</span>\n` : "";
        return `<pre class="terminal" aria-label="Terminal output">${prompt}${ansiToHtml( output )}</pre>`;
    } );
    eleventyConfig.addWatchTarget( "./src/_includes/terminal/" );

    eleventyConfig.addGlobalData( "build", { year: new Date().getFullYear() } );
    
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
    eleventyConfig.ignores.add( "src/_11ty/**" );
    
    // Sorting order for Articles and Guides
    function sortByTitle(a,b) {
        return ('' + a.data.title).localeCompare(b.data.title);
    }
    
    eleventyConfig.addCollection( "article", (collectionApi) => collectionApi.getFilteredByTag("article").filter(page => !Boolean(page.data.draft)).sort( sortByTitle ) );
    eleventyConfig.addCollection( "guide", (collectionApi) => collectionApi.getFilteredByTag("guide").filter(page => !Boolean(page.data.draft)).sort( sortByTitle ) );
    
    // Tailwind watch hooks (theme + plugin config lives in the CSS itself):
    eleventyConfig.addWatchTarget("./src/assets/css/");
    eleventyConfig.addWatchTarget("./src/assets/js/");
    eleventyConfig.addPassthroughCopy("src/assets/js");

    // PostCSS transform + dumb reload mechanism
    eleventyConfig.on( 'eleventy.before', async ({ dir, runMode, outputMode }) => {
        const cssRoot = path.join( dir.output, 'assets', 'css' );
        if( fs.existsSync(cssRoot) )
            fs.rmSync( cssRoot, { recursive: true, force: true } );
    } );
    
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", {
        outputFileExtension: "css",
        
        compile: async function (content, inputPath) {
            let parsed = path.parse(inputPath);
            if (parsed && parsed.ext.endsWith('.css')) {
                const minified = await postcss([tailwindcss({ base: __dirname, optimize: { minify: true } })])
                .process(content, { from: inputPath });
                
                return () => minified.css;
            }
            return () => "BAD_DATA " +parsed.name;
        }
    })
    
    const linkAfterHeader = markdownItAnchor.permalink.linkInsideHeader({
        class: "anchor",
        symbol: "<span aria-hidden=\"true\">#</span>",
        assistiveText: title => `Permalink to “${title}”`,
        style: "aria-labelledby",
    });
    const markdownItAnchorOptions = {
        level: [1, 2, 3],
        slugify: (str) =>
            slugify(str, {
            lower: true,
            strict: true,
            remove: /["]/g,
        }),
        tabIndex: false,
        permalink(slug, opts, state, idx) {
            state.tokens.splice(
                idx,
                0,
                Object.assign(new state.Token("div_open", "div", 1), {
                    // Add class "header-wrapper [h1 or h2 or h3]"
                    attrs: [["class", `heading-wrapper ${state.tokens[idx].tag}`]],
                    block: true,
                })
            );
            
            state.tokens.splice(
                idx + 4,
                0,
                Object.assign(new state.Token("div_close", "div", -1), {
                    block: true,
                })
            );
            
            linkAfterHeader(slug, opts, state, idx + 1);
        },
    };
    
    /* Markdown Overrides */
    let markdownLibrary = markdownIt( { html: true } ).use(markdownItAnchor, markdownItAnchorOptions);

    // Wrap tables so wide ones scroll horizontally instead of breaking the layout on small screens
    markdownLibrary.renderer.rules.table_open = () => '<div class="table-wrap"><table>\n';
    markdownLibrary.renderer.rules.table_close = () => '</table></div>\n';
    eleventyConfig.setLibrary("md", markdownLibrary);

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