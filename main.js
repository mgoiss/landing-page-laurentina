/*Solucionando erro de referencia que ocorria quando era chamdo a função onScroll no body no evento onscroll. Esse erro acontecia quando recarregava a pagina em qualquer lugar que não fosse o topo, pois o scroll não havia sido criado ainda e com isso o erro acontecia, pois o body é criado primeiro, antes do seus filhos. | onscroll="onScroll()"*/
/*Uncaught ReferenceError: onScroll is not defined 
    at onscroll (VM3746 :15:51)*/
window.addEventListener('scroll', onScroll) //Add ao evento scroll a execução da função onScroll

onScroll() //Executando a função uma unica vez para o caso do usuário recarregar a pagina sem ser no topo e assim o menu ficar na cor verde

function onScroll() {
  showNavOnScroll()
  showBackToTopButtonOnScroll()

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(services)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(contact)
}

function activateMenuAtCurrentSection(section) {
  //Linha alvo
  const targetLine = scrollY + innerHeight / 2

  ///Verificar se a seção passou da linha
  //Quais dados vou precisar?

  //O topo da seção
  const sectionTop = section.offsetTop
  //A altura da seção
  const sectionHeight = section.offsetHeight

  //O topo da seção chegou ou ultrapassou a linha alvo
  const sectionTopReachOrPassedTargetline = targetLine >= sectionTop

  //Verificar se a base está a abaixo da linha alvo
  //Quais dados vou precisar

  //A seção termina onde
  const sectionEndsAt = sectionTop + sectionHeight
  //O final da seção passou da linha alvo
  const sectionEndPassedTargetline = sectionEndsAt <= targetLine

  //Limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline

  const sectionId = section.getAttribute('id')
  //Pegando o elemento a que tenha o nome da seção que foi passda por parametro e esteja na classe menu
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  menuElement.classList.remove('active')
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add('scroll')
  } else {
    navigation.classList.remove('scroll')
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 200) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

function openMenu() {
  document.body.classList.add('menu-expanded')
}

function closeMenu() {
  document.body.classList.remove('menu-expanded')
}

//Propriedades do scrollReveal
ScrollReveal({
  origin: 'top', //Movimentação do topo
  distance: '30px', //Distância da onde ele vem nesse caso do topo
  duration: 700 //Duração do efeito
}).reveal(`
    #home, 
    #home img, 
    #home .stats,
    #services,
    #services header,
    #services .card,
    #about,
    #about header,
    #about .content
  `) //Definindo a ordem de aparecimento ( header imagem do header e depois os stats do header ...)
