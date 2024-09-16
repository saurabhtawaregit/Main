/**
* @File Name : NetworkController.cls
* @Description :
* @Author : Saurabh Taware
* @Last Modified By :
* @Last Modified On : September 16, 2024
* @Modification Log :
*==============================================================================
* Ver | Date | Author | Modification
*==============================================================================
* 1.0 | September 16, 2024 |   | Initial Version
**/

public class NetworkController {
	@AuraEnabled(cacheable=true)
	public static String getOrgBaseUrl(){
    	String baseUrl = Network.getLoginUrl( Network.getNetworkId() );
    	return baseUrl;
	}

	@AuraEnabled(cacheable=true)
	public static string getCommunityUrl(){
		Site mySite = [select Id from Site where Name =: Constants.knowledgeCommunityName];
        SiteDetail mySiteDetail = [select SecureURL from SiteDetail where DurableId = :mySite.Id];
		String siteUrl = mySiteDetail.SecureURL;
		return siteUrl;
	}
}