import template from './template.handlebars';

function createNotification() {
  const div = document.createElement('div');
  div.innerHTML = template({
    type: 'success',
    title: 'Test',
    message: 'asdasdasdasd',
  });

  document.body.appendChild(div);
}

export default createNotification;
