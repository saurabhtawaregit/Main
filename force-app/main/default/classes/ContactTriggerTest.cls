@isTest
public class ContactTriggerTest {
    @isTest
    static void testContactTrigger() {
        // Setup test data
        Contact testContact = new Contact(FirstName = 'John', LastName = 'Doe', Email = 'john.doe@example.com');
        insert testContact;

        // Verify that the trigger logic is executed correctly
        testContact = [SELECT FirstName, LastName, Email FROM Contact WHERE Id = :testContact.Id];
        System.assertEquals('John', testContact.FirstName);
        System.assertEquals('Doe', testContact.LastName);
        System.assertEquals('john.doe@example.com', testContact.Email);
    }
}