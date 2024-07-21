// script Register form
const handelLogin = (function handelLogin() {
  const forms = document.querySelectorAll('.needs-validation');
  // window.localStorage.setItem(
  //   'isLogin',
  //   JSON.stringify({ status: false, username: '' })
  // );
  // handel total form>>>>>>>>>>>>>>>>>>>>>>>>>

  let firstNameInput = document.getElementById('firstName');
  console.log(firstNameInput);
  let lastNameInput = document.getElementById('lastName');
  let emailInput = document.getElementById('Email');
  let PasswordInput = document.getElementById('password');
  let ConfirmPasswordInput = document.getElementById('ConfirmPassword');
  let form = document.getElementById('form');
  let formSignIn = document.getElementById('formSignIn');

  // validate fname
  function validateFname() {
    let regxFname = /^([A-Z ][a-z]+[ \-]{0,1}){1,3}$/;
    if (!regxFname.test(firstNameInput.value)) {
      return false;
    } else {
      return true;
    }
  }
  // validate Lname
  function validateLname() {
    let regx = /^([A-Z ][a-z]+[ \-]{0,1}){1,3}$/;
    if (!regx.test(lastNameInput.value)) {
      return false;
    } else {
      return true;
    }
  }

  // validate Email
  function validateEmail() {
    let regxEmail = /^\S+@\S+\.\S+$/;

    if (!regxEmail.test(emailInput.value)) {
      return false;
    } else {
      return true;
    }
  }
  // validate password
  function validatePassword() {
    let regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!regexPass.test(PasswordInput.value)) {
      return false;
    } else {
      return true;
    }
  }

  // validate confirm password
  function validateConfirmPassword() {
    if (ConfirmPasswordInput.value !== PasswordInput.value) {
      return false;
    } else {
      return true;
    }
  }

  // check first name

  firstNameInput.addEventListener('blur', function () {
    if (!validateFname()) {
      firstNameInput.classList.add('is-invalid');
    } else {
      firstNameInput.classList.remove('is-invalid');
      firstNameInput.classList.add('is-valid');
    }
  });
  // check last name
  lastNameInput.addEventListener('blur', function () {
    if (!validateLname()) {
      lastNameInput.classList.add('is-invalid');
    } else {
      lastNameInput.classList.remove('is-invalid');
      lastNameInput.classList.add('is-valid');
    }
  });

  // check email

  emailInput.addEventListener('blur', function () {
    if (!validateEmail()) {
      emailInput.classList.add('is-invalid');
    } else {
      emailInput.classList.remove('is-invalid');
      emailInput.classList.add('is-valid');
    }
  });

  // check password

  PasswordInput.addEventListener('blur', function () {
    if (!validatePassword()) {
      PasswordInput.classList.add('is-invalid');
    } else {
      PasswordInput.classList.remove('is-invalid');
      PasswordInput.classList.add('is-valid');
    }
  });

  // check confirm password
  ConfirmPasswordInput.addEventListener('blur', function () {
    if (!validateConfirmPassword() || ConfirmPasswordInput.value === '') {
      ConfirmPasswordInput.classList.add('is-invalid');
    } else {
      ConfirmPasswordInput.classList.remove('is-invalid');
      ConfirmPasswordInput.classList.add('is-valid');
    }
  });

  // reset form handle
  form.addEventListener('reset', function (e) {
    if (!confirm('do you want to clear data')) {
      e.preventDefault();
    }
  });

  // check real data
  function realData() {
    if (
      !validateEmail() ||
      !validatePassword() ||
      !validateConfirmPassword() ||
      !validateFname() ||
      !validateLname()
    ) {
      return false;
    } else {
      return true;
    }
  }

  // submit handle

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!realData() || !form.checkValidity()) {
      handleAlert('Please enter all data correctly');
    } else {
      setUserOrSellerData();
      handleAlert('Congrats!');
      setTimeout(() => {
        form.submit();
      }, 1000);
    }
  });

  function setUserOrSellerData() {
    let role = document.querySelector('input[name="role"]:checked');

    let data = {
      Fname: firstNameInput.value,
      Lname: lastNameInput.value,
      Email: emailInput.value,
      Role: role.value,
      Pass: PasswordInput.value,
    };

    let isData = JSON.parse(localStorage.getItem('data'));

    let users = isData ? JSON.parse(localStorage.getItem('data')) : [];

    users.push(data);

    localStorage.setItem('data', JSON.stringify(users));
    Toggle();
  }

  // end handel total form>>>>>>>>>>>>>>>>>>>>>>>>>
  const parentToggle = document.querySelector('.parentToggle');
  parentToggle.addEventListener('click', function () {
    Toggle();
  });
  function Toggle() {
    let toggle = document.querySelector('.toggle');

    if (toggle.className == 'toggle switchLeft') {
      toggle.classList.add('switchRight');
      toggle.classList.remove('switchLeft');
      formSignIn.classList.remove('d-none');
      form.classList.add('d-none');
    } else {
      toggle.classList.add('switchLeft');
      toggle.classList.remove('switchRight');
      formSignIn.classList.add('d-none');
      form.classList.remove('d-none');
    }
  }

  //  handel signIn form>>>>>>>>>>>>>>>>>>>>>>>>>

  let SignInPass = document.getElementById('SignInPass');
  let SignInEmail = document.getElementById('SignInEmail');
  let signInForm = document.getElementById('formSignIn');
  let UserData = JSON.parse(localStorage.getItem('data'));

  // authntcation
  console.log(UserData);

  function authentication(UserData) {
    const signInEmail = document.getElementById('signInEmail');
    const signInPass = document.getElementById('SignInPass');
    console.log(signInEmail, signInPass);
    return UserData.some(
      (user) =>
        signInEmail.value === user.Email && signInPass.value === user.Pass
    );
  }
  console.log(signInForm);
  signInForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let UserData = JSON.parse(localStorage.getItem('data'));
    console.log('hello');
    console.log(UserData);
    if (!authentication(UserData)) {
      handleAlert('Error in email or password!');
    } else {
      // fun for redirction
      const singInInput = document.getElementById('signInEmail');
      const existingUser = UserData.find(
        (ele) => ele.Email === singInInput.value
      );

      if (existingUser.Role === 'Customer') {
        console.log('correct');
        updateUserLoginState(existingUser);
        window.location.href = '../../index.html';
      } else {
        console.log('seller');
        updateUserLoginState(existingUser);

        window.location.href = '../view/main-dashboard.html'; //this is for Seller page
      }
    }
  });
  console.log('hi');
  function updateUserLoginState(existingUser) {
    // window.localStorage.removeItem('isLogin');
    window.localStorage.setItem(
      'isLogin',
      JSON.stringify({
        status: true,
        firstName: existingUser.Fname,
        lastName: existingUser.Lname,
      })
    );
  }
  // end handel signIn form>>>>>>>>>>>>>>>>>>>>>>>>>

  // handle alert
  function handleAlert(contentCase) {
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
    let message = document.querySelector('.toast-body');
    message.innerText = contentCase;
  }

  // end of script Register form

  // script admin form

  let userName = document.getElementById('userName');
  let secretCode = document.getElementById('secretCode');
  let adminForm = document.getElementById('adminForm');

  function authorName() {
    if (userName.value == 'admin') {
      return true;
    } else {
      return false;
    }
  }
  function authorCode() {
    if (secretCode.value == '1234') {
      return true;
    } else {
      return false;
    }
  }

  userName.addEventListener('blur', function () {
    if (!authorName()) {
      userName.classList.add('is-invalid');
    } else {
      userName.classList.remove('is-invalid');
      userName.classList.add('is-valid');
    }
  });

  secretCode.addEventListener('blur', function () {
    if (!authorCode()) {
      secretCode.classList.add('is-invalid');
    } else {
      secretCode.classList.remove('is-invalid');
      secretCode.classList.add('is-valid');
    }
  });

  //  Display username on login
  const loggedInUser = JSON.parse(window.localStorage.getItem('isLogin'));
  const controlLoginForm = document.getElementById('controlLoginForm');
  console.log(loggedInUser);
  if (loggedInUser && loggedInUser.status) {
    controlLoginForm.innerHTML =
      loggedInUser.firstName + ' ' + loggedInUser.lastName;
    controlLoginForm.style.color = '#fff';
    addLogoutButton(controlLoginForm);
  } else {
    setLoginForm();
  }

  function setLoginForm() {
    const controlLoginForm = document.getElementById('controlLoginForm');
    controlLoginForm.innerHTML = ` 
    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Login</a>
    <ul class="dropdown-menu">
      <li>
        <a style="cursor: pointer" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Register & Log in</a>
      </li>
      <li>
        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdropAdmin">Admin Log in</a>
      </li>
    </ul>`;
  }

  function addLogoutButton(parentElement) {
    const logOutBtn = document.createElement('a');
    logOutBtn.textContent = 'Logout';
    logOutBtn.className = 'btn btn-danger mx-2';
    parentElement.insertAdjacentElement('beforeend', logOutBtn);
    logOutBtn.addEventListener('click', function () {
      window.localStorage.removeItem('isLogin');
      setLoginForm();
    });
  }
  // handle alert
  function handleAlert() {
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
  }

  adminForm.addEventListener('submit', function (e) {
    if (!authorName() || !authorCode()) {
      e.preventDefault();
      handleAlert();
    } else window.localStorage.setItem('isAdmin', JSON.stringify(true));
  });
})();