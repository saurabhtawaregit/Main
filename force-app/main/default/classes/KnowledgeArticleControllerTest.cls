@isTest
public class KnowledgeArticleControllerTest {
    
    @isTest
    static void testGetKnowledgeArticles() {
        // Setup test data
        Knowledge__kav article1 = new Knowledge__kav(
            Title = 'Test Article 1',
            Question__c = 'What is test article 1?',
            Answer__c = 'This is the answer for test article 1.',
            UrlName = 'test-article-1'
        );
        insert article1;

        Knowledge__kav article2 = new Knowledge__kav(
            Title = 'Test Article 2',
            Question__c = 'What is test article 2?',
            Answer__c = 'This is the answer for test article 2.',
            UrlName = 'test-article-2'
        );
        insert article2;

        Test.startTest();
        // Call the method to test
        List<Knowledge__kav> articles = KnowledgeArticleController.getKnowledgeArticles();
        Test.stopTest();
        
        // Verify the results
        System.assertNotEquals(null, articles, 'The articles list should not be null');
        System.assertEquals(2, articles.size(), 'There should be 2 articles');
        
        Knowledge__kav firstArticle = articles[0];
        System.assertEquals('Test Article 1', firstArticle.Title, 'The first article title should be Test Article 1');
        System.assertEquals('test-article-1', firstArticle.UrlName, 'The URL name of the first article should be test-article-1');
    }

    @isTest
    static void testGetKnowledgeArticleById() {
        // Setup test data
        Knowledge__kav article = new Knowledge__kav(
            Title = 'Test Article',
            Question__c = 'What is the test article?',
            Answer__c = 'This is the answer for the test article.',
            UrlName = 'test-article'
        );
        insert article;

        Test.startTest();
        // Call the method to test
        Knowledge__kav result = KnowledgeArticleController.getKnowledgeArticleById('test-article');
        Test.stopTest();
        
        // Verify the results
        System.assertNotEquals(null, result, 'The article should not be null');
        System.assertEquals('Test Article', result.Title, 'The article title should be Test Article');
        System.assertEquals('test-article', result.UrlName, 'The URL name should be test-article');
    }
}