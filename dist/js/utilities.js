function loggedIn() {
  return  window.localStorage.getItem('user') !== null;
}
 
function logout() {
  window.localStorage.removeItem('user');
  window.location.reload();
}

function loadNavbarProfile(navItem) {
  const user = JSON.parse(localStorage.getItem('user'));
  navItem.classList.add('dropdown');
  navItem.innerHTML = `
    <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${user.username}
    </a>
    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="profileDropdown">
      <li><a class="dropdown-item" href="profile.html">Profile</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><button class="dropdown-item" onclick="logout()"><i class="bi bi-box-arrow-right"></i> Logout</button></li>
    </ul>
  `;
  navItem.setAttribute('href', 'profile.html');
}



