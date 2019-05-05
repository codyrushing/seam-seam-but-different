const bodyModalClass = 'modal-open';
const modalActiveClass = 'active';

export default class App {
  constructor(params={}){
    this.params = params;
    window.addEventListener('DOMContentLoaded', () => this.ready());
  }
  ready(){
    this.modalWrapper = document.getElementById('modal-wrapper');

    // make all external links open in new tab
    document.querySelectorAll('a[href]')
      .forEach(
        link => {
          const href = link.getAttribute('href');
          if(
            /^http/ig.test(href) &&
            !/^\//.test(href) &&
            href.indexOf(window.location.origin) !== 0
          ){
            link.setAttribute('target', '_blank');
          }
        }
      );

    // global event delegator
    document
      .addEventListener(
        'click',
        (e) => {
          switch(true){
            case (e.target.matches('a[rel="modal"]')):
              this.openModalFromLink(e.target);
              e.preventDefault();
              break;
            case (e.target.matches('.modal')):
              this.closeModal();
              break;
          }
        }
      );

    document.querySelectorAll('a[rel="modal"]')
      .forEach(
        link => {
          link.addEventListener(
            'click',
            e => {
              this.openModalFromLink(link);
              e.preventDefault();
            }
          )
        }
      );

    // block links on modal content from bubbling up
    this.modalWrapper.querySelector('.inner')
      .addEventListener(
        'click',
        e => {
          e.stopPropagation()
        }
      );
  }
  openModalFromLink(link){
    this.openModal(this.modalWrapper.querySelector(link.getAttribute('href')));
  }
  openModal(modal){
    if(modal){
      this.closeModal();
      this.modal = modal;
      this.modal.classList.add(modalActiveClass);
      document.body.classList.add(bodyModalClass);
    }
  }
  closeModal(){
    if(this.modal){
      this.modal.classList.remove(modalActiveClass);
      document.body.classList.remove(bodyModalClass);
      this.modal = null;
    }
  }
}
