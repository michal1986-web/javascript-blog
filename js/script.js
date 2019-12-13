/* eslint-disable no-undef */
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

'use strict';

const opt = {
  TitleSelector: '.post-title',
  ArticleSelector: '.post',
  TitleListSelector: '.titles',
  ArticleTagsSelector: '.post-tags .list',
  ArticleAuthorSelector: '.post-author',
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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

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
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

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
  const allTagsData = {tags: []};

  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  const allAuthorsData = {tags: []};

  for(let article of articles) {
    const titleList = article.querySelector(opt.ArticleAuthorSelector);
    titleList.innerHTML = '';
    let html = '';
    
    const authorName = article.getAttribute('data-author');
    const linkHTMLData = {id: authorName, title: authorName};
    const linkHTML = templates.authorLink(linkHTMLData);
        
    titleList.insertAdjacentHTML('beforeend', linkHTML);
        
    // eslint-disable-next-line no-prototype-builtins
    if(!allAuthors.hasOwnProperty(authorName)){
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
    html = html + linkHTML; 
    titleList.innerHTML = html;
    titleList.innerHTML = templates.authorCloudLink(allAuthorsData);
  }

  for(let author in allAuthors){  
    document.querySelector('.list.authors').innerHTML += 
    '<li><a href="#author-' + author + '"><span>' + author + '(' + allAuthors[author] + ')' + '</span>  </a></li>';
    console.log(author);
    allAuthorsData.tags.push({
      author: author,
      count: allAuthors[author],
      className: allAuthors[author]
    });
  }
  console.log(allAuthorsData);
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