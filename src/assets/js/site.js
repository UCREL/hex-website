( function() {
    const root = document.documentElement;

    /* Theme toggle (initial theme is applied inline in <head>) */
    document.querySelectorAll( "[data-theme-toggle]" ).forEach( button => {
        button.addEventListener( "click", () => {
            const next = root.getAttribute( "data-theme" ) === "dark" ? "light" : "dark";
            root.setAttribute( "data-theme", next );
            try { localStorage.setItem( "theme", next ); } catch( e ) {}
        } );
    } );

    /* Search: Pagefind is loaded on first open, so pages stay light */
    const dialog = document.getElementById( "search-dialog" );
    let searchLoaded = false;

    function loadSearch() {
        if( searchLoaded )
            return;
        searchLoaded = true;

        const css = document.createElement( "link" );
        css.rel = "stylesheet";
        css.href = "/pagefind/pagefind-ui.css";
        document.head.appendChild( css );

        const script = document.createElement( "script" );
        script.src = "/pagefind/pagefind-ui.js";
        script.onload = () => {
            new PagefindUI( { element: "#search", showSubResults: true, showImages: false, autofocus: true } );
            focusSearchInput();
        };
        script.onerror = () => dialog.querySelector( "[data-search-unavailable]" ).classList.remove( "hidden" );
        document.head.appendChild( script );
    }

    function focusSearchInput() {
        const input = dialog.querySelector( "input" );
        if( input )
            input.focus();
    }

    function openSearch() {
        if( !dialog || dialog.open )
            return;
        loadSearch();
        dialog.showModal();
        focusSearchInput();
    }

    document.querySelectorAll( "[data-search-open]" ).forEach( button => button.addEventListener( "click", openSearch ) );

    if( /Mac|iPhone|iPad/.test( navigator.platform ) )
        document.querySelectorAll( "[data-search-shortcut]" ).forEach( el => el.textContent = "⌘ K" );

    document.addEventListener( "keydown", event => {
        const typing = /^(INPUT|TEXTAREA|SELECT)$/.test( event.target.tagName ) || event.target.isContentEditable;
        if( (event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !typing) ) {
            event.preventDefault();
            openSearch();
        }
    } );

    /* Copy buttons on code blocks */
    document.querySelectorAll( ".prose pre, pre.nostyle" ).forEach( pre => {
        if( pre.querySelector( "code.language-mermaid" ) )
            return;

        const wrapper = document.createElement( "div" );
        wrapper.className = "code-block";
        pre.parentNode.insertBefore( wrapper, pre );
        wrapper.appendChild( pre );

        const button = document.createElement( "button" );
        button.type = "button";
        button.className = "code-copy";
        button.textContent = "Copy";
        button.setAttribute( "aria-label", "Copy code to clipboard" );
        button.addEventListener( "click", async () => {
            try {
                await navigator.clipboard.writeText( pre.innerText.trim() );
                button.textContent = "Copied";
            } catch( e ) {
                button.textContent = "Failed";
            }
            setTimeout( () => button.textContent = "Copy", 1600 );
        } );
        wrapper.appendChild( button );
    } );

    /* Highlight the current section in the 'On this page' list */
    const tocLinks = Array.from( document.querySelectorAll( "[data-toc] a" ) );
    if( tocLinks.length && "IntersectionObserver" in window ) {
        const byId = new Map( tocLinks.map( link => [ decodeURIComponent( link.hash.slice( 1 ) ), link ] ) );
        const headings = Array.from( byId.keys() ).map( id => document.getElementById( id ) ).filter( Boolean );
        const visible = new Set();

        const setActive = () => {
            const current = headings.find( h => visible.has( h ) ) ||
                headings.filter( h => h.getBoundingClientRect().top < 120 ).pop();
            tocLinks.forEach( link => link.classList.remove( "is-active" ) );
            if( current )
                byId.get( current.id ).classList.add( "is-active" );
        };

        const observer = new IntersectionObserver( entries => {
            entries.forEach( entry => entry.isIntersecting ? visible.add( entry.target ) : visible.delete( entry.target ) );
            setActive();
        }, { rootMargin: "-80px 0px -65% 0px" } );

        headings.forEach( h => observer.observe( h ) );
    }
} )();
