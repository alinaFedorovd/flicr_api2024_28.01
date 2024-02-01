
// const divImg = document.getElementById("img");
// const imgItem = document.createElement("img");
let container = document.getElementById("container");
let url = "";
let secretWord= document.getElementById("searchIn").value ;
let input = document.getElementById("searchBtn");
input.addEventListener("click", searchClic);

function searchClic(){
// alert( 'Спасибо!' );
        console.log(container);
//  container.removeChild();
// container.innerHTML = '';
document.querySelectorAll('#container a').forEach(e => e.remove());
secretWord ='';
 secretWord = document.getElementById("searchIn").value; 
loadMoreContent();
};

console.log(secretWord)
let i = 0;
loadMoreContent();
function loadMoreContent() {    
    // for(i=1;i<100;i++){
    i += 1;
    url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4cc2a6e2419deebfe86eca026cfda157&safe_search=1&format=json&nojsoncallback=?&text=${secretWord}&page=${i}&per_page=50`

    async function getData() {        
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data);
        // printPost(data[random(data)])
        // imgItem.textContent = ; // Замените этот текст на реальный контент
        // debugger

        data.photos.photo.forEach(item => {
            // document.body.innerHTML += '<hr/><pre>' + JSON.stringify(element) + '</pre>';

            // разделяем линией
            // document.body.innerHTML += '<hr/>';

            // конструируем URl картинки
            const imgSrc = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
            const aHref = 'https://www.flickr.com/photos/' + item.owner + '/' + item.id;

            // старый способ
            // document.body.innerHTML += `<img src=${imgSrc} />`;

            // новый способ
            // https://stackoverflow.com/questions/2735881/adding-images-to-an-html-document-with-javascript
            // const img = document.createElement("img");
            // img.src = imgSrc;                        
            // const container = document.getElementById("container");
            // container.appendChild(img);

            // добавляем вместе с ссылками
            const a = document.createElement("a");
            a.href = aHref;
            const img = document.createElement("img");
            img.src = imgSrc;
            a.appendChild(img);
            // const container = document.getElementById("container");
            container.appendChild(a);

        });
    }
    // divImg.appendChild(imgItem);
    getData();
    // }


}


// Обработка события прокрутки

window.addEventListener('scroll', () => {

    // Проверяем, долистал ли пользователь до конца страницы

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {

        loadMoreContent();

    }

});
