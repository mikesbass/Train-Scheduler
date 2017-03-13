( function () {
	'use strict';



	//main logic/functionality
	var app = {

		defaultDatabase: null,
		defaultStorage: null,

		appendTableRow: function ( childObject ) {
			var row = $( '<tr>' );
			row.append( $( '<td>' ).append( childObject.name ) );
			row.append( $( '<td>' ).append( childObject.role ) );
			row.append( $( '<td>' ).append( childObject.start ) );
			row.append( $( '<td>' ).append( childObject.rate ) );
			console.log( row );
			$( '#trains' ).append( row );

		},

		init: function () {
			var config = {
			    apiKey: "AIzaSyCsdK7ux1kBLul7fbtiOefktpNFVAMl3Us",
			    authDomain: "train-schedule-d3bc9.firebaseapp.com",
			    databaseURL: "https://train-schedule-d3bc9.firebaseio.com",
			    storageBucket: "train-schedule-d3bc9.appspot.com",
			    messagingSenderId: "706624544883"
			};
			var defaultApp = firebase.initializeApp( config );

			console.log( 'ready to start!' );

			// Initialize the default app
			//var defaultApp = this.defaultApp;

			console.log( defaultApp.name ); // "[DEFAULT]"

			// You can retrieve services via the defaultApp variable...
			this.defaultStorage = defaultApp.storage();
			this.defaultDatabase = defaultApp.database();


			this.defaultDatabase.ref().orderByChild( "dateAdded" ).on( "child_added", function ( childSnapshot ) {
				app.appendTableRow( childSnapshot.val() );
			} );

			$( "#submit-btn" ).click(

				function () {
					var name = $( "#train-name" ).val().trim();
					var role = $( "#destination" ).val().trim();
					var start = $( "#first-train" ).val().trim();
					var rate = $( "#frequency" ).val().trim();
					app.defaultDatabase.ref().push( {
						name: name,
						role: role,
						start: start,
						rate: rate,
						dateAdded: firebase.database.ServerValue.TIMESTAMP
					} );
				}
			);

		}

	};


	// kick off app
	app.init();



	//user events
	//**************************************************//



}() );