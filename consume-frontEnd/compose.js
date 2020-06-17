window.addEventListener( "load", function () {
  function sendData() {
    const XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    const FD = new FormData( form );
    let urlEncodedData = "",
      urlEncodedDataPairs = [],
      name;

    // Turn the data object into an array of URL-encoded key/value pairs.
    for( pair of FD.entries() ) {
      console.log(pair[0] + "=" + pair[1]);
      urlEncodedDataPairs.push( encodeURIComponent( pair[0] ) + '=' + encodeURIComponent( pair[1] ) );
    }

    // Combine the pairs into a single string and replace all %-encoded spaces to
    // the '+' character; matches the behaviour of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );
    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
      alert( event.target.responseText );
    } );

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
      alert( 'Oops! Something went wrong.' );
    } );

    // Set up our request
    XHR.open( "POST", "http://localhost:3000/articles" );

    XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

    // The data sent is what the user provided in the form
    XHR.send( urlEncodedData );
  }

  // Access the form element...
  const form = document.getElementById( "composeForm" );

  // ...and take over its submit event.
  form.addEventListener( "submit", function ( event ) {
    event.preventDefault();

    sendData();
  } );
} );
