function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':    
      
    let foundPeopleByName = searchByName(people);
      mainMenu(foundPeopleByName,people);
      break;
    case 'no':
        let numberOfTraits = promptFor("Would you like to look for only one trait? Enter 'yes' or 'no'", yesNo).toLowerCase();
        switch(numberOfTraits){
          case 'yes':
            let foundPeopleBySingleTrait = selectingAttribute(people);
            mainMenu(foundPeopleBySingleTrait,people);
              break;
          case 'no':
            let attributesWanted = multiTraitSearch();
            let finalArray = multiTraitFilter(attributesWanted,people);
            let foundPeopleByMultiTraits = resultScreener(finalArray, attributesWanted);
            mainMenu(foundPeopleByMultiTraits, people);
        }
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}

function mainMenu(person, people){

  
  if(!person || !person[0]){

    alert("Could not find that individual.");
    return app(people); // restart
  }

 
 person.forEach(function(el){

    var displayOption = prompt("Found " + el.firstName + " " + el.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

    switch(displayOption){  
      case "info":

        displayPerson(el); // displays all information on a person
        break;
      case "family":
            findFamily(el, people);  // displays all immediate family members of person     

        break;
      case "descendants":
        lookForDescendants(el, people);
        alert("End of blood line")
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
function findFamily(el, people) {
    displaySpouse(el, people);
    searchForParents(el, people);
    lookForKids(el, people);
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
 if(filteredPeople.length=== 0){
  alert("Name not found in data base")
 }
 return filteredPeople;

}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
 

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
function formatInput(input){
  input = input.toLowerCase().trim().split(" ");
  return input;
}
function functionNameInputFix(input){
  input = input.join(" ");
  console.log(input);
  input = capitalizeName(input);
  console.log(input);
  input = input.split(" ");
  console.log(input);
  return input;
}
function calculatePersonsAge(dob) {
  dob = new Date(dob);
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

function searchByTrait(people){
 
    let traits = ["gender", "age", "height", "weight", "eyeColor", "occupation"];
        let searchingTraits = traits.map(function(el){
           return promptFor("What is their " +el+"?"+"\n Height is in inches, weight is in pounds, if not known input 'n'", chars);
        
    });

    for(let i=0; i<searchingTraits.length; i++){
        let trait = searchingTraits[i];
        let filteredPeople = people.filter(function(el) {
               if(el[traits[i]] ===trait) {
     

                     return true;

                } 
    
           });
    } 
        
}
function searchByGender(people) {
  let gender = promptFor("What gender is your person? Enter 'male' or 'female'", chars);
  let filteredPeople = people.filter(function(el) {
        if(el.gender === gender.toLowerCase()) {

          return true;

    } 
    
  });
 return filteredPeople;
}

function getSpouse (person, people) {
   let spouse = people.filter(function(el){
    if (person.currentSpouse === el.id) {
      
      return true;
    }
    
  });
return spouse;
   }

function lookForKids (person, people) {
  
  let kid = people.filter(function(el) {
    for (let i = 0; i<el.parents.length; i++)
    if (person.id === el.parents[i]) {
      
      return true;
    }

  });
  for (let i = 0; i < kid.length; i++){
    alert("Found " + kid[i].firstName + " " + kid[i].lastName +
      " who is a child of "+ person.firstName + " " + person.lastName+"\n");
  }
 
}

function lookForDescendants(person,people){
  let descendants = people.filter(function(el){
        if (person.id === el.parents[0] || person.id===el.parents[1]){
          return true;
        }
      })
      for(let i = 0;i < descendants.length; i++){
        alert("Found " + descendants[i].firstName + " " + descendants[i].lastName + 
          " who is a child of "+ person.firstName + " " + person.lastName + "\n");

        lookForDescendants(descendants[i],people);
        
      }
      return;
      
   
}


function displaySpouse(person, people) {
    if (person.currentSpouse != null) {
        let foundSpouse = getSpouse(person, people);
        let spouseString = foundSpouse[0];
            var personsFamily = "Spouse found: " + spouseString.firstName + " " + spouseString.lastName + "\n"; 
        
 
    alert(personsFamily);
  } else
  {
    alert("No spouse currently recorded");
  }

}

function searchForParents (person, people) {
  let personsFamily;
  if(person.parents == false){
    alert("No recorded parents")
  }
  for (let i = 0; i < person.parents.length; i++) {
      parent = person.parents[i];
     
          foundParent =  people.filter(function(el){
          if (el.id === parent) {
            return true;
          }
      });
      alert( "Parent found: " + foundParent[0].firstName + " " + foundParent[0].lastName + "\n");
  }
  
}

/*
function searchByAge(people) {
  let age = promptFor("What is the person's age?", chars);
// Maybe do a map function to run dob into age calc and return. Or call the 
// function twice so that it calculates inputed once, and el.dob everytime. 

  let filteredPeople = people.filter(function(el) {
        if(el.age === age) {
     

          return true;

    } 
    
  });
 return filteredPeople;
}
*/
function searchByDOB(people) {
  let dob = promptFor("What is the person's Date of Birth? Please enter in m/d/yyyy format", chars);
  let filteredPeople = people.filter(function(el) {
        if(el.dob === dob) {
     

          return true;

    } 
    
  });
 return filteredPeople;
}


function searchByHeight(people) {
  let height = promptFor("How tall is the person in inches?", chars);
  let filteredPeople = people.filter(function(el) {
        if(el.height == height) {
          return true;

    } 
    
  });
 return filteredPeople;
}

function searchByWeight(people) {
  let weight = promptFor("How much does your person weigh in pounds?", chars);
  let filteredPeople = people.filter(function(el) {
        if(el.weight == weight.toLowerCase()) {
     

          return true;

    } 
    
  });
 return filteredPeople;
}

function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the person's Eye Color", chars);
  let filteredPeople = people.filter(function(el) {
        if(el.eyeColor=== eyeColor.toLowerCase()) {
     

          return true;

    } 
    
  });
 return filteredPeople;
}

function searchByOccupation(people) {
  let occupation = promptFor("What is the person's occupation?", chars);
  let filteredPeople = people.filter(function(el) {
        if(el.occupation === occupation.toLowerCase()) {
     

          return true;

    } 
    
  });
 return filteredPeople;
}
function selectingAttribute(people){
  let response = promptFor("What attribute do with wish to search for (Gender, DateofBirth, Height, Weight, Eyecolor, Occupation)?", chars);
  response.toLowerCase().trim().split(" ").join("");
  
  switch(response){
    case "gender":
      let peopleByGender = searchByGender(people);
      return peopleByGender;
    case "dateofbirth":
     let peopleByDOB = searchByDOB(people);
     return peopleByDOB;
  //  case "age":
    //  let peopleByAge = searchByAge(people);
    //  return peopleByAge;
    case "height":
      let peopleByHeight = searchByHeight(people);
      return peopleByHeight;
    case "weight":
      let peopleByWeight = searchByWeight(people);
      return peopleByWeight;
    case "eyecolor":
      let peopleByEyeColor = searchByEyeColor(people);
      return peopleByEyeColor;
    case "occupation":
      let peopleByOccupation = searchByOccupation(people);
      return peopleByOccupation;
    default:
      console.log("Do you even know who you're looking for? Start the search again when you find out SOMETHING.")
      break;
  }
}

function multiTraitSearch(){
   let response = promptFor("What attribute do with wish to search for?" + 
      "\n(Gender, DateOfBirth, Height, Weight, EyeColor, Occupation)?" +
      "\n Please seperate attributes by a space and input as it is stated above.", chars);
      response = formatInput(response);  
      return response;
      
}

function multiTraitFilter (response, people){
    let result =[];
    response.forEach(function(el){
      if(el === "gender"){
        let foundpeople = searchByGender(people);
        result = result.concat(foundpeople);

      }
      if(el === "height"){
          let foundpeople = searchByHeight(people);
         result = result.concat(foundpeople);
      }
      if(el === "weight"){
          let foundpeople = searchByWeight(people);
         result = result.concat(foundpeople);
      }
      if(el === "dateofbirth"){
          let foundpeople = searchByDOB(people);
         result = result.concat(foundpeople);
      }
      if(el === "eyecolor"){
          let foundpeople = searchByEyeColor(people);
         result = result.concat(foundpeople);
      }
      if(el === "occupation"){
          let foundpeople = searchByOccupation(people);
         result = result.concat(foundpeople);
      }
    });
    return result;  
}


function resultScreener(allResultsArray,response){
      let j=0;
      let k=1
      let results = [];
      for(let i = 0; i <allResultsArray.length; i++){
          allResultsArray.filter(function(el){
              
              if(allResultsArray[i] === el){ 
                j++
                
                 if (j===response.length && !results.includes(allResultsArray[i])){

                      results.push(allResultsArray[i]);
                      j = 0
                  }  
                  if (j === response.length){

                  j = 0
                  } }
              if (k === allResultsArray.length){
                  j=0
                  k=0
                }
                   
               
             k++ 
        });
      } 
  return results;    
}
