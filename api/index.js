//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});



 /*Recipe.create({
      title: 'Asado Argentino',
      image:
        'https://www.tangol.com/blog/Fotos/Notas/lo-que-tenes-que-saber-de-un-tipico-asado-argentino_1049_202011260625490.PNG',
      summary:
        'Básicamente, se trata de colocar diversos trozos de carne expuestos al calor del fuego. En la práctica, existen diferentes técnicas para cocinar bajo este formato. Los gauchos que ocupaban las llanuras de Argentina se especializaron en preparar carnes en asadores de hierro.',
      score: 100,
      healthScore: 80,
      instructions:
        'Encender el fuego mediante leña o carbón. Colocar las rejillas del asador. Lo ideal es ir cocinando las diferentes piezas de carne según su tiempo de cocinado, así como el mantenimiento de la textura de las piezas, una vez cocinadas. Comenzaremos cocinando los filetes de ternera, en torno a 3 minutos por cada lado, sin que quede demasiado hecho. Después haremos las chuletas de cerdo y de cordero. En este caso se suelen cocinar un poco más, unos cuatro minutos, pero sin pasarse. Luego pondremos poco a poco las demás piezas, salchichas, morcilla, chorizo, alas de pollo, etc. En torno a 6-7 minutos de cocción por cada lado, será lo ideal. Es interesante espolvorear nuestro asado argentino con una porción generosa de sal gorda.',
    });
    Recipe.create({
      title: 'Locro',
      image: 'https://okdiario.com/img/2019/08/08/locro-argentino.jpg',
      summary:
        'El locro argentino es un plato auténtico que tiene todo lo necesario para convertirse en un básico de nuestra cocina. Esta combinación de cereales, carnes y verduras se parece a nuestro cocido de toda la vida, es igual de contundente y de delicioso. En esos días en los que nos apetece un plato contundente, podemos experimentar con un plato típico de la cordillera Andina. Haga o no frío, coger la cuchara y descubrir nuevos sabores, texturas y acabados es siempre un placer.',
      score: 95,
      healthScore: 90,
      instructions:
        'La base principal de esta receta son las carnes, con la grasa de la panceta vamos a conseguir un fondo de los que no se olvidan. Cortamos en daditos toda la carne. Empezaremos a dorarla en la cazuela en la que vamos a cocinar esta delicia contundente. Mientras la panceta va cogiendo color, nos ponemos manos a la obra con las verduras, las pelamos y troceamos. Cuando la carne ya haya soltado un poco de grasa, será el momento de incorporar las verduras. Ellas serán la base de un guiso impresionante. Empezaremos por las cebollas y seguiremos con el maíz o los pimientos que necesitan menos tiempos de cocción. Salpimentamos la carne y la incorporamos en taquitos a este guiso. Dejaremos que vaya cogiendo color y nos aporte su mejor cara. Cuando esté sellada la carne, ponemos el caldo de verduras. Dejamos que se cocinen todos los sabores hasta que tengamos listo nuestro locro argentino. Este ingrediente será el que dé lugar a un guiso que podemos acompañar de un poco de pan o de unas empanadas argentinas que completen la receta.',
    });
    */