// knowledgeArticleList.js
import { LightningElement, track,api,wire } from 'lwc';
import getKnowledgeArticles from '@salesforce/apex/KnowledgeArticleController.getKnowledgeArticles';
import getCommunityUrl from '@salesforce/apex/NetworkController.getCommunityUrl';
import { NavigationMixin } from 'lightning/navigation';

export default class KnowledgeArticleList extends NavigationMixin(LightningElement) {
    knowledgeArticles;
    spinner = true;
    isShowArticle = false;
    articleNotFound = false;
    @api test = '';
    communityBaseUrl;
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

    @wire(getCommunityUrl)
    wiredBaseUrl(result) {
        const { error, data } = result;
        if (data) {
            this.communityBaseUrl = `${data}`;
        } else if (error) {
            console.error('Error: ', error);
        }
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

        this.article.question= event.currentTarget.dataset.question;
        this.article.title = event.currentTarget.dataset.articletitle;
        this.article.publishedDate = event.currentTarget.dataset.lastdate;
        this.article.answer = event.currentTarget.dataset.answer;
        this.article.Id = event.currentTarget.dataset.articleid;
        this.article.urlName = event.currentTarget.dataset.urlname;
        let articleUrl = this.communityBaseUrl+'/s/article/' + this.article.urlName;
    



        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": articleUrl
            }
        });

    }
}