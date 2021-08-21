export interface PolicyData {
    "Customer_Gender": string,
    "Customer_Income group": string,
    "Customer_Marital_status": boolean,
    "Customer_Region": string,
    "Customer_id": number,
    "Date of Purchase": string,
    "Fuel": string,
    "Policy_id": number,
    "Premium": number,
    "VEHICLE_SEGMENT": string,
    "bodily injury liability": number,
    "collision": number,
    "comprehensive": number,
    "personal injury protection": number,
    "property damage liability": number,
    "Action": string
}

export const TableColumns = [
    {
      columnDef: 'Policy_id',
      header: 'Policy ID',
      cell: (element: PolicyData) => `${element['Policy_id']}`
    },
    {
      columnDef: 'Customer_id',
      header: 'Customer ID',
      cell: (element: PolicyData) => `${element['Customer_id']}`
    },
    {
      columnDef: 'Date of Purchase',
      header: 'Date of Purchase',
      cell: (element: PolicyData) => `${element['Date of Purchase']}`
    },
    {
      columnDef: 'Fuel',
      header: 'Fuel',
      cell: (element: PolicyData) => `${element['Fuel']}`
    },
    {
      columnDef: 'Premium',
      header: 'Premium',
      cell: (element: PolicyData) => `$${element['Premium']}`
    },
    {
      columnDef: 'Customer_Gender',
      header: 'Customer Gender',
      cell: (element: PolicyData) => `${element['Customer_Gender']}`
    },
    {
      columnDef: 'Customer_Income group',
      header: 'Customer Income group',
      cell: (element: PolicyData) => `${element['Customer_Income group']}`
    },
    {
      columnDef: 'Customer_Region',
      header: 'Customer Region',
      cell: (element: PolicyData) => `${element['Customer_Region']}`
    },
    {
      columnDef: 'Action',
      header: 'Action',
      cell: (element: PolicyData) => `edit`
    }
];

export const FormTemplate = [
    {
      type:'number',
      label:'Policy ID',
      control: 'Policy_id',
      editable: false
    },
    {
      type:'text',
      label:'Date of Purchase',
      control: 'Date of Purchase',
      editable: false
    },
    {
      type:'number',
      label:'Customer ID',
      control: 'Customer_id',
      editable: false
    },
    {
      type:'select',
      label:'Fuel',
      control: 'Fuel',
      options : [{value : 'CNG', label : 'CNG'},{value : 'Diesel', label : 'Diesel'}, {value : 'Petrol', label : 'Petrol'}],
      editable: true
    },
    {
      type:'select',
      label:'Vehicle Segment',
      control: 'VEHICLE_SEGMENT',
      options : [{value : 'A', label : 'A'},{value : 'B', label : 'B'}, {value : 'C', label : 'C'}],
      editable: true
    },
    {
      type:'number',
      label:'Premium',
      control: 'Premium',
      editable: true
    },
    {
      type:'select',
      label:'Body Injury Liability',
      control: 'bodily injury liability',
      options : [{value : 1, label : 'Yes'}, {value : 0, label : 'No'}],
      editable: true
    },
    {
      type:'select',
      label:'Personal Injury Protection',
      control: 'personal injury protection',
      options : [{value : 1, label : 'Yes'}, {value : 0, label : 'No'}],
      editable: true
    },
    {
      type:'select',
      label:'Property Damage Liability',
      control: 'property damage liability',
      options : [{value : 1, label : 'Yes'}, {value : 0, label : 'No'}],
      editable: true
    },
    {
      type:'select',
      label:'Collision',
      control: 'collision',
      options : [{value : 1, label : 'Yes'}, {value : 0, label : 'No'}],
      editable: true
    },
    {
      type:'select',
      label:'Comprehensive',
      control: 'comprehensive',
      options : [{value : 1, label : 'Yes'}, {value : 0, label : 'No'}],
      editable: true
    },
    {
      type:'select',
      label:'Customer Gender',
      control: 'Customer_Gender',
      options : [{value : 'Male', label : 'Male'}, {value : 'Female', label : 'Female'}],
      editable: true
    },
    {
      type:'select',
      label:'Customer Income Group',
      control: 'Customer_Income group',
      options : [{value : "0- $25K", label : "0- $25K"},{value : "$25-$70K", label : "$25-$70K"}, {value : ">$70K", label : ">$70K"}],
      editable: true
    },
    {
      type:'select',
      label:'Customer Region',
      control: 'Customer_Region',
      options : [ {value : "East", label : "East"}, {value : "West", label : "West"}, {value : "North", label : "North"}, {value : "South", label : "South"}],
      editable: true
    },
    {
      type:'select',
      label:'Customer Marital Status',
      control: 'Customer_Marital_status',
      options : [{value : true, label : 'Married'}, {value : false, label : 'Un-Married'}],
      editable: true
    }
  ]