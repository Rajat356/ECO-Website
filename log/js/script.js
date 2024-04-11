const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");
      sigtog = document.getElementById("signup-toggle");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
})

// sigtog.addEventListener("submit", e => {
//     // e.preventDefault();
//     // sigtog.classList.toggle("show-signup");
//     forms.classList.toggle("show-signup");
// })

// links.forEach(link => {
//     link.addEventListener("click", e => {
//       e.preventDefault(); //preventing form submit
//       const showSignup = new URLSearchParams(window.location.search).get('showSignup');
//       if (showSignup) {
//         forms.classList.add("show-signup");
//       } else {
//         forms.classList.toggle("show-signup");
//       }
//     })
//   });