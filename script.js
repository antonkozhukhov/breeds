let base64String = "";
     
    function imageUploaded() {
        var file = document.querySelector('input[type=file]')['files'][0];     
        var reader = new FileReader();
        console.log("next");
        signupForm.disabled = false;
        signupForm.textContent = "Find the breed";
        ya_text.textContent = "";
        get_text.textContent="";
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
     
            imageBase64Stringsep = base64String;
     
            // alert(imageBase64Stringsep);
            console.log(base64String);
            imgLoadElem.setAttribute('src', "data:image/jpg;base64," + base64String);
            
        }
        reader.readAsDataURL(file);
       
        //console.log("data:image/jpg;base64," + base64String);
        
    }

//const fileInput = document.getElementById('username') ;
//const formData = new FormData();
//
//formData.append('file', fileInput.files[0]);
//console.log(fileInput.files[0]);
let img_string = "";
let imgElem = document.getElementById('imgElem');
let imgLoadElem = document.getElementById('imgLoadElem');
let signupForm = document.getElementById('Id1');
let get_text = document.getElementById('gettext');
let ya_text = document.getElementById('ya_url');
let str64 = "";

signupForm.addEventListener('click', function(event) {
  signupForm.disabled = true;
  signupForm.textContent = "Searching...";
   
    event.preventDefault();
    imageUploaded();
    signupForm.disabled = true;
    signupForm.textContent = "Searching...";
     //console.log(fileInput.files[0]);
     //formData.append('file', fileInput.files[0]);
    
    //console.log(imageUploaded().length);
    console.log(base64String==str64);
    get_text.textContent="";
    //imgElem.removeAttribute('src');
    str64 = base64String;
    if (base64String.length>5) {
    signupForm.disabled = true;
    signupForm.textContent = "Searching...";
    fetch('https://breeds1988.loca.lt',{
        method: 'POST', 
        body: JSON.stringify(str64),
    })
         .then(res => {
          if (res.status ==200){
            signupForm.disabled = false;
            signupForm.textContent = "Find the breed";
            return res.text();
           } // возвращаем результат работы метода и идём в следующий then
          })
          .then(res => {
              
            //console.log(res);
            res_string = res.substring(1, res.length - 1).split(",")[0];
            res_string = res_string.substring(1, res_string.length - 1);
            res_string = res_string.replaceAll('_', ' ');
            console.log(res_string);
            get_text.textContent=res_string;
            ya_text.style.display = "block";
            ya_text.href='https://yandex.ru/images/search?text='+res_string.replaceAll(' ', '_');
            ya_text.textContent="Search pictures of "+ res_string;
            
            return res_string;
            //console.log(img_string=="data:image/jpg;base64," + res.substring(1, res.length - 1));     
            //return ("data:image/jpg;base64," + res.substring(1, res.length - 1));   
            //imgElem.setAttribute('src', "data:image/jpg;base64," + res.substring(1, res.length - 1)); // возвращаем результат работы метода и идём в следующий then
          })
          .then(res => {
            //imgElem.style.display = "block";
            //imgElem.setAttribute('src', res);
        })
          .catch((err) => {
            signupForm.disabled = false;
            signupForm.textContent = "Find the breed";
            get_text.textContent = 'Failed to connect server, try again';
            console.log('Ошибка. Запрос не выполнен');
          }); 
        
            
    }
    
})  
    
    //image1.src = localStorage.getItem('myImage')