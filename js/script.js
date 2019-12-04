'use strict';

/* Function Click Handler */

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

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
  console.log(articleSelector);
    
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  //console.log(targetArticle);   

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

/* Function Generate Title Links */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
  //console.log('Generate TitleLinks was made!');

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  //console.log('title list:', titleList); 
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);
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
    //titleList.innerHTML = titleList.innerHTML + linkHTML;
    //console.log('Articles1:', titleList.innerHTML);
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    //console.log('Articles2:', titleList.insertAdjacentHTML);

    /* insert link into html variable */
    html = html + linkHTML;
  }
  //console.log('html inside:', html);
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  //console.log('Bug:', links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

/* Function Generate Tags */

const optArticleTagsSelector = '.post-tags .list';

function generateTags(){
  console.log('Generate Tags was made!');
  /* find all articles */
  const articles = document.querySelectorAll('article');
  //console.log('Articles:', articles);

  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelectorAll(optArticleTagsSelector);
    //console.log('title list:', titleList); 

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log('Articletags:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log('ArticletagsArray:', articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      //console.log('tag:', tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      titleList.innerHTML = titleList.innerHTML + linkHTML;
      //console.log('linkHTML:', titleList);

      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log('linkHTML:', html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    console.log('linkHTML:', titleList);

  /* END LOOP: for every article: */
  }
}

generateTags();