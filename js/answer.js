document.addEventListener("DOMContentLoaded", function() {
    loadSavedAnswers();

    var radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener("click", function() {
            var clickedQuestion = this.name;
            var clickedAnswer = this.value;
            var savedAnswer = localStorage.getItem(clickedQuestion);

            if (savedAnswer === clickedAnswer) {
                this.checked = false;
                clearAnswer(clickedQuestion);
            } else {
                saveAnswer(clickedQuestion, clickedAnswer);
            }

            updateRadioButtons(clickedQuestion, clickedAnswer);
        });
    });

    var emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        var emailValue = this.value;
        var ccInput = document.querySelector('input[name="_cc"]');
        ccInput.value = emailValue;
    });
});

function saveAnswer(question, answer) {
    localStorage.setItem(question, answer);
}

function clearAnswer(question) {
    localStorage.removeItem(question);
}

function loadSavedAnswers() {
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radioButton) {
        var savedAnswer = localStorage.getItem(radioButton.name);
        if (savedAnswer && savedAnswer === radioButton.value) {
            radioButton.checked = true;
        }
    });
}

function updateRadioButtons(clickedQuestion, clickedAnswer) {
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radioButton) {
        if (radioButton.name === clickedQuestion && radioButton.value !== clickedAnswer) {
            radioButton.checked = false;
        }
    });
}

function toggleSubmitButton() {
    const termsCheckbox = document.getElementById('termsCheckbox');
    const submitButton = document.getElementById('submitButton');
    // Enable the submit button only if the checkbox is checked
    submitButton.disabled = !termsCheckbox.checked;
}

document.getElementById("termsCheckbox").addEventListener("change", function() {
    const submitButton = document.querySelector(".submit-button");
    submitButton.disabled = !this.checked;
});

// Validate form on submit
function validateForm() {
    const termsChecked = document.getElementById("termsCheckbox").checked;
    if (!termsChecked) {
        alert("Please agree to the terms and conditions before submitting.");
        return false;  // Prevent form submission
    }
    return true;  // Allow form submission
}

function submitTest(event) {
    event.preventDefault(); // Prevent default form submission

    var form = document.getElementById("testForm");
    var formData = new FormData(form);
    var totalScore = 0;
    var allAnswered = true;

    var questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14'];

    questions.forEach(function(question) {
        var answer = formData.get(question);
        if (answer === null) {
            allAnswered = false;
        } else {
            totalScore += parseInt(answer, 10);
        }
    });

    if (!allAnswered) {
        alert("Please answer all questions before submitting.");
        return;
    }

    var resultText;
    if (totalScore <= 0) {
        resultText = "Not Present.";
    } else if (totalScore < 17) {
        resultText = "Mild Severity";
    } else if (totalScore >= 18 && totalScore <= 24) {
        resultText = "Mild to Moderate Severity";
    } else {
        resultText = "Moderate to Severe.";
    }

    formData.append('result', resultText);
    document.getElementById('testResult').value = resultText;

    // Debugging: Log the form data before sending
    console.log("Submitting the following data to submit.php:");
    formData.forEach(function(value, key) {
        console.log(key + ": " + value);
    });

    fetch('submit.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server Response:', data);
        if (data.status === 'success') {
            alert('Data submitted successfully');
        } else {
            alert('Error: ' + data.message);
        }
        var popup = document.getElementById("popupResult");
        var resultElement = document.getElementById("resultText");
        resultElement.textContent = "Your result is: " + resultText;
        popup.style.visibility = "visible"; // Show result popup
    })
    .catch(error => {
        console.error('Error:', error);
        alert("There was an error submitting your test.");
    });
}

function sendToEmail() {
    hidePopup(); 
    showTerms('Email'); 
}

/*
function sendToPhone() {
    hidePopup(); // Hide the popupResult
    showTerms('Phone'); // Display terms for Phone
}
*/

function hidePopup() {
    let popups = document.querySelectorAll(".popup");
    popups.forEach(popup => {
        popup.style.visibility = "hidden";
    });
}

function showTerms(method) {
    let popupTerms = document.getElementById("popupTerms");
    popupTerms.style.visibility = "visible";

    let acceptButton = document.querySelector('#termsAcceptButton');
    acceptButton.onclick = function() {
        popupTerms.style.visibility = "hidden"; 
        showForm(method); 
    };

    let termsLink = document.querySelector('#termsText a');
    if (method === 'Email') {
        termsLink.href = 'https://www.termsfeed.com/live/f7698038-5096-47e3-a112-7e5c2a8fe8ae';
    } else if (method === 'Phone') {
        termsLink.href = 'https://www.termsfeed.com/live/f7698038-5096-47e3-a112-7e5c2a8fe8ae';
    }
}

function showForm(method) {
    let emailPopupForm = document.getElementById("emailPopupForm");
    let phonePopupForm = document.getElementById("phonePopupForm");

    if (method === 'Email') {
        emailPopupForm.style.visibility = "visible";
    } else if (method === 'Phone') {
        phonePopupForm.style.visibility = "visible";
    }

    localStorage.setItem("selectedMethod", method);
}

function closePopup() {
    let popups = document.querySelectorAll(".popup");
    popups.forEach(popup => {
        popup.style.visibility = "hidden";
    });
}
