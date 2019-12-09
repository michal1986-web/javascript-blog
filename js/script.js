'use strict';

const opt = {
  TitleSelector: '.post-title',
  ArticleSelector: '.post',
  TitleListSelector: '.titles',
  ArticleTagsSelector: '.post-tags .list',
  ArticleAuthorSelector: '.post-author',
  //TagsListSelector: '.tags.list',
  CloudClassCount: 5,
  CloudClassPrefix: 'tag-size-',
};

/* Function Click Handler */
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
    
  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
}

/* Function Generate Title Links */
function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(opt.TitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(opt.ArticleSelector + customSelector);

  let html = '';

  for(let article of articles) {  
    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(opt.TitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    titleList.insertAdjacentHTML('beforeend', linkHTML);

    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

/* Function calculateTagsParams */
function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999,
  };

  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

/* Function calculateTagClass */
function calculateTagClass(count, params){
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (opt.CloudClassCount - 1) + 1 );
  return opt.CloudClassPrefix + classNumber;
}

/* Function Generate Tags */
function generateTags(){

  let allTags = {};

  const articles = document.querySelectorAll(opt.ArticleSelector);

  for(let article of articles) {
    const titleList = article.querySelector(opt.ArticleTagsSelector);
    titleList.innerHTML = '';

    let html = '';

    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      titleList.insertAdjacentHTML('beforeend', linkHTML);
      html = html + linkHTML;

      // eslint-disable-next-line no-prototype-builtins
      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    titleList.innerHTML = html;
  }
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = '';

  for(let tag in allTags){
    allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    console.log('allTagsHTML:', allTagsHTML); 
  }

  tagList.innerHTML = allTagsHTML;
}
generateTags();

/* Function tagClickHandler */
function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

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

  const articles = document.querySelectorAll(opt.ArticleSelector);

  let allAuthors = {};

  for(let article of articles) {
    const titleList = article.querySelector(opt.ArticleAuthorSelector);
    titleList.innerHTML = '';

    let html = '';

    const authorName = article.getAttribute('data-author');

    const linkHTML = '<a href="#author-' + authorName + '">' + authorName + '</a>';
        
    titleList.insertAdjacentHTML('beforeend', linkHTML);
        
    // eslint-disable-next-line no-prototype-builtins
    if(!allAuthors.hasOwnProperty(authorName)){
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }

    html = html + linkHTML;
    
    titleList.innerHTML = html;
  }
  for(let author in allAuthors){
    document.querySelector('.list.authors').innerHTML += 
    '<li><a href="#author-' + author + '"><span>' + author + '(' + allAuthors[author] + ')' + '</span>  </a></li>';
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