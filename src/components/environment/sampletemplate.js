export const accountSampleTemplate = `<!--- NOTES: --> 
<!--- 1. THIS TEXT AREA USES MARKDOWN TO FORMAT THE CONTENT --> 
<!--- 2. REPLACE CONTENT WITHIN SQUARE BRACKETS [] --> 
<!--- 3. DO NOT REMOVE THE CUSTOMER BANNER --> 
<!--- 4. THIS IS JUST A TEMPLATE, YOU CAN CUSTOMIZE THE PAGE ACCORDING TO YOUR LIKING --> 
<!--- 5. IF YOU KNOW HTML YOU CAN ALSO USE HTML TAGS TO FORMAT --> 
<!--- THE WEBSITE USES BULMA FRAMEWORK, SO YOU CAN USE THE CLASSES FROM BULMA TO FORMAT YOUR HTML TAGS --> 
<!--- BULMA: https://bulma.io/ --> 

<!--- CUSTOMER BANNER DO NOT REMOVE THIS SECTION  --> 

<section class="hero">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title is-1">
        [ customer name ]
      </h1>
      <h2 class="subtitle is-5"> 
      	DSE: [ DSE's Name ]
      </h2>
    </div>
  </div>
</section>

# Company Overview

[Brief overview of the company]

Summary of company profile.

+ **Headquarters:** [Location of HQ]
+ **Employees:** [Employee count]
+ **Offices:** [Number of office] 
+ **Annual Sales:** [Annual Sales] 
+ **Slogan:** [Slogan of the company]
+ **Website:** [Company website]

# Pivotal Technologies & Use Cases
[ Brief on how customer use the Pivotal Product on their organization]


# BCS Engagement
+ Global DSE Support (24 x 5 DSE support) -  [BCS Support Hours and days]                               
+ Term of engagement - [BCS Contract / Expiry Date]`


export const contactSampleTemplate = `<!--- NOTES: --> 
<!--- 1. THIS TEXT AREA USES MARKDOWN TO FORMAT THE CONTENT --> 
<!--- 2. REPLACE CONTENT WITHIN SQUARE BRACKETS [] --> 
<!--- 3. DO NOT REMOVE THE CUSTOMER BANNER --> 
<!--- 4. THIS IS JUST A TEMPLATE, YOU CAN CUSTOMIZE THE PAGE ACCORDING TO YOUR LIKING --> 
<!--- 5. IF YOU KNOW HTML YOU CAN ALSO USE HTML TAGS TO FORMAT --> 
<!--- THE WEBSITE USES BULMA FRAMEWORK, SO YOU CAN USE THE CLASSES FROM BULMA TO FORMAT YOUR HTML TAGS --> 
<!--- BULMA: https://bulma.io/ --> 

# Customer Contact

| Name      | Title  | Telephone               | Email     | Special Notes / Location / anything we should be sensitive to? |
|-----------|--------|-------------------------|-----------|----------------------------------------------------------------|
| Name1     | Title1 |    phone number 1       | email1    |  notes1                                                        |
| Name2     | Title2 |    phone number 2       | email2    |  notes2                                                        |

# Pivotal Contact

| Name      | Title  | Telephone               | Email     | Special Notes / Location / anything we should be sensitive to? |
|-----------|--------|-------------------------|-----------|----------------------------------------------------------------|
| Name1     | Title1 |    phone number 1       | email1    |  notes1                                                        |
| Name2     | Title2 |    phone number 2       | email2    |  notes2                                                        |

# Key Information

|                         |                               |   |   |   |
|-------------------------|-------------------------------|---|---|---|
| Open Air Project Code:  | [Open Air Project]            |   |   |   |
| Slack Channel:          | [slack channel]               |   |   |   |
| Compatibility Matrix    | [Compactibility Matrix]       |   |   |   |
| Care Log Logisitics     | [Time of carelog metting]     |   |   |   |
| Care Log Reports        | [Carelog meeting location]    |   |   |   |
| Environment Information | [Customer IaaS environment]   |   |   |   |
| Product(s)              | [Pivotal Products used]       |   |   |   |
| Zendesk Org Query       | [Location of Customer Tickets]|   |   |   |
| EMC Site IDs            | [if EMC customer]             |   |   |   |
| Renewal Date:           | [Renewal Date]                |   |   |   |

# TODO

<!--- Place x between square brackets like [x] when its done --> 

- [ ] Notify Customer contacts of your outage and designated backup                                  
- [ ] Notify Pivotal contacts (AE/CSD) of your outage and back-up                                    
- [ ] Invite backup DSE to CareLog meeting for warm transition (have backup generate carelog report) 
- [ ] Add DSE (backup)  to calendar invite **** important ***                                        
- [ ] Handoff discussions with (backup) DSE                                                          
- [ ] If there is a private Slack Channel make sure back-up is invited`

