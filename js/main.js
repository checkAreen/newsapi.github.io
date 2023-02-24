const apiUrl = 'https://api.newscatcherapi.com';
const apiKey = 'YOUR_API_KEY';
const container = document.querySelector('.container');
const body = document.querySelector('body');
const form = document.forms['findNews'];
const inputText = form.elements['newsKeyword'];

form.addEventListener('submit', function(e){
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/v2/search?q=${inputText.value}`);
    xhr.setRequestHeader('x-api-key', apiKey);

    xhr.addEventListener('load', function(){
        const response = JSON.parse(xhr.responseText);

        handleResponse(response);
    });

    xhr.send();

    form.reset();
});

function handleResponse(response){
    if(container.children.length){
        clearContainer(container);
    }

    const articles = response.articles;

    let fragment = '';

    articles.forEach(article => {
        const item = displayNews(article);
        fragment += item;
    });
    container.insertAdjacentHTML('afterbegin', fragment);
}

function displayNews(article){
    if(!article.media){
        return `
        <div class="card">
            <div class="card__body">
                <div style="background-image: url('https://via.placeholder.com/300x150/')" class="card__body-img"></div>
                <h2 class="card__body-title">${article.title}</h2>
                <p class="card__body-text">${article.excerpt}</p>
                <div class="card__body-footer">
                    <div class="card__footer-author">${article.author}</div>
                    <a href="${article.link}" class="card__footer-link">Read More...</a>
                </div>
            </div>
        </div>
        `
    }
    if(article.excerpt === null){
        return `
        <div class="card">
            <div class="card__body">
                <div style="background-image: url(${article.media})" class="card__body-img"></div>
                <h2 class="card__body-title">${article.title}</h2>
                <p class="card__body-text">...</p>
                <div class="card__body-footer">
                    <div class="card__footer-author">${article.author}</div>
                    <a href="${article.link}" class="card__footer-link">Read More...</a>
                </div>
            </div>
        </div>
        `
    }
    return `
        <div class="card">
            <div class="card__body">
                <div style="background-image: url(${article.media})" class="card__body-img"></div>
                <h2 class="card__body-title">${article.title}</h2>
                <p class="card__body-text">${article.excerpt}</p>
                <div class="card__body-footer">
                    <div class="card__footer-author">${article.author}</div>
                    <a href="${article.link}" class="card__footer-link">Read More...</a>
                </div>
            </div>
        </div>
    `
}

function clearContainer(container){
    let child = container.lastElementChild;
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }
}