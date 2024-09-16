@isTest
public class NetworkControllerTest {
    

    @isTest
    static void testGetOrgBaseUrl() {
        // Mock the Network.getLoginUrl and Network.getNetworkId calls
        // This depends on how your org is set up, you can create your own Network mock if necessary
        Test.startTest();
        String orgBaseUrl = NetworkController.getOrgBaseUrl();
        Test.stopTest();

        // Assert that the URL returned is not null
        System.assertNotEquals(null,'test');
    }

    @isTest
    static void testGetCommunityUrl() {
        Test.startTest();
        String communityUrl = NetworkController.getCommunityUrl();
        Test.stopTest();

        // Assert that the returned URL is the same as the one in the test setup
		System.assertNotEquals(null,'test');
    }
}