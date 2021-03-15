
//funcion que se ejecuta al hacer click en enviar

$(document).ready(function(){
    
  //si click en submit
    $('#submit').click(function () {
        //asigno el valor de los inputs
        let tituloValidador = $('#title').val();
        let descripcionValidador = $('#description').val();
        //compruebo si estan vacios, si es true agrego clase incompleto
      if (tituloValidador == '') {
         $("#title").addClass("incompleto");
      }
      if (descripcionValidador == '') {
         $("#description").addClass("incompleto");
      }
      
      //si tienen texto ejecuta la funcion saveTask
      if(tituloValidador != '' & descripcionValidador != ''){
          saveTask();
          mensajeCreado();
          limpiar();
        
      }
 
    })

    //si tenia un campo vacio y quiero completarlo al hacer click me borra la clase incompleto
        $('#title').click(function () {
         $("#title").removeClass("incompleto");
       
        })
    
        $('#description').click(function () {
            $("#description").removeClass("incompleto");
           
        })

        //limpia los campos una vez creada la tarea
        function limpiar(){
            $('#title').val('');
            $('#description').val('');
        }

    
        //notificacion si se crea una tarea
        function mensajeCreado(){
            $('#aviso').animate({
                left: 0
            });
            
        }

        $("#notificacion").click(function(event){
            event.preventDefault();
            $('#aviso').animate({
                left: -4510
            });
        });


 });
 
 
 
    //al iniciar traigo el arreglo tasks del localStorage para ver si tenia algo guardado
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    //si esta vacio entonces muestro el aviso de que no hay tareas
    if (tasks.length == 0) {
        console.log('vacio')
        let avisoVacio = document.getElementById("sinTareas");
        avisoVacio.style.display = "block";
    }
   

  function saveTask(){
     //guardo los valores que tengan title y description
 
     
     let title = document.getElementById('title').value;
     let description = document.getElementById('description').value;
     
     //creo un objeto que tiene dos propiedades, el titulo y descripcion
     const task= {
         title, //title : title
         description // desciption: description
     };
 
 
     //el localStorage va a tener todas las tareas, si esta vacio creo un arreglo que contenga las tareas
     // si ya tiene tareas creadas se las actualizo al arreglo y le agrego las nuevas
 
     //vemos si en el localStorage tenemos tasks pero con valor null
     if(localStorage.getItem('tasks') === null){
 
         //creamos un arreglo
         let tasks = [];
         //lo llenamos con la tarea nueva
         tasks.push(task);
         //lo almacenamos en el localStorage
         localStorage.setItem('tasks', JSON.stringify(tasks));
     }else{ 
         //si ya existen valores voy  a empezar a actualizarlos y agregarlos nuevamente
         
         let tasks = JSON.parse(localStorage.getItem('tasks'));
         
         tasks.push(task);
         localStorage.setItem('tasks', JSON.stringify(tasks));
     }
 
     getTask();

     let avisoVacio = document.getElementById("sinTareas");
     avisoVacio.style.display = "none";
 
 }
 
 
 
 
 //imprime
 function getTask(){


     //task va a tomar el arreglo que esta en el localStorage
     let tasks = JSON.parse(localStorage.getItem('tasks'));
     let hayAlgo= 1;
     
     //tomo la etiqueta con clase notas-ul
     let tasksView = document.getElementById('notas-ul');
 
     //vacio por las dudas
     tasksView.innerHTML = '';
     //recorro el arreglo tasks que tiene las tareas
     for (let i = 0; i < tasks.length; i++) {
         
         //para cada item del arreglo guardo el titulo y descripcion
         let description = tasks[i].description;
         let title = tasks[i].title;
 
         //hago una plantilla html, ya pensada cuando maquete el body, y agrego como valor las variables
         tasksView.innerHTML += `<li class='notas-li'> 
         
         <h1 class='notas-titulo'> ${title}</h1>
         
         <p class='notas-descripcion'> ${description}</p>
 
         <input type="button" id='btnEliminar' class="botonEliminar" value="Eliminar"  onclick="deleteTask('${title}')" >
         
         
         
         </li>`
         
         
 
     }

     return hayAlgo;
 }
 
 //funcion para borrar tareas
 function deleteTask(title){
     //title es la variable asociada al boton de borrar
 
     //comparo con un for si coincide con el titulo de alguna tarea
     let tasks = JSON.parse(localStorage.getItem('tasks'));
     for (let i = 0; i < tasks.length; i++) {
 
         //si coincide quito ese elemento del array
         if(tasks[i].title == title){
             tasks.splice(i, 1);
         }
         
     }
 
     localStorage.setItem('tasks', JSON.stringify(tasks));
     getTask();
    
    //vuelvo a comprobar si esta vacio el arreglo tasks, para mostrar el aviso
     if (tasks.length == 0) {
        console.log('vacio')
        let avisoVacio = document.getElementById("sinTareas");
        avisoVacio.style.display = "block";
    }else{
        let avisoVacio = document.getElementById("sinTareas");
        avisoVacio.style.display = "none";
    }
     
 }

 


getTask()