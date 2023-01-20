const Employees = [
    {
        id:"1",
        firstname:"Darshan",
        lastname:"Patel",
        email:"darshan@gmail.com",
        phone:"9510232145",
        gender:"Male",
        department:"PHP",
        skills:["Programming"],
        about:"My id is 95"
    },
    {
        id:"2",
        firstname:"Deep",
        lastname:"Patel",
        email:"deep@gmail.com",
        phone:"9541852145",
        gender:"Male",
        department:"Account",
        skills:["Communication"],
        about:"My id is 54"
    },
    {
      id:"3",
      firstname:"Asha",
      lastname:"Shah",
      email:"asha@gmail.com",
      phone:"8541857455",
      gender:"Female",
      department:"Mobile",
      skills:["Communication","Finance"],
      about:"My id is 32"
  },
  {
    id:"4",
    firstname:"Nidhi",
    lastname:"Patel",
    email:"nidhi@gmail.com",
    phone:"857854285",
    gender:"Female",
    department:"SEO",
    skills:["Programming","Recruitment"],
    about:"My id is 451"
},
{
  id:"5",
  firstname:"Mohit",
  lastname:"Prajapati",
  email:"mohit@gmail.com",
  phone:"857854285",
  gender:"Male",
  department:"PHP",
  skills:["Recruitment"],
  about:"My id is 1425"
},{
  id:"6",
  firstname:"Jaimin",
  lastname:"Prajapati",
  email:"jaimin@gmail.com",
  phone:"8547963225",
  gender:"Male",
  department:".NET",
  skills:["Finance"],
  about:"My id is 451"
},{
  id:"7",
  firstname:"Khushi",
  lastname:"Patel",
  email:"khushi@gmail.com",
  phone:"7562581254",
  gender:"Female",
  department:"PHP",
  skills:["Finance,Recruitment"],
  about:"My id is 456"
}
]

const searchData = (searchText) => {
    const arr = [];
    searchText = searchText.toLowerCase();
    for (let i = 0; i < Employees.length; i++) {
      if (  
        JSON.stringify(Employees[i]).toLowerCase().includes(searchText) 
      ) {
        arr.push(Employees[i]);
      }
    }
    return arr;
  };


export default Employees; 
export {searchData};
