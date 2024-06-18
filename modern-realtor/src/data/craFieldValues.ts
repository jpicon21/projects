export const sections = [
  {
    title: 'Offer',
    steps:[
      { 
        title: 'Buyer Information',
        description: 'Please enter buyer name',
        fields: [
          { name: 'buyerName', label:"Buyer Name", placeholder: 'ex. John Doe', },
        ],
      },
      { 
        title: 'Property Information',
        description: 'Please enter property details',
        fields: [
          { name: 'propertyAddress', label: "Property Address", placeholder: 'ex. 1234 Main Street' },
          { name: 'city', label: "City", placeholder: 'ex. San Francisco' },
          { name: 'county', label: "County", placeholder: 'ex. San Francisco' },
          { name: 'zipCode', label: "Zip Code", placeholder: 'ex. 12345' },
          { name: 'parcelNumber', label: "Parcel Number", placeholder: 'ex. 678-901-234' },
        ],
      },
      { 
        title: 'Purchase Information',
        description: 'Please enter purchase details',
        fields: [
          { name: 'purchasePrice', label: "Purchase Price", placeholder: 'ex. 500,000' },
        ],
      },
      { 
        title: 'Escrow Information',
        description: 'Please enter escrow date',
        fields: [
          { name: 'escrowDate', label: "Escrow Date", placeholder: 'mm/dd/yyyy' },
        ],
      }
    ]
  },
  {
    title: 'Agency',
    steps:[
      { 
        title: 'Disclosure Information',
        description: 'The Parties each acknowledge receipt of a “Disclosure Regarding Real Estate Agency Relationships” (C.A.R. Form AD).',
        fields: [
          { name: 'buyerName', label:"Buyer Name", placeholder: 'ex. John Doe' },
        ],
      },
      { 
        title: 'Confirmation of Agency Relationship',
        description: 'Please enter agency details',
        fields: [
          { name: 'listingAgent', label: "Listing Agent", placeholder: 'ex. John Doe' },
          { name: 'sellingAgent', label: "Selling Agent", placeholder: 'ex. John Doe' },
        ],
      },
    ]
  },
];
