// knowledgeArticleList.js
import { LightningElement, track,api } from 'lwc';
import getKnowledgeArticles from '@salesforce/apex/KnowledgeArticleController.getKnowledgeArticles';
import { NavigationMixin } from 'lightning/navigation';

export default class KnowledgeArticleList extends NavigationMixin(LightningElement) {
    knowledgeArticles;
    spinner = true;
    isShowArticle = false;
    articleNotFound = false;
    @api test = '';
    @track article = {
        Id : ' ',
        title: ' ',
        question: ' ',
        answer : ' ',
        publishedDate  : ' '
    };

    connectedCallback() {
        this.loadKnowledgeArticles();
        //Console.log('Connected Callback');
    }

    loadKnowledgeArticles() {
        getKnowledgeArticles()
            .then(result => {
                this.knowledgeArticles = result;
                this.spinner = false;
                this.isShowArticle = true;
                if(this.knowledgeArticles == null){
                    this.articleNotFound = false;
                }
            })
            .catch(error => {
                // Handle errors
                console.error('Error loading knowledge articles:', error);
            });
    }

    get processedKnowledgeArticles() {
    return this.knowledgeArticles.map(article => ({
        ...article,
        backgroundImageStyle: `background-image: url('${article.Question__c}'); background-size: cover; background-position: center;`
    }));
    }

    handleArticleClick(event) {
        //const articleId = event.currentTarget.dataset.articleid;
        const urlnames = event.currentTarget.dataset.urlname;
        this.article.question= event.currentTarget.dataset.question;
        this.article.title = event.currentTarget.dataset.articletitle;
        this.article.publishedDate = event.currentTarget.dataset.lastdate;
        this.article.answer = event.currentTarget.dataset.answer;
        this.article.Id = event.currentTarget.dataset.articleid;

        const allArticleData = JSON.stringify(this.article);

        //Use the NavigationMixin to navigate to the community page that displays the knowledge article
        //We are sending data to the knowledge article page
        //data should be send only string format
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName : 'knowledge-article-page'
            },
            state: {
                articleData : allArticleData
            }
        });

    }
}