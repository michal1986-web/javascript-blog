'use strict';

/* Function Click Handler */
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  //console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  //console.log(articleSelector);
    
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  //console.log(targetArticle);   

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}


/* Function Generate Title Links */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.authors';

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  //console.log('title list:', titleList); 
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log('articles:', articles); 

  let html = '';

  for(let article of articles) {
        
    /* get the article id */
    const articleId = article.getAttribute('id');
    //console.log('id:', articleId); 

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log('article find:', articleTitle);    

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log('HTML code:', linkHTML);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


/* Function Generate Tags */
function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('articles:', articles);

  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    //console.log('titleList:', titleList);
    titleList.innerHTML = '';

    /* make html variable with empty string */
    let html = '';
    //console.log('html:', html);

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log('articleTags:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log('articleTagsArray:', articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      //console.log('linkHTML:', linkHTML);

      /* add generated code to html variable */
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      //console.log('titleList.insertAdjacentHTML:', titleList.insertAdjacentHTML);
      html = html + linkHTML;
    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();

/* Function tagClickHandler */
function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Tag was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log(activeLinks);

  /* START LOOP: for each active tag link */
  for(let activeLink of activeLinks){

    /* remove class active */
    activeLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  const links = document.querySelectorAll('.tags a');

  for(let link of links){
    link.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();


/* Function generateAuthors */
function generateAuthors(){

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles) {

    const titleList = document.querySelector(optArticleAuthorSelector);

    titleList.innerHTML = '';

    let html = '';

    const author = article.getAttribute('data-author');

    //for(let author of authors) {

      const linkHTML = '<li><a href="#' + author + '"><span>' + author + '</span></a></li>';

      titleList.insertAdjacentHTML('beforeend', linkHTML);

      html = html + linkHTML;
    //}
    titleList.innerHTML = html;
  }
}

generateAuthors();

/* Function authorClickHandle
function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Author was clicked!');

  const href = clickedElement.getAttribute('href');

  const tag = href.replace('#tag-', '');

  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeLink of activeLinks){

    activeLink.classList.remove('active');
  }
  
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let tagLink of tagLinks){

    tagLink.classList.add('active');
  }
  generateTitleLinks('[author-tags="' + this + '"]');
}

function addClickListenersToAuthors(){
  const links = document.querySelectorAll('.authors a');
  
  for(let link of links){
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();*/