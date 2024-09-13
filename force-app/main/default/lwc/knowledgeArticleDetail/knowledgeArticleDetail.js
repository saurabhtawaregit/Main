// knowledgeArticleDetail.js
import { LightningElement, api,wire,track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

export default class KnowledgeArticleDetail extends NavigationMixin(LightningElement) {
    currentArticle;

    //this will get the data from the navigation mixing
    @wire(CurrentPageReference) articleData;

    connectedCallback() {
        //console.log(this.articleData.state);
        //Data can be sent to this page through navigation only string format so we have to parse it 
        //To show in HTML
        this.currentArticle = JSON.parse(this.articleData.state.articleData)
        //console.log(this.currentArticle);
    }

    /**
    * @author: Saurabh
    * @company: Cloudwerx 
    * @description: Navigates to previous page on Back button click
    **/
    handleBackClick(event) {
        /*event.preventDefault();
        var url = window.location.href;
        var value = url.substr(0, url.lastIndexOf('/') + 1);
        window.history.back();
        return false;*/

        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            },
        });
        
    }
}