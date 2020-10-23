const form = document.querySelector('[name="verify"]');
const inputs = form.querySelectorAll('.inputs input');
const submitBtn = document.querySelector('input[type="submit"]')

function handleInput(e) {
  // check for data that was inputtted and if there is a next input, focus it
  const input = e.target;
  if (input.nextElementSibling && input.value) {
    input.nextElementSibling.focus();
  }
}

function handlePaste(e) {
  const paste = e.clipboardData.getData('text');
  // loop over each input, and populate with the index of that string
  inputs.forEach((input, i) => {
   // console.log(input);
    input.value = paste[i] || '';
  });
  //bail if not all the inputs are full up yet
  const checkStatus = checkSubmission(inputs)
  if(!checkStatus){
    return false
  }
  //submit the form and add UI feedback and restart option
  let message = document.createElement('span');
  let restart = document.createElement('a');
  message.appendChild(document.createTextNode('Thankyou :) your code has been received.'));
  restart.appendChild(document.createTextNode('Try again'));
  restart.href="#";
  restart.addEventListener('click', () => location.reload());
  form.insertBefore(message, submitBtn);
  form.appendChild(restart);
  submitBtn.classList.add("hide")
  submitForm()
}

//do something clever to make the UI nicer for the viewer!!!
function submitForm() {
  //don't form.submit() as will lose the ui message instead submit via ajax
}

const handleFocus = e => e.target.select()

//check for changes all the time and if all inputs are full focus the submit button
const handleChange = (e => {
  const checkStatus = checkSubmission(inputs)
  if(!checkStatus){
    return false
  }
  //2. all fields are full focus the submit btn
  submitBtn.focus()
})

function checkSubmission(fields) {
  // collect all the values from each input into a list
  const fieldValues = [...fields].map(i => i.value||null)
  //if any input is still empty then stop
  if(fieldValues.indexOf(null) > -1) { 
    return false
  }
  // otherwise return all the values as a single string (or number - whatever you want)
  return fieldValues.join()
}

inputs[0].addEventListener('paste', handlePaste);

// select text when click into an input field - honestly 
form.addEventListener('focusin', handleFocus);

form.addEventListener('input', handleInput);

form.addEventListener('change', handleChange)

// 1. select the text when the next input is focued
// 2. Auto submit the form if all fields are filled after a paste
// 3. support for backspacing from 1 input to another
