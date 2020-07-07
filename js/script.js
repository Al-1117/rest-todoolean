// CONSEGNA
// Utilizzando le API Todos di Boolean creiamo un’interfaccia in cui possiamo leggere, creare e
// rimuovere degli elementi da una todo-list

// numero della mia porta: 3024

$(document).ready(function(){

  // Recuperare e Leggere i dati dall'API Todos
  //TRAMITE L'APPOSITA FUNZIONE
    getDataTodos();



  // Creare i dati  e caricarli sull'API Todos tramite
  // l'inserimento del messaggio e click sull'apposito tasto
  //TRAMITE L'APPOSITA FUNZIONE

    createDataTodos();


  // Elimino i dati dall'Api
  //TRAMITE L'APPOSITA FUNZIONE
  deleteDataTodos();



  //////////////////////////// FUCTIONS//////////////

  // Funzione per recuperare e leggere i dati dall'API Todos

  function getDataTodos(){

    // Resetto la lista
    $('.todo_container').html('');
    // Effettuo la chiamata AJAX all'API corrispondente inserendo il numero di porta
    // personale per recuperare i dati Todos
    $.ajax({
      url: 'http://157.230.17.132:3024/todos/',
      method: 'GET',

      success: function(dataTodos){
        console.log(dataTodos);

        // Inserisco le variabili di handlebars
        var source = $("#todos-template").html();
        var template = Handlebars.compile(source);

        // Inizializzo un ciclo FOR per poter scorrere tra gli elementi dell'oggetto
        // dopo, compilo il template handlebars e lo stampo nell'HTML
        for (var i = 0; i < dataTodos.length; i++) {

          var singleTodoItem =  dataTodos[i];

          console.log(singleTodoItem);

          var context = {
            todoItem: singleTodoItem.text,
            id: singleTodoItem.id,
          };

          var html = template(context);

          // Inserisco i dati nel container della lista delle cose da fare
          $('.todo_container').append(html);
        };

      },
      // IN CASO DI ERRORE, LO COMUNICO
      error: function(){
        console.log('qualcosa è andato storto');
      },


    });






  }

  // Funzione per creare e caricare i dati sull'API Todos



  function createDataTodos(){

    $(document).on('click','.input_button button',
      function(){
        // Effettuo la chiamata AJAX all'API corrispondente inserendo il numero di porta
        // personale per leggere i dati Todos già esistenti e poi poter aggiungerne altri.

        // Prendo il dato dall'input
        var newItem = $('.input_button input').val();

        $.ajax({

          url: 'http://157.230.17.132:3024/todos/',
          method: 'POST',

          // inserisco il valore dell'input nel campo text
          data:{
            text: newItem,

          },

          success: function(data){
            getDataTodos();
            // // Inserisco le variabili di handlebars
            // var source = $("#todos-template").html();
            // var template = Handlebars.compile(source);
            //
            // var context = {
            //   todoItem: newItem,
            // };
            //
            // var html = template(context);
            //
            // // Aggiungo i dati nel container della lista delle cose da fare
            // $('.todo_container').append(html);

          },
          // IN CASO DI ERRORE, LO COMUNICO
          error: function(){
            console.log('qualcosa è andato storto');
          },

        });




      }

    );



  }


  // Funzione per eliminare i dati dall'API Todos

  function deleteDataTodos(){
    $(document).on('click','.delete',
      function (){

        var thistodoItem = $(this).parent().attr('data_id');


        $.ajax({
          url: 'http://157.230.17.132:3024/todos/' + thistodoItem,
          method: 'DELETE',
          success: function(data){
            getDataTodos();
          },
          error: function(){
            console.log('si è verificato un errore, impossibile completare l operazione.');
          },
        });

      }
    );

  }

























});
