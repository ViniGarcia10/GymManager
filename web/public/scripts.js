const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header .links-container .link a');

for (let index = 0; index < menuItems.length; index++) {
  if (currentPage.includes(menuItems[index].getAttribute('href'))) {
    menuItems[index].classList.add('active');
  }
}
