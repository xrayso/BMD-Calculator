let age;
let gender;
let lumbarT;
let femoralNeckT;
let femoralNeckT2;
let totalHipT;
let inputs;
let texts;

let bgColour = 'rgb(120, 233, 183)';



function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(((width+height)/2)/30);
  
  let ageInput = createInput('');
  ageInput.position(width/2-width/13.3332, height/16);
  ageInput.size(width/6.6667, height/35);
  ageInput.style('font-size', height/35+'px' );
  
  let maleBox = createCheckbox('Male');
  maleBox.position(width/2-width/4.444, height/9);
  maleBox.changed(changeGender);
  maleBox.style('font-size', height/25+'px');
  let maleBoxSize = maleBox.elt.getElementsByTagName('input')[0];
  maleBoxSize.style.width = width/35+'px';
  maleBoxSize.style.height = height/35+'px';

  let femaleBox = createCheckbox('Female', true);
  femaleBox.position(width/2, height/9);
  femaleBox.changed(changeGender);
  femaleBox.style('font-size', height/25+'px');
  let femaleBoxSize = femaleBox.elt.getElementsByTagName('input')[0];
  femaleBoxSize.style.width = width/35+'px';
  femaleBoxSize.style.height = height/35+'px';

  maleBox.opp = femaleBox;
  femaleBox.opp = maleBox;
  
  
  let lumbarInput = createInput('');
  lumbarInput.position(width/2-width/4.444, height/3.4782);
  lumbarInput.size(width/2.222, height/35);
  lumbarInput.style('font-size', height/35+'px' );

  let femoralNeckInput = createInput('');
  femoralNeckInput.position(width/2-width/4.444, height/2.5);
  femoralNeckInput.size(width/2.222, height/35);
  femoralNeckInput.style('font-size', height/35+'px' );


  
  let totalHipScore = createInput('');
  totalHipScore.position(width/2-width/4.444, height/1.951);
  totalHipScore.size(width/2.222, height/35);
  totalHipScore.style('font-size', height/35+'px');

    let femoralNeckInput2 = createInput('');
  femoralNeckInput2.position(width/2-width/4.444, height/1.6);
  femoralNeckInput2.size(width/2.222, height/35);
  femoralNeckInput2.style('font-size', height/35+'px' );

  femoralNeckInput2.hide();                        
  
  let fractureCheckBox = createCheckbox('fragility fracture history', false);
  fractureCheckBox.changed(fractureFurther);
  fractureCheckBox.position(width/2-width/4.444, height/6.6667);
  fractureCheckBox.style('font-size', height/25+'px');
  let fBoxSize = fractureCheckBox.elt.getElementsByTagName('input')[0];
  fBoxSize.style.width = width/35+'px';
  fBoxSize.style.height = height/35+'px';
  
  let glucCheckBox = createCheckbox('glucocorticoid history', false);
  glucCheckBox.position(width/2-width/4.444, height/5.3);
  glucCheckBox.style('font-size', height/25+'px');
  let gBoxSize = glucCheckBox.elt.getElementsByTagName('input')[0];
  gBoxSize.style.width = width/35+'px';
  gBoxSize.style.height = height/35+'px';
  
  inputs = [ageInput, maleBox, lumbarInput, femoralNeckInput, fractureCheckBox, glucCheckBox, totalHipScore, femoralNeckInput2, femaleBox];
  
  let w = width;
  let ageText = new Txt("Enter Age", w/2-w/13.3332, height/20);
  let genderText = new Txt("Enter Gender", w/2, height/6.1538);
  let lumbarSpineText = new Txt("Enter Lumbar Spine T-Score",w/2-w/4.444,height/3.6363);
  let femoralNeckText = new Txt("Enter Femoral Neck T-Score", w/2-w/4.444, height/2.5806);
let femoralNeckText2 = new Txt("Enter Femoral Neck T-Score Female", w/2-w/4.444, height/1.63, true);
  let totalHipText = new Txt("Enter Total Hip T-Score", w/2-w/4.444, height/2);
  
  texts = [ageText, lumbarSpineText, femoralNeckText, totalHipText, femoralNeckText2];
  

}


function draw() {
  background(bgColour);
  
  for (let t of texts) t.show();
  age = inputs[0].value();
  if (age < 50 && age >= 18){
    texts[1].txt = "Enter Lumbar Spine Z-Score";
    texts[2].txt = "Enter Femoral Neck Z-Score";
    texts[3].txt = "Enter Total Hip Z-Score";
  }else{
    texts[1].txt = "Enter Lumbar Spine T-Score";
    texts[2].txt = "Enter Femoral Neck T-Score";
    texts[3].txt = "Enter Total Hip T-Score";
  }
  if (inputs[1].checked()){
    gender = 'm';
  }else if (inputs[8].checked()){
    gender = 'f';
  }else{
    gender = undefined;
  }
  lumbarT = inputs[2].value();
  femoralNeckT = inputs[3].value();
  femoralNeckT2 = inputs[7].value();
  totalHipT = inputs[6].value();
  if (gender == 'f' || age < 50){
    texts[4].hidden = true;
    inputs[7].hide();
  }else{
    texts[4].hidden = false;
    inputs[7].show();
  }
  
  let categoryName = "";
  if (age && gender && lumbarT && femoralNeckT && totalHipT){
    if (gender == 'm' && !femoralNeckT2 || isNaN(femoralNeckT2)) return;
    let minVal = min(min(lumbarT, femoralNeckT), totalHipT);
    if (isNaN(minVal)) return;
    if (age >= 50){
      if (minVal >= -1) {
        categoryName = "Normal ";
        bgColour = 'rgb(120, 233, 183)';
      }
      else if (minVal > -2.5){
        categoryName = "Low Bone Mass "
        bgColour = '#F1C53F';
        
      } 
      else {
        categoryName = "Osteoporosis "
        bgColour = '#F44336';
      }
      let risk;
      if (gender == 'f'){
        risk = fractureRisk(femoralNeckT);  
      }else{
        risk = fractureRisk(femoralNeckT2);  
      }
      
      if (risk == "Low Risk") risk = fractureRisk(lumbarT);
      categoryName+=risk
    }else if (age >= 18){
      if (minVal > -2){
        categoryName = "Within Expected Range ";
        bgColour = 'rgb(120, 233, 183)';
      } else{
        categoryName = "Below Expected Range ";
        bgColour = '#F44336';
      }
    }
    textAlign(CENTER);
    textSize(width/20);
    text(categoryName, width/2, height-20);
    textSize(width/30);
    textAlign(LEFT);
  }
  
}


function fractureRisk(f){
  let a = age/100;
  a = round(a/5, 2)*5;
  a*=100;
  a = round(a);
  let risk;
  let g = gender;
  if (g == 'f'){
    if (a == 50 || a == 55){
      risk = score(f, -2.5, -3.8);
    }
    else if (a == 60){
      risk = score(f, -2.3, -3.7);
    }
    else if (a == 65){
      risk = score(f, -1.9, -3.5);  
    }
    else if (a == 70){
      risk = score(f, -1.7, -3.2);
    }
    else if (a == 75){
      risk = score(f, -1.2, -2.9);
    }
    else if (a == 80){
      risk = score(f, -0.5, -2.6);
    }
    else if (a >= 85){
      risk = score(f, 0.1, -2.2);
    }
  }else if (g == 'm'){
    if (a == 50 || a == 55){
      risk = score(f, -2.5, -3.9);
    }
    else if (a == 60){
      risk = score(f, -2.5, -3.7);
    }
    else if (a == 65){
      risk = score(f, -2.4, -3.7);  
    }
    else if (a == 70){
      risk = score(f, -2.3, -3.7);
    }
    else if (a == 75){
      risk = score(f, -2.3, -3.8);
    }
    else if (a == 80){
      risk = score(f, -2.1, -3.8);
    }
    else if (a >= 85){
      risk = score(f, -2.0, -3.8);
    }
  }
  if (inputs[4].checked() || inputs[5].checked()){
    if (risk == "Moderate") risk = "High";
    if (risk == "Low") risk = "Moderate";
    if (inputs[4].checked() && inputs[5].checked() && a > 40){
      risk = "High";
    }
  }
  return risk + " Risk";
}


function score(f, lowRisk, moderateRisk){
  let risk;
  if (f > lowRisk) risk = "Low";
  else if (f >= moderateRisk) risk = "Moderate"
  else risk = "High";
  return risk; 
  
}


function fractureFurther(){
  
  if (inputs[4].checked()){
    
  }
  
}

function changeGender(){
  
  if (this.value() == "Female"){
    if (this.checked() && inputs[1].checked()){
      let maleBox = createCheckbox('Male');
      maleBox.position(width/2-width/4.444, height/9);
      maleBox.changed(changeGender);
      maleBox.style('font-size', height/25+'px');
      let maleBoxSize = maleBox.elt.getElementsByTagName('input')[0];
      maleBoxSize.style.width = width/35+'px';
      maleBoxSize.style.height = height/35+'px';
      inputs[1] = maleBox;
    }else if (!this.checked() && !inputs[1].checked()) {
      let maleBox = createCheckbox('Male', true);
      maleBox.position(width/2-width/4.444, height/9);
      maleBox.changed(changeGender);
      maleBox.style('font-size', height/25+'px');
      let maleBoxSize = maleBox.elt.getElementsByTagName('input')[0];
      maleBoxSize.style.width = width/35+'px';
      maleBoxSize.style.height = height/35+'px';
      inputs[1] = maleBox;
    }
  }else{
      if (this.checked() && inputs[8].checked()){
      let femaleBox = createCheckbox('Female');
      femaleBox.position(width/2, height/9);
      femaleBox.changed(changeGender);
      femaleBox.style('font-size', height/25+'px');
      let femaleBoxSize = femaleBox.elt.getElementsByTagName('input')[0];
      femaleBoxSize.style.width = width/35+'px';
      femaleBoxSize.style.height = height/35+'px';
      inputs[8] = femaleBox;
    }else if (!this.checked() && !inputs[8].checked()) {
      let femaleBox = createCheckbox('Female', true);
      femaleBox.position(width/2, height/9);
      femaleBox.changed(changeGender);
      femaleBox.style('font-size', height/25+'px');
      let femaleBoxSize = femaleBox.elt.getElementsByTagName('input')[0];
      femaleBoxSize.style.width = width/35+'px';
      femaleBoxSize.style.height = height/35+'px';
      inputs[8] = femaleBox;
    }
  }
}

