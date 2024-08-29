export const GenderOptions = ["male", "female", "other"];

export const UserFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  role: "",
  password:"",
 
  department: "",
  designation: "",
  
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  
 
};

export const IdentificationTypes = [
    "Aadhaar Card",
    "Voter ID Card",
    "PAN Card",
    "Passport",
    "Driving License",
    "Ration Card",
    "Birth Certificate",
    "Employee ID Card",
    "Student ID Card",
    "Health Insurance Card",
];

export const Role = [
  {
    
    name: "Admin",
  },
  {
    
    name: "Officer",
  },
  {
   
    name: "Employee",
  },
  {
    
    name: "technical expert",
  },
  
  
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};