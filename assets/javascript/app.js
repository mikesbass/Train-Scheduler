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
			$( '#jumpers' ).append( row );

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

			var jumperData = '',
        name = '',
        destination = '',
        firstJumper = '',
        frequency = '';

  	jumpers.on("child_added", function (childSnapshot) {
    jumperData = childSnapshot.val(),
    name = jumperData.name,
    destination = jumperData.destination,
    firstJumper = jumperData.first_jumper,
    frequency = jumperData.frequency;
    
    buildSchedule(name, destination, firstJumper, frequency);
    
  }, errData);
  function errData(data) {
    console.log(data);
  }

  function buildSchedule(name, destination, firstJumper, frequency) {
    var newRow = $("<tr>"),
        mdlCellClass = "mdl-data-table__cell--non-numeric",
        nextJumper = getNextJumper(firstJumper, frequency);

    console.log(getNextJumper(firstJumper, frequency));

			function getNextJumper(start, interval)
			{
				var now = moment(),
				hours= start.substr
			}

			function getNextJumper(start, interval) {
    var now = moment(),
        hours = start.substr(0, 2),
        minutes = start.substr(3, 4),
        jumpers = moment().startOf('day').hour(parseInt(hours)).minute(parseInt(minutes)),
        duration = moment.duration(now.diff(jumpers)).asMinutes(),
        minutesUntil = duration % interval,
        nextJumper = interval - minutesUntil,
        newJumper = now.add(nextJumper, "minutes").format("HH:MM");
    
			    return moment(now).format("h:mm a"); 
			  }
 				console.log(newJumper); 

			  function resetFields() {
			    $("#jumper-name").val("");
			    $("#destination").val("");
			    $("#first-jumper").val("");
			    $("#frequency").val("");
			  }

			$( "#submit-btn" ).click(

				function () {
					var name = $( "#jumper-name" ).val().trim();
					var role = $( "#destination" ).val().trim();
					var start = $( "#first-jumper" ).val().trim();
					var rate = $( "#frequency" ).val().trim();
					app.defaultDatabase.ref().push( {
						name: name,
						role: role,
						start: start,
						rate: rate,
						dateAdded: firebase.database.ServerValue.TIMESTAMP
					} );

					resetFields();
				}
			);

		}

	};


	// kick off app
	app.init();



	//user events
	//**************************************************//



};