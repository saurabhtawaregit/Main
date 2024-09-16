// knowledgeArticleDetail.js
import { LightningElement, api,wire,track } from 'lwc';
//import { CurrentPageReference } from 'lightning/navigation';
import getKnowledgeArticleById from '@salesforce/apex/KnowledgeArticleController.getKnowledgeArticleById';
import { NavigationMixin } from 'lightning/navigation';

export default class KnowledgeArticleDetail extends NavigationMixin(LightningElement) {
    @track currentArticle = {
        title : '',
        answer : ''
    };
    extractedPart = '';
    @track spinner = true;
    //isShowArticle = false;


    connectedCallback() {

        const currentUrl = window.location.href;

        // Find the position of 'article/' in the URL
        const articleIndex = currentUrl.indexOf('article/');

        if (articleIndex !== -1) {
            // Extract everything after 'article/'
            this.extractedPart = currentUrl.substring(articleIndex + 8);
        }

        setTimeout(() => {
            console.log('this.urlName>>>',this.extractedPart);
            if (this.extractedPart) {
                this.fetchKnowledgeArticle();
            } else {
                console.error('recordId is not available');
            }
        }, 500); 
    }


    fetchKnowledgeArticle() {
        getKnowledgeArticleById({ urlNamearticle: this.extractedPart })
            .then(result => {
                this.spinner = false;
                console.log('result>>>',result);
                this.currentArticle.answer = result.Answer__c;
                this.currentArticle.title = result.Title;
                this.currentArticle.id = result.Id;
                console.log('this.currentArticle>>>',this.currentArticle);
                this.error = undefined;
                //this.isShowArticle = true;
            })
            .catch(error => {
                this.error = error;
                this.article = undefined;
                console.error('Error retrieving Knowledge Article: ', error);
            });
    }

    /**
    * @author: Saurabh
    * @company: Cloudwerx 
    * @description: Navigates to previous page on Back button click
    **/
    handleBackClick(event) {
        
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            },
        });
    }
}