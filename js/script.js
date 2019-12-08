/* eslint-disable no-prototype-builtins */
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

/* const */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';
  //optTagsListSelector = '.tags.list';
  

/* Function Generate Title Links */
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

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  //console.log(allTags);
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

      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    titleList.innerHTML = html;
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  //console.log(tagList);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' (' + allTags[tag] + ') ';
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  //console.log(tagList.innerHTML);
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
  const links = document.querySelectorAll('.tags a, .post-tags a');

  for(let link of links){

    link.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

/* Function generateAuthors */

function generateAuthors(){

  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);

  for(let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleAuthorSelector);
    titleList.innerHTML = '';

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const authorName = article.getAttribute('data-author');
    console.log(authorName);

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + authorName + '">' + authorName + '</a>';
        
    /* add generated code to html variable */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    document.querySelector('.list.authors').innerHTML += 
    '<li><a href="#author-' + authorName + '"><span>' + authorName + '</span></a></li>';
        
    html = html + linkHTML;
    
    titleList.innerHTML = html;
  }
}
generateAuthors();

/* Function generateAuthors  */
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