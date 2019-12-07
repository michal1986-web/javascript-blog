'use strict';

/* Function Click Handler */
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){

    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');

  for(let activeArticle of activeArticles){

    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
    
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

/* Function Generate Title Links */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
  //optArticleAuthorSelector = '.authors';

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles) {
        
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

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

  for(let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    titleList.innerHTML = '';

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
  }
}
generateTags();

/* Function tagClickHandler */
function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeLink of activeLinks){

    /* remove class active */
    activeLink.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let tagLink of tagLinks){

    tagLink.classList.add('active');
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

    const authorName = article.getAttribute('data-author');

    article.querySelector('.post-author').innerHTML = 'by ' + authorName;
    document.querySelector('.list.authors').innerHTML += 
    '<li><a href="#author-' + authorName + '"><span>' + authorName + '</span></a></li>';
  }
}
generateAuthors();

/* Function authorClickHandle */
function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeLink of activeLinks){

    activeLink.classList.remove('active');
  }
  
  const tagLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for(let tagLink of tagLinks){

    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const links = document.querySelectorAll('.authors a');
  for(let link of links){
    
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();