const iconSkills = document.querySelectorAll(".tech--icon img")
let containerInfo = document.querySelector(".tech--info")
const formItem = document.querySelectorAll(".formacao--item")
let infoTech = {
  title: document.querySelector(".tech--content h1"),
  descript: document.querySelector(".tech--content p"),
}

/**
 * obj informations of all tech
 */
const informations = {
  reactjs: {
    title: "ReactJS",
    descript:
      "O React é a biblioteca mais popular do JavaScript e é usada para construir uma interface de usuário (IU). Ela oferece uma resposta excelente para o usuário adicionar comandos usando um novo método de renderizar sites.",
  },
  sass: {
    title: "SASS",
    descript:
      "Com o SASS, é muito mais fácil desenvolver um projeto grande e não se perder no meio de tanto código.A ideia é manter a mesma lógica do CSS (seletores, regras etc), mas de uma maneira mais organizada, intuitiva e com trechos de código facilmente reutilizáveis.",
  },
  html: {
    title: "HTML",
    descript:
      " A Linguagem de Marcação de Hipertexto (HTML) é uma linguagem de computador que compõe a maior parte das páginas da internet e dos aplicativos online. Um hipertexto é um texto usado para fazer referência a outros textos, enquanto uma linguagem de marcação é composta por uma série de marcações que dizem para os servidores da web qual é o estilo e a estrutura de um documento.",
  },
  css: {
    title: "CSS",
    descript:
      "O CSS separa o conteúdo da representação visual do site. Pense  na decoração da sua página. Utilizando o CSS é possível alterar a cor do texto e do fundo, fonte e espaçamento entre parágrafos. Também pode criar tabelas, usar variações de layouts, ajustar imagens para suas respectivas telas e assim por diante.",
  },
  javascript: {
    title: "Javascript",
    descript:
      "A linguagem de programação Javascript permite ao desenvolvedor implementar diversos itens de alto nível de complexidade em páginas web, como animações, mapas, gráficos ou informações que se atualizam em intervalos de tempo padrão, por exemplo.",
  },
  vuejs: {
    title: "VueJS",
    descript:
      "Vue JS é muito utilizado para criar aplicações single page (página única) e também para desenvolver vários tipos de interfaces, que possuem necessidades de maior interação e experiência mais valorosa para o usuário.",
  },
}

const toggleClass = () => {
  containerInfo.firstElementChild.classList.toggle("activeIcon")
}
/**
 *
 */
const changeTechInfo = e => {
  const nameTeach = e.target.getAttribute("name")
  const { title, descript } = informations[nameTeach]
  toggleClass()
  setTimeout(() => {
    infoTech.title.className = title.toLowerCase()
    infoTech.title.innerHTML = title
    infoTech.descript.innerHTML = descript
  }, 450)
}

/**
 * Ad event for all icons
 */
iconSkills.forEach(icon => {
  icon.addEventListener("mouseover", changeTechInfo)
})
iconSkills.forEach(icon => {
  icon.addEventListener("mouseout", toggleClass)
})

/**
 * lazing load
 */
const contact = document.getElementById("contato")
const lazyLoading = () => {
  iconSkills.forEach(icon => {
    if (icon.getBoundingClientRect().top < window.innerHeight - 80) {
      icon.classList.add("lazyLoadingIcon")
      const src = icon.getAttribute("data-src")
      icon.src = src
    }
  })
  if (containerInfo.getBoundingClientRect().top < window.innerHeight - 80) {
    containerInfo.classList.add("lazyLoadingInfo")
  }
  formItem.forEach(item => {
    if (item.getBoundingClientRect().top + 100 < window.innerHeight) {
      item.style.transform = "translateY(0)"
    }
  })
  if (contact.getBoundingClientRect().top + 30 < window.innerHeight) {
    contact.classList.add("active")
    contactAnimate()
  }
}
window.addEventListener("scroll", lazyLoading)

/**
 * contact animation
 */
const contactTitle = document.querySelector(".contact--title")
const social = document.querySelector(".social")
const contactTitleText = "Olá, vamos trabalhar juntos?".split("")
contactTitleText.forEach(letter => {
  contactTitle.innerHTML += `<span>${letter}</span>`
})

function contactAnimate() {
  let char = 0
  let timer = setInterval(() => {
    contactTitle.querySelectorAll("span")[char].classList.add("fade")
    char++
    char === contactTitleText.length && complete()
  }, 100)

  function complete() {
    clearInterval(timer)
    setTimeout(() => {
      social.classList.add("active")
      contactTitle.classList.add("dashLeft")
    }, 5000)
  }
}

/**
 * email redirect
 */

const message = {
  to: "mailto:viniciusep181@gmail.com",
  subject: "subject=Olá%20Vinicius,%20Vamos%20trabalhar%20juntos?",
  body: " &body=Você%20tem%20interesse%20em%20participar%20da%20nossa%20equipe%20de%20desenvolvedores?",
}
document.querySelector("#email").onclick = function () {
  const { to, subject, body } = message
  window.open(`${to}?${subject}&${body}`, "_blank")
}
/**
 * responsive nav bar
 */
const nav = document.querySelector("nav")
const hamNav = document.querySelector(".nav--ham")
hamNav.addEventListener("click", () => {
  nav.classList.toggle("nav--visible")
  hamNav.classList.toggle("animateToggle")
})
const linksNav = document.querySelectorAll("nav li")
linksNav.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav--visible")
    hamNav.classList.remove("animateToggle")
  })
})
/**
 * remove class nav--visible if width>700px and  nav--visible  yet exist
 */
window.addEventListener("resize", () => {
  if (window.innerWidth >= 750) {
    nav.classList.remove("nav--visible")
    hamNav.classList.remove("animateToggle")
  }
})

/**
 * acessibility
 */
let currentFocusTech = 0
iconSkills.forEach((icon, index) => {
  icon.addEventListener("focus", e => {
    changeTechInfo(e)
  })
  icon.addEventListener("keyup", ({ key }) => {
    if (key === "Enter" || key === "ArrowRight") {
      infoTech.descript.focus()
      currentFocusTech = index
    }
  })
})

infoTech.descript.addEventListener("keyup", ({ key }) => {
  if (key === "ArrowLeft" || key === "Enter") {
    iconSkills[currentFocusTech].focus()
  }
})
iconSkills[0].addEventListener("focus", () => window.scroll(0, 200))
formItem[0].addEventListener("focus", e => window.scroll(0, 200))
