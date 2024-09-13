public with sharing class KnowledgeArticleController {
    @AuraEnabled(cacheable=true)
    public static List<Knowledge__kav> getKnowledgeArticles() {
        return [SELECT Id, Title, Question__c, Answer__c ,UrlName, LastPublishedDate
                FROM Knowledge__kav ORDER By LastModifiedDate DESC];
    }
    
    @AuraEnabled
    public static Knowledge__kav getKnowledgeArticleById(String urlNamearticle) {
        // Query the Knowledge Article Version based on the provided ID
        try {
            Knowledge__kav article = [
                SELECT Id, Title, Question__c, Answer__c ,UrlName, LastPublishedDate
                FROM Knowledge__kav
                WHERE urlName = :urlNamearticle
                LIMIT 1
            ];
            
            return article;
        } catch (Exception e) {
            System.debug('Error retrieving Knowledge Article: ' + e.getMessage());
            return null;
        }
    }
}