//CLASE C104
//comenzamos el archivo JavaScript

//Agregaremos el código para configurar la cámara
  Webcam.set({
    //para el ancho de la vista
    width:350,
    //para el alto
    height:300,
    //el tipo de archivo que tendrá la imagen será png
    image_format : 'png',
    //la calidad con la que se verá nuestra cámara
    png_quality:90
  });
//obtenemos el elemento donde mostraremos la camara web
  camera = document.getElementById("camera");
//para decirle donde queremos que se vea la camara WEB
//esta cámara se abrirá desde que cargue la pantalla
Webcam.attach( "camera" );


//definimos la funcion que tomará la foto
function take_snapshot()
{
    //usamos la funcion snap para que tome la foto
    Webcam.snap(function(data_uri) {
      //para decirle donde mostrará la imagen capturada
      //vamos a actualizar el div para mostrar la imagen, por lo que agregamos
      //una etiqueta IMG
      document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}







//comienza el uso de la red neuronal

//libreria ml5
//la importamos al HTML desde la actividad 1
//mostraremos en la consola la version de ml5
//si nos aparece sin ningun error, podremos usarla
  console.log('ml5 version:', ml5.version);
  

  //importaremos nuestro modelo en el archivo
  //definimos una variable
  //escribimos el nombre de la librería que vamos a usar
  //usamos la funcion de clasificacion que es una funcion predefinida
  //hay que ponerle como primer parametro, nuestro enlace
  //TENEMOS que agregarle al final "model.json" porque soloqueremos acceder al aprendizaje automatico
  //DESPUES agregamos el nombre de una funcion que se ejecutará a continuacion
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8aKpS4kd3/model.json',modelLoaded);


//definimos la funcion modelLoaded
//esta solo mostrará en la consola el mensaje de que el modelo ha sido cargado
  function modelLoaded() {
    console.log('Model Loaded!');
  }
      




  //////////////
  //CLASE C105
  //creamos la funcion para verificar si la imagen es como la que esperabamos o no
  function check()
  {
    //obtenemos la foto guardada
    img = document.getElementById('captured_image');
    //llamamos a la funcion predefinida de ml5.js se usa para comparar la imagen que tiene el modelo
    //con la foto que acabamos de tomar
    //CLASSIFIER: es la variable que contiene el modelo que creamos
    //CLASSIFY: funcion predefinida de ml5.js, se utiliza para comparar imagenes
    //debemos mandarle la imagen que tomamos como un parametro
    //el otro parámetro será la funcion que se va a ejecutar a continuacion
    classifier.classify(img, gotResult);
  }

//creamos la funcion que comprobara los resultados
//la primera parte es para mostrar lo que pasará cuando haya un error en la comparacion
function gotResult(error, results) {
  //si hay un error, imprimirá en la consola "error"
  if (error) {
    console.error(error);
  } else {
    //si no hay error, mostrará los resultados en la consola en un array
    console.log(results);
    //mostraremos el nombre del objeto que se mostró primero, es el más semejante
    document.getElementById("result_object_name").innerHTML = results[0].label;
    //obtenemos la precision redondeada a 3 decimales
    document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
  }
}
