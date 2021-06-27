import '../../scss/layouts/signin.scss';
import notify from '../webComponents/notification';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const successContainer = document.querySelector('#message-success') as HTMLDivElement | null;
    successContainer && successContainer.remove();
  }, 5000);
});

const autoSignIn = () => {
  const data = {
    email: 'john.doe@gmail.com',
    password: 'test123',
  };

  fetch('/signin', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
  }).then(() => {
    window.location.href = '/home';
  });
};

// setTimeout(() => {
//   autoSignIn();
// }, 500);

notify();
