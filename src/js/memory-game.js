/* code necessaire pour le game interactif */

const MemoryGame = (function () {
    'use strict'

    function createEvents () {
        //
        const categories = document.getElementsByTagName("figure")
        for (let i = 0; i < categories.length; i++) {
            categories[i].addEventListener('click', categorieEventHandler, false)
            categories[i].addEventListener('click', categorieEventHandler)
        }
        //
        return true
    }

    function categorieEventHandler () {
        console.log(this)
        // 1 - recuperer le nom de la categorie selectionne
        console.log("1")
        console.log(this.innerHTML)
        // 2 -  ajouter un evenement dans la section categorie en utilisant la fontion categorieEventHandler
        console.log("2")
        console.log("en categorieEventHandler")
        // 3 - tester d'abord que c'est bon et bien une categorie selectionne
        console.log("3 ??")
        // 4 - recupere la categorie de l'element selectionne en se basant sur alt
        console.log("4")
        const elemento  = this.innerHTML
        console.log(elemento)
        // 5 - metter la valeur de la categorie dans le span
        console.log("5 ??")
        // 6 - recupere la valeur du nombre image
        console.log("6  ??")
        // 7 - recuperer tous les images dont la categorie est categorie
        console.log("7  ??")
         // 8 - recuperer le div conteneur conteneur des images aleatoires (id = 'parametreMilieu')
         console.log("8  ??")
         recuperarRandomImgs('emoji')



    }

    function recuperarRandomImgs (categorieSel) {
        //
        const numberofImagenes = document.getElementById("nbImage").value
		// Halla numero de filas y columnas
        const numberofRows = Math.round(numberofImagenes / 4)
        const numberofCols =Math.round( numberofImagenes / 2)
console.log(" numberofRows " + numberofRows )
console.log(" numberofCols " + numberofCols )

var x = numberofImagenes / 4;
console.log(x); // 4.5

x = ~~x;
console.log(x); // 4

        // Define el arreglo por el numero de filas
        const arrayBidimensional= new Array(numberofRows);
        for (let i = 0; i < numberofRows; i++) {
            arrayBidimensional[i] = new Array(numberofCols);
        }
        //
        // Inicializa con ceros el areglo
        for (let i = 0; i < numberofRows; i++) {
            for ( let j = 0 ; j< numberofCols; j++)
            {
              arrayBidimensional[i][j] = 0
            }
        }
        // Define Arreglo para los numeros aleatorios
        const arrayAleatorios= new Array(numberofCols)
        // Inicializa con ceros el areglo
        for (let i = 0; i < numberofCols; i++) {
            arrayAleatorios[i] = 0
        }
        //
        let ciclo = 0
        let posicion = 0

        while (ciclo <= numberofCols) {
            // Genera numero aleatorio
            let aleatorio =  getRandomInt(1,16+1)
            let numeroExiste = false
            for (let i = 0; i < numberofCols; i++) {
                if ( arrayAleatorios[i] == aleatorio)
                {
                    numeroExiste = true
                    break
                }
            }
            if ( numeroExiste == false)
            {
                arrayAleatorios[posicion] = aleatorio
                posicion++
                ciclo++
            }
        }
        // REcorre el arreglo con los numeros aleatorios
        // Por cada elemento lo asigna dos veces.
        // Por cada elemento genera un random para las filas
        // Por cada elemento genera un random para las columnas
        for (let i = 0; i < numberofCols; i++) {
            for ( let y = 1;y<=2;y++)
            {
                let ciclo = 0
                while ( ciclo == 0 )
                {
                    const aleatorioFila =  getRandomInt(0,numberofRows)
                    const aleatorioCol =  getRandomInt(0,numberofCols)
                    //
                    //console.log(' aleatorioFila ' +  aleatorioFila )
                    //console.log(' aleatorioCol ' +  aleatorioCol )
                    if ( arrayBidimensional[aleatorioFila][aleatorioCol] == 0 )
                    {
                        if ( arrayBidimensional[aleatorioFila][aleatorioCol] !=  arrayAleatorios[i] )
                        {
                            ciclo = 1
                            arrayBidimensional[aleatorioFila][aleatorioCol] = arrayAleatorios[i]
                        }
                    }
                }
            }
        }

        for (let i = 0; i < numberofRows; i++) {
            for ( let j = 0 ; j< numberofCols; j++)
            {
             const aleatorio =  arrayBidimensional[i][j]
               console.log('"aleatorio = [ ' + i + ' ] [ ' + j + ' ] ' + aleatorio)
            }
        }

        // Recorre el areglo bidimensional, en donde en cada posicion
        // esta el numero del archivo que debe presentar.
        //
        document.getElementById('parametreMilieu').innerHTML = null
        //
        for (let i = 0; i < numberofRows; i++) {
            for ( let j = 0 ; j< numberofCols; j++)
            {

                const aleatorio =  arrayBidimensional[i][j]
                console.log('"aleatorio = [ ' + i + ' ] [ ' + j + ' ] ' + aleatorio)
                const idimg = 'idimg' + aleatorio
                const fileName = 'img/' + categorieSel + '/' + categorieSel + aleatorio + '.png'
               if (doesFileExist(fileName) === false)
               {
                   fileName = 'img/' + categorieSel + '/' + categorieSel + aleatorio + '.jpg'
               }
               //
               let item = '<figure id="'+ idimg + '" > <img src="' + fileName + '" '
               item += '/> </figure> '
               console.log(item)
               document.getElementById('parametreMilieu').innerHTML += item
               document.getElementById('parametreMilieu').innerHTML += item
            }
        }
        //
        return numberofImagenes
	}
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

   function doesFileExist(urlToFile) {
        return true
/**
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', urlToFile, false);
        xhr.send();

        if (xhr.status == "404") {
            return false;
        } else {
            return true;
        }
        */

    }

    return {
        init: function () {
            //
            return createEvents()
        }

    }
})()