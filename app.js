/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':    
      
    let foundPeople = searchByName(people);
      mainMenu(foundPeople,people)
      break;
    case 'no':
      
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, 
  as well as the entire original dataset of people. 
  We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

 
 person.forEach(function(el){

    var displayOption = prompt("Found " + el.firstName + " " + el.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

    switch(displayOption){  
      case "info":
        displayPerson(el);
        break;
      case "family":
        // TODO: get person's family
        
        break;
      case "descendants":
        // TODO: get person's descendants
       
        break;
      case "restart":
        app(people); // restart
        break;
      case "quit":
        return; // stop execution
      default:
        return mainMenu(person, people); // ask again
    }
  });
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
      firstName = capitalizeName(firstName)

      lastName = capitalizeName(lastName)       
      let filteredPeople = people.filter(function(el) {
        if(el.firstName === firstName && el.lastName === lastName) {
     

          return true;

    } 
    
  });
 return filteredPeople;
  //mainMenu(filteredPeople,people)
 //runForMultiplePeople
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.

  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo +="dob: " + person.dob + "\n";
  personInfo +="Age: " + calculatePersonsAge(person.dob)+ "\n";
  personInfo +="Height: " + person.height + "\n";
  personInfo +="Weight: " + person.weight + "\n";
  personInfo +="EyeColor: " + person.eyeColor + "\n";
  personInfo +="Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
function calculatePersonsAge(dob) {
  dob = new Date(dob)
  let timeDifference = Date.now() - dob.getTime();
  let ageInMilliseconds = new Date(timeDifference);

  return Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);
}


function capitalizeName(input) {
  
  input = input.toLowerCase().split(' ');
  for (let i = 0; i < input.length; i++) {
      input[i] = input[i].charAt(0).toUpperCase() + input[i].slice(1); 
    
    }
  return input.join(' ');
  
}

/*
function runForMultiplePeople(funct){
   person.forEach(function(el){
      funct()
}
}*/
// test area
let half = [{
    "id": 693243224,
    "firstName": "Joy",
    "lastName": "Madden",
    "gender": "female",
    "dob": "4/20/1939",
    "height": 69,
    "weight": 199,
    "eyeColor": "hazel",
    "occupation": "doctor",
    "parents": [],
    "currentSpouse": null
  },
  {
    "id": 888201200,
    "firstName": "Mader",
    "lastName": "Madden",
    "gender": "male",
    "dob": "5/6/1937",
    "height": 76,
    "weight": 205,
    "eyeColor": "black",
    "occupation": "landscaper",
    "parents": [],
    "currentSpouse": null
  },]

//mainMenu(half,data)

function searchByTrait(people) {



  let filteredPeople = people.filter(function(el) {
        if(el.trait === trait && el.trait ===trait) {
     

          return true;

    } 
    
  });
 return filteredPeople;
}